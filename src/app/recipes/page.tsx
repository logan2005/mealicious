'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Clock, Users, ChefHat, ShoppingCart, Star } from 'lucide-react'
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

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')

  useEffect(() => {
    fetchRecipes()
  }, [])

  useEffect(() => {
    filterRecipes()
  }, [recipes, searchTerm, selectedDifficulty])

  const fetchRecipes = async () => {
    try {
      const response = await fetch('/api/recipes')
      if (response.ok) {
        const data = await response.json()
        setRecipes(data)
      }
    } catch (error) {
      console.error('Error fetching recipes:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterRecipes = () => {
    let filtered = recipes

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(recipe => recipe.difficulty === selectedDifficulty)
    }

    setFilteredRecipes(filtered)
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[orange-600]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 
            className="text-4xl font-bold text-center mb-2"
            style={{ fontFamily: 'Lovelo, sans-serif' }}
          >
            Recipes
          </h1>
          <p className="text-gray-600 text-center">Discover delicious recipes using Mealicious products</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Input
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-sm text-gray-600 flex items-center">
              {filteredRecipes.length} recipes found
            </div>
          </div>
        </div>

        {/* Recipes Grid */}
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No recipes found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <Card key={recipe.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="relative">
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      className="w-full h-48 object-cover bg-gray-200"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/300x200?text=Recipe+Image';
                      }}
                    />
                  {recipe.difficulty && (
                    <Badge className={`absolute top-4 left-4 ${getDifficultyColor(recipe.difficulty)}`}>
                      {recipe.difficulty}
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 
                    className="text-xl font-semibold mb-2"
                    style={{ fontFamily: 'Lovelo, sans-serif' }}
                  >
                    {recipe.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {recipe.description}
                  </p>
                  
                  {/* Recipe Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    {recipe.prepTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Prep: {formatTime(recipe.prepTime)}</span>
                      </div>
                    )}
                    {recipe.cookTime && (
                      <div className="flex items-center gap-1">
                        <ChefHat className="w-4 h-4" />
                        <span>Cook: {formatTime(recipe.cookTime)}</span>
                      </div>
                    )}
                    {recipe.servings && (
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>Serves: {recipe.servings}</span>
                      </div>
                    )}
                  </div>

                  <Link href={`/recipes/${recipe.id}`}>
                    <Button 
                      className="w-full bg-[orange-600] hover:bg-[orange-700]"
                    >
                      View Recipe
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