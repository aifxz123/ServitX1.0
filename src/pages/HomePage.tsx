import React from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, Shield, Clock, Users, Search, Wrench } from 'lucide-react'

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20 min-h-screen flex items-center">
        {/* Audi A3 Background */}
        <div className="absolute inset-0">
          <img 
            src="/audi_a3_bg.png" 
            alt="Audi A3" 
            className="w-full h-full object-cover opacity-30"
          />
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-white/75 to-blue-50/85"></div>
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              The Digital MOT for Your Car's Service History
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Garages log services digitally,<br />
            individuals check instantly.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
              Why Use Servitex?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Modern vehicle service tracking that benefits both garages and individuals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{
                  backgroundImage: `url('https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop')`
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 to-white/90"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Fast Upload</h3>
                <p className="text-slate-600">
                  Garages can log service records in seconds with our intuitive interface
                </p>
              </div>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-white border border-purple-100 relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{
                  backgroundImage: `url('https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop')`
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/90 to-white/90"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Secure Storage</h3>
                <p className="text-slate-600">
                  All data is encrypted and stored securely in the cloud with enterprise-grade security
                </p>
              </div>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-white border border-green-100 relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{
                  backgroundImage: `url('https://images.pexels.com/photos/97075/pexels-photo-97075.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop')`
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/90 to-white/90"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Public Records</h3>
                <p className="text-slate-600">
                  Individuals can instantly verify service history with just a registration number
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by Big Brands Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
              Trusted by Big Brands
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Leading automotive manufacturers trust digital service records
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
            {/* Mercedes */}
            <div className="flex items-center justify-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <img 
                src="/mercedes%20logo.png" 
                alt="Mercedes-Benz" 
                className="h-12 object-contain"
              />
            </div>
            
            {/* Ford */}
            <div className="flex items-center justify-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <img 
                src="/ford%20logo.jpg" 
                alt="Ford" 
                className="h-12 object-contain"
              />
            </div>
            
            {/* Renault */}
            <div className="flex items-center justify-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <img 
                src="/renault%20logo.png" 
                alt="Renault" 
                className="h-12 object-contain"
              />
            </div>
            
            {/* Mitsubishi */}
            <div className="flex items-center justify-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <img 
                src="/mitsubishi%20logo.png" 
                alt="Mitsubishi" 
                className="h-12 object-contain"
              />
            </div>
            
            {/* Volkswagen */}
            <div className="flex items-center justify-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <img 
                src="/vw%20logo.jpg" 
                alt="Volkswagen" 
                className="h-12 object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
              Trusted by Garages Nationwide
            </h2>
            <div className="flex items-center justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
              <span className="ml-2 text-slate-600 font-medium">5.0 out of 5</span>
            </div>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Join hundreds of garages already using Servitex to modernize their service records
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face" 
                  alt="James Wilson" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-slate-900">James Wilson</h4>
                  <p className="text-slate-600 text-sm">Premium Auto Services</p>
                </div>
              </div>
              <p className="text-slate-600 italic">
                "Servitex has revolutionized how we handle service records. Our customers love being able to verify their service history instantly."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face" 
                  alt="Sarah Thompson" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-slate-900">Sarah Thompson</h4>
                  <p className="text-slate-600 text-sm">City Garage</p>
                </div>
              </div>
              <p className="text-slate-600 italic">
                "The digital service history gives our customers confidence and has helped us win more business. Highly recommended!"
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face" 
                  alt="Michael Chen" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-slate-900">Michael Chen</h4>
                  <p className="text-slate-600 text-sm">Express Motors</p>
                </div>
              </div>
              <p className="text-slate-600 italic">
                "Simple to use, professional presentation, and great customer support. Servitex is a game-changer for our garage."
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face" 
                  alt="Emma Rodriguez" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-slate-900">Emma Rodriguez</h4>
                  <p className="text-slate-600 text-sm">AutoCare Plus</p>
                </div>
              </div>
              <p className="text-slate-600 italic">
                "Our customers appreciate the transparency. It's helped build trust and improved our reputation significantly."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join the digital revolution in vehicle service tracking
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Free Trial
            </Link>
            
            <Link
              to="/pricing"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage