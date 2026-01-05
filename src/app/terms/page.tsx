
'use client';

import React from 'react';
import { FileText, User, Shield, CreditCard, Truck, AlertTriangle, Scale, Edit } from 'lucide-react';

const TermsOfService: React.FC = () => {
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
                <FileText className="w-10 h-10 text-orange-600 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            
            {/* Main Heading with Gradient */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-orange-50 to-orange-100 bg-clip-text text-transparent drop-shadow-lg">
                Terms of
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-600 to-amber-700 bg-clip-text text-transparent">
                Service
              </span>
            </h1>
            
            {/* Subtitle with animation */}
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md animate-fade-in">
              Please read these terms carefully before using our website and services.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Introduction Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center shadow-lg mr-4">
              <FileText className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              1. Introduction
            </h2>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
            <p className="text-gray-700 leading-relaxed">
              Welcome to Mealicious. By accessing our website and using our services, you agree to be bound by the following terms and conditions. Please read them carefully.
            </p>
          </div>
        </div>

        {/* User Accounts Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center shadow-lg mr-4">
              <User className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              2. User Accounts
            </h2>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
            <p className="text-gray-700 leading-relaxed">
              If you create an account on our website, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it.
            </p>
          </div>
        </div>

        {/* Intellectual Property Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center shadow-lg mr-4">
              <Shield className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              3. Intellectual Property
            </h2>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
            <p className="text-gray-700 leading-relaxed">
              The content on our website, including text, graphics, logos, and images, is the property of Mealicious and is protected by copyright and other intellectual property laws. You may not use our content without our express written permission.
            </p>
          </div>
        </div>

        {/* Products and Services Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center shadow-lg mr-4">
              <FileText className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              4. Products and Services
            </h2>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
            <p className="text-gray-700 leading-relaxed">
              We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Site. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors, and your electronic display may not accurately reflect the actual colors and details of the products.
            </p>
          </div>
        </div>

        {/* Payment and Subscriptions Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center shadow-lg mr-4">
              <CreditCard className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              5. Payment and Subscriptions
            </h2>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
            <p className="text-gray-700 leading-relaxed">
              We accept various forms of payment, as specified on our website. By providing a payment method, you represent and warrant that you are authorized to use the designated payment method and that you authorize us (or our third-party payment processor) to charge your payment method for the total amount of your order (including any applicable taxes and other charges).
            </p>
          </div>
        </div>

        {/* Shipping and Returns Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center shadow-lg mr-4">
              <Truck className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              6. Shipping and Returns
            </h2>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
            <p className="text-gray-700 leading-relaxed">
              Our shipping and return policies are available on our website. Please review these policies prior to making a purchase.
            </p>
          </div>
        </div>

        {/* Limitation of Liability Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center shadow-lg mr-4">
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              7. Limitation of Liability
            </h2>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
            <p className="text-gray-700 leading-relaxed">
              In no event shall Mealicious, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
          </div>
        </div>

        {/* Disclaimer of Warranties Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center shadow-lg mr-4">
              <Shield className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              8. Disclaimer of Warranties
            </h2>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
            <p className="text-gray-700 leading-relaxed">
              Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
            </p>
          </div>
        </div>

        {/* Dispute Resolution Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center shadow-lg mr-4">
              <Scale className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              9. Dispute Resolution
            </h2>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
            <p className="text-gray-700 leading-relaxed">
              Any dispute arising from these Terms will be resolved through binding arbitration in Salem, Tamil Nadu.
            </p>
          </div>
        </div>

        {/* Changes to Terms Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center shadow-lg mr-4">
              <Edit className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              10. Changes to Terms
            </h2>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
            <p className="text-gray-700 leading-relaxed">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms of Service on this page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
