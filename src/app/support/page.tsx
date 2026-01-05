
'use client';

import React from 'react';
import { Headphones, MessageCircle, HelpCircle, Mail, Phone, MapPin } from 'lucide-react';

const Support: React.FC = () => {
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
                <Headphones className="w-10 h-10 text-orange-600 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            
            {/* Main Heading with Gradient */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-orange-50 to-orange-100 bg-clip-text text-transparent drop-shadow-lg">
                Support
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-600 to-amber-700 bg-clip-text text-transparent">
                Center
              </span>
            </h1>
            
            {/* Subtitle with animation */}
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md animate-fade-in">
              We're here to help! Get in touch with our team for any questions or assistance.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Contact Information Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
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
            <p className="text-sm text-gray-500">Response within 24 hours</p>
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

          <div className="bg-white rounded-3xl shadow-xl p-8 text-center border border-orange-100 group hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-8 h-8 text-orange-600 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Office
            </h2>
            <p className="text-sm text-gray-700">Salem, Tamil Nadu</p>
            <p className="text-sm text-gray-500">India</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16 border border-orange-100">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center shadow-lg mr-4">
              <MessageCircle className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Contact Us
            </h2>
          </div>
          
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Have a question? We're here to help. Fill out the form below and we'll get back to you as soon as possible.
          </p>
          
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">Subject</label>
              <input 
                type="text" 
                id="subject" 
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                placeholder="How can we help you?"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
              <textarea 
                id="message" 
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm" 
                rows={6}
                placeholder="Please describe your question or issue in detail..."
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="w-full md:w-auto bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold py-4 px-8 rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* FAQ Link */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-orange-100">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center shadow-lg mr-4">
              <HelpCircle className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
          </div>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            For immediate answers to common questions about ordering, shipping, returns, and more, please visit our 
            <a href="/faq" className="text-orange-600 hover:text-orange-700 font-semibold transition-colors duration-200"> FAQ page</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Support;
