import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const orders = await db.order.findMany({
      where: { userId: user.userId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { address, phone } = await request.json()

    if (!address || !phone) {
      return NextResponse.json(
        { error: 'Address and phone are required' },
        { status: 400 }
      )
    }

    // Get user's cart items
    const cartItems = await db.cartItem.findMany({
      where: { userId: user.userId },
      include: {
        product: true
      }
    })

    if (cartItems.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      )
    }

    // Calculate total
    const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    const tax = subtotal * 0.05 // 5% tax
    const shipping = 0 // Shipping temporarily disabled for testing
    const total = subtotal + tax + shipping

    // Create order
    const order = await db.order.create({
      data: {
        userId: user.userId,
        total,
        address,
        phone,
        items: {
          create: cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price
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

    // Clear cart
    await db.cartItem.deleteMany({
      where: { userId: user.userId }
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}