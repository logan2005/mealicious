'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Star, Heart, Leaf, Utensils, Truck, Sparkles, ChefHat } from 'lucide-react'
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
      <div className="min-h-screen">
        <div className="relative h-[70vh] bg-gradient-to-br from-orange-500 via-orange-400 to-orange-300 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <div className="animate-pulse">
              <Sparkles className="w-12 h-12 mx-auto mb-4" />
              <h1 className="text-5xl md:text-6xl font-light mb-4">Mealicious</h1>
              <p className="text-lg md:text-xl max-w-md opacity-90">Premium Snacking, Redefined</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-br from-orange-50 via-white to-orange-100 overflow-hidden">
        <div className="absolute inset-0 bg-white opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center px-4 max-w-4xl">
            <div className="space-y-6">
              <div className="flex items-center justify-center mb-8">
                <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <ChefHat className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Discover Premium
                <span className="text-orange-600">Snacking</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl">
                From our kitchen to yours - carefully crafted flavoured cashews, mixed dry fruits, and innovative snacks that delight your senses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products">
                  <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3">
                    Explore Products
                  </Button>
                </Link>
                <Link href="/recipes">
                  <Button variant="outline" size="lg" className="border-orange-600 text-orange-600 hover:bg-orange-50 hover:text-orange-700 px-8 py-3">
                    View Recipes
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

      {/* Featured Products */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Handpicked Favourites
            </h2>
            <p className="text-gray-600 text-lg">Discover our most loved premium snacks</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredItems.map((item) => (
              <Link 
                key={item.id} 
                href={item.type === 'product' ? `/products/${item.id}` : `/combos/${item.id}`}
                className="group block"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 hover:border-orange-200">
                  <CardContent className="p-6">
                    <div className="relative mb-4">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-48 object-cover rounded-xl"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/300x200?text=Product+Image';
                        }}
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Bestseller
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-orange-600">
                            {formatPrice(item.price)}
                          </span>
                          {item.type === 'combo' && (item as Combo).discount > 0 && (
                            <Badge className="ml-2 bg-green-100 text-green-800 text-sm">
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
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gradient-to-br from-orange-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-16">
              Why Choose
              <span className="text-orange-600">Mealicious?</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Premium Ingredients</h3>
              <p className="text-gray-600">Carefully sourced, quality assured in every bite</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Utensils className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Exceptional Taste</h3>
              <p className="text-gray-600">Crafted with passion for the perfect flavour experience</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fast Delivery</h3>
              <p className="text-gray-600">Fresh snacks delivered right to your doorstep</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}