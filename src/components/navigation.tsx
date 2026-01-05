'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Menu, X, User } from 'lucide-react'
import { useCart } from '@/contexts/cart-context'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cartCount } = useCart()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img 
              src="https://res.cloudinary.com/dkjvfskhn/image/upload/v1767525819/mealicious_pnxrai.jpg" 
              alt="Mealicious Logo" 
              className="h-10 w-auto rounded-lg" 
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
            >
              Products
            </Link>

            <Link 
              href="/about" 
              className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
            >
              About
            </Link>
          </div>

          {/* Cart & Account */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="text-gray-700 hover:text-orange-600 transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
            
            <Link href="/dashboard" className="text-gray-700 hover:text-orange-600 transition-colors">
              <User className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="text-gray-700 hover:text-orange-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-4 py-2 space-y-2">
              <Link 
                href="/" 
                className="block py-2 text-gray-700 hover:text-orange-600 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className="block py-2 text-gray-700 hover:text-orange-600 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>

              <Link 
                href="/about" 
                className="block py-2 text-gray-700 hover:text-orange-600 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/dashboard" 
                className="block py-2 text-gray-700 hover:text-orange-600 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Account
              </Link>
              <Link 
                href="/cart" 
                className="block py-2 text-gray-700 hover:text-orange-600 transition-colors font-medium relative"
                onClick={() => setIsMenuOpen(false)}
              >
                Cart
              </Link>
            </div>
          </div>
        )}
      </nav>
  )
}