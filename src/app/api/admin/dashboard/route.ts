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

    // Get dashboard statistics
    const [
      totalProducts,
      totalCustomers,
      totalOrders,
      totalRecipes,
      recentOrders,
      lowStockProducts
    ] = await Promise.all([
      // Total products
      db.product.count(),
      
      // Total customers
      db.user.count(),
      
      // Total orders
      db.order.count(),
      
      // Total recipes
      db.recipe.count(),
      
      // Recent orders (last 10)
      db.order.findMany({
        include: {
          user: {
            select: {
              name: true,
              email: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 10
      }),
      
      // Low stock products (inStock: false)
      db.product.findMany({
        where: {
          inStock: false
        },
        take: 10
      })
    ])

    return NextResponse.json({
      totalProducts,
      totalRecipes,
      totalOrders,
      totalUsers: totalCustomers,
      recentOrders,
      lowStockProducts
    })
  } catch (error) {
    console.error('Error fetching admin dashboard:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}