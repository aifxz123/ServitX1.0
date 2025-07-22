import React from 'react'
import { Shield, Database, Users, FileText } from 'lucide-react'

const PrivacyPolicyPage: React.FC = () => {
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
            Privacy Policy
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-4">
            How we collect, use, and protect your personal information
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
                <Shield className="w-8 h-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-serif font-bold text-slate-900">Introduction</h2>
              </div>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 leading-relaxed mb-4">
                  At Servitex ("we," "our," or "us"), we are committed to protecting your privacy and ensuring 
                  the security of your personal information. This Privacy Policy explains how we collect, use, 
                  disclose, and safeguard your information when you use our digital vehicle service record platform.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  By using our service, you consent to the data practices described in this policy. If you do not 
                  agree with the practices described in this policy, please do not use our services.
                </p>
              </div>
            </section>

            {/* Data Collection */}
            <section>
              <div className="flex items-center mb-6">
                <Database className="w-8 h-8 text-green-600 mr-3" />
                <h2 className="text-2xl font-serif font-bold text-slate-900">Information We Collect</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Personal Information</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                      <span><strong>Account Information:</strong> Email addresses, names, business names, phone numbers, and addresses when you create an account</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                      <span><strong>Business Information:</strong> Garage details, Companies House numbers, and professional credentials</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                      <span><strong>Payment Information:</strong> Billing addresses and payment method details (processed securely by Stripe)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Service Data</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                      <span><strong>Vehicle Information:</strong> Registration numbers, service dates, mileage readings</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                      <span><strong>Service Records:</strong> Types of services performed, technician names, service notes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                      <span><strong>Usage Data:</strong> How you interact with our platform, search queries, and access patterns</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Technical Information</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></span>
                      <span><strong>Device Information:</strong> IP addresses, browser types, operating systems</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></span>
                      <span><strong>Cookies and Analytics:</strong> Website usage patterns and performance metrics</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section>
              <div className="flex items-center mb-6">
                <Users className="w-8 h-8 text-purple-600 mr-3" />
                <h2 className="text-2xl font-serif font-bold text-slate-900">How We Use Your Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="font-semibold text-blue-900 mb-3">Service Provision</h3>
                  <ul className="space-y-2 text-blue-800 text-sm">
                    <li>• Create and manage your account</li>
                    <li>• Process service record submissions</li>
                    <li>• Enable vehicle history lookups</li>
                    <li>• Provide customer support</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="font-semibold text-green-900 mb-3">Business Operations</h3>
                  <ul className="space-y-2 text-green-800 text-sm">
                    <li>• Process payments and billing</li>
                    <li>• Verify garage credentials</li>
                    <li>• Improve our services</li>
                    <li>• Ensure platform security</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 rounded-xl p-6">
                  <h3 className="font-semibold text-purple-900 mb-3">Communication</h3>
                  <ul className="space-y-2 text-purple-800 text-sm">
                    <li>• Send service notifications</li>
                    <li>• Provide account updates</li>
                    <li>• Share important announcements</li>
                    <li>• Respond to inquiries</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 rounded-xl p-6">
                  <h3 className="font-semibold text-orange-900 mb-3">Legal Compliance</h3>
                  <ul className="space-y-2 text-orange-800 text-sm">
                    <li>• Comply with legal obligations</li>
                    <li>• Protect against fraud</li>
                    <li>• Enforce our terms of service</li>
                    <li>• Resolve disputes</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Storage */}
            <section>
              <div className="flex items-center mb-6">
                <FileText className="w-8 h-8 text-orange-600 mr-3" />
                <h2 className="text-2xl font-serif font-bold text-slate-900">Data Storage and Security</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-semibold text-slate-900 mb-3">Storage Infrastructure</h3>
                  <p className="text-slate-700 mb-4">
                    Your data is stored securely using Supabase, a trusted cloud database provider that employs 
                    enterprise-grade security measures including:
                  </p>
                  <ul className="space-y-2 text-slate-700">
                    <li>• End-to-end encryption in transit and at rest</li>
                    <li>• Regular security audits and compliance certifications</li>
                    <li>• Automated backups and disaster recovery</li>
                    <li>• Access controls and authentication protocols</li>
                  </ul>
                </div>

                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-semibold text-slate-900 mb-3">Third-Party Services</h3>
                  <p className="text-slate-700 mb-4">
                    We work with trusted third-party providers to deliver our services:
                  </p>
                  <ul className="space-y-2 text-slate-700">
                    <li>• <strong>Stripe:</strong> Payment processing and billing management</li>
                    <li>• <strong>Supabase:</strong> Database hosting and authentication</li>
                    <li>• <strong>Analytics Providers:</strong> Website performance and usage analytics</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* GDPR Rights */}
            <section>
              <div className="bg-blue-50 rounded-xl p-8">
                <h2 className="text-2xl font-serif font-bold text-blue-900 mb-6">Your GDPR Rights</h2>
                <p className="text-blue-800 mb-6">
                  Under the General Data Protection Regulation (GDPR), you have the following rights regarding your personal data:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Right of Access</h3>
                    <p className="text-blue-800 text-sm">Request copies of your personal data</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Right to Rectification</h3>
                    <p className="text-blue-800 text-sm">Request correction of inaccurate data</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Right to Erasure</h3>
                    <p className="text-blue-800 text-sm">Request deletion of your data</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Right to Portability</h3>
                    <p className="text-blue-800 text-sm">Request transfer of your data</p>
                  </div>
                </div>
                
                <p className="text-blue-800 mt-6">
                  To exercise any of these rights, please contact us at{' '}
                  <a href="mailto:privacy@servitex.co.uk" className="font-semibold underline">
                    privacy@servitex.co.uk
                  </a>
                </p>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Contact Us</h2>
              <div className="bg-slate-50 rounded-xl p-6">
                <p className="text-slate-700 mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-2 text-slate-700">
                  <p><strong>Email:</strong> privacy@servitex.co.uk</p>
                  <p><strong>General Support:</strong> support@servitex.co.uk</p>
                  <p><strong>Address:</strong> United Kingdom</p>
                </div>
              </div>
            </section>

            {/* Updates */}
            <section className="border-t border-slate-200 pt-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Policy Updates</h2>
              <p className="text-slate-700">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review 
                this Privacy Policy periodically for any changes.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicyPage