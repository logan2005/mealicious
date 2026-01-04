import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    NODE_ENV: process.env.NODE_ENV,
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID ? 
      `${process.env.RAZORPAY_KEY_ID.substring(0, 12)}...` : 'NOT_SET',
    NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?
      `${process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID.substring(0, 12)}...` : 'NOT_SET',
    IS_BACKEND_LIVE: process.env.RAZORPAY_KEY_ID?.startsWith('rzp_live_') || false,
    IS_FRONTEND_LIVE: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.startsWith('rzp_live_') || false,
    HAS_JWT_SECRET: !!process.env.JWT_SECRET,
    HAS_DATABASE_URL: !!process.env.DATABASE_URL,
  });
}