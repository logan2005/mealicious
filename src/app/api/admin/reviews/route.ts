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
    const productId = searchParams.get('productId') || ''

    const skip = (page - 1) * limit

    let whereClause: any = {}
    
    if (search) {
      whereClause.OR = [
        { comment: { contains: search, mode: 'insensitive' } },
        { user: { name: { contains: search, mode: 'insensitive' } } },
        { product: { name: { contains: search, mode: 'insensitive' } } }
      ]
    }

    if (productId) {
      whereClause.productId = productId
    }

    const [reviews, total] = await Promise.all([
      db.review.findMany({
        where: whereClause,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          product: {
            select: {
              id: true,
              name: true,
              imageUrl: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      db.review.count({ where: whereClause })
    ])

    console.log('Reviews before filtering:', reviews);
    const filteredReviews = reviews.filter(review => review.product);
    console.log('Reviews after filtering:', filteredReviews);

    return NextResponse.json({
      reviews: filteredReviews,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching admin reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}