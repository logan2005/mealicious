
'use client'

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you! Whether you have a question about our premium snacks, an order, or just want to say hello, feel free to reach out to us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Mail className="w-8 h-8 text-orange-500 mr-4" />
                <h2 className="text-xl font-semibold text-gray-800">Email</h2>
              </div>
              <p className="text-lg text-gray-700">info@mealicious.in</p>
              <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Phone className="w-8 h-8 text-orange-500 mr-4" />
                <h2 className="text-xl font-semibold text-gray-800">Phone</h2>
              </div>
              <p className="text-lg text-gray-700">+91 99999 88888</p>
              <p className="text-sm text-gray-500 mt-1">Mon-Sat: 9 AM to 6 PM</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
                <MapPin className="w-8 h-8 text-orange-500 mr-4" />
              <h2 className="text-xl font-semibold text-gray-800">Registered Office</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              MEALICIOUS VENTURES PRIVATE LIMITED<br />
              1/108, Elappankadu, Malankadu, Puthur Line, Uthamasolapuram,<br />
              Salem, Tamil Nadu – 636010<br />
              India
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
                <Clock className="w-8 h-8 text-orange-500 mr-4" />
              <h2 className="text-xl font-semibold text-gray-800">Business Hours</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <p className="font-semibold">Monday - Friday</p>
                <p>9:00 AM - 6:00 PM</p>
              </div>
              <div>
                <p className="font-semibold">Saturday</p>
                <p>9:00 AM - 4:00 PM</p>
              </div>
              <div>
                <p className="font-semibold">Sunday</p>
                <p>Closed</p>
              </div>
              <div>
                <p className="font-semibold">Public Holidays</p>
                <p>Closed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
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
