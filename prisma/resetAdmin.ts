
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // --- DANGER: This will delete all existing admin users ---
  await prisma.user.deleteMany({
    where: {
      role: Role.ADMIN,
    },
  });
  console.log('Deleted old admin users.');

  // --- Create a new admin user ---
  const email = 'admin@tgf.com'; // <-- IMPORTANT: Change this to your desired admin email
  const password = 'tgf_admin_2025!'; // <-- IMPORTANT: Change this to a strong password

  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: Role.ADMIN,
      name: 'Admin User', // Optional: you can change this
    },
  });

  console.log('Created new admin user:');
  console.log(newAdmin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
