import React from 'react'
import { FileText, Users, CreditCard, Shield } from 'lucide-react'

const TermsOfServicePage: React.FC = () => {
  const lastUpdated = new Date().toLocaleDateString('en-UK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-4">
            The terms and conditions governing your use of Servitex
          </p>
          <p className="text-sm text-slate-500">
            Last updated: {lastUpdated}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="p-8 space-y-12">
            {/* Introduction */}
            <section>
              <div className="flex items-center mb-6">
                <FileText className="w-8 h-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-serif font-bold text-slate-900">Agreement to Terms</h2>
              </div>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 leading-relaxed mb-4">
                  These Terms of Service ("Terms") govern your use of the Servitex platform ("Service") operated by 
                  Servitex ("us", "we", or "our"). By accessing or using our Service, you agree to be bound by these Terms.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  If you disagree with any part of these terms, then you may not access the Service. These Terms apply 
                  to all visitors, users, and others who access or use the Service.
                </p>
              </div>
            </section>

            {/* Usage Rights */}
            <section>
              <div className="flex items-center mb-6">
                <Users className="w-8 h-8 text-green-600 mr-3" />
                <h2 className="text-2xl font-serif font-bold text-slate-900">Usage Rights and Restrictions</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Permitted Use</h3>
                  <div className="bg-green-50 rounded-xl p-6">
                    <ul className="space-y-2 text-green-800">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                        <span>Create and manage service records for vehicles you have serviced</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                        <span>Search for publicly available vehicle service history</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                        <span>Use the platform for legitimate business purposes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                        <span>Access your own data and account information</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Prohibited Activities</h3>
                  <div className="bg-red-50 rounded-xl p-6">
                    <ul className="space-y-2 text-red-800">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                        <span>Upload false, misleading, or fraudulent service records</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                        <span>Attempt to access accounts or data belonging to others</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                        <span>Use automated systems to scrape or harvest data</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                        <span>Interfere with the security or operation of the platform</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Garage Responsibilities */}
            <section>
              <div className="flex items-center mb-6">
                <Shield className="w-8 h-8 text-purple-600 mr-3" />
                <h2 className="text-2xl font-serif font-bold text-slate-900">Garage Responsibilities</h2>
              </div>
              
              <div className="bg-purple-50 rounded-xl p-8">
                <h3 className="font-semibold text-purple-900 mb-4">Truthfulness and Accuracy</h3>
                <p className="text-purple-800 mb-6">
                  Garages are solely responsible for the accuracy and truthfulness of all service records they upload. 
                  By submitting service records, you warrant that:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-purple-900 mb-2">Service Verification</h4>
                    <p className="text-purple-800 text-sm">All recorded services were actually performed by your garage</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-purple-900 mb-2">Data Accuracy</h4>
                    <p className="text-purple-800 text-sm">Vehicle details, dates, and service information are correct</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-purple-900 mb-2">Authorization</h4>
                    <p className="text-purple-800 text-sm">You have permission to record services for the vehicles listed</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-purple-900 mb-2">Professional Standards</h4>
                    <p className="text-purple-800 text-sm">All work meets industry standards and regulations</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Terms */}
            <section>
              <div className="flex items-center mb-6">
                <CreditCard className="w-8 h-8 text-orange-600 mr-3" />
                <h2 className="text-2xl font-serif font-bold text-slate-900">Payment and Subscription Terms</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-orange-50 rounded-xl p-6">
                  <h3 className="font-semibold text-orange-900 mb-3">Subscription Billing</h3>
                  <ul className="space-y-2 text-orange-800">
                    <li>• Monthly subscriptions are billed in advance on the same date each month</li>
                    <li>• All fees are non-refundable except as required by law</li>
                    <li>• Prices may change with 30 days' notice to subscribers</li>
                    <li>• Failed payments may result in service suspension</li>
                  </ul>
                </div>

                <div className="bg-orange-50 rounded-xl p-6">
                  <h3 className="font-semibold text-orange-900 mb-3">Cancellation Policy</h3>
                  <ul className="space-y-2 text-orange-800">
                    <li>• You may cancel your subscription at any time</li>
                    <li>• Cancellation takes effect at the end of your current billing period</li>
                    <li>• No refunds are provided for partial months</li>
                    <li>• Your data remains accessible until the end of your billing period</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Ownership */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Data Ownership and Platform Access</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="font-semibold text-blue-900 mb-3">Your Data Rights</h3>
                  <ul className="space-y-2 text-blue-800 text-sm">
                    <li>• You retain ownership of your service records</li>
                    <li>• You can export your data at any time</li>
                    <li>• You control who can access your records</li>
                    <li>• You can request data deletion upon cancellation</li>
                  </ul>
                </div>
                
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-semibold text-slate-900 mb-3">Platform Rights</h3>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    <li>• We may suspend accounts for terms violations</li>
                    <li>• We reserve the right to modify platform features</li>
                    <li>• We may remove content that violates our policies</li>
                    <li>• We maintain backups for security and recovery</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Liability */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Limitation of Liability</h2>
              
              <div className="bg-slate-50 rounded-xl p-8">
                <div className="space-y-4 text-slate-700">
                  <p>
                    <strong>Service Availability:</strong> We strive to maintain high availability but cannot guarantee 
                    uninterrupted service. We are not liable for temporary outages or maintenance periods.
                  </p>
                  
                  <p>
                    <strong>Data Accuracy:</strong> While we provide tools for data management, we are not responsible 
                    for the accuracy of service records uploaded by garages. Users should verify information independently.
                  </p>
                  
                  <p>
                    <strong>Third-Party Services:</strong> Our platform integrates with third-party services (payment 
                    processors, cloud providers). We are not liable for issues arising from these external services.
                  </p>
                  
                  <p>
                    <strong>Maximum Liability:</strong> Our total liability to you for any claims arising from your use 
                    of the service shall not exceed the amount you paid us in the 12 months preceding the claim.
                  </p>
                </div>
              </div>
            </section>

            {/* Indemnification */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Indemnification</h2>
              
              <div className="bg-yellow-50 rounded-xl p-6">
                <p className="text-yellow-800 mb-4">
                  You agree to indemnify and hold harmless Servitex, its officers, directors, employees, and agents from 
                  and against any claims, damages, obligations, losses, liabilities, costs, or debt arising from:
                </p>
                <ul className="space-y-2 text-yellow-800">
                  <li>• Your use of the Service</li>
                  <li>• Your violation of these Terms</li>
                  <li>• Your violation of any third-party rights</li>
                  <li>• Any false or misleading information you provide</li>
                </ul>
              </div>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Governing Law and Disputes</h2>
              
              <div className="bg-slate-50 rounded-xl p-6">
                <p className="text-slate-700 mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of England and Wales, 
                  without regard to its conflict of law provisions.
                </p>
                <p className="text-slate-700">
                  Any disputes arising from these Terms or your use of the Service shall be resolved through binding 
                  arbitration in accordance with the rules of the London Court of International Arbitration.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Contact Information</h2>
              <div className="bg-slate-50 rounded-xl p-6">
                <p className="text-slate-700 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2 text-slate-700">
                  <p><strong>Email:</strong> legal@servitex.co.uk</p>
                  <p><strong>General Support:</strong> support@servitex.co.uk</p>
                  <p><strong>Address:</strong> United Kingdom</p>
                </div>
              </div>
            </section>

            {/* Updates */}
            <section className="border-t border-slate-200 pt-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Changes to Terms</h2>
              <p className="text-slate-700">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will 
                try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material 
                change will be determined at our sole discretion.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsOfServicePage