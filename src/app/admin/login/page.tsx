'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Heart, Eye, EyeOff, Shield } from 'lucide-react'

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        // Store admin token in localStorage
        localStorage.setItem('adminToken', data.token)
        localStorage.setItem('adminUser', JSON.stringify(data.user))
        
        setSuccess('Admin login successful! Redirecting to dashboard...')
        
        // Redirect to admin dashboard after successful login
        setTimeout(() => {
          router.push('/admin')
        }, 1500)
      } else {
        setError(data.error || 'Admin login failed')
      }
    } catch (error) {
      console.error('Admin login error:', error)
      setError('An error occurred during admin login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
          </div>
          <h2 
            className="mt-6 text-3xl font-bold text-gray-900"
            style={{ fontFamily: 'Lovelo, sans-serif' }}
          >
            Admin Portal
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access the admin dashboard
          </p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <Shield className="w-5 h-5" />
              Admin Sign in
            </CardTitle>
            <CardDescription className="text-center">
              Enter your admin credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert className="border-orange-200 bg-orange-50 text-orange-800">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Admin Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter admin email"
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Admin Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter admin password"
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                {loading ? 'Signing in...' : 'Admin Sign in'}
              </Button>
              
              <div className="text-center text-sm">
                <span className="text-gray-600">User login? </span>
                <Link href="/login" className="text-[orange-600] hover:underline font-medium">
                  User Login
                </Link>
              </div>
              
              <div className="text-center text-sm">
                <Link href="/signup" className="text-[orange-600] hover:underline font-medium">
                  Create User Account
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}