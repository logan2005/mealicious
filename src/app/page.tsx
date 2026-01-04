'use client'

'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Star, Heart, Leaf, Utensils, Truck, Share } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/contexts/cart-context' // Import useCart

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
  const { addToCart: addToCartContext } = useCart() // Use addToCart from context

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

  // Use the addToCart from context
  const handleAddToCart = (product: Product) => {
    addToCartContext(product, 1)
  }

  const handleShare = async (product: Product) => {
    const productUrl = `${window.location.origin}/products/${product.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: productUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that do not support Web Share API
      try {
        await navigator.clipboard.writeText(productUrl);
        alert('Product link copied to clipboard!');
      } catch (error) {
        console.error('Error copying to clipboard:', error);
        alert('Failed to copy link to clipboard.');
      }
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price)
  }

  if (loading) {
    return (
      <div className="min-h-screen">
          <div className="relative h-[600px] bg-gradient-to-r from-orange-600 to-orange-400 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center text-white px-4">
              <div className="animate-pulse">
                <div className="h-16 bg-white bg-opacity-20 rounded w-96 mx-auto mb-6"></div>
                <div className="h-8 bg-white bg-opacity-20 rounded w-64 mx-auto mb-8"></div>
                <div className="h-12 bg-white bg-opacity-20 rounded w-32 mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-48 mx-auto animate-pulse"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-8 bg-gray-200 rounded w-20"></div>
                      <div className="h-8 bg-gray-200 rounded w-8"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-orange-600 to-orange-400 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1606905564435-bc070ee6a3e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')"
          }}
        ></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              style={{ fontFamily: 'Lovelo, sans-serif' }}
            >
              Premium Snacking, Made with Love.
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Discover our range of flavour-rich cashew nuts, mixed dry fruits, and innovative snacks that blend tradition with modern taste preferences.
            </p>
            <Link href="/products">
              <Button 
                size="lg" 
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg"
              >
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 
              className="text-4xl font-bold mb-4"
              style={{ fontFamily: 'Lovelo, sans-serif' }}
            >
              Our Bestsellers
            </h2>
            <p className="text-gray-600 text-lg">Discover our most popular flavour-rich nuts and dry fruits</p>
          </div>

          <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent>
              {featuredItems.map((item) => (
                <CarouselItem key={item.id} className="md:basis-1/3 lg:basis-1/4">
                  <Link href={item.type === 'product' ? `/products/${item.id}` : `/combos/${item.id}`} className="h-full">
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300 flex flex-col">
                      <CardContent className="p-4 flex flex-col flex-grow min-h-[450px]">
                        <div className="relative mb-4">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-48 object-cover rounded-lg bg-gray-200"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://via.placeholder.com/300x200?text=Product+Image';
                            }}
                          />
                          <Badge className="absolute top-2 left-2 bg-orange-600">
                            Bestseller
                          </Badge>
                          {item.type === 'combo' && (
                            <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">
                              Combo
                            </Badge>
                          )}
                        </div>
                        <div className="flex-1 flex flex-col">
                          <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: 'Lovelo, sans-serif' }}>
                            {item.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex items-center mb-3">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-current" />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500 ml-2">(4.8)</span>
                          </div>
                          <div className="mt-auto flex items-center justify-between">
                            <span className="text-2xl font-bold text-orange-600">
                              {formatPrice(item.price)}
                            </span>
                            {item.type === 'combo' && (item as Combo).discount > 0 && (
                              <Badge variant="outline" className="text-orange-600">
                                {(item as Combo).discount}% OFF
                              </Badge>
                            )}
                            <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  className="bg-orange-600 hover:bg-orange-700"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleAddToCart(item as Product)
                                  }}
                                >
                                <ShoppingCart className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-white"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleShare(item as Product)
                                }}
                              >
                                <Share className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 
              className="text-4xl font-bold mb-4"
              style={{ fontFamily: 'Lovelo, sans-serif' }}
            >
              Why Choose Mealicious?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div>
                <div className="w-16 h-16 mx-auto mb-4 border-2 border-white/50 rounded-full flex items-center justify-center">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality First</h3>
                <p className="text-white text-opacity-90">Only premium ingredients and hygienic processing</p>
              </div>
              <div>
                <div className="w-16 h-16 mx-auto mb-4 border-2 border-white/50 rounded-full flex items-center justify-center">
                  <Utensils className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Customer Delight</h3>
                <p className="text-white text-opacity-90">Exceptional taste and satisfaction in every bite</p>
              </div>
              <div>
                <div className="w-16 h-16 mx-auto mb-4 border-2 border-white/50 rounded-full flex items-center justify-center">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Trust & Transparency</h3>
                <p className="text-white text-opacity-90">Honest sourcing and ethical business practices</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Flavoured Cashews', 'Mixed Dry Fruits', 'Innovative Snacks', 'Premium Nuts'].map((category) => (
              <Link key={category} href={`/products?category=${category.toLowerCase().replace(' ', '-')}`}>
                <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-orange-600 rounded-full flex items-center justify-center">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg">{category}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className="text-4xl font-bold mb-6"
            style={{ fontFamily: 'Lovelo, sans-serif' }}
          >
            Why Choose Mealicious?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div>
              <div className="w-16 h-16 mx-auto mb-4 border-2 border-white/50 rounded-full flex items-center justify-center">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Healthy Ingredients</h3>
              <p className="text-white text-opacity-90">Made with premium millets and natural ingredients</p>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto mb-4 border-2 border-white/50 rounded-full flex items-center justify-center">
                <Utensils className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Great Taste</h3>
              <p className="text-white text-opacity-90">Delicious flavours that satisfy your cravings</p>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto mb-4 border-2 border-white/50 rounded-full flex items-center justify-center">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Convenient</h3>
              <p className="text-white text-opacity-90">Ready-to-eat snacks for your busy lifestyle</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
