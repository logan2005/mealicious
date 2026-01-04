import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ hasPurchased: false }, { status: 200 });
    }

    const { id: productId } = params;

    const hasPurchased = await db.order.findFirst({
      where: {
        userId: user.userId,
        status: 'DELIVERED', // Only consider delivered orders
        items: {
          some: { productId: productId },
        },
      },
    });

    return NextResponse.json({ hasPurchased: !!hasPurchased });
  } catch (error) {
    console.error('Error checking purchase history:', error);
    return NextResponse.json({ hasPurchased: false }, { status: 500 });
  }
}
