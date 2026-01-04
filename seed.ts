import { db } from './src/lib/db'
import bcrypt from 'bcryptjs'

async function main() {
  // Create a default admin user
  const hashedPassword = await bcrypt.hash('tgf_admin_2025!', 10)
  await db.user.upsert({
    where: { email: 'admin@mealicious.in' },
    update: {},
    create: {
      email: 'admin@mealicious.in',
      name: 'Admin',
      password: hashedPassword,
      role: 'ADMIN'
    }
  })

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
    },
    {
      name: 'Cheesy Millet Bites',
      description: 'Irresistible cheese-flavored millet bites that are perfect for sharing with friends and family.',
      price: 99.99,
      category: 'Savory',
      imageUrl: 'https://images.unsplash.com/photo-1586238259078-23d6850b8789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      images: [],
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
      name: 'Honey Nut Millet Clusters',
      description: 'Sweet and crunchy clusters made with millet, nuts, and a touch of honey.',
      price: 149.99,
      category: 'Sweet',
      imageUrl: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      images: [],
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
      name: 'Green Chili Millet Chips',
      description: 'Spicy green chili flavored millet chips with a satisfying crunch and authentic Indian spices.',
      price: 89.99,
      category: 'Spicy',
      imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      images: [],
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
  ]

  const createdProducts = []
  for (const product of products) {
    const createdProduct = await db.product.create({
      data: product
    })
    createdProducts.push(createdProduct)
  }

  // Create sample recipes
  const recipes = [
    {
      title: 'Millet Chaat Party Mix',
      description: 'A delicious and healthy chaat recipe using Mealicious flavoured cashews and mixed dry fruits, perfect for parties and gatherings.',
      instructions: JSON.stringify([
        'Take 2 cups of Spicy Millet Puffs and 1 cup of Tangy Tomato Millet Sticks in a large bowl.',
        'Add finely chopped onions, tomatoes, and coriander leaves.',
        'Sprinkle chaat masala, red chili powder, and salt to taste.',
        'Add 2 tablespoons of tamarind chutney and 1 tablespoon of mint chutney.',
        'Mix well and garnish with sev and fresh coriander.',
        'Serve immediately as a crispy, flavorful snack.'
      ]),
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      prepTime: 15,
      cookTime: 0,
      servings: 4,
      difficulty: 'Easy'
    },
    {
      title: 'Chocolate Millet Parfait',
      description: 'A decadent and healthy dessert parfait layered with Chocolate Millet Crunch, yogurt, and fresh fruits.',
      instructions: JSON.stringify([
        'Take 1 cup of Greek yogurt and sweeten with honey to taste.',
        'Crush 1 cup of Chocolate Millet Crunch into small pieces.',
        'Layer the parfait: start with yogurt at the bottom, add crushed millet crunch, then fresh berries.',
        'Repeat the layers until the glass is full.',
        'Top with a dollop of yogurt and garnish with mint leaves.',
        'Chill for 30 minutes before serving for best results.'
      ]),
      imageUrl: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      prepTime: 20,
      cookTime: 0,
      servings: 2,
      difficulty: 'Easy'
    },
    {
      title: 'Millet Energy Bites',
      description: 'Nutritious energy bites made with Honey Nut Millet Clusters, perfect for a quick breakfast or snack.',
      instructions: JSON.stringify([
        'Crush 2 cups of Honey Nut Millet Clusters into a coarse powder.',
        'Mix with 1 cup of dates paste, 2 tablespoons of nut butter, and 1 tablespoon of chia seeds.',
        'Add 1/4 cup of chopped nuts and seeds of your choice.',
        'Roll the mixture into small bite-sized balls.',
        'Refrigerate for at least 1 hour to set.',
        'Store in an airtight container for up to a week.'
      ]),
      imageUrl: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      prepTime: 25,
      cookTime: 0,
      servings: 12,
      difficulty: 'Medium'
    }
  ]

  const createdRecipes = []
  for (const recipe of recipes) {
    const createdRecipe = await db.recipe.create({
      data: recipe
    })
    createdRecipes.push(createdRecipe)
  }

  // Create recipe ingredients
  const recipeIngredients = [
    // Millet Chaat Party Mix ingredients
    {
      recipeId: createdRecipes[0].id,
      productId: createdProducts[0].id, // Spicy Millet Puffs
      quantity: '2 cups',
      notes: 'Main ingredient for crunch'
    },
    {
      recipeId: createdRecipes[0].id,
      productId: createdProducts[2].id, // Tangy Tomato Millet Sticks
      quantity: '1 cup',
      notes: 'For tangy flavor'
    },
    
    // Chocolate Millet Parfait ingredients
    {
      recipeId: createdRecipes[1].id,
      productId: createdProducts[1].id, // Chocolate Millet Crunch
      quantity: '1 cup',
      notes: 'Crushed for layering'
    },
    
    // Millet Energy Bites ingredients
    {
      recipeId: createdRecipes[2].id,
      productId: createdProducts[4].id, // Honey Nut Millet Clusters
      quantity: '2 cups',
      notes: 'Crushed into coarse powder'
    }
  ]

  for (const ingredient of recipeIngredients) {
    await db.recipeIngredient.create({
      data: ingredient
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })