'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, User, Menu, X, Heart } from 'lucide-react'
import { useCart } from '@/contexts/cart-context'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setUserName(JSON.parse(user).name)
    }
  }, [])
  
  // Use the cart context with proper error handling
  const cart = useCart()
  const cartCount = cart?.cartCount || 0

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img src="https://res.cloudinary.com/dkjvfskhn/image/upload/v1767525819/mealicious_pnxrai.jpg" alt="Mealicious Logo" className="h-16 w-auto rounded-lg" />
          </Link>

          {/* Desktop Navigation */}
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
              About Us
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
            >
              Contact
            </Link>
            <Link 
              href="/cart" 
              className="text-gray-700 hover:text-[orange-600] transition-colours font-medium relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {!cart.isLoading && cartCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartCount > 99 ? '99+' : cartCount}
                </Badge>
              )}
            </Link>
            <Link 
              href="/dashboard" 
              className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
            >
              {userName ? (
              <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center text-sm font-bold">
                  {userName.charAt(0).toUpperCase()}
                </div>
              ) : (
                <User className="w-5 h-5" />
              )}
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                href="/cart" 
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium py-2 flex items-center space-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Cart</span>
                {!cart.isLoading && cartCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cartCount > 99 ? '99+' : cartCount}
                  </Badge>
                )}
              </Link>
              <Link 
                href="/dashboard" 
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}