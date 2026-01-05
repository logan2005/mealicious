import { NextResponse } from 'next/server';
import { db, checkDatabaseHealth } from '@/lib/db';

export async function GET() {
  try {
    // Test database connection
    const dbHealth = await checkDatabaseHealth();
    let productCount: number | null = null;
    let comboCount: number | null = null;
    
    if (dbHealth.healthy) {
      try {
        // Get counts if connection is healthy
        [productCount, comboCount] = await Promise.all([
          db.product.count(),
          db.combo.count()
        ]);
      } catch (error) {
        console.error('Failed to get counts:', error);
      }
    }

    return NextResponse.json({
      // Environment info
      NODE_ENV: process.env.NODE_ENV,
      DEPLOYMENT_URL: process.env.DEPLOYMENT_URL || process.env.URL || 'NOT_SET',
      NETLIFY: process.env.NETLIFY === 'true' || process.env.NETLIFY_BUILD === 'true',
      
      // Database info
      DATABASE_URL_SET: !!process.env.DATABASE_URL,
      DATABASE_URL_MASKED: process.env.DATABASE_URL ? 
        `${process.env.DATABASE_URL.replace(/\/\/([^:]+):([^@]+)@/, '//$1:***@')}` : 'NOT_SET',
      DB_CONNECTION: dbHealth.healthy ? 'SUCCESS' : 'FAILED',
      DB_ERROR: dbHealth.healthy ? null : dbHealth.message,
      PRODUCT_COUNT: productCount,
      COMBO_COUNT: comboCount,
      
      // Prisma info
      PRISMA_GENERATED: true,
      
      // Payment config
      RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID ? 
        `${process.env.RAZORPAY_KEY_ID.substring(0, 12)}...` : 'NOT_SET',
      NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?
        `${process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID.substring(0, 12)}...` : 'NOT_SET',
      IS_BACKEND_LIVE: process.env.RAZORPAY_KEY_ID?.startsWith('rzp_live_') || false,
      IS_FRONTEND_LIVE: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.startsWith('rzp_live_') || false,
      
      // Security
      HAS_JWT_SECRET: !!process.env.JWT_SECRET,
      
      // Build info
      NEXT_RUNTIME: process.env.NEXT_RUNTIME || 'NOT_SET',
      
      // Recommendations
      RECOMMENDATIONS: !process.env.DATABASE_URL ? [
        '1. Set DATABASE_URL in Netlify environment variables',
        '2. Format: postgresql://user:password@host-neon.tech/dbname?sslmode=require',
        '3. Get your Neon DB connection from Neon Console'
      ] : dbHealth.healthy ? [
        '✅ Database connection working properly'
      ] : [
        '❌ Check DATABASE_URL format and Neon DB status',
        '❌ Ensure SSL mode is enabled (?sslmode=require)'
      ]
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Debug endpoint failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}