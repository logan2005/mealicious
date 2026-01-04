import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''

    const skip = (page - 1) * limit

    let whereClause: any = {}
    
    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [recipes, total] = await Promise.all([
      db.recipe.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      db.recipe.count({ where: whereClause })
    ])

    return NextResponse.json({
      recipes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching admin recipes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch recipes' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, description, instructions, imageUrl, prepTime, cookTime, servings, difficulty, ingredients } = body

    if (!title || !description || !instructions || !imageUrl || !prepTime || !cookTime || !servings || !difficulty) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const recipe = await db.recipe.create({
      data: {
        title,
        description,
        instructions,
        imageUrl,
        prepTime: parseInt(prepTime),
        cookTime: parseInt(cookTime),
        servings: parseInt(servings),
        difficulty
      }
    })

    // Add recipe ingredients if provided
    if (ingredients && ingredients.length > 0) {
      await db.recipeIngredient.createMany({
        data: ingredients.map((ing: any) => ({
          recipeId: recipe.id,
          productId: ing.productId,
          quantity: ing.quantity,
          notes: ing.notes || null
        }))
      })
    }

    return NextResponse.json(recipe, { status: 201 })
  } catch (error) {
    console.error('Error creating recipe:', error)
    return NextResponse.json(
      { error: 'Failed to create recipe' },
      { status: 500 }
    )
  }
}