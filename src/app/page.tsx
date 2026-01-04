'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Star, Heart, Leaf, Utensils, Truck, Sparkles, ChefHat, Eye } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/contexts/cart-context'

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl: string
  featured: boolean
  type: 'product'
}

interface Combo {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  discount: number
  featured: boolean
  items: any[]
  type: 'combo'
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [featuredItems, setFeaturedItems] = useState<(Product | Combo)[]>([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const [productsRes, combosRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/combos')
      ]);

      if (productsRes.ok && combosRes.ok) {
        const productsData = await productsRes.json();
        const combosData = await combosRes.json();

        const featuredProducts = productsData.filter((p: any) => p.featured).map((p: any) => ({ ...p, type: 'product' }));
        const featuredCombos = combosData.filter((c: any) => c.featured).map((c: any) => ({ ...c, type: 'combo' }));

        setProducts(productsData);
        setFeaturedItems([...featuredProducts, ...featuredCombos]);
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100">
        <div className="text-center">
          {/* Animated Logo Spinner */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full animate-ping opacity-20"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  M
                </div>
              </div>
            </div>
            {/* Rotating ring */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 border-r-orange-600 animate-spin"></div>
          </div>
          
          {/* Animated Text */}
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent animate-pulse">
              MEALICIOUS
            </h1>
            <p className="text-gray-600 text-lg animate-pulse">Loading delicious experiences...</p>
          </div>
          
          {/* Animated dots */}
          <div className="flex justify-center space-x-1 mt-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] bg-gradient-to-br from-orange-400 via-orange-300 to-amber-200 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-32 right-10 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-32 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-grid-white/20"></div>
        
        <div className="relative z-10 flex items-center justify-center min-h-[70vh] px-4">
          <div className="text-center max-w-5xl">
            <div className="space-y-8">
              {/* Animated Logo */}
              <div className="flex items-center justify-center mb-8 group">
                <div className="w-20 h-20 bg-gradient-to-br from-white to-orange-100 rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-300">
                  <ChefHat className="w-10 h-10 text-orange-600 group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              {/* Main Heading with Gradient */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-orange-50 to-orange-100 bg-clip-text text-transparent drop-shadow-lg">
                  Discover Premium
                </span>
                <br />
                <span className="bg-gradient-to-r from-orange-600 to-amber-700 bg-clip-text text-transparent">
                  Snacking
                </span>
              </h1>
              {/* Subtitle with animation */}
              <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-md animate-fade-in">
                From our kitchen to yours - carefully crafted flavoured cashews, mixed dry fruits, and innovative snacks that delight your senses.
              </p>
              
              {/* CTA Buttons with enhanced styling */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="/products">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0"
                  >
                    Explore Products
                    <Sparkles className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/recipes">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-2 border-white/30 text-white hover:bg-white/20 hover:text-white hover:border-white/50 px-8 py-4 text-lg font-semibold backdrop-blur-sm transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    View Recipes
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          </div>
        </section>

      {/* Featured Products */}
      <section className="py-24 px-4 bg-gradient-to-br from-white via-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header with decorative elements */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl mb-6">
              <Star className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Handpicked Favourites
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Discover our most loved premium snacks, carefully curated for exceptional taste</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredItems.map((item) => (
              <Link 
                key={item.id} 
                href={item.type === 'product' ? `/products/${item.id}` : `/combos/${item.id}`}
                className="group block"
              >
                <div className="h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-orange-100 overflow-hidden">
                  <div className="relative mb-4">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/300x200?text=Product+Image';
                      }}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-t-2xl"></div>
                    
                    {/* Badge with animation */}
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md group-hover:scale-110 transition-transform">
                        Bestseller
                      </Badge>
                    </div>
                    
                    {/* Quick view button */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl flex items-center justify-center">
                      <div className="bg-white rounded-full p-2 shadow-lg">
                        <Eye className="w-5 h-5 text-orange-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                          {formatPrice(item.price)}
                        </span>
                        {item.type === 'combo' && (item as Combo).discount > 0 && (
                          <Badge className="ml-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm">
                              {(item as Combo).discount}% OFF
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-orange-600 hover:bg-orange-700 text-white"
                            onClick={(e) => {
                              e.preventDefault();
                              handleAddToCart(item as Product);
                            }}
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </Button>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-md"
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddToCart(item as Product);
                          }}
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 bg-gradient-to-br from-white via-orange-50 to-amber-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-100 to-amber-100 rounded-3xl mb-6 shadow-lg">
              <Heart className="w-10 h-10 text-orange-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose
              <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent"> Mealicious?</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Experience the difference that premium quality and exceptional service make</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Leaf className="w-12 h-12 text-orange-600 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">Premium Ingredients</h3>
              <p className="text-gray-600">Carefully sourced, quality assured in every bite</p>
            </div>
            
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Utensils className="w-12 h-12 text-orange-600 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">Exceptional Taste</h3>
              <p className="text-gray-600">Crafted with passion for the perfect flavour experience</p>
            </div>
            
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Truck className="w-12 h-12 text-orange-600 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">Fast Delivery</h3>
              <p className="text-gray-600">Fresh snacks delivered right to your doorstep</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}