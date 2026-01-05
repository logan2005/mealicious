#!/usr/bin/env node

// Netlify-compatible database seeder
// This script runs during the build process to seed the database

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';

// Determine database path based on environment
const isNetlify = process.env.NETLIFY === 'true' || process.env.NETLIFY_BUILD === 'true';
const dbPath = isNetlify ? '/tmp/custom.db' : path.join(process.cwd(), 'db', 'custom.db');

// Create Prisma client with dynamic URL
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${dbPath}`
    }
  },
  log: ['query']
});

async function main() {
  console.log('🌱 Starting database seeding...');
  console.log(`📁 Database path: ${dbPath}`);
  console.log(`🌍 Environment: ${isNetlify ? 'Netlify' : 'Local'}`);

  try {
    // Ensure db directory exists (only for local)
    if (!isNetlify) {
      const dbDir = path.dirname(dbPath);
      if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
        console.log(`📁 Created database directory: ${dbDir}`);
      }
    }

    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Database connection successful');

    // Create admin user
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
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
        name: 'Spicy Millet Puffs',
        description: 'Crunchy and flavorful millet puffs with a perfect blend of spices. A healthy snack that packs a punch!',
        price: 89.99,
        category: 'Spicy',
        imageUrl: 'https://images.unsplash.com/photo-1596560444510-d32351a1c557?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: [],
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
        name: 'Chocolate Millet Crunch',
        description: 'Delicious chocolate-coated millet crunch that satisfies your sweet tooth while being nutritious.',
        price: 129.99,
        category: 'Sweet',
        imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: [],
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
        name: 'Tangy Tomato Millet Sticks',
        description: 'Zesty tomato-flavored millet sticks that are perfect for snacking on the go.',
        price: 79.99,
        category: 'Savory',
        imageUrl: 'https://images.unsplash.com/photo-1586201375761-ab8a006b7a85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: [],
        ingredients: JSON.stringify(['Millet', 'Tomato Powder', 'Herbs', 'Spices', 'Salt']),
        nutrition: JSON.stringify({
          calories: 110,
          protein: '2g',
          carbs: '22g',
          fat: '1.5g',
          fiber: '2g'
        }),
        featured: true
      }
    ];

    for (const product of products) {
      await prisma.product.upsert({
        where: { name: product.name },
        update: {},
        create: product
      });
    }
    console.log('📦 Created sample products');

    // Create a sample combo
    const combo = await prisma.combo.upsert({
      where: { name: 'Ultimate Snack Pack' },
      update: {},
      create: {
        name: 'Ultimate Snack Pack',
        description: 'A perfect combination of our best-selling millet snacks for the ultimate snacking experience.',
        price: 299.99,
        imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        discount: 10,
        featured: true,
        inStock: true
      }
    });
    console.log('🎁 Created sample combo');

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