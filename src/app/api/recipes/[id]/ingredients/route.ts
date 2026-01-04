import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ingredients = await db.recipeIngredient.findMany({
      where: { recipeId: params.id },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            imageUrl: true
          }
        }
      }
    })

    return NextResponse.json(ingredients)
  } catch (error) {
    console.error('Error fetching recipe ingredients:', error)
    return NextResponse.json(
      { error: 'Failed to fetch recipe ingredients' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { productId, quantity, notes } = body

    if (!productId || !quantity) {
      return NextResponse.json(
        { error: 'Product ID and quantity are required' },
        { status: 400 }
      )
    }

    // Check if product exists
    const product = await db.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Check if recipe exists
    const recipe = await db.recipe.findUnique({
      where: { id: params.id }
    })

    if (!recipe) {
      return NextResponse.json(
        { error: 'Recipe not found' },
        { status: 404 }
      )
    }

    const ingredient = await db.recipeIngredient.create({
      data: {
        recipeId: params.id,
        productId,
        quantity,
        notes
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            imageUrl: true
          }
        }
      }
    })

    return NextResponse.json(ingredient, { status: 201 })
  } catch (error) {
    console.error('Error creating recipe ingredient:', error)
    return NextResponse.json(
      { error: 'Failed to create recipe ingredient' },
      { status: 500 }
    )
  }
}