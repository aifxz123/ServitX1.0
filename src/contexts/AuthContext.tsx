import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  userType: 'garage' | 'admin' | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [userType, setUserType] = useState<'garage' | 'admin' | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user)
        determineUserType(session.user)
      }
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user)
        determineUserType(session.user)
      } else {
        setUser(null)
        setUserType(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const determineUserType = (user: User) => {
    // Check user type based on email for demo purposes
    if (user.email === 'admin@servitex.com') {
      setUserType('admin')
    } else if (user.email === 'contact@premiumauto.com') {
      setUserType('garage')
    } else {
      // For new signups, check if they have a garage record
      checkGarageUser(user.id)
    }
  }

  const checkGarageUser = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('garages')
        .select('verification_status')
        .eq('id', userId)
        .single()

      if (data && !error) {
        setUserType('garage')
      } else {
        setUserType(null)
      }
    } catch (error) {
      console.error('Error checking garage user:', error)
      setUserType(null)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password
      })

      if (error) {
        console.error('Login error:', error.message)
        return false
      }

      if (data.user) {
        setUser(data.user)
        determineUserType(data.user)
        return true
      }

      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      await supabase.auth.signOut()
      setUser(null)
      setUserType(null)
      // Redirect to home page after logout
      window.location.href = '/'
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    userType,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}