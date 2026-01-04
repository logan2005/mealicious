'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/contexts/cart-context'
import { useToast } from '@/hooks/use-toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

export default function CartPage() {
  const { 
    cartItems, 
    isLoading, 
    updateQuantity, 
    removeFromCart, 
    refreshCart 
  } = useCart()
  const [shippingAddressLine1, setShippingAddressLine1] = useState('')
  const [shippingAddressLine2, setShippingAddressLine2] = useState('')
  const [shippingCity, setShippingCity] = useState('')
  const [shippingPincode, setShippingPincode] = useState('')
  const [shippingLandmark, setShippingLandmark] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const { subtotal, tax, shipping, total } = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    const tax = subtotal * 0.05 // 5% tax
    const shipping = 0 // Shipping temporarily disabled for testing
    const total = subtotal + tax + shipping
    return { subtotal, tax, shipping, total }
  }, [cartItems])

  useEffect(() => {
    refreshCart()
  }, [])

  const proceedToCheckout = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthModalOpen(true);
      return;
    }

    if (cartItems.length === 0) {
      toast({ title: "Cart Empty", description: "Please add items to your cart before proceeding to checkout.", variant: "destructive" });
      return;
    }

    if (!shippingAddressLine1.trim() || !shippingCity.trim() || !shippingPincode.trim() || !phoneNumber.trim()) {
      toast({ title: "Validation Error", description: "Please fill in all required shipping fields.", variant: "destructive" });
      return;
    }

    const shippingDetails = {
      address: `${shippingAddressLine1}, ${shippingAddressLine2 ? shippingAddressLine2 + ', ' : ''}${shippingLandmark ? shippingLandmark + ', ' : ''}${shippingCity} - ${shippingPincode}`,
      phone: phoneNumber
    };

    // Store cart items and total in localStorage for checkout page
    localStorage.setItem('checkoutData', JSON.stringify({
      cartItems: cartItems.map(item => ({ // Only store necessary product details
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        product: {
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          imageUrl: item.product.imageUrl,
        }
      })),
      total,
      shippingDetails,
    }));

    router.push('/checkout');

  }, [shippingAddressLine1, shippingAddressLine2, shippingCity, shippingPincode, shippingLandmark, phoneNumber, toast, router, cartItems, total]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[orange-600]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 
            className="text-4xl font-bold text-center mb-2"
            style={{ fontFamily: 'Lovelo, sans-serif' }}
          >
            Shopping Cart
          </h1>
          <p className="text-gray-600 text-center">Review your items and proceed to checkout</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-24 h-24 mx-auto mb-4 text-gray-400" />
            <h3 className="text-2xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-6">Add some delicious millet snacks to get started!</p>
            <Link href="/products">
              <Button className="bg-[orange-600] hover:bg-[orange-700]">
                Shop Now
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="min-w-0">
                            <h3 className="font-semibold text-lg" style={{ fontFamily: 'Lovelo, sans-serif' }}>
                              {item.product.name}
                            </h3>
                            <p className="text-gray-600 text-sm truncate whitespace-nowrap">{item.product.description}</p>
                            <Badge className="mt-2 bg-gray-100 text-gray-800">
                              {item.product.category}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-12 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-600">
                              {formatPrice(item.product.price)} × {item.quantity}
                            </div>
                            <div className="text-lg font-bold text-[orange-600]">
                              {formatPrice(item.product.price * item.quantity)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                      <span>Total</span>
                      <span className="text-[orange-600]">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="addressLine1">Address Line 1</Label>
                      <Input
                        id="addressLine1"
                        placeholder="House No., Building, Street, Area"
                        value={shippingAddressLine1}
                        onChange={(e) => setShippingAddressLine1(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                      <Input
                        id="addressLine2"
                        placeholder="Apartment, Suite, Unit, Floor"
                        value={shippingAddressLine2}
                        onChange={(e) => setShippingAddressLine2(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="landmark">Landmark (Optional)</Label>
                      <Input
                        id="landmark"
                        placeholder="E.g., Near Apollo Hospital"
                        value={shippingLandmark}
                        onChange={(e) => setShippingLandmark(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="Your City"
                        value={shippingCity}
                        onChange={(e) => setShippingCity(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        placeholder="Your Pincode"
                        value={shippingPincode}
                        onChange={(e) => setShippingPincode(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="Enter your phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-[orange-600] hover:bg-[orange-700]"
                    onClick={proceedToCheckout}
                    disabled={total < 1.00}
                  >
                    <ArrowRight className="mr-2 h-5 w-5" />
                    Proceed to Checkout
                  </Button>

                  {total < 1.00 && total > 0 && (
                    <div className="text-center text-sm text-red-600 bg-red-50 p-2 rounded">
                      Minimum order amount is ₹1.00. Add ₹{(1.00 - total).toFixed(2)} more to proceed.
                    </div>
                  )}

                  {subtotal < 500 && (
                    <div className="text-center text-sm text-gray-600">
                      Add {formatPrice(500 - subtotal)} more for FREE shipping!
                    </div>
                  )}

                  <div className="text-center">
                    <Link href="/products" className="text-[orange-600] hover:underline text-sm">
                      Continue Shopping
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
      <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Authentication Required</DialogTitle>
            <DialogDescription>
              To proceed with your order, please log in or create an account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button asChild variant="outline">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="bg-[orange-600] hover:bg-[orange-700]">
              <Link href="/signup">Create Account</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}