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
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [combos, total] = await Promise.all([
      db.combo.findMany({
        where: whereClause,
        include: {
          items: {
            include: {
              product: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      db.combo.count({ where: whereClause })
    ])

    return NextResponse.json({
      combos,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching admin combos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch combos' },
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
    const { name, description, price, imageUrl, discount, featured, inStock, items } = body

    if (!name || !description || typeof price !== 'number' || isNaN(price) || !imageUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'At least one product must be included in the combo' },
        { status: 400 }
      )
    }

    const combo = await db.combo.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        imageUrl,
        discount: parseFloat(discount) || 0,
        featured: featured || false,
        inStock: inStock !== undefined ? inStock : true,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: parseInt(item.quantity)
          }))
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    return NextResponse.json(combo, { status: 201 })
  } catch (error) {
    console.error('Error creating combo:', error)
    return NextResponse.json(
      { error: 'Failed to create combo' },
      { status: 500 }
    )
  }
}