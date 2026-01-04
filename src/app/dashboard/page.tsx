'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'

interface OrderItem {
  id: string
  productId: string
  quantity: number
  price: number
  product: {
    name: string
    imageUrl: string
  }
}

interface Order {
  id: string
  userId: string
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  total: number
  address: string
  phone: string
  createdAt: string
  items: OrderItem[]
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      router.push('/login') // Redirect to login if not authenticated
    }
  }, [router])

  useEffect(() => {
    if (user) {
      fetchOrders()
    }
  }, [user])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setOrders(data)
      } else if (response.status === 401) {
        toast({ title: "Unauthorized", description: "Please login again.", variant: "destructive" })
        router.push('/login')
      } else {
        toast({ title: "Error", description: "Failed to fetch orders.", variant: "destructive" })
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
      toast({ title: "Error", description: "An error occurred while fetching orders.", variant: "destructive" })
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[orange-600]"></div>
      </div>
    )
  }

  if (!user) {
    return null // Should redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{user.name}'s Dashboard</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-600">You haven't placed any orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Order #{order.id.substring(0, 8)}</CardTitle>
                    <p className="text-sm text-gray-500">Placed on {format(new Date(order.createdAt), 'PPP')}</p>
                  </div>
                  <Badge
                    className={`
                      ${order.status === 'DELIVERED' ? 'bg-orange-500' :
                      order.status === 'PAID' ? 'bg-emerald-500' :
                      order.status === 'CONFIRMED' ? 'bg-blue-500' :
                      order.status === 'PENDING' ? 'bg-yellow-500' :
                      order.status === 'SHIPPED' ? 'bg-purple-500' :
                      order.status === 'CANCELLED' ? 'bg-red-500' :
                      'bg-gray-500' // Default color if status is not matched
                    }`}
                  >
                    {order.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p><strong>Total:</strong> {formatPrice(order.total)}</p>
                      <p><strong>Address:</strong> {order.address}</p>
                      <p><strong>Phone:</strong> {order.phone}</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Items:</p>
                      <ul className="space-y-2">
                        {order.items.map((item) => (
                          <li key={item.id} className="flex items-center gap-3">
                            <img src={item.product.imageUrl} alt={item.product.name} className="w-12 h-12 object-cover rounded-md" />
                            <div>
                              <p className="font-medium">{item.product.name}</p>
                              <p className="text-sm text-gray-600">{item.quantity} x {formatPrice(item.price)}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Link href={`/orders/${order.id}`}>
                    <Button variant="outline" className="w-full">
                      View Order Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
