import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 'postgresql://neondb_owner:***@ep-old-shape-a76puw8n-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
    }
  }
});

async function clearDatabase() {
  try {
    console.log('🗑️ Starting database cleanup...');
    
    // Delete all data in correct order (due to foreign key constraints)
    console.log('📦 Deleting combo items...');
    await prisma.comboItem.deleteMany({});
    
    console.log('🛒 Deleting order items...');
    await prisma.orderItem.deleteMany({});
    
    console.log('🛒 Deleting orders...');
    await prisma.order.deleteMany({});
    
    console.log('📝 Deleting reviews...');
    await prisma.review.deleteMany({});
    
    console.log('🛒 Deleting cart items...');
    await prisma.cartItem.deleteMany({});
    
    console.log('📦 Deleting combos...');
    await prisma.combo.deleteMany({});
    
    console.log('📦 Deleting products...');
    await prisma.product.deleteMany({});
    
    console.log('👥 Deleting users (except admin)...');
    await prisma.user.deleteMany({
      where: {
        email: {
          not: 'admin@mealicious.in'
        }
      }
    });
    
    console.log('✅ Database cleanup completed!');
    
    // Verify cleanup
    const productCount = await prisma.product.count();
    const comboCount = await prisma.combo.count();
    const userCount = await prisma.user.count();
    
    console.log('📊 Database status after cleanup:');
    console.log(`   - Products: ${productCount}`);
    console.log(`   - Combos: ${comboCount}`);
    console.log(`   - Users: ${userCount} (should be 1 admin user)`);
    
  } catch (error) {
    console.error('❌ Error clearing database:', error);
    throw error;
  }
}

clearDatabase()
  .catch((e) => {
    console.error('❌ Script failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });