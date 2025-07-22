import React, { useState } from 'react'
import { Cookie, Settings, Shield, BarChart } from 'lucide-react'

const CookiePolicyPage: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false)
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
            Cookie Policy
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-4">
            How we use cookies and similar technologies on Servitex
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
                <Cookie className="w-8 h-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-serif font-bold text-slate-900">What Are Cookies?</h2>
              </div>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 leading-relaxed mb-4">
                  Cookies are small text files that are stored on your device when you visit our website. They help us 
                  provide you with a better experience by remembering your preferences, keeping you logged in, and 
                  helping us understand how you use our service.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  This Cookie Policy explains what cookies we use, why we use them, and how you can manage your cookie 
                  preferences.
                </p>
              </div>
            </section>

            {/* Cookie Categories */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-8">Types of Cookies We Use</h2>
              
              <div className="space-y-6">
                {/* Essential Cookies */}
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center mb-4">
                    <Shield className="w-6 h-6 text-green-600 mr-3" />
                    <h3 className="text-xl font-semibold text-green-900">Essential Cookies</h3>
                    <span className="ml-auto bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Always Active
                    </span>
                  </div>
                  <p className="text-green-800 mb-4">
                    These cookies are necessary for the website to function properly. They enable core functionality 
                    such as security, network management, and accessibility.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 mb-2">Authentication</h4>
                      <p className="text-green-800 text-sm">Keep you logged in to your account</p>
                      <p className="text-green-600 text-xs mt-1">Duration: Session</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 mb-2">Security</h4>
                      <p className="text-green-800 text-sm">Protect against fraud and abuse</p>
                      <p className="text-green-600 text-xs mt-1">Duration: Session</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 mb-2">Preferences</h4>
                      <p className="text-green-800 text-sm">Remember your settings and choices</p>
                      <p className="text-green-600 text-xs mt-1">Duration: 30 days</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 mb-2">Load Balancing</h4>
                      <p className="text-green-800 text-sm">Ensure optimal performance</p>
                      <p className="text-green-600 text-xs mt-1">Duration: Session</p>
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center mb-4">
                    <BarChart className="w-6 h-6 text-blue-600 mr-3" />
                    <h3 className="text-xl font-semibold text-blue-900">Analytics Cookies</h3>
                    <span className="ml-auto bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Optional
                    </span>
                  </div>
                  <p className="text-blue-800 mb-4">
                    These cookies help us understand how visitors interact with our website by collecting and reporting 
                    information anonymously.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Usage Analytics</h4>
                      <p className="text-blue-800 text-sm">Track page views and user journeys</p>
                      <p className="text-blue-600 text-xs mt-1">Duration: 2 years</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Performance</h4>
                      <p className="text-blue-800 text-sm">Monitor site speed and errors</p>
                      <p className="text-blue-600 text-xs mt-1">Duration: 1 year</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Feature Usage</h4>
                      <p className="text-blue-800 text-sm">Understand which features are popular</p>
                      <p className="text-blue-600 text-xs mt-1">Duration: 1 year</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Error Tracking</h4>
                      <p className="text-blue-800 text-sm">Help us fix bugs and improve reliability</p>
                      <p className="text-blue-600 text-xs mt-1">Duration: 30 days</p>
                    </div>
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center mb-4">
                    <Settings className="w-6 h-6 text-purple-600 mr-3" />
                    <h3 className="text-xl font-semibold text-purple-900">Functional Cookies</h3>
                    <span className="ml-auto bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                      Optional
                    </span>
                  </div>
                  <p className="text-purple-800 mb-4">
                    These cookies enable enhanced functionality and personalization, such as remembering your preferences 
                    and providing customized content.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-purple-900 mb-2">Language Preferences</h4>
                      <p className="text-purple-800 text-sm">Remember your language choice</p>
                      <p className="text-purple-600 text-xs mt-1">Duration: 1 year</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-purple-900 mb-2">Theme Settings</h4>
                      <p className="text-purple-800 text-sm">Save your display preferences</p>
                      <p className="text-purple-600 text-xs mt-1">Duration: 1 year</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-purple-900 mb-2">Form Data</h4>
                      <p className="text-purple-800 text-sm">Remember form inputs to save time</p>
                      <p className="text-purple-600 text-xs mt-1">Duration: 7 days</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-purple-900 mb-2">Recent Searches</h4>
                      <p className="text-purple-800 text-sm">Show your recent vehicle lookups</p>
                      <p className="text-purple-600 text-xs mt-1">Duration: 30 days</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookie Management */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Managing Your Cookie Preferences</h2>
              
              <div className="space-y-6">
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Browser Settings</h3>
                  <p className="text-slate-700 mb-4">
                    You can control cookies through your browser settings. Most browsers allow you to:
                  </p>
                  <ul className="space-y-2 text-slate-700">
                    <li>• View which cookies are stored on your device</li>
                    <li>• Delete cookies individually or all at once</li>
                    <li>• Block cookies from specific websites</li>
                    <li>• Block all cookies (may affect website functionality)</li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="font-semibold text-blue-900 mb-4">Browser-Specific Instructions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Chrome</h4>
                      <p className="text-blue-800 text-sm">Settings → Privacy and Security → Cookies</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Firefox</h4>
                      <p className="text-blue-800 text-sm">Options → Privacy & Security → Cookies</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Safari</h4>
                      <p className="text-blue-800 text-sm">Preferences → Privacy → Cookies</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Edge</h4>
                      <p className="text-blue-800 text-sm">Settings → Cookies and Site Permissions</p>
                    </div>
                  </div>
                </div>

                {/* Cookie Settings Button */}
                <div className="text-center">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Manage Cookie Preferences
                  </button>
                  
                  {showSettings && (
                    <div className="mt-6 bg-white rounded-xl border border-slate-200 p-6">
                      <h4 className="font-semibold text-slate-900 mb-4">Cookie Preferences</h4>
                      <p className="text-slate-600 text-sm mb-4">
                        Note: This is a demonstration. In a live implementation, this would connect to a cookie management system.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <span className="font-medium text-slate-900">Essential Cookies</span>
                          <span className="text-slate-500 text-sm">Always Required</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <span className="font-medium text-slate-900">Analytics Cookies</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <span className="font-medium text-slate-900">Functional Cookies</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Third-Party Cookies */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Third-Party Cookies</h2>
              
              <div className="bg-orange-50 rounded-xl p-6">
                <p className="text-orange-800 mb-4">
                  Some cookies on our site are set by third-party services we use to provide functionality:
                </p>
                
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-orange-900 mb-2">Stripe (Payment Processing)</h4>
                    <p className="text-orange-800 text-sm">Secure payment processing and fraud prevention</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-orange-900 mb-2">Supabase (Authentication)</h4>
                    <p className="text-orange-800 text-sm">User authentication and session management</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-orange-900 mb-2">Analytics Providers</h4>
                    <p className="text-orange-800 text-sm">Website usage analytics and performance monitoring</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Questions About Cookies?</h2>
              <div className="bg-slate-50 rounded-xl p-6">
                <p className="text-slate-700 mb-4">
                  If you have any questions about our use of cookies, please contact us:
                </p>
                <div className="space-y-2 text-slate-700">
                  <p><strong>Email:</strong> privacy@servitex.co.uk</p>
                  <p><strong>General Support:</strong> support@servitex.co.uk</p>
                </div>
              </div>
            </section>

            {/* Updates */}
            <section className="border-t border-slate-200 pt-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Policy Updates</h2>
              <p className="text-slate-700">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other 
                operational, legal, or regulatory reasons. Please revisit this page regularly to stay informed about 
                our use of cookies.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookiePolicyPage