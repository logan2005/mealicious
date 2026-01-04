import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { db } from '@/lib/db'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { quantity } = await request.json()

    if (!quantity || quantity < 1) {
      return NextResponse.json(
        { error: 'Quantity must be at least 1' },
        { status: 400 }
      )
    }

    // Check if cart item exists and belongs to user
    const existingCartItem = await db.cartItem.findUnique({
      where: { id: params.id }
    })

    if (!existingCartItem || existingCartItem.userId !== user.userId) {
      return NextResponse.json(
        { error: 'Cart item not found' },
        { status: 404 }
      )
    }

    const cartItem = await db.cartItem.update({
      where: { id: params.id },
      data: { quantity },
      include: {
        product: true
      }
    })

    return NextResponse.json(cartItem)
  } catch (error) {
    console.error('Error updating cart item:', error)
    return NextResponse.json(
      { error: 'Failed to update cart item' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if cart item exists and belongs to user
    const existingCartItem = await db.cartItem.findUnique({
      where: { id: params.id }
    })

    if (!existingCartItem || existingCartItem.userId !== user.userId) {
      return NextResponse.json(
        { error: 'Cart item not found' },
        { status: 404 }
      )
    }

    await db.cartItem.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Cart item removed successfully' })
  } catch (error) {
    console.error('Error deleting cart item:', error)
    return NextResponse.json(
      { error: 'Failed to delete cart item' },
      { status: 500 }
    )
  }
}