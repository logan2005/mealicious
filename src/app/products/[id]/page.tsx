'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ShoppingCart, Star, Heart, Plus, Minus } from 'lucide-react'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl: string
  images: string[]
  ingredients: string[]
  nutrition: any
  featured: boolean
  inStock: boolean
}

interface Review {
  id: string
  rating: number
  comment: string
  createdAt: string
  user: {
    name: string
  }
}

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewComment, setReviewComment] = useState('')
  const [canReview, setCanReview] = useState(false)
  const [hasReviewed, setHasReviewed] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (params.id) {
      fetchProduct()
      fetchReviews()
      fetchUserPurchaseHistory()
    }
  }, [params.id])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        // Parse JSON strings for arrays and objects
        const parsedProduct = {
          ...data,
          images: Array.isArray(data.images) ? data.images : JSON.parse(data.images || '[]'),
          ingredients: Array.isArray(data.ingredients) ? data.ingredients : JSON.parse(data.ingredients || '[]'),
          nutrition: typeof data.nutrition === 'object' ? data.nutrition : JSON.parse(data.nutrition || '{}')
        }
        setProduct(parsedProduct)
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}/reviews`)
      if (response.ok) {
        const data = await response.json()
        setReviews(data)
        // Check if the current user has already reviewed this product
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        if (currentUser && data.some((review: Review) => review.user.id === currentUser.id)) {
          setHasReviewed(true);
        }
      }
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
  }

  const fetchUserPurchaseHistory = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCanReview(false);
      return;
    }

    try {
      const response = await fetch(`/api/products/${params.id}/reviews/check-purchase`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCanReview(data.hasPurchased);
      } else {
        setCanReview(false);
      }
    } catch (error) {
      console.error('Error fetching purchase history:', error);
      setCanReview(false);
    }
  };

  const submitReview = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast({ title: "Error", description: "Please login to submit a review.", variant: "destructive" });
      return;
    }
    if (reviewRating === 0) {
      toast({ title: "Error", description: "Please select a rating.", variant: "destructive" });
      return;
    }

    try {
      const response = await fetch(`/api/products/${params.id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ rating: reviewRating, comment: reviewComment }),
      });

      if (response.ok) {
        toast({ title: "Success", description: "Review submitted successfully!" });
        setReviewRating(0);
        setReviewComment('');
        fetchReviews(); // Refresh reviews
        setHasReviewed(true);
      } else {
        const errorData = await response.json();
        toast({ title: "Error", description: errorData.error || "Failed to submit review.", variant: "destructive" });
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({ title: "Error", description: "An error occurred while submitting your review.", variant: "destructive" });
    }
  };

  const addToCart = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      toast({ title: "Error", description: "Please login to add items to cart", variant: "destructive" })
      return
    }

    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId: params.id, quantity })
      })

      if (response.ok) {
        toast({ title: "Success", description: "Product added to cart!" })
      } else {
        toast({ title: "Error", description: "Failed to add product to cart", variant: "destructive" })
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      toast({ title: "Error", description: "Error adding product to cart", variant: "destructive" })
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[orange-600]"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link href="/products">
            <Button className="bg-[orange-600] hover:bg-[orange-700]">
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src={product.images?.[selectedImageIndex] || product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover bg-gray-200"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400x400?text=Product+Image';
                }}
              />
              {product.featured && (
                <Badge className="absolute top-4 left-4 bg-[orange-600]">
                  Featured
                </Badge>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square bg-white rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index ? 'border-[orange-600]' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover bg-gray-200"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/100x100?text=Image';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge className="bg-gray-100 text-gray-800">
                  {product.category}
                </Badge>
                {product.featured && (
                  <Badge className="bg-[orange-600]">
                    Featured
                  </Badge>
                )}
              </div>
              <h1 
                className="text-4xl font-bold mb-4"
                style={{ fontFamily: 'Lovelo, sans-serif' }}
              >
                {product.name}
              </h1>
              <p className="text-gray-600 text-lg mb-6">
                {product.description}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {renderStars(Math.round(averageRating))}
              </div>
              <span className="text-gray-600">
                {averageRating.toFixed(1)} ({reviews.length} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-[orange-600]">
              {formatPrice(product.price)}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="h-10 w-10 p-0"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 text-center min-w-[60px]">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-10 w-10 p-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              size="lg"
              className="w-full bg-[orange-600] hover:bg-[orange-700] text-white py-3 text-lg"
              onClick={addToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart - {formatPrice(product.price * quantity)}
            </Button>

            {/* Product Information Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-gray-700">
                      {product.description}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="nutrition" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Nutritional Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {product.nutrition ? (
                      <div className="space-y-2">
                        {Object.entries(product.nutrition).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="capitalize text-gray-700">{key}:</span>
                            <span className="font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">Nutritional information not available</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="ingredients" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Ingredients</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {product.ingredients && product.ingredients.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1">
                        {product.ingredients.map((ingredient, index) => (
                          <li key={index} className="text-gray-700">{ingredient}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">Ingredients list not available</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Reviews Section */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>
              {reviews.length > 0 ? (
                <div className="space-y-4 mb-8">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-700">
                              {review.user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex">
                              {renderStars(review.rating)}
                            </div>
                            <span className="font-medium">{review.user.name}</span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        {review.comment && (
                          <p className="text-gray-700 mt-2">{review.comment}</p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 mb-8">No reviews yet. Be the first to review this product!</p>
              )}

              {canReview && !hasReviewed && (
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle>Write a Review</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="rating">Your Rating</Label>
                      <div className="flex items-center gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-6 h-6 cursor-pointer ${star <= reviewRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            onClick={() => setReviewRating(star)}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="comment">Your Comment (optional)</Label>
                      <Textarea
                        id="comment"
                        placeholder="Share your thoughts on this product..."
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        rows={4}
                      />
                    </div>
                    <Button onClick={submitReview} className="bg-[orange-600] hover:bg-[orange-700]">
                      Submit Review
                    </Button>
                  </CardContent>
                </Card>
              )}

              {hasReviewed && (
                <p className="text-gray-600 mt-8">You have already submitted a review for this product.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}