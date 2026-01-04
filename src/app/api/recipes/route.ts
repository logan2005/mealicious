import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const difficulty = searchParams.get('difficulty')

    let whereClause: any = {}
    
    if (difficulty) {
      whereClause.difficulty = difficulty
    }

    const recipes = await db.recipe.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(recipes)
  } catch (error) {
    console.error('Error fetching recipes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch recipes' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, instructions, imageUrl, prepTime, cookTime, servings, difficulty } = body

    // Validate required fields
    if (!title || !description || !instructions || !imageUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const recipe = await db.recipe.create({
      data: {
        title,
        description,
        instructions: instructions || [],
        imageUrl,
        prepTime: prepTime ? parseInt(prepTime) : null,
        cookTime: cookTime ? parseInt(cookTime) : null,
        servings: servings ? parseInt(servings) : null,
        difficulty
      }
    })

    return NextResponse.json(recipe, { status: 201 })
  } catch (error) {
    console.error('Error creating recipe:', error)
    return NextResponse.json(
      { error: 'Failed to create recipe' },
      { status: 500 }
    )
  }
}