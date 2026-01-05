
'use client'

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const ContactPage = () => {
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
                <Mail className="w-10 h-10 text-orange-600 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            
            {/* Main Heading with Gradient */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-orange-50 to-orange-100 bg-clip-text text-transparent drop-shadow-lg">
                Contact
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-600 to-amber-700 bg-clip-text text-transparent">
                Us
              </span>
            </h1>
            
            {/* Subtitle with animation */}
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md animate-fade-in">
              We'd love to hear from you! Whether you have a question about our premium snacks, an order, or just want to say hello, feel free to reach out to us.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">

        {/* Contact Information Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center border border-orange-100 group hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-8 h-8 text-orange-600 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Email
            </h2>
            <p className="text-xl text-gray-700 mb-2">info@mealicious.in</p>
            <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 text-center border border-orange-100 group hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-8 h-8 text-orange-600 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Phone
            </h2>
            <p className="text-xl text-gray-700 mb-2">+91 99999 88888</p>
            <p className="text-sm text-gray-500">Mon-Sat: 9 AM to 6 PM</p>
          </div>
        </div>

        {/* Registered Office */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16 border border-orange-100">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center shadow-lg">
              <MapPin className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold ml-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Registered Office
            </h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
            MEALICIOUS VENTURES PRIVATE LIMITED<br />
            1/108, Elappankadu, Malankadu, Puthur Line, Uthamasolapuram,<br />
            Salem, Tamil Nadu – 636010<br />
            India
          </p>
        </div>

        {/* Business Hours */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16 border border-orange-100">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center shadow-lg">
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold ml-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Business Hours
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 text-center">
              <p className="font-semibold text-lg mb-2">Monday - Friday</p>
              <p className="text-orange-600 font-medium">9:00 AM - 6:00 PM</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 text-center">
              <p className="font-semibold text-lg mb-2">Saturday</p>
              <p className="text-orange-600 font-medium">9:00 AM - 4:00 PM</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 text-center">
              <p className="font-semibold text-lg mb-2">Sunday</p>
              <p className="text-red-500 font-medium">Closed</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 text-center">
              <p className="font-semibold text-lg mb-2">Public Holidays</p>
              <p className="text-red-500 font-medium">Closed</p>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-6">
            Follow us on social media for updates on new products and special offers!
          </p>
          <div className="flex justify-center space-x-4">
            {/* Add social media links here if available */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
