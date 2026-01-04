'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Clock, Users, ChefHat, ShoppingCart, Star, Plus, Minus } from 'lucide-react'
import Link from 'next/link'

interface Recipe {
  id: string
  title: string
  description: string
  instructions: string[]
  imageUrl: string
  prepTime?: number
  cookTime?: number
  servings?: number
  difficulty?: string
}

interface RecipeIngredient {
  id: string
  quantity: string
  notes?: string
  product: {
    id: string
    name: string
    description: string
    price: number
    imageUrl: string
  }
}

export default function RecipePage() {
  const params = useParams()
  const router = useRouter()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([])
  const [loading, setLoading] = useState(true)
  const [cartQuantities, setCartQuantities] = useState<{[key: string]: number}>({})

  useEffect(() => {
    if (params.id) {
      fetchRecipe()
      fetchIngredients()
    }
  }, [params.id])

  const fetchRecipe = async () => {
    try {
      const response = await fetch(`/api/recipes/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        // Parse JSON strings for arrays
        const parsedRecipe = {
          ...data,
          instructions: Array.isArray(data.instructions) ? data.instructions : JSON.parse(data.instructions || '[]')
        }
        setRecipe(parsedRecipe)
      }
    } catch (error) {
      console.error('Error fetching recipe:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchIngredients = async () => {
    try {
      const response = await fetch(`/api/recipes/${params.id}/ingredients`)
      if (response.ok) {
        const data = await response.json()
        setIngredients(data)
        
        // Initialize cart quantities
        const quantities: {[key: string]: number} = {}
        data.forEach((ingredient: RecipeIngredient) => {
          quantities[ingredient.product.id] = 1
        })
        setCartQuantities(quantities)
      }
    } catch (error) {
      console.error('Error fetching ingredients:', error)
    }
  }

  const addToCart = async (productId: string, quantity: number) => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login to add items to cart')
      return
    }

    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId, quantity })
      })

      if (response.ok) {
        alert('Product added to cart!')
      } else {
        alert('Failed to add product to cart')
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      alert('Error adding product to cart')
    }
  }

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCartQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, newQuantity)
    }))
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-orange-100 text-orange-800'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'Hard':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`
    }
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
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

  if (!recipe) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Recipe not found</h1>
          <Link href="/recipes">
            <Button className="bg-[orange-600] hover:bg-[orange-700]">
              Back to Recipes
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Recipe Header */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative">
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-96 object-cover bg-gray-200"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/600x400?text=Recipe+Image';
                }}
              />
              {recipe.difficulty && (
                <Badge className={`absolute top-4 left-4 ${getDifficultyColor(recipe.difficulty)}`}>
                  {recipe.difficulty}
                </Badge>
              )}
            </div>
            <div className="p-6">
              <h1 
                className="text-4xl font-bold mb-4"
                style={{ fontFamily: 'Lovelo, sans-serif' }}
              >
                {recipe.title}
              </h1>
              <p className="text-gray-600 text-lg mb-6">
                {recipe.description}
              </p>
              
              {/* Recipe Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {recipe.prepTime && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-[orange-600]" />
                    <div className="font-semibold">Prep Time</div>
                    <div className="text-sm text-gray-600">{formatTime(recipe.prepTime)}</div>
                  </div>
                )}
                {recipe.cookTime && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <ChefHat className="w-6 h-6 mx-auto mb-2 text-[orange-600]" />
                    <div className="font-semibold">Cook Time</div>
                    <div className="text-sm text-gray-600">{formatTime(recipe.cookTime)}</div>
                  </div>
                )}
                {recipe.servings && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Users className="w-6 h-6 mx-auto mb-2 text-[orange-600]" />
                    <div className="font-semibold">Servings</div>
                    <div className="text-sm text-gray-600">{recipe.servings}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recipe Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Ingredients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {ingredients.map((ingredient) => (
                    <div key={ingredient.id} className="flex justify-between items-start">
                      <div>
                        <span className="font-medium">{ingredient.quantity}</span>
                        <span className="ml-2">{ingredient.product.name}</span>
                        {ingredient.notes && (
                          <p className="text-sm text-gray-600">{ingredient.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Instructions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-[orange-600] text-white rounded-full flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 pt-1">{instruction}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Shop the Recipe Section */}
        {ingredients.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-center" style={{ fontFamily: 'Lovelo, sans-serif' }}>
              Shop the Recipe
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Get all the ingredients you need to make this delicious recipe
            </p>
            
            <Carousel className="w-full max-w-6xl mx-auto">
              <CarouselContent>
                {ingredients.map((ingredient) => (
                  <CarouselItem key={ingredient.id} className="md:basis-1/3 lg:basis-1/4">
                    <Card className="h-full">
                      <CardContent className="p-4 flex flex-col h-full">
                        <img
                          src={ingredient.product.imageUrl}
                          alt={ingredient.product.name}
                          className="w-full h-32 object-cover rounded-lg mb-4 bg-gray-200"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/150x100?text=Product+Image';
                          }}
                        />
                        <h3 className="font-semibold text-sm mb-2" style={{ fontFamily: 'Lovelo, sans-serif' }}>
                          {ingredient.product.name}
                        </h3>
                        <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                          {ingredient.product.description}
                        </p>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-lg font-bold text-[orange-600]">
                            {formatPrice(ingredient.product.price)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(ingredient.product.id, cartQuantities[ingredient.product.id] - 1)}
                            disabled={cartQuantities[ingredient.product.id] <= 1}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-sm min-w-[30px] text-center">
                            {cartQuantities[ingredient.product.id]}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(ingredient.product.id, cartQuantities[ingredient.product.id] + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <Button
                          size="sm"
                          className="w-full bg-[orange-600] hover:bg-[orange-700] mt-auto"
                          onClick={() => addToCart(ingredient.product.id, cartQuantities[ingredient.product.id])}
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Add to Cart
                        </Button>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        )}
      </div>
    </div>
  )
}