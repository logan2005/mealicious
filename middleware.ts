import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export function middleware(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '')
  const { pathname } = request.nextUrl

// Define user and admin paths
  const userProtectedPaths = ['/profile', '/orders', '/api/payment-verification', '/api/upload-image']
  const adminProtectedPaths = ['/api/admin']  // Remove /admin page, let client handle it
  const adminExcludedPaths = ['/api/admin/login', '/api/admin/dashboard']

  // Check if the current path is a user protected path
  const isUserProtectedPath = userProtectedPaths.some(path => pathname.startsWith(path))

  // Check if the current path is an admin protected path
  const isAdminProtectedPath = adminProtectedPaths.some(path => pathname.startsWith(path))

  // Check if the current path is an admin excluded path (login should not be protected)
  const isAdminExcludedPath = adminExcludedPaths.some(path => pathname.startsWith(path))

// Handle user protected paths
  if (isUserProtectedPath) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('user-id', decoded.userId)
      requestHeaders.set('user-email', decoded.email)
      return NextResponse.next({ request: { headers: requestHeaders } })
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Handle admin protected paths (excluding login routes)
  if (isAdminProtectedPath && !isAdminExcludedPath) {
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
