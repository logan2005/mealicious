'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, Package, Truck, Home, Phone, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface OrderItem {
  id: string
  quantity: number
  price: number
  product: {
    id: string
    name: string
    imageUrl: string
    category: string
  }
}

interface Order {
  id: string
  status: string
  total: number
  address: string
  phone: string
  createdAt: string
  items: OrderItem[]
}

export default function OrderPage() {
  const params = useParams()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchOrder()
    }
  }, [params.id])

  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/login')
        return
      }

      const response = await fetch(`/api/orders/${params.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setOrder(data)
      } else {
        console.error('Failed to fetch order')
      }
    } catch (error) {
      console.error('Error fetching order:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'PAID':
        return 'bg-emerald-100 text-emerald-800'
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800'
      case 'SHIPPED':
        return 'bg-purple-100 text-purple-800'
      case 'DELIVERED':
        return 'bg-orange-100 text-orange-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Package className="w-5 h-5" />
      case 'PAID':
        return <CheckCircle className="w-5 h-5" />
      case 'CONFIRMED':
        return <CheckCircle className="w-5 h-5" />
      case 'SHIPPED':
        return <Truck className="w-5 h-5" />
      case 'DELIVERED':
        return <Home className="w-5 h-5" />
      case 'CANCELLED':
        return <Package className="w-5 h-5" />
      default:
        return <Package className="w-5 h-5" />
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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[orange-600]"></div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Order not found</h1>
          <Link href="/orders">
            <Button className="bg-[orange-600] hover:bg-[orange-700]">
              Back to Orders
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.05
  const shipping = subtotal > 500 ? 0 : 50

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-[orange-600] hover:underline mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Orders
          </Link>
          <h1 
            className="text-4xl font-bold mb-2"
            style={{ fontFamily: 'Lovelo, sans-serif' }}
          >
            Order Confirmation
          </h1>
          <p className="text-gray-600">Thank you for your order! Here are the details:</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  Order Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                  <span className="text-gray-600">
                    Placed on {formatDate(order.createdAt)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4 py-4 border-b last:border-b-0">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold" style={{ fontFamily: 'Lovelo, sans-serif' }}>
                          {item.product.name}
                        </h3>
                        <Badge className="mt-1 bg-gray-100 text-gray-800">
                          {item.product.category}
                        </Badge>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-gray-600">
                            Qty: {item.quantity} × {formatPrice(item.price)}
                          </span>
                          <span className="font-semibold text-[orange-600]">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Home className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="font-medium">Delivery Address</div>
                      <div className="text-gray-600">{order.address}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="font-medium">Phone Number</div>
                      <div className="text-gray-600">{order.phone}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (5%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Paid</span>
                    <span className="text-[orange-600]">{formatPrice(order.total)}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-orange-800">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Order Confirmed!</span>
                    </div>
                    <p className="text-orange-700 text-sm mt-1">
                      We've received your order and will process it soon.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link href={`/orders/${order.id}/track`}>
                    <Button className="w-full bg-[orange-600] hover:bg-[orange-700]">
                      Track Order
                    </Button>
                  </Link>
                  <Link href="/products">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}