import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface DecodedToken {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export async function verifyToken(token: string): Promise<DecodedToken | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function getTokenFromRequest(req: NextRequest): Promise<string | null> {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.replace('Bearer ', '');
}

export async function getCurrentUser(req: NextRequest): Promise<DecodedToken | null> {
  const token = await getTokenFromRequest(req);
  if (!token) {
    return null;
  }
  return await verifyToken(token);
}