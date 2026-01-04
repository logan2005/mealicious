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
import { ArrowLeft, Upload, X, Plus, Minus } from 'lucide-react'

interface Recipe {
  id: string
  title: string
  description: string
  instructions: string[]
  imageUrl: string
  prepTime: number
  cookTime: number
  servings: number
  difficulty: string
}

interface RecipeIngredient {
  productId: string
  quantity: string
  notes: string
}

export default function EditRecipePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [products, setProducts] = useState<any[]>([])
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([])
  
  const [formData, setFormData] = useState<Recipe>({
    id: '',
    title: '',
    description: '',
    instructions: [],
    imageUrl: '',
    prepTime: 0,
    cookTime: 0,
    servings: 0,
    difficulty: ''
  })

  const difficulties = ['Easy', 'Medium', 'Hard']

  useEffect(() => {
    checkAuth()
    fetchProducts()
    fetchRecipe()
  }, [id])

  const checkAuth = () => {
    const adminToken = localStorage.getItem('adminToken')
    if (!adminToken) {
      router.push('/admin/login')
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const fetchRecipe = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/recipes/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch recipe')
      }
      const recipeData = await response.json()
      setFormData({
        ...recipeData,
        instructions: Array.isArray(recipeData.instructions) ? recipeData.instructions.join('\n') : recipeData.instructions || '',
      })
      setIngredients(recipeData.ingredients || [])
      setImagePreview(recipeData.imageUrl || '')
    } catch (err: any) {
      setError(err.message || 'Error fetching recipe details')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview('')
    setFormData(prev => ({ ...prev, imageUrl: '' })) // Clear imageUrl in form data
  }

  const handleInputChange = (field: keyof Recipe, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addIngredient = () => {
    setIngredients([...ingredients, { productId: '', quantity: '', notes: '' }])
  }

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  const updateIngredient = (index: number, field: keyof RecipeIngredient, value: string) => {
    const newIngredients = [...ingredients]
    newIngredients[index] = { ...newIngredients[index], [field]: value }
    setIngredients(newIngredients)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const adminToken = localStorage.getItem('adminToken')
      
      let finalImageUrl = formData.imageUrl
      if (imageFile) {
        const uploadFormData = new FormData()
        uploadFormData.append('file', imageFile)

        const uploadResponse = await fetch('/api/upload-image', {
          method: 'POST',
          body: uploadFormData,
        })

        const uploadData = await uploadResponse.json()
        if (uploadResponse.ok && uploadData.success && uploadData.urls && uploadData.urls.length > 0) {
          finalImageUrl = uploadData.urls[0]
        } else {
          throw new Error(uploadData.message || 'Image upload failed')
        }
      }

      const recipeData = {
        ...formData,
        imageUrl: finalImageUrl,
        instructions: formData.instructions.split('\n').filter(line => line.trim() !== ''),
        ingredients: ingredients.filter(ing => ing.productId && ing.quantity)
      }

      const response = await fetch(`/api/admin/recipes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify(recipeData)
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Recipe updated successfully!')
        setTimeout(() => {
          router.push('/admin')
        }, 2000)
      } else {
        setError(data.error || 'Failed to update recipe')
      }
    } catch (error) {
      console.error('Error updating recipe:', error)
      setError('An error occurred while updating the recipe')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>Loading recipe...</p>
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
          <h1 className="text-3xl font-bold mt-4">Edit Recipe</h1>
          <p className="text-gray-600">Modify recipe details</p>
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
                  <CardDescription>Enter the basic recipe details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Recipe Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="prepTime">Prep Time (min)</Label>
                      <Input
                        id="prepTime"
                        type="number"
                        min="1"
                        value={formData.prepTime}
                        onChange={(e) => handleInputChange('prepTime', parseInt(e.target.value))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cookTime">Cook Time (min)</Label>
                      <Input
                        id="cookTime"
                        type="number"
                        min="1"
                        value={formData.cookTime}
                        onChange={(e) => handleInputChange('cookTime', parseInt(e.target.value))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="servings">Servings</Label>
                      <Input
                        id="servings"
                        type="number"
                        min="1"
                        value={formData.servings}
                        onChange={(e) => handleInputChange('servings', parseInt(e.target.value))}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select value={formData.difficulty} onValueChange={(value) => handleInputChange('difficulty', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        {difficulties.map(difficulty => (
                          <SelectItem key={difficulty} value={difficulty}>
                            {difficulty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recipe Ingredients</CardTitle>
                  <CardDescription>Add products used in this recipe</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {ingredients.map((ingredient, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Ingredient {index + 1}</h4>
                        {ingredients.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeIngredient(index)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div>
                        <Label>Product</Label>
                        <Select 
                          value={ingredient.productId} 
                          onValueChange={(value) => updateIngredient(index, 'productId', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a product" />
                          </SelectTrigger>
                          <SelectContent>
                            {products.map(product => (
                              <SelectItem key={product.id} value={product.id}>
                                {product.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label>Quantity</Label>
                          <Input
                            value={ingredient.quantity}
                            onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
                            placeholder="e.g., 1 cup, 200g"
                          />
                        </div>
                        <div>
                          <Label>Notes (optional)</Label>
                          <Input
                            value={ingredient.notes}
                            onChange={(e) => updateIngredient(index, 'notes', e.target.value)}
                            placeholder="e.g., chopped, fresh"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addIngredient}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Ingredient
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Image & Instructions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recipe Image</CardTitle>
                  <CardDescription>Upload a recipe image</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="image">Upload Image</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="cursor-pointer"
                    />
                  </div>

                  {imagePreview && (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Recipe preview"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cooking Instructions</CardTitle>
                  <CardDescription>Step-by-step cooking instructions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="instructions">Instructions</Label>
                    <Textarea
                      id="instructions"
                      value={formData.instructions}
                      onChange={(e) => handleInputChange('instructions', e.target.value)}
                      rows={12}
                      placeholder="Enter step-by-step cooking instructions. You can use numbered lists or separate steps with new lines."
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button type="submit" disabled={loading} className="bg-[orange-600] hover:bg-[orange-700]">
              {loading ? 'Updating Recipe...' : 'Update Recipe'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}