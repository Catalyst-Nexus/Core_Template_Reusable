import React, { createContext, useState, useContext, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

interface User {
  id: string
  username: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize auth state and set up listener for session changes
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (!isSupabaseConfigured() || !supabase) {
          // Fallback to localStorage if Supabase not configured
          const storedUser = localStorage.getItem('user')
          if (storedUser) {
            setUser(JSON.parse(storedUser))
            setIsAuthenticated(true)
          }
          setIsLoading(false)
          return
        }

        // Check current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          console.error('Session error:', sessionError)
          setIsLoading(false)
          return
        }

        if (session?.user) {
          // Fetch user profile from database
          const { data: userProfile, error: profileError } = await supabase
            .from('users')
            .select('id, username, email, role')
            .eq('id', session.user.id)
            .single()

          if (profileError && profileError.code !== 'PGRST116') {
            console.error('Profile fetch error:', profileError)
          }

          const userData: User = {
            id: session.user.id,
            username: userProfile?.username || session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
            role: userProfile?.role || 'user',
          }

          setUser(userData)
          setIsAuthenticated(true)
        } else {
          setUser(null)
          setIsAuthenticated(false)
        }

        setIsLoading(false)

        // Subscribe to auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (session?.user) {
            const { data: userProfile } = await supabase
              .from('users')
              .select('id, username, email, role')
              .eq('id', session.user.id)
              .single()

            const userData: User = {
              id: session.user.id,
              username: userProfile?.username || session.user.email?.split('@')[0] || 'User',
              email: session.user.email || '',
              role: userProfile?.role || 'user',
            }

            setUser(userData)
            setIsAuthenticated(true)
          } else {
            setUser(null)
            setIsAuthenticated(false)
          }
        })

        return () => {
          subscription?.unsubscribe()
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!isSupabaseConfigured() || !supabase) {
        return { success: false, error: 'Supabase is not configured' }
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { success: false, error: error.message }
      }

      if (data.user) {
        // Fetch user profile
        const { data: userProfile } = await supabase
          .from('users')
          .select('id, username, email, role')
          .eq('id', data.user.id)
          .single()

        const userData: User = {
          id: data.user.id,
          username: userProfile?.username || email.split('@')[0],
          email: email,
          role: userProfile?.role || 'user',
        }

        setUser(userData)
        setIsAuthenticated(true)
        return { success: true }
      }

      return { success: false, error: 'Login failed' }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred during login'
      return { success: false, error: message }
    }
  }

  const logout = async () => {
    try {
      if (isSupabaseConfigured() && supabase) {
        const { error } = await supabase.auth.signOut()
        if (error) {
          console.error('Logout error:', error)
        }
      }
      setUser(null)
      setIsAuthenticated(false)
    } catch (error) {
      console.error('Logout error:', error)
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
