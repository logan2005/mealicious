import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { db } from '@/lib/db'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser(request)
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params
    const { status } = await request.json()

    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 })
    }

    const updatedOrder = await db.order.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json(updatedOrder)
  } catch (error) {
    console.error('Error updating order status:', error)
    return NextResponse.json({ error: 'Failed to update order status' }, { status: 500 })
  }
}