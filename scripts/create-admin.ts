import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient({
  log: ['query'],
});

async function createOrUpdateAdmin() {
  try {
    console.log('🔧 Creating/updating admin user...');
    
    const adminPassword = 'tgf_admin_2025!';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    const admin = await prisma.user.upsert({
      where: { email: 'admin@mealicious.in' },
      update: {
        password: hashedPassword,
        role: 'ADMIN'
      },
      create: {
        email: 'admin@mealicious.in',
        name: 'Admin',
        password: hashedPassword,
        role: 'ADMIN'
      }
    });
    
    console.log('✅ Admin user created/updated successfully!');
    console.log('📧 Email: admin@mealicious.in');
    console.log('🔑 Password: tgf_admin_2025!');
    console.log('👤 Admin ID:', admin.id);
    
    // Test admin exists
    const adminCheck = await prisma.user.findUnique({
      where: { email: 'admin@mealicious.in' },
      select: { id: true, email: true, role: true, createdAt: true }
    });
    
    if (adminCheck) {
      console.log('✅ Admin user verified in database:');
      console.log('   - Email:', adminCheck.email);
      console.log('   - Role:', adminCheck.role);
      console.log('   - Created:', adminCheck.createdAt);
    }
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    throw error;
  }
}

createOrUpdateAdmin()
  .catch((e) => {
    console.error('❌ Script failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });