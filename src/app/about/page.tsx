
'use client'

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Target, Eye, Award, Users, Zap } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] bg-gradient-to-br from-orange-400 via-orange-300 to-amber-200 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-32 right-10 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-32 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-grid-white/20"></div>
        
        <div className="relative z-10 flex items-center justify-center min-h-[50vh] px-4">
          <div className="text-center max-w-4xl">
            {/* Animated Icon */}
            <div className="flex items-center justify-center mb-8 group">
              <div className="w-20 h-20 bg-gradient-to-br from-white to-orange-100 rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-300">
                <Heart className="w-10 h-10 text-orange-600 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            
            {/* Main Heading with Gradient */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-orange-50 to-orange-100 bg-clip-text text-transparent drop-shadow-lg">
                About
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-600 to-amber-700 bg-clip-text text-transparent">
                Mealicious
              </span>
            </h1>
            
            {/* Subtitle with animation */}
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md animate-fade-in">
              A Salem-based food brand dedicated to bringing happiness through flavour-rich, premium-quality snacks
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">

        {/* Company Overview */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-100 to-amber-100 rounded-3xl mb-6 shadow-lg">
              <Heart className="w-10 h-10 text-orange-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Our Story
              </span>
            </h2>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-orange-100">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              MEALICIOUS VENTURES PRIVATE LIMITED is a Salem-based food brand dedicated to bringing happiness through flavour-rich, premium-quality snacks. Inspired by the idea that snacking should be both delightful and wholesome, we craft a wide range of flavoured cashew nuts, mixed dry fruits, and innovative snack varieties that blend tradition with modern taste preferences.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              From carefully sourced ingredients to hygienic processing and flavour innovation, every MEALICIOUS product is designed to deliver a satisfying, guilt-free snacking experience. Our commitment is simple — quality you can trust, taste you will love.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Built with passion and driven by customer satisfaction, we aspire to become a leading brand in the healthy snacking industry by bringing products that elevate everyday snacking moments into something truly special.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center border border-orange-100 group hover:shadow-2xl transition-all duration-500">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Target className="w-10 h-10 text-orange-600 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-orange-600 transition-colors">Mission Statement</h3>
            <p className="text-gray-700 leading-relaxed">
              To offer delicious, innovative, and nutritious snack products made with premium ingredients and crafted with care — ensuring every bite delivers joy, quality, and flavour.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 text-center border border-orange-100 group hover:shadow-2xl transition-all duration-500">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Eye className="w-10 h-10 text-orange-600 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-orange-600 transition-colors">Vision Statement</h3>
            <p className="text-gray-700 leading-relaxed">
              To become India's most trusted and loved brand for flavoured nuts, dry fruits, and modern snack solutions, recognized for purity, innovation, and customer delight.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-100 to-amber-100 rounded-3xl mb-6 shadow-lg">
              <Award className="w-10 h-10 text-orange-600" />
            </div>
            <h3 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Our Core Values
              </span>
            </h3>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-orange-100">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-12 h-12 text-orange-600 group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <h4 className="font-bold text-lg mb-2 group-hover:text-orange-600 transition-colors">Quality First</h4>
                <p className="text-gray-600">Only premium ingredients, hygienic processing, and consistent standards</p>
              </div>
              <div className="text-center group">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-12 h-12 text-orange-600 group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <h4 className="font-bold text-lg mb-2 group-hover:text-orange-600 transition-colors">Customer Delight</h4>
                <p className="text-gray-600">Every product is designed around exceptional taste and experience</p>
              </div>
              <div className="text-center group">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-12 h-12 text-orange-600 group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <h4 className="font-bold text-lg mb-2 group-hover:text-orange-600 transition-colors">Innovation</h4>
                <p className="text-gray-600">New flavours, modern packaging, and creative snack concepts</p>
              </div>
              <div className="text-center group">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-12 h-12 text-orange-600 group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <h4 className="font-bold text-lg mb-2 group-hover:text-orange-600 transition-colors">Trust & Transparency</h4>
                <p className="text-gray-600">Honest sourcing, clear communication, and ethical business practices</p>
              </div>
              <div className="text-center group">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-12 h-12 text-orange-600 group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <h4 className="font-bold text-lg mb-2 group-hover:text-orange-600 transition-colors">Health & Taste Together</h4>
                <p className="text-gray-600">Snack options that balance flavour with wellness</p>
              </div>
            </div>
          </div>
        </div>

        {/* Registered Office */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center border border-orange-100">
          <h3 className="text-2xl font-bold mb-4">Registered Office</h3>
          <p className="text-gray-700">
            1/108, Elappankadu, Malankadu, Puthur Line, Uthamasolapuram,<br />
            Salem, Tamil Nadu – 636010
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
