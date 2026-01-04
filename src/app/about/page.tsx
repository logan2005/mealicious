
'use client'

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Target, Eye, Award, Users, Zap } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About Mealicious</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A Salem-based food brand dedicated to bringing happiness through flavour-rich, premium-quality snacks
          </p>
        </div>

        {/* Company Overview */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <Heart className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            </div>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              MEALICIOUS VENTURES PRIVATE LIMITED is a Salem-based food brand dedicated to bringing happiness through flavour-rich, premium-quality snacks. Inspired by the idea that snacking should be both delightful and wholesome, we craft a wide range of flavoured cashew nuts, mixed dry fruits, and innovative snack varieties that blend tradition with modern taste preferences.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              From carefully sourced ingredients to hygienic processing and flavour innovation, every MEALICIOUS product is designed to deliver a satisfying, guilt-free snacking experience. Our commitment is simple — quality you can trust, taste you will love.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Built with passion and driven by customer satisfaction, we aspire to become a leading brand in the healthy snacking industry by bringing products that elevate everyday snacking moments into something truly special.
            </p>
          </CardContent>
        </Card>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardContent className="p-8 text-center">
              <Target className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Mission Statement</h3>
              <p className="text-gray-700">
                To offer delicious, innovative, and nutritious snack products made with premium ingredients and crafted with care — ensuring every bite delivers joy, quality, and flavour.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8 text-center">
              <Eye className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Vision Statement</h3>
              <p className="text-gray-700">
                To become India's most trusted and loved brand for flavoured nuts, dry fruits, and modern snack solutions, recognized for purity, innovation, and customer delight.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <Award className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold">Our Core Values</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Quality First</h4>
                <p className="text-gray-600">Only premium ingredients, hygienic processing, and consistent standards</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Customer Delight</h4>
                <p className="text-gray-600">Every product is designed around exceptional taste and experience</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Innovation</h4>
                <p className="text-gray-600">New flavours, modern packaging, and creative snack concepts</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Eye className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Trust & Transparency</h4>
                <p className="text-gray-600">Honest sourcing, clear communication, and ethical business practices</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Health & Taste Together</h4>
                <p className="text-gray-600">Snack options that balance flavour with wellness</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Registered Office */}
        <Card>
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Registered Office</h3>
            <p className="text-gray-700">
              1/108, Elappankadu, Malankadu, Puthur Line, Uthamasolapuram,<br />
              Salem, Tamil Nadu – 636010
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
