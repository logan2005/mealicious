import Link from 'next/link'
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex justify-center mb-6">
              <img 
                src="https://res.cloudinary.com/dkjvfskhn/image/upload/v1767525819/mealicious_pnxrai.jpg" 
                alt="Mealicious Logo" 
                className="h-12 w-auto rounded-lg mb-4" 
              />
            </div>
            <h3 className="text-xl font-bold mb-2">Mealicious</h3>
            <p className="text-gray-300 text-sm">
              Premium quality flavoured cashews, dry fruits, and snacks from Salem.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  Products
                </Link>
              </li>

              <li>
                <Link href="/about" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300 text-sm">
                  Salem, Tamil Nadu
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300 text-sm">
                  info@mealicious.in
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300 text-sm">
                  +91 99999 88888
                </span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 MEALICIOUS VENTURES PRIVATE LIMITED. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}