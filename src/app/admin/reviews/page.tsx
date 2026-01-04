'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Star, Search, Trash2, ArrowLeft, Filter, ChevronLeft, ChevronRight, MessageSquare, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface Review {
  id: string
  rating: number
  comment: string
  createdAt: string
  published: boolean
  response: string | null
  user: {
    id: string
    name: string
    email: string
  }
  product: {
    id: string
    name: string
    imageUrl: string
  }
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [editingReview, setEditingReview] = useState<Review | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchReviews()
  }, [search, page])

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      params.append('page', page.toString())
      
      const response = await fetch(`/api/admin/reviews?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Reviews from API:', data.reviews);
        setReviews(data.reviews.filter((review: Review) => review.product))
        setTotalPages(data.pagination.pages)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch reviews",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error fetching reviews:', error)
      toast({
        title: "Error",
        description: "Failed to fetch reviews",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const deleteReview = async (id: string) => {
    setDeletingId(id)
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`/api/admin/reviews/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setReviews(reviews.filter(review => review.id !== id))
        toast({
          title: "Success",
          description: "Review deleted successfully"
        })
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.error || "Failed to delete review",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error deleting review:', error)
      toast({
        title: "Error",
        description: "Failed to delete review",
        variant: "destructive"
      })
    } finally {
      setDeletingId(null)
    }
  }

  const handleUpdateReview = async () => {
    if (!editingReview) return

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`/api/admin/reviews/${editingReview.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          published: editingReview.published,
          response: editingReview.response
        })
      })

      if (response.ok) {
        const updatedReview = await response.json()
        setReviews(reviews.map(r => r.id === updatedReview.id ? updatedReview : r))
        setEditingReview(null)
        toast({
          title: "Success",
          description: "Review updated successfully"
        })
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.error || "Failed to update review",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error updating review:', error)
      toast({
        title: "Error",
        description: "Failed to update review",
        variant: "destructive"
      })
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  console.log(reviews);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[orange-600]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link href="/admin" className="inline-flex items-center text-[orange-600] hover:underline mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Admin Dashboard
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Reviews Management</h1>
              <p className="text-gray-600">Manage customer reviews and ratings</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                Total Reviews: {reviews.length}
              </Badge>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search reviews, users, or products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-4">
          {reviews.filter(review => review && review.product).map((review) => (
            <Card key={review.id} className={`overflow-hidden ${!review.published ? 'bg-gray-100' : ''}`}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <img
                    src={review.product ? review.product.imageUrl : 'https://via.placeholder.com/150'}
                    alt={review.product ? review.product.name : 'Product image'}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{review.product.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs">
                              {getInitials(review.user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-600">{review.user.name}</span>
                          <span className="text-sm text-gray-400">•</span>
                          <span className="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
                          <Badge variant={review.published ? 'default' : 'destructive'}>
                            {review.published ? 'Published' : 'Hidden'}
                          </Badge>
                        </div>
                      </div>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            disabled={deletingId === review.id}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Review</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this review by {review.user.name} for {review.product.name}? 
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteReview(review.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete Review
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm font-medium">{review.rating}/5</span>
                    </div>
                    
                    {review.comment && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                      </div>
                    )}

                    {review.response && (
                      <div className="mt-3 bg-blue-50 rounded-lg p-3">
                        <p className="text-sm font-semibold text-blue-800">Response from Admin:</p>
                        <p className="text-gray-700 leading-relaxed">{review.response}</p>
                      </div>
                    )}
                    
                    <div className="mt-4 pt-4 border-t">
                      {editingReview?.id === review.id ? (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="response">Your Response</Label>
                            <Textarea
                              id="response"
                              value={editingReview.response || ''}
                              onChange={(e) => setEditingReview({ ...editingReview, response: e.target.value })}
                              rows={3}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="published">Published</Label>
                            <Switch
                              id="published"
                              checked={editingReview.published}
                              onCheckedChange={(checked) => setEditingReview({ ...editingReview, published: checked })}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" onClick={handleUpdateReview}>Save</Button>
                            <Button size="sm" variant="outline" onClick={() => setEditingReview(null)}>Cancel</Button>
                          </div>
                        </div>
                      ) : (
                        <Button variant="outline" size="sm" onClick={() => setEditingReview(review)}>
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Respond / Edit
                        </Button>
                      )}
                    </div>

                    <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                      <span>User: {review.user.email}</span>
                      <span>•</span>
                      <span>Product ID: {review.product.id.slice(0, 8)}...</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {reviews.length === 0 && (
          <div className="text-center py-12">
            <Star className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No reviews found</h3>
            <p className="text-gray-600">
              {search ? 'Try adjusting your search terms' : 'No customer reviews have been submitted yet'}
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <span className="text-sm">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}