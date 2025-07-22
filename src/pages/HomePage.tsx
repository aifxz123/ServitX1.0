import React from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, Shield, Clock, Users, Search, Wrench, X, Check } from 'lucide-react'

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white min-h-screen flex items-center">
        {/* Audi A3 Background */}
        <div className="absolute inset-0">
          <img 
            src="/audi_a3_bg.png" 
            alt="Audi A3" 
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/15"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              The Digital MOT for Your Car's Service History
            </h1>
            
            <p className="text-xl text-white/90 mb-12 leading-relaxed drop-shadow">
              ServitX lets garages upload service records online so anyone can check a car's history by registration — instantly, for free.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/login"
                className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-lg"
              >
                Get Started
              </Link>
              
              <Link
                to="/pricing"
                className="bg-gray-200 text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors shadow-lg"
              >
                Check Vehicle History
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by Big Brands Section */}
      <section className="py-16 bg-gray-50/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
            {/* Mercedes */}
            <div className="flex items-center justify-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <img 
                src="/mercedes%20logo.png" 
                alt="Mercedes-Benz" 
                className="h-16 object-contain"
              />
            </div>
            
            {/* Ford */}
            <div className="flex items-center justify-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <img 
                src="/ford%20logo.jpg" 
                alt="Ford" 
                className="h-16 object-contain"
              />
            </div>
            
            {/* UK Government */}
            <div className="flex items-center justify-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-800">Funded by</div>
                <div className="text-xs text-gray-600">UK Government</div>
              </div>
            </div>
            
            {/* Mitsubishi */}
            <div className="flex items-center justify-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <img 
                src="/mitsubishi%20logo.png" 
                alt="Mitsubishi" 
                className="h-16 object-contain"
              />
            </div>
            
            {/* Volkswagen */}
            <div className="flex items-center justify-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <img 
                src="/vw%20logo.jpg" 
                alt="Volkswagen" 
                className="h-16 object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How ServitX Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              How ServitX Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ServitX lets garages upload service records online so anyone can check a car's history by registration — instantly, for free.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Upload */}
            <div className="text-center">
              <div className="w-24 h-24 bg-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <div className="text-3xl font-bold text-black">1</div>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Upload</h3>
              <p className="text-gray-600 leading-relaxed">
                No more lost paperwork. Garages enter the reg, tick what was done, and hit submit. Done in 30 seconds and stored forever.
              </p>
            </div>
            
            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <div className="w-16 h-8 text-red-500">
                <svg viewBox="0 0 124 56" fill="currentColor" className="w-full h-full">
                  <path d="M0 28L100 28M85 13L100 28L85 43" stroke="currentColor" strokeWidth="3" fill="none"/>
                </svg>
              </div>
            </div>
            
            {/* Encrypted */}
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <div className="text-3xl font-bold text-white">2</div>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Encrypted</h3>
              <p className="text-gray-600 leading-relaxed">
                Each entry is tamper-proof. No dodgy rewrites. No fake stamps. Just pure, clean, digital truth — forever linked to that reg.
              </p>
            </div>
            
            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center md:col-start-2">
              <div className="w-16 h-8 text-red-500">
                <svg viewBox="0 0 124 56" fill="currentColor" className="w-full h-full">
                  <path d="M0 28L100 28M85 13L100 28L85 43" stroke="currentColor" strokeWidth="3" fill="none"/>
                </svg>
              </div>
            </div>
            
            {/* Verify */}
            <div className="text-center md:col-start-3">
              <div className="w-24 h-24 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <div className="text-3xl font-bold text-white">3</div>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Verify</h3>
              <p className="text-gray-600 leading-relaxed">
                Enter a reg on the homepage. Boom — you get the car's full service history if it's logged. Whether buying, selling, or verifying — no login needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Digital Wins Section */}
      <section className="py-20 bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Why Digital Wins
            </h2>
            <p className="text-xl text-gray-600">
              A side-by-side comparison
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Manual Column */}
            <div className="bg-gray-300 rounded-2xl p-8 shadow-lg">
              <h3 className="text-3xl font-bold text-black mb-8 text-center">Manual</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <X className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-black mb-2">Messy paper files</h4>
                    <p className="text-gray-700 text-sm">Hard to track, easy to lose</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <X className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-black mb-2">Brand specific recording</h4>
                    <p className="text-gray-700 text-sm">Scattered between manufacturers</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <X className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-black mb-2">Missing records</h4>
                    <p className="text-gray-700 text-sm">Breaks trust during sale/purchase</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <X className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-black mb-2">Guesswork for next service</h4>
                    <p className="text-gray-700 text-sm">No central tracking</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <X className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-black mb-2">Easily damaged / lost</h4>
                    <p className="text-gray-700 text-sm">We all lose things time to time</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ServitX Column */}
            <div className="bg-purple-200 rounded-2xl p-8 shadow-lg relative">
              {/* ServitX Logo */}
              <div className="absolute top-4 right-4">
                <img 
                  src="/ServitX.png" 
                  alt="ServitX" 
                  className="h-12 w-auto opacity-80"
                />
              </div>
              
              <h3 className="text-3xl font-bold text-black mb-8 text-center">ServitX</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-black mb-2">Cloud Based Storage</h4>
                    <p className="text-gray-700 text-sm">Your service history - always safe</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-black mb-2">One Platform for All</h4>
                    <p className="text-gray-700 text-sm">Universal access across all vehicle brands</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-black mb-2">Verified digital log</h4>
                    <p className="text-gray-700 text-sm">Build tamper proof buyer confidence</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-black mb-2">Instant Vehicle Lookup</h4>
                    <p className="text-gray-700 text-sm">One click to see every past service</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-black mb-2">Trusted Digital Timeline</h4>
                    <p className="text-gray-700 text-sm">Permanent, and time-stamped history</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-8">
            Get started now!
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/login"
              className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-lg"
            >
              Get Started
            </Link>
            
            <Link
              to="/pricing"
              className="bg-gray-200 text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors shadow-lg"
            >
              Check Vehicle History
            </Link>
          </div>

          {/* Footer Navigation */}
          <div className="border-t border-gray-300 pt-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <img 
                    src="/ServitX.png" 
                    alt="ServitX" 
                    className="h-6 w-auto"
                  />
                  <span className="text-lg font-bold text-black">Servitex</span>
                </div>
                
                {/* Social Icons */}
                <div className="flex space-x-2">
                  <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                    <div className="w-5 h-5 bg-gray-500 rounded"></div>
                  </div>
                  <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                    <div className="w-5 h-5 bg-gray-500 rounded"></div>
                  </div>
                  <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                    <div className="w-5 h-5 bg-gray-500 rounded"></div>
                  </div>
                  <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                    <div className="w-5 h-5 bg-gray-500 rounded"></div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-black mb-4">Topic</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><Link to="/about" className="hover:text-black transition-colors">Page</Link></li>
                  <li><Link to="/contact" className="hover:text-black transition-colors">Page</Link></li>
                  <li><Link to="/support" className="hover:text-black transition-colors">Page</Link></li>
                  <li><Link to="/faq" className="hover:text-black transition-colors">Page</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-black mb-4">Topic</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><Link to="/garages" className="hover:text-black transition-colors">Page</Link></li>
                  <li><Link to="/pricing" className="hover:text-black transition-colors">Page</Link></li>
                  <li><Link to="/lookup" className="hover:text-black transition-colors">Page</Link></li>
                  <li><Link to="/getting-started" className="hover:text-black transition-colors">Page</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-black mb-4">Topic</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><Link to="/privacy-policy" className="hover:text-black transition-colors">Page</Link></li>
                  <li><Link to="/terms-of-service" className="hover:text-black transition-colors">Page</Link></li>
                  <li><Link to="/cookie-policy" className="hover:text-black transition-colors">Page</Link></li>
                  <li><Link to="/about" className="hover:text-black transition-colors">Page</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage