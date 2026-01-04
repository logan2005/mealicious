'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Edit, Package, DollarSign, Tag, CheckCircle, XCircle } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl: string
  images: string[]
  inStock: boolean
  ingredients: any[]
  nutrition: any
  featured: boolean
  createdAt: string
  updatedAt: string
}

export default function AdminProductViewPage() {
  const router = useRouter()
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    checkAuth()
    fetchProduct()
  }, [params.id])

  const checkAuth = () => {
    const adminToken = localStorage.getItem('adminToken')
    if (!adminToken) {
      router.push('/admin/login')
    }
  }

  const fetchProduct = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken')
      
      const response = await fetch(`/api/products/${params.id}`, {
        headers: { 'Authorization': `Bearer ${adminToken}` }
      })

      if (response.ok) {
        const productData = await response.json()
        setProduct(productData)
      } else {
        setError('Failed to fetch product')
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      setError('An error occurred while fetching the product')
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{error || 'Product not found'}</p>
          <Link href="/admin">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-red-600">Product Details</h1>
            </div>
            <Link href={`/admin/products/${product.id}/edit`}>
              <Button>
                <Edit className="w-4 h-4 mr-2" />
                Edit Product
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Product Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/600x600?text=Product';
                    }}
                  />
                </div>
                {product.images && product.images.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Additional Images</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {product.images.map((image, index) => (
                        <div key={index} className="aspect-square bg-gray-200 rounded overflow-hidden">
                          <img
                            src={image}
                            alt={`${product.name} ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://via.placeholder.com/150x150?text=Image';
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">{product.name}</CardTitle>
                  <div className="flex items-center space-x-2">
                    {product.inStock ? (
                      <Badge variant="default" className="bg-orange-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        In Stock
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <XCircle className="w-3 h-3 mr-1" />
                        Out of Stock
                      </Badge>
                    )}
                    {product.featured && (
                      <Badge variant="secondary">Featured</Badge>
                    )}
                  </div>
                </div>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-gray-400" />
                  <span className="text-2xl font-bold text-[orange-600]">
                    {formatPrice(product.price)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Tag className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">Category: {product.category}</span>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Ingredients</h4>
                  {product.ingredients && product.ingredients.length > 0 ? (
                    <ul className="list-disc list-inside text-gray-600">
                      {product.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No ingredients listed</p>
                  )}
                </div>

                {product.nutrition && Object.keys(product.nutrition).length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Nutrition Information</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(product.nutrition).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="capitalize text-gray-600">{key}:</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Created:</span>
                      <p className="font-medium">{formatDate(product.createdAt)}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Last Updated:</span>
                      <p className="font-medium">{formatDate(product.updatedAt)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}