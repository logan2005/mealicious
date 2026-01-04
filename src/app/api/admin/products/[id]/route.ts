import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
    const { id } = await context.params;
  try {
    const product = await db.product.findUnique({
      where: { id: id }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
    const { id } = await context.params;
  try {
    const user = await getCurrentUser(request)
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, description, price, category, imageUrl, images, ingredients, nutrition, featured, inStock } = body

    if (!name || !description || typeof price !== 'number' || isNaN(price) || !category || !imageUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const product = await db.product.update({
      where: { id: id },
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        imageUrl,
        images: images || [],
        ingredients: ingredients || [],
        nutrition: nutrition || {},
        featured: featured || false,
        inStock: inStock !== undefined ? inStock : true
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
    const { id } = await context.params;
  try {
    const user = await getCurrentUser(request)
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await db.product.delete({
      where: { id: id }
    })

    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}