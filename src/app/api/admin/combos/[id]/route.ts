import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser(request)
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params

    if (!id) {
      return NextResponse.json({ error: 'Combo ID is required' }, { status: 400 })
    }

    const combo = await db.combo.findUnique({
      where: {
        id: id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    if (!combo) {
      return NextResponse.json({ error: 'Combo not found' }, { status: 404 })
    }

    return NextResponse.json(combo, { status: 200 })
  } catch (error) {
    console.error('Error fetching combo:', error)
    return NextResponse.json(
      { error: 'Failed to fetch combo' },
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
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params

    if (!id) {
      return NextResponse.json({ error: 'Combo ID is required' }, { status: 400 })
    }

    // First, delete all ComboItem records associated with the combo
    await db.comboItem.deleteMany({
      where: {
        comboId: id,
      },
    });

    // Then, delete the combo itself
    await db.combo.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ message: 'Combo deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting combo:', error)
    return NextResponse.json(
      { error: 'Failed to delete combo' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser(request)
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params
    const body = await request.json()
    const { name, description, price, imageUrl, discount, featured, inStock, items } = body

    if (!id) {
      return NextResponse.json({ error: 'Combo ID is required' }, { status: 400 })
    }

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

    // First, delete existing combo items
    await db.comboItem.deleteMany({
      where: {
        comboId: id,
      },
    })

    // Then, create new combo items
    const updatedCombo = await db.combo.update({
      where: {
        id: id,
      },
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
            quantity: parseInt(item.quantity),
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    return NextResponse.json(updatedCombo, { status: 200 })
  } catch (error) {
    console.error('Error updating combo:', error)
    return NextResponse.json(
      { error: 'Failed to update combo' },
      { status: 500 }
    )
  }
}
