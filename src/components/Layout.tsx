import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { LogOut, User, FileText, ChevronDown } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout, userType } = useAuth()
  const location = useLocation()
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  const isPublicPage = location.pathname === '/' || location.pathname === '/lookup' || location.pathname === '/pricing' || location.pathname === '/login' || location.pathname === '/signup'

  const handleLogout = async () => {
    await logout()
    setShowProfileDropdown(false)
  }

  if (isPublicPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-2">
                <img 
                  src="/ServitX.png" 
                  alt="ServitX" 
                  className="h-8 w-auto"
                />
                <span className="text-xl font-serif font-bold text-slate-900">Servitex</span>
              </Link>
              
              <div className="flex items-center space-x-8">
                <Link to="/" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Home
                </Link>
                <Link to="/garages" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Garages
                </Link>
                <Link to="/lookup" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Individuals
                </Link>
                <Link to="/pricing" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Pricing
                </Link>
                
                {!user ? (
                  <>
                    <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Login
                    </Link>
                  </>
                ) : (
                  <div className="relative">
                    <button
                      onMouseEnter={() => setShowProfileDropdown(true)}
                      onMouseLeave={() => setShowProfileDropdown(false)}
                      className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors p-2 rounded-lg hover:bg-slate-100"
                    >
                      <User className="w-5 h-5" />
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    
                    {showProfileDropdown && (
                      <div
                        onMouseEnter={() => setShowProfileDropdown(true)}
                        onMouseLeave={() => setShowProfileDropdown(false)}
                        className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50"
                      >
                        <div className="px-4 py-2 border-b border-slate-100">
                          <p className="text-sm text-slate-500">Signed in as</p>
                          <p className="text-sm font-medium text-slate-900 truncate">{user?.email}</p>
                        </div>
                        
                        {userType === 'garage' && (
                          <Link 
                            to="/garage"
                            className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors block"
                            onClick={() => setShowProfileDropdown(false)}
                          >
                            Dashboard
                          </Link>
                        )}
                        
                        {userType === 'admin' && (
                          <Link 
                            to="/admin"
                            className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors block"
                            onClick={() => setShowProfileDropdown(false)}
                          >
                            Admin Panel
                          </Link>
                        )}
                        
                        <Link 
                          to="/account"
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors block"
                          onClick={() => setShowProfileDropdown(false)}
                        >
                          Account
                        </Link>
                        
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
        
        <main className="min-h-screen">
          {children}
        </main>
        
        <footer className="bg-slate-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-serif font-bold">Servitex</span>
                </div>
                <p className="text-slate-400">
                  Digital service history. Trusted. Transparent.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">FAQ</h3>
                <ul className="space-y-2 text-slate-400">
                  <li><Link to="/faq" className="hover:text-white transition-colors hover:underline">Frequently Asked Questions</Link></li>
                  <li><Link to="/getting-started" className="hover:text-white transition-colors hover:underline">Getting Started</Link></li>
                  <li><Link to="/pricing" className="hover:text-white transition-colors hover:underline">Pricing & Plans</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-slate-400">
                  <li><Link to="/about" className="hover:text-white transition-colors hover:underline">About</Link></li>
                  <li><Link to="/contact" className="hover:text-white transition-colors hover:underline">Contact</Link></li>
                  <li><Link to="/support" className="hover:text-white transition-colors hover:underline">Support</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-slate-400">
                  <li><Link to="/privacy-policy" className="hover:text-white transition-colors hover:underline">Privacy Policy</Link></li>
                  <li><Link to="/terms-of-service" className="hover:text-white transition-colors hover:underline">Terms of Service</Link></li>
                  <li><Link to="/cookie-policy" className="hover:text-white transition-colors hover:underline">Cookie Policy</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
              <p>&copy; 2024 Servitex. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    )
  }

  // Authenticated user layout with consistent navigation
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/ServitX.png" 
                alt="ServitX" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-serif font-bold text-slate-900">Servitex</span>
            </Link>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-6">
                <Link to="/" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Home
                </Link>
                
                {userType === 'garage' && (
                  <Link to="/garage" className="text-slate-600 hover:text-slate-900 transition-colors">
                    Dashboard
                  </Link>
                )}
                
                {userType === 'admin' && (
                  <Link to="/admin" className="text-slate-600 hover:text-slate-900 transition-colors">
                    Admin Panel
                  </Link>
                )}
              </div>
              
              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onMouseEnter={() => setShowProfileDropdown(true)}
                  onMouseLeave={() => setShowProfileDropdown(false)}
                  className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors p-2 rounded-lg hover:bg-slate-100"
                >
                  <User className="w-5 h-5" />
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showProfileDropdown && (
                  <div
                    onMouseEnter={() => setShowProfileDropdown(true)}
                    onMouseLeave={() => setShowProfileDropdown(false)}
                    className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50"
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-sm text-slate-500">Signed in as</p>
                      <p className="text-sm font-medium text-slate-900 truncate">{user?.email}</p>
                    </div>
                    
                    <Link 
                      to="/account"
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors block"
                      onClick={() => setShowProfileDropdown(false)}
                    >
                      Account
                    </Link>
                    
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}

export default Layout