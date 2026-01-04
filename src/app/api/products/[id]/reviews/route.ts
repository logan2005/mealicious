import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id: productId } = params;

    const reviews = await db.review.findMany({
      where: { productId },
      include: {
        user: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: productId } = params;
    const { rating, comment } = await request.json();

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
    }

    // Check if the user has purchased this product
    const hasPurchased = await db.order.findFirst({
      where: {
        userId: user.userId,
        status: 'DELIVERED', // Only allow reviews for delivered orders
        items: {
          some: { productId: productId },
        },
      },
    });

    if (!hasPurchased) {
      return NextResponse.json({ error: 'You can only review products you have purchased and received.' }, { status: 403 });
    }

    // Check if the user has already reviewed this product
    const existingReview = await db.review.findUnique({
      where: {
        userId_productId: {
          userId: user.userId,
          productId: productId,
        },
      },
    });

    if (existingReview) {
      return NextResponse.json({ error: 'You have already reviewed this product.' }, { status: 409 });
    }

    const review = await db.review.create({
      data: {
        userId: user.userId,
        productId,
        rating,
        comment,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error('Error posting review:', error);
    return NextResponse.json({ error: 'Failed to post review' }, { status: 500 });
  }
}
