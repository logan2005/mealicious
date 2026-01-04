'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, Package, Truck, Home, XCircle, Info } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Order {
  id: string;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
  totalAmount: number;
  address: string;
  phone: string;
  orderItems: Array<{
    id: string;
    quantity: number;
    product: {
      name: string;
      imageUrl: string;
      price: number;
    };
  }>;
}

export default function TrackOrderPage() {
  const params = useParams();
  const orderId = params.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication required to track order.');
          toast({ title: "Error", description: "Please log in to track your order.", variant: "destructive" });
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/orders/${orderId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrder(data);
        } else {
          const errData = await response.json();
          setError(errData.error || 'Failed to fetch order details.');
          toast({ title: "Error", description: errData.error || "Failed to fetch order details.", variant: "destructive" });
        }
      } catch (err: any) {
        console.error('Error fetching order:', err);
        setError('An unexpected error occurred.');
        toast({ title: "Error", description: "An unexpected error occurred while fetching order.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId, toast]);

  const getStatusDetails = (status: Order['status']) => {
    switch (status) {
      case 'PENDING':
        return { label: 'Order Placed', icon: <CheckCircle className="w-6 h-6 text-gray-500" />, description: 'Your order has been successfully placed.' };
      case 'PROCESSING':
        return { label: 'Packed', icon: <Package className="w-6 h-6 text-blue-500" />, description: 'Your order is being prepared for shipment.' };
      case 'SHIPPED':
        return { label: 'In Transit', icon: <Truck className="w-6 h-6 text-yellow-500" />, description: 'Your order is on its way.' };
      case 'DELIVERED':
        return { label: 'Delivered', icon: <Home className="w-6 h-6 text-orange-500" />, description: 'Your order has been delivered.' };
      case 'CANCELLED':
        return { label: 'Cancelled', icon: <XCircle className="w-6 h-6 text-red-500" />, description: 'Your order has been cancelled.' };
      default:
        return { label: 'Unknown', icon: <Info className="w-6 h-6 text-gray-500" />, description: 'Status unknown.' };
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[orange-600]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md p-6 text-center">
          <CardTitle className="text-2xl font-bold text-red-600 mb-4">Error</CardTitle>
          <CardContent>
            <p className="text-gray-700">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md p-6 text-center">
          <CardTitle className="text-2xl font-bold text-gray-800 mb-4">Order Not Found</CardTitle>
          <CardContent>
            <p className="text-gray-700">The order you are looking for does not exist or you do not have permission to view it.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentStatusDetails = getStatusDetails(order.status);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 
          className="text-4xl font-bold text-center mb-8"
          style={{ fontFamily: 'Lovelo, sans-serif' }}
        >
          Track Order #{order.id.substring(0, 8)}
        </h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Order Date:</p>
                <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Amount:</p>
                <p className="font-medium">{formatPrice(order.totalAmount)}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-600">Shipping Address:</p>
                <p className="font-medium">{order.address}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-600">Phone Number:</p>
                <p className="font-medium">{order.phone}</p>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">Items:</h3>
              <div className="space-y-3">
                {order.orderItems && order.orderItems.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 object-cover rounded-md" />
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-600">{item.quantity} x {formatPrice(item.product.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              {currentStatusDetails.icon}
              <div>
                <p className="text-lg font-semibold">{currentStatusDetails.label}</p>
                <p className="text-gray-600">{currentStatusDetails.description}</p>
              </div>
            </div>
            {/* You can expand this with a more detailed timeline here if needed */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}