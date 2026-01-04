import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const combos = await db.combo.findMany({
      where: {
        inStock: true,
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(combos)
  } catch (error) {
    console.error('Error fetching combos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch combos' },
      { status: 500 }
    )
  }
}
