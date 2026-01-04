import Link from 'next/link'
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center justify-center mb-4">
              <img src="https://res.cloudinary.com/dkjvfskhn/image/upload/v1767525819/mealicious_pnxrai.jpg" alt="Mealicious Logo" className="h-16 w-auto rounded-lg" />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Premium quality flavoured cashews, mixed dry fruits, and innovative snacks from Salem. Quality you can trust, taste you will love.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colours">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colours">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colours">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colours">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/"                 className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products"                 className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about"                 className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/about"                 className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact"                 className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq"                 className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping"                 className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy"                 className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms"                 className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/support"                 className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">
                  1/108, Elappankadu, Malankadu, Puthur Line, Uthamasolapuram, Salem, Tamil Nadu – 636010
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">
                  +91 99999 88888
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">
                  info@mealicious.in
                </span>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Subscribe to Our Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-orange-600 text-white rounded-r-md hover:bg-orange-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
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
              <Link href="/cookies" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}