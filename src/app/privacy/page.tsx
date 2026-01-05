
'use client';

import React from 'react';
import { Shield, Lock, Eye, Mail, FileText } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
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
                <Shield className="w-10 h-10 text-orange-600 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            
            {/* Main Heading with Gradient */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-orange-50 to-orange-100 bg-clip-text text-transparent drop-shadow-lg">
                Privacy
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-600 to-amber-700 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            
            {/* Subtitle with animation */}
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md animate-fade-in">
              How we protect and handle your personal information with care and transparency.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Introduction */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16 border border-orange-100">
          <p className="text-lg text-gray-700 leading-relaxed">
            This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from Mealicious (the "Site").
          </p>
        </div>

        {/* Personal Information Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center shadow-lg mr-4">
              <Eye className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              1. PERSONAL INFORMATION WE COLLECT
            </h2>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100 mb-6">
            <p className="text-gray-700 leading-relaxed mb-6">
              When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as "Device Information."
            </p>
            
            <h3 className="text-xl font-bold mb-4 text-gray-800">We collect Device Information using the following technologies:</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <Lock className="w-5 h-5 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">"Cookies" are data files that are placed on your device or computer and often include an anonymous unique identifier.</span>
              </li>
              <li className="flex items-start">
                <FileText className="w-5 h-5 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">"Log files" track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.</span>
              </li>
              <li className="flex items-start">
                <Eye className="w-5 h-5 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">"Web beacons," "tags," and "pixels" are electronic files used to record information about how you browse the Site.</span>
              </li>
            </ul>
            
            <p className="text-gray-700 leading-relaxed">
              Additionally, when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers), email address, and phone number. We refer to this information as "Order Information."
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              When we talk about "Personal Information" in this Privacy Policy, we are talking both about Device Information and Order Information.
            </p>
          </div>
        </div>

        {/* How We Use Your Information Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center shadow-lg mr-4">
              <Shield className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              2. HOW DO WE USE YOUR PERSONAL INFORMATION?
            </h2>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
            <p className="text-gray-700 leading-relaxed mb-6">
              We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:
            </p>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700">Communicate with you;</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700">Screen our orders for potential risk or fraud; and</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700">When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</span>
              </li>
            </ul>
            
            <p className="text-gray-700 leading-relaxed">
              We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).
            </p>
          </div>
        </div>

        {/* Sharing Information Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center shadow-lg mr-4">
              <Shield className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              3. SHARING YOUR PERSONAL INFORMATION
            </h2>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
            <p className="text-gray-700 leading-relaxed mb-4">
              We may share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Shopify to power our online store. We also use Google Analytics to help us understand how our customers use the Site.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
            </p>
          </div>
        </div>

        {/* Your Rights Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center shadow-lg mr-4">
              <Shield className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              4. YOUR RIGHTS
            </h2>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
            <p className="text-gray-700 leading-relaxed mb-4">
              If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Additionally, if you are a European resident we note that we are processing your information in order to fulfill contracts we might have with you (for example if you make an order through the Site), or otherwise to pursue our legitimate business interests listed above.
            </p>
          </div>
        </div>

        {/* Data Retention Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center shadow-lg mr-4">
              <FileText className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              5. DATA RETENTION
            </h2>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
            <p className="text-gray-700 leading-relaxed">
              When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
            </p>
          </div>
        </div>

        {/* Changes Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center shadow-lg mr-4">
              <FileText className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              6. CHANGES
            </h2>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
            <p className="text-gray-700 leading-relaxed">
              We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.
            </p>
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center shadow-lg mr-4">
              <Mail className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              7. CONTACT US
            </h2>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
            <p className="text-gray-700 leading-relaxed mb-4">
              For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at info@mealicious.in or by mail using the details provided below:
            </p>
            <p className="text-gray-700 leading-relaxed">
              Mealicious<br />
              1477/5/630-E, near Sona College of Technology, Kamarajar Nagar, Subramania Nagar, Suramangalam Salem, Tamil Nadu 636004
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
