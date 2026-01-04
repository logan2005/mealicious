'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'

interface Product {
  id: string
  name: string
  price: number
  category: string
  inStock: boolean
}

interface ComboItem {
  productId: string
  quantity: number
  product?: Product
}

export default function NewComboPage() {
  const router = useRouter()
  const { toast } = useToast()
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    discount: '',
    featured: false,
    inStock: true
  })
  
  const [products, setProducts] = useState<Product[]>([])
  const [comboItems, setComboItems] = useState<ComboItem[]>([])
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('/api/admin/products', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setProducts(data.products)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }))
  }

  const addComboItem = () => {
    setComboItems(prev => [...prev, { productId: '', quantity: 1 }])
  }

  const updateComboItem = (index: number, field: keyof ComboItem, value: any) => {
    setComboItems(prev => prev.map((item, i) => {
      if (i === index) {
        const updated = { ...item, [field]: value }
        if (field === 'productId') {
          updated.product = products.find(p => p.id === value)
        }
        return updated
      }
      return item
    }))
  }

  const removeComboItem = (index: number) => {
    setComboItems(prev => prev.filter((_, i) => i !== index))
  }

  const calculateOriginalPrice = () => {
    return comboItems.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId)
      return total + (product ? product.price * item.quantity : 0)
    }, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (comboItems.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one product to the combo",
        variant: "destructive"
      })
      return
    }

    if (comboItems.some(item => !item.productId || item.quantity < 1)) {
      toast({
        title: "Error",
        description: "Please select products and quantities for all items",
        variant: "destructive"
      })
      return
    }

    setLoading(true)

    try {
      let imageUrl = formData.imageUrl;
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);

        const uploadResponse = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadResponse.json();
        if (uploadResponse.ok && uploadData.success) {
          imageUrl = uploadData.urls[0];
        } else {
          throw new Error(uploadData.message || 'Image upload failed');
        }
      }

      const token = localStorage.getItem('adminToken')
      const response = await fetch('/api/admin/combos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          discount: parseFloat(formData.discount) || 0,
          items: comboItems
        })
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Combo created successfully"
        })
        router.push('/admin/combos')
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.error || "Failed to create combo",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error creating combo:', error)
      toast({
        title: "Error",
        description: "Failed to create combo",
        variant: "destructive"
      })
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

  const originalPrice = calculateOriginalPrice()
  const comboPrice = parseFloat(formData.price) || 0
  const savings = originalPrice - comboPrice

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/admin/combos" className="inline-flex items-center text-[orange-600] hover:underline mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Combos
          </Link>
          <h1 className="text-3xl font-bold">Create New Combo</h1>
          <p className="text-gray-600">Create a new product combo with discounted pricing</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Combo Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={3}
                  />
                </div>

                
                <div>
                  <Label htmlFor="image">Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
                {imagePreview && (
                  <div className="mt-4">
                    <img src={imagePreview} alt="Image Preview" className="w-full h-auto rounded-lg" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Pricing & Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing & Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="price">Combo Price (₹)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                  {originalPrice > 0 && comboPrice > 0 && (
                    <div className="mt-2 text-sm">
                      <div className="text-gray-600">Original: {formatPrice(originalPrice)}</div>
                      <div className="text-orange-600">You save: {formatPrice(savings)}</div>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="discount">Discount Percentage (Optional)</Label>
                  <Input
                    id="discount"
                    name="discount"
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    value={formData.discount}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="featured">Featured Combo</Label>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleSwitchChange('featured', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="inStock">In Stock</Label>
                  <Switch
                    id="inStock"
                    checked={formData.inStock}
                    onCheckedChange={(checked) => handleSwitchChange('inStock', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Combo Items */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Combo Items</CardTitle>
                <Button type="button" onClick={addComboItem} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {comboItems.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No products added yet. Click "Add Product" to start building your combo.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {comboItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="flex-1">
                        <Label>Product</Label>
                        <Select
                          value={item.productId}
                          onValueChange={(value) => updateComboItem(index, 'productId', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a product" />
                          </SelectTrigger>
                          <SelectContent>
                            {products.filter(p => p.inStock).map((product) => (
                              <SelectItem key={product.id} value={product.id}>
                                {product.name} - {formatPrice(product.price)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="w-24">
                        <Label>Quantity</Label>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateComboItem(index, 'quantity', parseInt(e.target.value))}
                        />
                      </div>
                      
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeComboItem(index)}
                        className="text-red-600 hover:text-red-700 mt-6"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading} className="bg-[orange-600] hover:bg-[orange-700]">
              {loading ? 'Creating...' : 'Create Combo'}
            </Button>
            <Link href="/admin/combos">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}