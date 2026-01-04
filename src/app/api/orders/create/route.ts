
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { db as prisma } from '@/lib/db';
import Razorpay from 'razorpay';

const razorpay = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET 
  ? new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    })
  : null;

export async function POST(req: NextRequest) {
  try {
    console.log('Order Create API - Environment Check:');
    console.log('RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID);
    console.log('NEXT_PUBLIC_RAZORPAY_KEY_ID:', process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);
    console.log('Is Backend Live Key:', process.env.RAZORPAY_KEY_ID?.startsWith('rzp_live_'));
    console.log('Is Frontend Live Key:', process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.startsWith('rzp_live_'));
    
    const user = await getCurrentUser(req);
    console.log('User authentication result:', user ? 'SUCCESS' : 'FAILED');
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { shippingDetails, frontendCartItems, frontendTotal } = await req.json();
    console.log('Request body parsed successfully:', { 
      hasShippingDetails: !!shippingDetails,
      cartItemsCount: frontendCartItems?.length || 0,
      total: frontendTotal 
    });

    if (!frontendCartItems || frontendCartItems.length === 0) {
      return NextResponse.json({ error: 'Empty cart' }, { status: 400 });
    }

    // Check minimum amount (Razorpay minimum is ₹1.00)
    const minimumAmount = 1.00;
    if (frontendTotal < minimumAmount) {
      return NextResponse.json({ 
        error: 'Minimum Order Amount', 
        message: `Order amount ₹${frontendTotal} is below the minimum allowed amount of ₹${minimumAmount}. Please add more items to your cart.`,
        minimumAmount: minimumAmount,
        currentAmount: frontendTotal
      }, { status: 400 });
    }

    // 1. Create Razorpay order
    console.log('Creating Razorpay order...');
    const options = {
      amount: Math.round(frontendTotal * 100), // Amount in the smallest currency unit
      currency: 'INR',
      receipt: `receipt_order_${new Date().getTime()}`,
      payment_capture: 1,
    };
    console.log('Razorpay order options:', options);

    if (!razorpay) {
      return NextResponse.json({ 
        error: 'Payment Gateway Not Configured',
        message: 'Razorpay keys are not properly configured. Please contact support.'
      }, { status: 500 });
    }
    
    const razorpayOrder = await razorpay.orders.create(options);
    console.log('Razorpay order created successfully:', razorpayOrder.id);

    // 2. Create order in our DB with status PENDING
    console.log('Creating database order...');
    const order = await prisma.order.create({
      data: {
        userId: user.userId,
        total: frontendTotal,
        address: shippingDetails.address,
        phone: shippingDetails.phone,
        status: 'PENDING',
        razorpayOrderId: razorpayOrder.id,
        items: {
          create: frontendCartItems.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });
    console.log('Database order created successfully:', order.id);

    return NextResponse.json({ success: true, razorpayOrder, orderId: order.id });
  } catch (error) {
    console.error('FULL ERROR DETAILS:', error);
    console.error('ERROR TYPE:', typeof error);
    console.error('ERROR CONSTRUCTOR:', error?.constructor?.name);
    
    if (error instanceof Error) {
      console.error('ERROR MESSAGE:', error.message);
      console.error('ERROR STACK:', error.stack);
      return NextResponse.json({ success: false, error: error.message, details: error.stack }, { status: 500 });
    } else {
      console.error('NON-ERROR OBJECT:', JSON.stringify(error, null, 2));
      return NextResponse.json({ success: false, error: 'Unknown error', details: String(error) }, { status: 500 });
    }
  }
}
