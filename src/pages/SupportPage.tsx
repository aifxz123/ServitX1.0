import React, { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle, Mail, Book, MessageCircle } from 'lucide-react'

const SupportPage: React.FC = () => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  const supportTopics = [
    {
      question: "How do I reset my password?",
      answer: "To reset your password, go to the login page and click 'Forgot password?'. Enter your email address and we'll send you a reset link. If you don't receive the email within 5 minutes, check your spam folder or contact support."
    },
    {
      question: "How do I update my billing information?",
      answer: "Currently, billing updates need to be handled through our support team. Please contact us at support@servitex.co.uk with your account details and the changes you'd like to make. We're working on a self-service billing portal that will be available soon."
    },
    {
      question: "How do I dispute or correct a service record?",
      answer: "If you believe a service record is incorrect, please contact the garage that created the record directly first. If you cannot resolve the issue with the garage, contact our support team with the vehicle registration, service date, and details of the dispute. We'll investigate and work with all parties to resolve the issue."
    },
    {
      question: "Why can't I see service records for my vehicle?",
      answer: "Service records only appear if they've been digitally logged by participating garages. If your garage isn't using Servitex yet, encourage them to sign up. Historical records from before a garage joined Servitex won't be automatically imported unless manually added by the garage."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription at any time by contacting our support team. Your access will continue until the end of your current billing period. We'll also be adding a self-service cancellation option to your account dashboard soon."
    },
    {
      question: "Can I export my service records?",
      answer: "Yes! Garage users can export their service records as CSV files from their dashboard. Individual consumers can request a copy of their vehicle's service history by contacting support with their vehicle registration number."
    },
    {
      question: "How do I add my garage to Servitex?",
      answer: "Visit our 'For Garages' page and fill out the registration form. We'll review your application and get in touch within 2 business days to set up your account and provide onboarding support."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use enterprise-grade encryption, secure cloud storage, and comply with GDPR regulations. Your data is stored securely and never shared with third parties without your explicit consent."
    }
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
            Support Center
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our support team
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <a
            href="/contact"
            className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Contact Support</h3>
            <p className="text-slate-600 text-sm">Get personalized help from our team</p>
          </a>

          <a
            href="/faq"
            className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Book className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">FAQ</h3>
            <p className="text-slate-600 text-sm">Browse frequently asked questions</p>
          </a>

          <a
            href="/faq#getting-started"
            className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Getting Started</h3>
            <p className="text-slate-600 text-sm">Learn how to use Servitex</p>
          </a>
        </div>

        {/* Common Support Topics */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 mb-12">
          <div className="p-8 border-b border-slate-200">
            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">Common Support Topics</h2>
            <p className="text-slate-600">Quick answers to the most frequently asked questions</p>
          </div>

          <div className="p-8">
            <div className="space-y-4">
              {supportTopics.map((topic, index) => (
                <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-slate-900">{topic.question}</h3>
                    {openItems.has(index) ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </button>
                  
                  {openItems.has(index) && (
                    <div className="px-6 pb-4 border-t border-slate-100">
                      <p className="text-slate-600 leading-relaxed pt-4">{topic.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg border border-blue-100 p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <MessageCircle className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-serif font-bold text-slate-900">Still need help?</h2>
          </div>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is here to help you get the most out of Servitex.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">Email Support</h3>
              <p className="text-slate-600 text-sm mb-3">support@servitex.co.uk</p>
              <p className="text-xs text-slate-500">Response within 24 hours</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <HelpCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">Support Hours</h3>
              <p className="text-slate-600 text-sm mb-1">Monday – Friday</p>
              <p className="text-xs text-slate-500">9:00 AM – 5:00 PM (UK)</p>
            </div>
          </div>

          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors mt-8"
          >
            Contact Support Team
          </a>
        </div>
      </div>
    </div>
  )
}

export default SupportPage