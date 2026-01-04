
'use client'

import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

declare const Razorpay: any;

const CheckoutPage = () => {
  const { clearCart } = useCart(); // Only need clearCart from context
  const [checkoutCartItems, setCheckoutCartItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    console.log('Checkout page loaded');
    console.log('Environment Check - NEXT_PUBLIC_RAZORPAY_KEY_ID:', process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);
    console.log('Environment Check - Is Live Key:', process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.startsWith('rzp_live_'));
    console.log('Environment Check - Is Test Key:', process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.startsWith('rzp_test_'));
    const storedCheckoutData = localStorage.getItem('checkoutData');
    if (storedCheckoutData) {
      const { cartItems, total: storedTotal, shippingDetails } = JSON.parse(storedCheckoutData);
      console.log('Retrieved checkoutData from localStorage:', { cartItems, storedTotal, shippingDetails });
      setCheckoutCartItems(cartItems || []);
      setTotal(storedTotal || 0);
      setAddress(shippingDetails?.address || '');
      setPhone(shippingDetails?.phone || '');
    }
    const user = localStorage.getItem('user');
    if (user) {
      setUserEmail(JSON.parse(user).email);
    }
    setIsPageLoading(false);
  }, []);

  const handlePayment = async () => {
    console.log('handlePayment called');
    console.log('Total amount being sent to backend:', total);
    console.log('Razorpay Key ID being used:', process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);

    if (total <= 0) {
      alert('Cart total is zero or negative. Please add items to your cart.');
      console.error('Attempted payment with zero or negative total.');
      return;
    }

    // Check minimum payment amount (Razorpay minimum is ₹1.00)
    const minimumAmount = 1.00;
    if (total < minimumAmount) {
      alert(`Minimum Order Amount Required!\n\nYour current total is ₹${total.toFixed(2)}\nMinimum required amount is ₹${minimumAmount.toFixed(2)}\n\nPlease add more items to your cart to continue with the payment.`);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          shippingDetails: { address, phone },
          frontendCartItems: checkoutCartItems.map(item => ({ productId: item.product.id, quantity: item.quantity, price: item.product.price })),
          frontendTotal: total,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error from /api/orders/create:', errorData);
        
        // Handle minimum amount error specifically
        if (errorData.error === 'Minimum Order Amount') {
          alert(`Minimum Order Amount Required!\n\n${errorData.message}\n\nCurrent total: ₹${errorData.currentAmount}\nMinimum required: ₹${errorData.minimumAmount}\n\nPlease add more items to your cart to continue with the payment.`);
        } else {
          alert(`Failed to create order: ${errorData.error || 'Unknown error'}`);
        }
        return;
      }

      const { razorpayOrder, orderId } = await response.json();
      console.log('Received order from backend:', razorpayOrder);

      if (!razorpayOrder || !razorpayOrder.amount || !razorpayOrder.id) {
        console.error('Invalid order object received from backend:', razorpayOrder);
        alert('Failed to create order: Invalid response from server.');
        return;
      }

      const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      
      if (!razorpayKeyId) {
        console.error('Razorpay Key ID not configured');
        alert('Payment configuration error. Please contact support.');
        return;
      }

      console.log('Razorpay Key ID:', razorpayKeyId);
      console.log('Is Live Mode:', razorpayKeyId.startsWith('rzp_live_'));

      const options = {
        key: razorpayKeyId,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'Mealicious',
        description: 'Payment for your order',
        order_id: razorpayOrder.id,
        handler: async (response: any) => {
          console.log('Razorpay payment successful:', response);

          const res = await fetch('/api/payment-verification', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const responseText = await res.text();
          console.log('Payment verification response text:', responseText);
          try {
            const { success, redirectUrl } = JSON.parse(responseText);
          console.log('Payment verification response JSON:', { success, redirectUrl });

          if (success) {
            await clearCart();
            localStorage.removeItem('checkoutData');
            window.location.href = redirectUrl;
          } else {
            alert('Payment failed. Please try again.');
          }
          } catch (error) {
            console.error('Failed to parse payment verification response:', error);
            alert('An unexpected error occurred during payment verification. Please check console for details.');
          }
        },
        prefill: {
          name: 'Test User',
          email: userEmail,
          contact: phone,
        },
        notes: {
          address: address,
        },
        theme: {
          color: 'orange-600',
        },
      };

      const rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Error during payment process:', error);
      alert('An unexpected error occurred during payment. Please check console for details.');
    }
  };

  if (isPageLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[orange-600]"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Order Summary</h2>
          <div className="space-y-4">
            {checkoutCartItems.map((item: any) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.product.name} x {item.quantity}</span>
                <span>₹{item.product.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Shipping Details</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="address">Address</Label>
              <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} readOnly />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} readOnly />
            </div>
          </div>
          <Button onClick={handlePayment} className="mt-4 w-full bg-[orange-600] hover:bg-[orange-700]">
            Pay with Razorpay
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
