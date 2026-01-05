import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query'] : ['error'],
});

async function main() {
  console.log('🌱 Starting database seeding...');

  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Database connection successful');

    // Create admin user
    const adminPassword = process.env.ADMIN_PASSWORD || 'tgf_admin_2025!';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    await prisma.user.upsert({
      where: { email: 'admin@mealicious.in' },
      update: {},
      create: {
        email: 'admin@mealicious.in',
        name: 'Admin',
        password: hashedPassword,
        role: 'ADMIN'
      }
    });
    console.log('👤 Created/updated admin user');

    // Create sample products
    const products = [
      {
        id: 'spicy-millet-puffs-001',
        name: 'Spicy Millet Puffs',
        description: 'Crunchy and flavorful millet puffs with a perfect blend of spices. A healthy snack that packs a punch!',
        price: 89.99,
        category: 'Spicy',
        imageUrl: 'https://images.unsplash.com/photo-1596560444510-d32351a1c557?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: ['https://images.unsplash.com/photo-1596560444510-d32351a1c557?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        ingredients: JSON.stringify(['Millet', 'Rice Flour', 'Spices', 'Salt', 'Edible Oil']),
        nutrition: JSON.stringify({
          calories: 120,
          protein: '3g',
          carbs: '25g',
          fat: '1g',
          fiber: '2g'
        }),
        featured: true
      },
      {
        id: 'chocolate-millet-crunch-001',
        name: 'Chocolate Millet Crunch',
        description: 'Delicious chocolate-coated millet crunch that satisfies your sweet tooth while being nutritious.',
        price: 129.99,
        category: 'Sweet',
        imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: ['https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        ingredients: JSON.stringify(['Millet', 'Dark Chocolate', 'Honey', 'Nuts']),
        nutrition: JSON.stringify({
          calories: 180,
          protein: '4g',
          carbs: '30g',
          fat: '6g',
          fiber: '3g'
        }),
        featured: true
      },
      {
        id: 'tangy-tomato-sticks-001',
        name: 'Tangy Tomato Millet Sticks',
        description: 'Zesty tomato-flavored millet sticks that are perfect for snacking on the go.',
        price: 79.99,
        category: 'Savory',
        imageUrl: 'https://images.unsplash.com/photo-1586201375761-ab8a006b7a85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: ['https://images.unsplash.com/photo-1586201375761-ab8a006b7a85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        ingredients: JSON.stringify(['Millet', 'Tomato Powder', 'Herbs', 'Spices', 'Salt']),
        nutrition: JSON.stringify({
          calories: 110,
          protein: '2g',
          carbs: '22g',
          fat: '1.5g',
          fiber: '2g'
        }),
        featured: true
      },
      {
        id: 'cheesy-millet-bites-001',
        name: 'Cheesy Millet Bites',
        description: 'Irresistible cheese-flavored millet bites that are perfect for sharing with friends and family.',
        price: 99.99,
        category: 'Savory',
        imageUrl: 'https://images.unsplash.com/photo-1586238259078-23d6850b8789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: ['https://images.unsplash.com/photo-1586238259078-23d6850b8789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        ingredients: JSON.stringify(['Millet', 'Cheese Powder', 'Herbs', 'Salt']),
        nutrition: JSON.stringify({
          calories: 140,
          protein: '4g',
          carbs: '24g',
          fat: '4g',
          fiber: '2g'
        }),
        featured: false
      },
      {
        id: 'honey-nut-clusters-001',
        name: 'Honey Nut Millet Clusters',
        description: 'Sweet and crunchy clusters made with millet, nuts, and a touch of honey.',
        price: 149.99,
        category: 'Sweet',
        imageUrl: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: ['https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        ingredients: JSON.stringify(['Millet', 'Almonds', 'Cashews', 'Honey', 'Vanilla']),
        nutrition: JSON.stringify({
          calories: 200,
          protein: '6g',
          carbs: '28g',
          fat: '8g',
          fiber: '4g'
        }),
        featured: false
      },
      {
        id: 'green-chili-chips-001',
        name: 'Green Chili Millet Chips',
        description: 'Spicy green chili flavored millet chips with a satisfying crunch and authentic Indian spices.',
        price: 89.99,
        category: 'Spicy',
        imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: ['https://images.unsplash.com/photo-1566478989037-eec170784d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        ingredients: JSON.stringify(['Millet', 'Green Chili', 'Spices', 'Salt', 'Edible Oil']),
        nutrition: JSON.stringify({
          calories: 130,
          protein: '3g',
          carbs: '26g',
          fat: '2g',
          fiber: '2g'
        }),
        featured: false
      }
    ];

    for (const product of products) {
      await prisma.product.upsert({
        where: { id: product.id },
        update: {},
        create: product
      });
    }
    console.log('📦 Created sample products');

    // Create sample combos
    const combos = [
      {
        id: 'ultimate-snack-pack-001',
        name: 'Ultimate Snack Pack',
        description: 'A perfect combination of our best-selling millet snacks for the ultimate snacking experience.',
        price: 299.99,
        imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        discount: 10,
        featured: true,
        inStock: true
      },
      {
        id: 'sweet-treat-combo-001',
        name: 'Sweet Treat Combo',
        description: 'Indulge in our delicious sweet snacks with this perfect combination of chocolate and honey nut clusters.',
        price: 249.99,
        imageUrl: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        discount: 5,
        featured: true,
        inStock: true
      }
    ];

    for (const combo of combos) {
      await prisma.combo.upsert({
        where: { id: combo.id },
        update: {},
        create: combo
      });
    }
    console.log('🎁 Created sample combos');

    console.log('✅ Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Seeding script failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });