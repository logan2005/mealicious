import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')

    let whereClause: any = {}
    
    if (category) {
      whereClause.category = { equals: category, mode: 'insensitive' }
    }
    
    if (featured === 'true') {
      whereClause.featured = true
    }

    const products = await db.product.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, price, category, imageUrl, images, ingredients, nutrition, featured } = body

    // Validate required fields
    if (!name || !description || !price || !category || !imageUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const product = await db.product.create({
      data: {
        name,
        description,
        price: price ? parseFloat(price) : 0,
        category,
        imageUrl,
        images: images || [],
        ingredients: ingredients || [],
        nutrition: nutrition || {},
        featured: featured || false
      }
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}