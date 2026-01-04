// File: app/api/payment-verification/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { db as prisma } from '@/lib/db';
import crypto from 'crypto';

async function verifyPaymentWithRazorpay(paymentId: string) {
  const keyId = process.env.RAZORPAY_KEY_ID!;
  const keySecret = process.env.RAZORPAY_KEY_SECRET!;
  const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

  const res = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}`, {
    headers: { Authorization: `Basic ${auth}` },
  });

  if (!res.ok) throw new Error('Failed to verify Razorpay payment');
  const data = await res.json();
  return data.status === 'captured';
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body;

    // Step 1: Signature verification
    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const expected = crypto
      .createHmac('sha256', secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expected !== razorpay_signature) {
      return NextResponse.json({ success: false, error: 'Invalid signature' }, { status: 400 });
    }

    // Step 2: Find the order in the database
    const order = await prisma.order.findUnique({
      where: { razorpayOrderId: razorpay_order_id },
    });

    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    // Step 3: Update the order status to PAID
    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        status: 'PAID',
        razorpayPaymentId: razorpay_payment_id,
      },
    });

    // Step 4: Clear the user's cart
    const user = await getCurrentUser(req);
    if (user) {
      await prisma.cartItem.deleteMany({ where: { userId: user.userId } });
    }

    return NextResponse.json({
      success: true,
      orderId: updatedOrder.id,
      redirectUrl: `/orders/${updatedOrder.id}`,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}