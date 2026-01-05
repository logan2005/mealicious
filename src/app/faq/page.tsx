
'use client';

import React from 'react';
import { HelpCircle, Shield, Truck, RotateCcw, User } from 'lucide-react';

const FAQ: React.FC = () => {
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
                <HelpCircle className="w-10 h-10 text-orange-600 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            
            {/* Main Heading with Gradient */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-orange-50 to-orange-100 bg-clip-text text-transparent drop-shadow-lg">
                Frequently Asked
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-600 to-amber-700 bg-clip-text text-transparent">
                Questions
              </span>
            </h1>
            
            {/* Subtitle with animation */}
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md animate-fade-in">
              Find answers to common questions about our products, orders, shipping, and more.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">

        {/* Ordering & Payment Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center shadow-lg mr-4">
              <Shield className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Ordering & Payment
            </h2>
          </div>
          
          <div className="grid gap-6">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
              <h3 className="text-xl font-bold mb-4 text-gray-800">What payment methods do you accept?</h3>
              <p className="text-gray-700 leading-relaxed">
                We accept a variety of payment methods, including major credit and debit cards (Visa, Mastercard, American Express), PayPal, and other secure payment options. All accepted payment methods will be displayed at checkout.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Is my personal information secure?</h3>
              <p className="text-gray-700 leading-relaxed">
                Yes, we take your privacy and security very seriously. We use industry-standard encryption to protect your personal details and payment information.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Can I cancel or change my order?</h3>
              <p className="text-gray-700 leading-relaxed">
                We process orders quickly, but we'll do our best to accommodate any changes. If you need to cancel or modify your order, please contact us as soon as possible. Please include your order number and the desired changes in your request.
              </p>
            </div>
          </div>
        </div>

        {/* Shipping & Delivery Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center shadow-lg mr-4">
              <Truck className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Shipping & Delivery
            </h2>
          </div>
          
          <div className="grid gap-6">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
              <h3 className="text-xl font-bold mb-4 text-gray-800">How can I track my order?</h3>
              <p className="text-gray-700 leading-relaxed">
                Once your order has shipped, you will receive a confirmation email with a tracking number. You can use this number to track your package on the carrier's website.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
              <h3 className="text-xl font-bold mb-4 text-gray-800">How long will it take for my order to arrive?</h3>
              <p className="text-gray-700 leading-relaxed">
                Shipping times vary depending on your location and the shipping method you select at checkout. Estimated delivery times will be provided when you place your order.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
              <h3 className="text-xl font-bold mb-4 text-gray-800">What should I do if I haven't received my order?</h3>
              <p className="text-gray-700 leading-relaxed">
                If your order has not arrived within the estimated delivery time, please first check the tracking information provided in your shipping confirmation email. If you still need assistance, please contact our customer support team with your order number.
              </p>
            </div>
          </div>
        </div>

        {/* Returns & Exchanges Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center shadow-lg mr-4">
              <RotateCcw className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Returns & Exchanges
            </h2>
          </div>
          
          <div className="grid gap-6">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
              <h3 className="text-xl font-bold mb-4 text-gray-800">What is your return policy?</h3>
              <p className="text-gray-700 leading-relaxed">
                We want you to be completely satisfied with your purchase. If for any reason you are not, we accept returns within 14 days of receipt. Items must be in their original condition. Please visit our Shipping & Returns page for detailed instructions.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
              <h3 className="text-xl font-bold mb-4 text-gray-800">What if my order arrives damaged?</h3>
              <p className="text-gray-700 leading-relaxed">
                We apologize for the inconvenience. If your order arrives damaged, please contact us immediately with your order number and a photo of the damaged item. We will be happy to arrange for a replacement or a refund.
              </p>
            </div>
          </div>
        </div>

        {/* Account & Support Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center shadow-lg mr-4">
              <User className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Account & Support
            </h2>
          </div>
          
          <div className="grid gap-6">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
              <h3 className="text-xl font-bold mb-4 text-gray-800">How do I create an account?</h3>
              <p className="text-gray-700 leading-relaxed">
                You can create an account by clicking on the "Sign Up" or "Create Account" link on our website. You will be asked to provide your name, email address, and a password.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
              <h3 className="text-xl font-bold mb-4 text-gray-800">How do I contact customer support?</h3>
              <p className="text-gray-700 leading-relaxed">
                You can reach our customer support team through the contact form on our website, by email at info@mealicious.in, or by phone at +91 99999 88888.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
