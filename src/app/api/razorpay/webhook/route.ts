// File: app/api/razorpay/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { db as prisma } from '@/lib/db';

export const config = {
  api: {
    bodyParser: false, // To allow raw body parsing
  },
  experimental: {
    serverComponentsExternalPackages: true,
  },
};

async function buffer(readable: ReadableStream<Uint8Array>) {
  const reader = readable.getReader();
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value!);
  }
  return Buffer.concat(chunks);
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await buffer(req.body!);
    const signature = req.headers.get('x-razorpay-signature');
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;

    const expected = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    if (signature !== expected) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(rawBody.toString());

    // Handle Razorpay Events
    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity;
      console.log('📦 Webhook: Payment Captured:', payment.id);

      // Optional: update order status if you already have the payment ID
      await prisma.order.updateMany({
        where: { razorpayPaymentId: payment.id },
        data: { status: 'PAID' },
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Webhook handler error' }, { status: 500 });
  }
}
