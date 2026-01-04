'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Plus, Search, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'

interface ComboItem {
  id: string
  quantity: number
  product: {
    id: string
    name: string
    price: number
  }
}

interface Combo {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  discount: number
  featured: boolean
  inStock: boolean
  createdAt: string
  items: ComboItem[]
}

export default function AdminCombosPage() {
  const [combos, setCombos] = useState<Combo[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { toast } = useToast()

  useEffect(() => {
    fetchCombos()
  }, [search, page])

  const fetchCombos = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      params.append('page', page.toString())
      
      const response = await fetch(`/api/admin/combos?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setCombos(data.combos)
        setTotalPages(data.pagination.pages)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch combos",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error fetching combos:', error)
      toast({
        title: "Error",
        description: "Failed to fetch combos",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const deleteCombo = async (id: string) => {
    if (!confirm('Are you sure you want to delete this combo?')) return

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`/api/admin/combos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setCombos(combos.filter(combo => combo.id !== id))
        toast({
          title: "Success",
          description: "Combo deleted successfully"
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to delete combo",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error deleting combo:', error)
      toast({
        title: "Error",
        description: "Failed to delete combo",
        variant: "destructive"
      })
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price)
  }

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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Combo Management</h1>
            <p className="text-gray-600">Manage product combos and deals</p>
          </div>
          <Link href="/admin/combos/new">
            <Button className="bg-[orange-600] hover:bg-[orange-700]">
              <Plus className="w-4 h-4 mr-2" />
              Add New Combo
            </Button>
          </Link>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search combos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {combos.map((combo) => (
            <Card key={combo.id} className="overflow-hidden">
              <div className="relative">
                <img
                  src={combo.imageUrl}
                  alt={combo.name}
                  className="w-full h-48 object-cover"
                />
                {combo.featured && (
                  <Badge className="absolute top-2 left-2 bg-yellow-500">
                    Featured
                  </Badge>
                )}
                {!combo.inStock && (
                  <Badge className="absolute top-2 right-2 bg-red-500">
                    Out of Stock
                  </Badge>
                )}
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg">{combo.name}</CardTitle>
                <p className="text-sm text-gray-600 line-clamp-2">{combo.description}</p>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-[orange-600]">
                      {formatPrice(combo.price)}
                    </span>
                    {combo.discount > 0 && (
                      <Badge variant="outline" className="text-orange-600">
                        {combo.discount}% OFF
                      </Badge>
                    )}
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Includes ({combo.items.length} items):
                    </p>
                    <div className="text-xs text-gray-600 space-y-1">
                      {combo.items.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <span>{item.product.name}</span>
                          <span>×{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-3">
                    <Link href={`/admin/combos/${combo.id}/edit`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteCombo(combo.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {combos.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No combos found</h3>
            <p className="text-gray-600 mb-4">Create your first combo to get started</p>
            <Link href="/admin/combos/new">
              <Button className="bg-[orange-600] hover:bg-[orange-700]">
                <Plus className="w-4 h-4 mr-2" />
                Add New Combo
              </Button>
            </Link>
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