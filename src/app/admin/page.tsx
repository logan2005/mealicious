'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  LayoutDashboard, 
  Package, 
  BookOpen, 
  ShoppingCart, 
  Users, 
  LogOut,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Eye,
  Star,
  Gift
} from 'lucide-react'

interface DashboardStats {
  totalProducts: number
  totalRecipes: number
  totalOrders: number
  totalUsers: number
  recentOrders: any[]
  lowStockProducts: any[]
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  inStock: boolean
  featured: boolean
  imageUrl: string
}

interface Recipe {
  id: string
  title: string
  description: string
  difficulty: string
  imageUrl: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalRecipes: 0,
    totalOrders: 0,
    totalUsers: 0,
    recentOrders: [],
    lowStockProducts: []
  })
  const [products, setProducts] = useState<Product[]>([])
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
    fetchDashboardData()
  }, [])

  const checkAuth = () => {
    const adminToken = localStorage.getItem('adminToken')
    if (!adminToken) {
      router.push('/admin/login')
    }
  }

  const fetchDashboardData = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken')
      
      // Fetch dashboard stats
      const [statsRes, productsRes, recipesRes] = await Promise.all([
        fetch('/api/admin/dashboard', {
          headers: { 'Authorization': `Bearer ${adminToken}` }
        }),
        fetch('/api/admin/products', {
          headers: { 'Authorization': `Bearer ${adminToken}` }
        }),
        fetch('/api/recipes')
      ])

      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData)
      }

      if (productsRes.ok) {
        const productsData = await productsRes.json()
        setProducts(productsData.products || [])
      }

      if (recipesRes.ok) {
        const recipesData = await recipesRes.json()
        setRecipes(recipesData)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    router.push('/admin/login')
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price)
  }

  const handleDeleteProduct = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete the product "${name}"?`)) {
      try {
        const adminToken = localStorage.getItem('adminToken')
        const response = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${adminToken}` }
        })

        if (response.ok) {
          setProducts(products.filter(p => p.id !== id))
          fetchDashboardData() // Re-fetch stats to update product count
        } else {
          const data = await response.json()
          alert(`Failed to delete product: ${data.error || 'Unknown error'}`)
        }
      } catch (error) {
        console.error('Error deleting product:', error)
        alert('An error occurred while deleting the product.')
      }
    }
  }

  const handleDeleteRecipe = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete the recipe "${title}"?`)) {
      try {
        const adminToken = localStorage.getItem('adminToken')
        const response = await fetch(`/api/recipes/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${adminToken}` }
        })

        if (response.ok) {
          setRecipes(recipes.filter(r => r.id !== id))
          fetchDashboardData() // Re-fetch stats to update recipe count
        } else {
          const data = await response.json()
          alert(`Failed to delete recipe: ${data.error || 'Unknown error'}`)
        }
      } catch (error) {
        console.error('Error deleting recipe:', error)
        alert('An error occurred while deleting the recipe.')
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-red-600">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, Admin</span>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">Active products</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Recipes</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRecipes}</div>
              <p className="text-xs text-muted-foreground">Available recipes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">Orders placed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="combos">Combos</TabsTrigger>
            <TabsTrigger value="recipes">Recipes</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="orders"><Link href="/admin/orders">Orders</Link></TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest customer orders</CardDescription>
                </CardHeader>
                <CardContent>
                  {stats.recentOrders.length > 0 ? (
                    <div className="space-y-4">
                      {stats.recentOrders.slice(0, 5).map((order) => (
                        <div key={order.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Order #{order.id}</p>
                            <p className="text-sm text-gray-600">{order.user?.name || 'Unknown'}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                              {order.status}
                            </Badge>
                            <p className="text-sm font-medium">{formatPrice(order.total)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No recent orders</p>
                  )}
                </CardContent>
              </Card>

              {/* Low Stock Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle>Out of Stock Products</CardTitle>
                  <CardDescription>Products that are currently out of stock</CardDescription>
                </CardHeader>
                <CardContent>
                  {stats.lowStockProducts.length > 0 ? (
                    <div className="space-y-4">
                      {stats.lowStockProducts.slice(0, 5).map((product) => (
                        <div key={product.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-600">{product.inStock ? 'In Stock' : 'Out of Stock'}</p>
                          </div>
                          <Badge variant="destructive">Out of Stock</Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">All products are in stock</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Products Management</h2>
                <p className="text-gray-600">Manage your product catalog</p>
              </div>
              <Link href="/admin/products/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow flex flex-col">
                  <CardContent className="p-4 flex flex-col flex-grow min-h-[350px]">
                    <div className="aspect-square bg-gray-200 rounded-lg mb-4 overflow-hidden">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/300x300?text=Product';
                        }}
                      />
                    </div>
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{product.category}</p>
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                      {product.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <p className="text-lg font-bold text-[orange-600]">
                        {formatPrice(product.price)}
                      </p>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteProduct(product.id, product.name)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <Link href={`/admin/products/${product.id}/edit`}>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="combos" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Combo Management</h2>
                <p className="text-gray-600">Manage product combos and deals</p>
              </div>
              <Link href="/admin/combos">
                <Button>
                  <Gift className="w-4 h-4 mr-2" />
                  Manage Combos
                </Button>
              </Link>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Combo management actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href="/admin/combos">
                    <Button variant="outline" className="w-full h-20 flex-col">
                      <Eye className="w-6 h-6 mb-2" />
                      View All Combos
                    </Button>
                  </Link>
                  <Link href="/admin/combos/new">
                    <Button variant="outline" className="w-full h-20 flex-col">
                      <Plus className="w-6 h-6 mb-2" />
                      Create New Combo
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full h-20 flex-col" disabled>
                    <TrendingUp className="w-6 h-6 mb-2" />
                    Combo Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recipes" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Recipes Management</h2>
                <p className="text-gray-600">Manage your recipe collection</p>
              </div>
              <Link href="/admin/recipes/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Recipe
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <Card key={recipe.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gray-200 rounded-lg mb-4 overflow-hidden">
                      <img
                        src={recipe.imageUrl}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/300x300?text=Recipe';
                        }}
                      />
                    </div>
                    <h3 className="font-semibold mb-2">{recipe.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{recipe.difficulty}</p>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {recipe.description}
                    </p>
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteRecipe(recipe.id, recipe.title)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Link href={`/admin/recipes/${recipe.id}/edit`}>
                        <Button size="sm" variant="outline" className="ml-2">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Reviews Management</h2>
                <p className="text-gray-600">Manage product reviews and ratings</p>
              </div>
              <Link href="/admin/reviews">
                <Button>
                  <Star className="w-4 h-4 mr-2" />
                  Manage Reviews
                </Button>
              </Link>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Review management actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href="/admin/reviews">
                    <Button variant="outline" className="w-full h-20 flex-col">
                      <Eye className="w-6 h-6 mb-2" />
                      View All Reviews
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full h-20 flex-col" disabled>
                    <Star className="w-6 h-6 mb-2" />
                    Review Analytics
                    </Button>
                  <Button variant="outline" className="w-full h-20 flex-col" disabled>
                    <Trash2 className="w-6 h-6 mb-2" />
                    Moderate Reviews
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Orders Management</h2>
              <p className="text-gray-600">Track and manage customer orders</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Orders</CardTitle>
                <CardDescription>View and manage all customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                {stats.recentOrders.length > 0 ? (
                  <div className="space-y-4">
                    {stats.recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Order #{order.id}</p>
                          <p className="text-sm text-gray-600">{order.user?.name || 'Unknown'}</p>
                          <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                            {order.status}
                          </Badge>
                          <p className="text-sm font-medium mt-1">{formatPrice(order.total)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No orders found</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Inventory Management</h2>
              <p className="text-gray-600">Manage product availability and inventory status</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Product Availability */}
              <Card>
                <CardHeader>
                  <CardTitle>Product Availability</CardTitle>
                  <CardDescription>Current availability status for all products</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://via.placeholder.com/50x50?text=Product';
                            }}
                          />
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-600">{product.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={product.inStock ? "default" : "destructive"}>
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">
                            Stock: {Math.floor(Math.random() * 100)} units
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Low Stock Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Alerts</CardTitle>
                  <CardDescription>Products that need attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.lowStockProducts.length > 0 ? (
                      stats.lowStockProducts.map((product) => (
                        <div key={product.id} className="flex items-center justify-between p-3 border border-red-200 bg-red-50 rounded-lg">
                          <div>
                            <p className="font-medium text-red-800">{product.name}</p>
                            <p className="text-sm text-red-600">Product is out of stock</p>
                          </div>
                          <Badge variant="destructive">Critical</Badge>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">All products are in stock</p>
                        <p className="text-sm text-gray-400 mt-2">No out of stock alerts at this time</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Inventory Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Inventory Summary</CardTitle>
                <CardDescription>Overall inventory statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">
                      {products.filter(p => p.inStock).length}
                    </p>
                    <p className="text-sm text-orange-700">In Stock</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <p className="text-2xl font-bold text-red-600">
                      {products.filter(p => !p.inStock).length}
                    </p>
                    <p className="text-sm text-red-700">Out of Stock</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600">
                      {stats.lowStockProducts.length}
                    </p>
                    <p className="text-sm text-yellow-700">Low Stock</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">
                      {products.reduce((sum, p) => sum + Math.floor(Math.random() * 100), 0)}
                    </p>
                    <p className="text-sm text-blue-700">Total Units</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}