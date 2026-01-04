'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, Upload, X } from 'lucide-react'

interface Product {
  id: string;
  name: string
  description: string
  price: number
  category: string
  imageUrl: string
  images: string[]
  ingredients: string[]
  nutrition: Record<string, any>
  inStock: boolean
  featured: boolean
}

import { useParams } from 'next/navigation';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(true) // Set to true initially for loading state
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  
  const [formData, setFormData] = useState<Product>({
    id: '',
    name: '',
    description: '',
    price: 0,
    category: '',
    imageUrl: '',
    images: [],
    ingredients: [],
    nutrition: {},
    inStock: true,
    featured: false
  })

  const categories = [
    'Spicy', 'Sweet', 'Savory', 'Crunchy', 'Healthy', 'Traditional', 'Modern'
  ]

  useEffect(() => {
    checkAuth()
    fetchProduct()
  }, [id])

  const checkAuth = () => {
    const adminToken = localStorage.getItem('adminToken')
    if (!adminToken) {
      router.push('/admin/login')
    }
  }

  const fetchProduct = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/products/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch product')
      }
      const productData = await response.json()
      setFormData({
        ...productData,
        // Ensure nutrition is parsed if it's a string
        nutrition: typeof productData.nutrition === 'string' ? JSON.parse(productData.nutrition) : productData.nutrition,
        // Initialize image previews from existing URLs
        imageUrl: productData.imageUrl || '',
        images: productData.images || [],
      })
      setImagePreviews([productData.imageUrl, ...(productData.images || [])].filter(Boolean)) // Filter out empty strings
    } catch (err: any) {
      setError(err.message || 'Error fetching product details')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const newFiles = [...imageFiles, ...files]
    const newPreviews = [...imagePreviews]
    
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        newPreviews.push(e.target?.result as string)
        setImagePreviews([...newPreviews])
      }
      reader.readAsDataURL(file)
    })
    
    setImageFiles(newFiles)
  }

  const removeImage = (index: number) => {
    const newFiles = imageFiles.filter((_, i) => i !== index)
    const newPreviews = imagePreviews.filter((_, i) => i !== index)
    setImageFiles(newFiles)
    setImagePreviews(newPreviews)
    
    // If removing an already uploaded image, clear it from formData
    if (index === 0 && formData.imageUrl === imagePreviews[index]) {
      setFormData(prev => ({ ...prev, imageUrl: '' }))
    } else if (formData.images.includes(imagePreviews[index])) {
      setFormData(prev => ({ ...prev, images: prev.images.filter(url => url !== imagePreviews[index]) }))
    }
  }

  const handleInputChange = (field: keyof Product, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const adminToken = localStorage.getItem('adminToken')
      
      // Upload new images to Cloudinary
      const newUploadedImageUrls: string[] = []
      for (const file of imageFiles) {
        const formData = new FormData()
        formData.append('file', file)

        const uploadResponse = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData,
        })

        const uploadData = await uploadResponse.json()
        if (uploadResponse.ok && uploadData.success) {
          newUploadedImageUrls.push(...uploadData.urls)
        } else {
          throw new Error(uploadData.message || 'Image upload failed')
        }
      }

      // Combine existing and newly uploaded images
      let finalMainImageUrl = formData.imageUrl;
      let finalAdditionalImageUrls = [...formData.images];

      if (newUploadedImageUrls.length > 0) {
        if (!finalMainImageUrl) { // If no main image, use the first new one
          finalMainImageUrl = newUploadedImageUrls[0];
          finalAdditionalImageUrls.push(...newUploadedImageUrls.slice(1));
        } else { // Otherwise, add all new images to additional
          finalAdditionalImageUrls.push(...newUploadedImageUrls);
        }
      }

      const productData = {
        ...formData,
        imageUrl: finalMainImageUrl,
        images: finalAdditionalImageUrls,
        ingredients: formData.ingredients.filter(ing => ing.trim() !== ''),
        nutrition: JSON.stringify(formData.nutrition) // Ensure nutrition is stringified
      }

      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify(productData)
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Product updated successfully!')
        setTimeout(() => {
          router.push('/admin')
        }, 2000)
      } else {
        setError(data.error || 'Failed to update product')
      }
    } catch (error) {
      console.error('Error updating product:', error)
      setError('An error occurred while updating the product')
    } finally {
      setLoading(false)
    }
  }

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }))
  }

  const updateIngredient = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.map((ing, i) => i === index ? value : ing)
    }))
  }

  const removeIngredient = (index: number) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }))
  }

  const addNutritionField = () => {
    const key = prompt('Enter nutrition field name (e.g., calories, protein):')
    if (key) {
      setFormData(prev => ({
        ...prev,
        nutrition: {
          ...prev.nutrition,
          [key]: 0
        }
      }))
    }
  }

  const updateNutritionField = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      nutrition: {
        ...prev.nutrition,
        [key]: parseFloat(value) || 0
      }
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>Loading product...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/admin" className="inline-flex items-center text-[orange-600] hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold mt-4">Edit Product</h1>
          <p className="text-gray-600">Modify product details</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert className="border-orange-200 bg-orange-50 text-orange-800 mb-6">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Basic Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Enter the basic product details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="inStock"
                        checked={formData.inStock}
                        onChange={(e) => handleInputChange('inStock', e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor="inStock">In Stock</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={formData.featured}
                        onChange={(e) => handleInputChange('featured', e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor="featured">Featured Product</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Images & Additional Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                  <CardDescription>Upload product images</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="images">Upload Images</Label>
                    <div className="mt-2">
                      <Input
                        id="images"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>

                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 gap-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ingredients</CardTitle>
                  <CardDescription>List the product ingredients</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={ingredient}
                        onChange={(e) => updateIngredient(index, e.target.value)}
                        placeholder="Enter ingredient"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeIngredient(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addIngredient}
                    className="w-full"
                  >
                    Add Ingredient
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Nutritional Information</CardTitle>
                  <CardDescription>Add nutritional details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(formData.nutrition).map(([key, value]) => (
                    <div key={key} className="flex gap-2">
                      <Input
                        value={key}
                        onChange={(e) => {
                          const newNutrition = { ...formData.nutrition }
                          delete newNutrition[key]
                          newNutrition[e.target.value] = value
                          handleInputChange('nutrition', newNutrition)
                        }}
                        placeholder="Nutrient name"
                      />
                      <Input
                        value={value}
                        onChange={(e) => updateNutritionField(key, e.target.value)}
                        placeholder="Value"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newNutrition = { ...formData.nutrition }
                          delete newNutrition[key]
                          handleInputChange('nutrition', newNutrition)
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addNutritionField}
                    className="w-full"
                  >
                    Add Nutrition Field
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button type="submit" disabled={loading} className="bg-[orange-600] hover:bg-[orange-700]">
              {loading ? 'Updating Product...' : 'Update Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}