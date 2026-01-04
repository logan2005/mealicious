
import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { amount, currency } = body;
  console.log('Razorpay API: Incoming request body:', body);
  console.log('Razorpay Key ID (Backend):', process.env.RAZORPAY_KEY_ID);
  console.log('Is Backend Live Mode:', process.env.RAZORPAY_KEY_ID?.startsWith('rzp_live_'));

  const options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency,
    receipt: `receipt_order_${new Date().getTime()}`,
    payment_capture: 1,
  };
  console.log('Razorpay API: Options for order creation:', options);

  try {
    const order = await razorpay.orders.create(options);
    console.log('Razorpay API: Order created successfully:', order);
    return NextResponse.json({ order });
  } catch (error) {
    console.error('Razorpay API: Error creating order:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
