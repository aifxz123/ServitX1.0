import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import SimpleDashboard from './pages/SimpleDashboard'
import PricingPage from './pages/PricingPage'
import CheckoutPage from './pages/CheckoutPage'
import CheckoutSuccessPage from './pages/CheckoutSuccessPage'
import VehicleLookupPage from './pages/VehicleLookupPage'
import GarageDashboard from './pages/GarageDashboard'
import AdminDashboard from './pages/AdminDashboard'
import AdminRecordManager from './pages/AdminRecordManager'
import AddServiceRecord from './pages/AddServiceRecord'
import SubscriptionPage from './pages/SubscriptionPage'
import AccountPage from './pages/AccountPage'
import FAQPage from './pages/FAQPage'
import GaragesPage from './pages/GaragesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import SupportPage from './pages/SupportPage'
import GettingStartedPage from './pages/GettingStartedPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsOfServicePage from './pages/TermsOfServicePage'
import CookiePolicyPage from './pages/CookiePolicyPage'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
            <Route path="/lookup" element={<VehicleLookupPage />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/garages" element={<GaragesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/getting-started" element={<GettingStartedPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <SimpleDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/garage" 
              element={
                <ProtectedRoute requiredUserType="garage">
                  <GarageDashboard />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/add-service" 
              element={
                <ProtectedRoute requiredUserType="garage">
                  <AddServiceRecord />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredUserType="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/admin/records" 
              element={
                <ProtectedRoute requiredUserType="admin">
                  <AdminRecordManager />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/account" 
              element={
                <ProtectedRoute>
                  <AccountPage />
                </ProtectedRoute>
              } 
            />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App