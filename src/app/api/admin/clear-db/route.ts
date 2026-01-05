import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    console.log('🗑️ Starting database cleanup...');
    
    // Delete all data in correct order (due to foreign key constraints)
    console.log('📦 Deleting combo items...');
    await db.comboItem.deleteMany({});
    
    console.log('🛒 Deleting order items...');
    await db.orderItem.deleteMany({});
    
    console.log('🛒 Deleting orders...');
    await db.order.deleteMany({});
    
    console.log('📝 Deleting reviews...');
    await db.review.deleteMany({});
    
    console.log('🛒 Deleting cart items...');
    await db.cartItem.deleteMany({});
    
    console.log('📦 Deleting combos...');
    await db.combo.deleteMany({});
    
    console.log('📦 Deleting products...');
    await db.product.deleteMany({});
    
    console.log('👥 Deleting users (except admin)...');
    await db.user.deleteMany({
      where: {
        email: {
          not: 'admin@mealicious.in'
        }
      }
    });
    
    console.log('✅ Database cleanup completed!');
    
    // Verify cleanup
    const productCount = await db.product.count();
    const comboCount = await db.combo.count();
    const userCount = await db.user.count();
    
    return NextResponse.json({
      message: 'Database cleared successfully',
      stats: {
        products: productCount,
        combos: comboCount,
        users: userCount
      }
    });

  } catch (error) {
    console.error('❌ Error clearing database:', error);
    return NextResponse.json(
      { error: 'Failed to clear database', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}