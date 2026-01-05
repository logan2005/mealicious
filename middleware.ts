import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export function middleware(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '')
  const { pathname } = request.nextUrl

  // Define paths that need NO authentication (all admin APIs handle their own auth)
  const publicPaths = [
    '/api/admin/login',
    '/api/admin/clear-db',
    '/api/admin/dashboard',
    '/api/admin/products',
    '/api/admin/combos',
    '/api/admin/orders',
    '/api/admin/customers',
    '/api/admin/reviews'
  ]

  // Define user protected paths (require user authentication)
  const userProtectedPaths = ['/profile', '/orders', '/api/payment-verification', '/api/upload-image']

  // Define admin page paths that should redirect to login (NOT API routes)
  const adminPagePaths = ['/admin']

  // For API requests, return JSON errors instead of redirects
  const isApiRequest = pathname.startsWith('/api/')

  // Check if current path is public (no auth needed)
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path))

  // Check if current path is a user protected path
  const isUserProtectedPath = userProtectedPaths.some(path => pathname.startsWith(path))

  // Check if current path is an admin page (not API)
  const isAdminPagePath = adminPagePaths.some(path => pathname.startsWith(path))

  // Skip authentication for public paths
  if (isPublicPath) {
    return NextResponse.next()
  }

  // Handle user protected paths
  if (isUserProtectedPath) {
    if (!token) {
      if (isApiRequest) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      return NextResponse.redirect(new URL('/login', request.url))
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('user-id', decoded.userId)
      requestHeaders.set('user-email', decoded.email)
      return NextResponse.next({ request: { headers: requestHeaders } })
    } catch (error) {
      if (isApiRequest) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Handle admin page paths (redirect to login)
  if (isAdminPagePath) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any
      if (decoded.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('user-id', decoded.userId)
      requestHeaders.set('user-email', decoded.email)
      return NextResponse.next({ request: { headers: requestHeaders } })
    } catch (error) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}