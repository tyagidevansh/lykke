"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (data: Record<string, any>) => {
    try {

      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', data);

      toast.success('Your message has been sent successfully!');

      reset();
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error('Submit error:', error);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 bg-blue-800 p-10 text-white">
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
              <p className="mb-8">Have a trip in mind? We&apos;d love to hear from you. Fill out the form and our team will get back to you as soon as possible.</p>
              
              <div className="space-y-4 mt-10">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span>contact@yourcompany.com</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span>123 Business Street, Delhi</span>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 p-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Your name"
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name?.message as string}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number
                  </label>
                  <input
                    id="contactNumber"
                    type="tel"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.contactNumber ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Your contact number"
                    {...register('contactNumber', { 
                      required: 'Contact number is required',
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: 'Please enter a valid 10-digit phone number'
                      }
                    })}
                  />
                  {errors.contactNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.contactNumber?.message as string}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Your email address"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email?.message as string}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                    Budget
                  </label>
                  <select
                    id="budget"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.budget ? 'border-red-500' : 'border-gray-300'}`}
                    {...register('budget', { required: 'Please select a budget range' })}
                  >
                    <option value="">Select your budget</option>
                    <option value="50,000 - 1 Lakh">50,000 - 1 Lakh</option>
                    <option value="1 Lakh - 2 Lakhs">1 Lakh - 2 Lakhs</option>
                    <option value="2 Lakhs - 3 Lakhs">2 Lakhs - 3 Lakhs</option>
                    <option value="3 Lakhs+">3 Lakhs+</option>
                  </select>
                  {errors.budget && (
                    <p className="mt-1 text-sm text-red-600">{errors.budget?.message as string}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us about your project"
                    {...register('message')}
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;