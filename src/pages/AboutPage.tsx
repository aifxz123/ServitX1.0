import React from 'react'
import { Shield, Wrench, Eye, Users, Target, Heart } from 'lucide-react'

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
            About Servitex
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We're transforming the UK's fragmented vehicle service landscape into a digital, transparent, and centralised experience.
          </p>
        </div>

        {/* Mission & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <div className="flex items-center mb-6">
              <Target className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-serif font-bold text-slate-900">Our Mission</h2>
            </div>
            <p className="text-slate-700 leading-relaxed mb-6">
              We believe every vehicle owner deserves complete transparency about their car's service history. 
              By digitizing service records, we're creating a trusted ecosystem where garages can showcase 
              their work and consumers can make informed decisions.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Our platform bridges the gap between traditional paper-based records and the digital future, 
              making vehicle maintenance history accessible, verifiable, and permanent.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg border border-blue-100 p-8">
            <div className="flex items-center mb-6">
              <Heart className="w-8 h-8 text-red-500 mr-3" />
              <h2 className="text-2xl font-serif font-bold text-slate-900">Our Story</h2>
            </div>
            <p className="text-slate-700 leading-relaxed mb-6">
              Servitex was born out of frustration with untraceable paper service logs and the lack of 
              transparency in the automotive service industry. After countless experiences of lost receipts, 
              questionable service claims, and difficulty proving maintenance history, our founders knew there 
              had to be a better way.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Starting in 2024, we set out to create a platform that would benefit both garages and consumers—
              giving garages a professional way to showcase their work while providing consumers with instant 
              access to verified service history.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Our Values</h2>
            <p className="text-xl text-slate-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-white shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">🔒 Trust</h3>
              <p className="text-slate-600 leading-relaxed">
                We build trust through transparency, security, and reliability. Every record is verified, 
                encrypted, and permanently stored to ensure complete confidence in our platform.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-white shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wrench className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">⚙️ Simplicity</h3>
              <p className="text-slate-600 leading-relaxed">
                Complex problems deserve simple solutions. We've designed our platform to be intuitive 
                for garages to use and effortless for consumers to access.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-white shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">🔍 Transparency</h3>
              <p className="text-slate-600 leading-relaxed">
                Open access to service history empowers consumers and showcases quality work by garages. 
                Transparency builds better relationships across the automotive industry.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-slate-50 rounded-2xl p-12 text-center">
          <div className="flex items-center justify-center mb-6">
            <Users className="w-8 h-8 text-slate-600 mr-3" />
            <h2 className="text-3xl font-serif font-bold text-slate-900">Our Team</h2>
          </div>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            We're a passionate team of automotive enthusiasts, software engineers, and customer experience experts 
            working together to revolutionize vehicle service transparency.
          </p>
          
          <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <img 
              src="/ServitX.png" 
              alt="Servitex Team" 
              className="w-20 h-20 object-contain"
            />
          </div>
          
          <p className="text-slate-600">
            Based in the UK, we're committed to serving the automotive community with innovative digital solutions.
          </p>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-serif font-bold mb-4">Ready to Join the Revolution?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Whether you're a garage looking to modernize or a consumer seeking transparency, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/garages"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
            >
              For Garages
            </a>
            <a
              href="/lookup"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Check Vehicle History
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage