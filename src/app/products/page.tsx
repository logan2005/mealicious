'use client'

import { useState, useEffect, useMemo, useCallback, Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { ShoppingCart, Star, Share } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/contexts/cart-context'
import { ProductsFilter } from '@/components/products-filter'

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl: string
  featured: boolean
  createdAt: string
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
  createdAt: string
  items: any[]
  type: 'combo'
}

export default function ProductsPage() {
  const [products, setProducts] = useState<(Product | Combo)[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, productsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const { addToCart: addToCartContext, refreshCart } = useCart()

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const [productsRes, combosRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/combos')
      ]);

      if (productsRes.ok && combosRes.ok) {
        const productsData = await productsRes.json();
        const combosData = await combosRes.json();

        const productsWithType = productsData.map((p: any) => ({ ...p, type: 'product' }));
        const combosWithType = combosData.map((c: any) => ({ ...c, type: 'combo' }));

        setProducts([...productsWithType, ...combosWithType]);
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }, [])

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

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price)
  }

  function ProductsLoading() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Filter Loading */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-orange-100">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="h-12 bg-gradient-to-r from-orange-200 to-amber-200 rounded-xl animate-pulse"></div>
              <div className="h-12 bg-gradient-to-r from-orange-200 to-amber-200 rounded-xl animate-pulse"></div>
              <div className="h-12 bg-gradient-to-r from-orange-200 to-amber-200 rounded-xl animate-pulse"></div>
              <div className="h-12 bg-gradient-to-r from-orange-200 to-amber-200 rounded-xl animate-pulse"></div>
            </div>
          </div>
          
          {/* Products Grid Loading */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-orange-100 animate-pulse">
                <div className="aspect-square bg-gradient-to-br from-orange-200 to-amber-200"></div>
                <div className="p-6">
                  <div className="space-y-3">
                    <div className="h-6 bg-gradient-to-r from-orange-200 to-amber-200 rounded-xl w-3/4"></div>
                    <div className="h-4 bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl w-full"></div>
                    <div className="h-4 bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl w-5/6"></div>
                  </div>
                  <div className="flex justify-between items-center mt-6">
                    <div className="h-8 bg-gradient-to-r from-orange-300 to-amber-300 rounded-xl w-24"></div>
                    <div className="h-10 bg-gradient-to-r from-orange-200 to-amber-200 rounded-xl w-10"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return <ProductsLoading />
  }

  return (
    <Suspense fallback={<ProductsLoading />}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="relative min-h-[50vh] bg-gradient-to-br from-orange-400 via-orange-300 to-amber-200 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-32 right-10 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-32 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-grid-white/20"></div>
          
          <div className="relative z-10 flex items-center justify-center min-h-[50vh] px-4">
            <div className="text-center max-w-4xl">
              {/* Animated Icon */}
              <div className="flex items-center justify-center mb-8 group">
                <div className="w-20 h-20 bg-gradient-to-br from-white to-orange-100 rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-300">
                  <ShoppingCart className="w-10 h-10 text-orange-600 group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              
              {/* Main Heading with Gradient */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-orange-50 to-orange-100 bg-clip-text text-transparent drop-shadow-lg">
                  Our
                </span>
                <br />
                <span className="bg-gradient-to-r from-orange-600 to-amber-700 bg-clip-text text-transparent">
                  Products
                </span>
              </h1>
              
              {/* Subtitle with animation */}
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md animate-fade-in">
                Discover our range of premium flavoured cashews, mixed dry fruits, and innovative snacks
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Filters and Search */}
          <ProductsFilter products={products} setFilteredProducts={setFilteredProducts} loading={loading} />

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map((item) => (
                <Link href={item.type === 'product' ? `/products/${item.id}` : `/combos/${item.id}`} key={item.id} className="flex">
                <Card className="w-full hover:shadow-lg transition-shadow duration-300 flex flex-col">
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
                      {item.featured && (
                        <Badge className="absolute top-2 left-2 bg-[orange-600]">
                          Featured
                        </Badge>
                      )}
                      {item.type === 'product' && (
                        <Badge className="absolute top-2 right-2 bg-gray-100 text-gray-800">
                          {(item as Product).category}
                        </Badge>
                      )}
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
                      {item.type === 'combo' && (
                        <div className="text-xs text-gray-600 space-y-1 mb-2">
                          <p className="font-medium text-gray-700">Includes:</p>
                          {(item as Combo).items.map((comboItem: any) => (
                            <div key={comboItem.id} className="flex justify-between">
                              <span>{comboItem.product.name}</span>
                              <span>×{comboItem.quantity}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center mb-3">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-2">(4.8)</span>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-2xl font-bold text-[orange-600]">
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
                            className="bg-[orange-600] hover:bg-[orange-700]"
                            onClick={(e) => {
                              e.preventDefault();
                              addToCartContext(item, 1)}
                            }
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-[orange-600] border-[orange-600] hover:bg-[orange-600] hover:text-white"
                            onClick={(e) => {
                              e.preventDefault();
                              handleShare(item as Product)}
                            }
                          >
                            <Share className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink href="#" isActive={currentPage === i + 1} onClick={() => setCurrentPage(i + 1)}>
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext href="#" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </Suspense>
  )
}