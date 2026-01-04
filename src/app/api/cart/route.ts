import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const cartItems = await db.cartItem.findMany({
      where: { userId: user.userId },
      include: {
        product: true
      }
    })

    return NextResponse.json(cartItems)
  } catch (error) {
    console.error('Error fetching cart:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)

    const { productId, quantity, guestCart } = await request.json()

    // Logic to merge guest cart (only if user is logged in)
    if (guestCart && Array.isArray(guestCart)) {
      console.log('Merging guest cart on server');
      if (!user) {
        // This case should ideally not be hit if the frontend manages this properly
        console.log('User not logged in, cannot merge cart');
        return NextResponse.json({ message: 'Guest cart received, but login required to merge' }, { status: 401 });
      }
      await db.$transaction(async (tx) => {
        for (const item of guestCart) {
          console.log('Merging item:', item);
          const existingCartItem = await tx.cartItem.findUnique({
            where: { userId_productId: { userId: user.userId, productId: item.productId } },
          });

          if (existingCartItem) {
            console.log('Item exists, updating quantity');
            await tx.cartItem.update({
              where: { id: existingCartItem.id },
              data: { quantity: existingCartItem.quantity + item.quantity },
            });
          } else {
            console.log('Item does not exist, creating new item');
            await tx.cartItem.create({
              data: {
                userId: user.userId,
                productId: item.productId,
                quantity: item.quantity,
              },
            });
          }
        }
      });
      console.log('Guest cart merged successfully on server');
      return NextResponse.json({ message: 'Cart merged successfully' });
    }

    // Logic to add a single item (requires user to be logged in)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!productId || !quantity) {
      return NextResponse.json({ error: 'Product ID and quantity are required' }, { status: 400 })
    }

    const existingCartItem = await db.cartItem.findUnique({
      where: { userId_productId: { userId: user.userId, productId: productId } },
    })

    let cartItem
    if (existingCartItem) {
      cartItem = await db.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
        include: { product: true },
      })
    } else {
      cartItem = await db.cartItem.create({
        data: { userId: user.userId, productId, quantity },
        include: { product: true },
      })
    }

    return NextResponse.json(cartItem)
  } catch (error) {
    console.error('Error in POST /api/cart:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to process cart request', details: error.message, stack: error.stack }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to process cart request', details: 'An unknown error occurred' }, { status: 500 });
  }
}