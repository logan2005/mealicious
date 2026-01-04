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
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                    <div className="h-8 bg-gray-200 rounded w-8"></div>
                  </div>
                </CardContent>
              </Card>
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
        <div className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-12 text-center">
            <h1 
              className="text-5xl md:text-6xl font-bold mb-4"
              style={{ fontFamily: 'Lovelo, sans-serif' }}
            >
              Our Products
            </h1>
            <p className="text-lg md:text-xl text-white/90">Discover our range of delicious millet-based snacks</p>
          </div>
        </div>

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