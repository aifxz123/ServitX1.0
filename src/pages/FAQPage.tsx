import React from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const FAQPage: React.FC = () => {
  const [openItems, setOpenItems] = React.useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  const faqs = [
    {
      question: "What is Servitex?",
      answer: "Servitex is a digital platform that allows garages to create and manage vehicle service records digitally, while providing consumers with instant access to verify service history."
    },
    {
      question: "How does the service history lookup work?",
      answer: "Simply enter a vehicle registration number on our lookup page, and you'll instantly see all service records that have been digitally logged by participating garages."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, all data is encrypted and stored securely in the cloud with enterprise-grade security. We comply with GDPR and other data protection regulations."
    },
    {
      question: "How much does it cost for garages?",
      answer: "We offer a simple pricing plan at £20/month for garages, which includes unlimited service records, secure storage, and all platform features."
    },
    {
      question: "Can I edit or delete service records?",
      answer: "Only authorized personnel can manage service records to maintain data integrity. Garage users can add records but cannot edit or delete them once submitted."
    }
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Find answers to common questions about Servitex
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-slate-900">{faq.question}</h3>
                {openItems.has(index) ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>
              
              {openItems.has(index) && (
                <div className="px-6 pb-4">
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">
            Still have questions?
          </h3>
          <p className="text-slate-600 mb-6">
            Can't find the answer you're looking for? Please get in touch with our team.
          </p>
          <a
            href="mailto:support@servitex.com"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors inline-block"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}

export default FAQPage