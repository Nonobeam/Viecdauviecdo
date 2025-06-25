"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { jwtDecode } from "jwt-decode"
import {
  isTokenExpired,
  getTimeUntilExpiration,
  getUserIdFromToken,
  getEmailFromToken,
  handleTokenResponse
} from "@/utils/tokenUtils"
import { login as apiLogin } from "@/utils/authApi"
import { getUserById } from "@/utils/userApi"

const AuthContext = createContext({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
})

// Configuration constants
const TOKEN_BUFFER_MINUTES = 5
const TOKEN_CHECK_INTERVAL = 5 * 60 * 1000 // 5 minutes
const LOGOUT_DELAY = 300 // 300ms

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user is authenticated
  const isAuthenticated = !!user

  // Logout function with cleanup
  const logout = useCallback(async (reason = "manual") => {
    try {
      setLoading(true)

      if (reason === "expired") {
        console.log("Session expired, logging out...")
      }

      await new Promise((resolve) => setTimeout(resolve, LOGOUT_DELAY))

      setUser(null)
      localStorage.removeItem("user")
      localStorage.removeItem("token")

      if (typeof document !== "undefined") {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      }
    } catch (error) {
      console.error("Logout error:", error)
      setUser(null)
      localStorage.removeItem("user")
      localStorage.removeItem("token")
    } finally {
      setLoading(false)
    }
  }, [])

  const checkTokenExpiration = useCallback(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken && isTokenExpired(storedToken, TOKEN_BUFFER_MINUTES)) {
      console.log("Token expired, logging out...")
      logout("expired")
      return false
    }

    return true
  }, [logout])

  // Set up token expiration timer
  useEffect(() => {
    if (!user) return

    const storedToken = localStorage.getItem("token")
    if (!storedToken) return

    const timeUntilExpiration = getTimeUntilExpiration(storedToken)
    if (!timeUntilExpiration) return

    // If token expires in less than buffer time, logout immediately
    const bufferTime = TOKEN_BUFFER_MINUTES * 60 * 1000
    if (timeUntilExpiration <= bufferTime) {
      logout("expired")
      return
    }

    // Set timer to logout before expiration
    const timeoutId = setTimeout(() => {
      logout("expired")
    }, timeUntilExpiration - bufferTime)

    return () => clearTimeout(timeoutId)
  }, [user, logout])

  // Periodic token validation
  useEffect(() => {
    if (!isAuthenticated) return

    const intervalId = setInterval(() => {
      checkTokenExpiration()
    }, TOKEN_CHECK_INTERVAL)

    return () => clearInterval(intervalId)
  }, [isAuthenticated, checkTokenExpiration])

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user")
        const storedToken = localStorage.getItem("token")

        if (storedUser && storedToken) {
          // Check if token is expired
          if (isTokenExpired(storedToken, TOKEN_BUFFER_MINUTES)) {
            console.log("Stored token is expired, clearing auth data")
            localStorage.removeItem("user")
            localStorage.removeItem("token")
            return
          }

          const parsedUser = JSON.parse(storedUser)

          if (parsedUser.email) {
            setUser(parsedUser)
          } else {
            // Invalid user data, clear storage
            localStorage.removeItem("user")
            localStorage.removeItem("token")
          }
        }
      } catch (error) {
        console.error("Error parsing stored user data:", error)
        // Clear invalid data
        localStorage.removeItem("user")
        localStorage.removeItem("token")
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = async (email, password) => {
    try {
      setLoading(true)

      const { token } = await apiLogin({ username: email, password })
      
      const decodedToken = jwtDecode(token)
      const userId = getUserIdFromToken(token)
      const emailFromToken = getEmailFromToken(token)
      const name = decodedToken.name

      const userData = {
        email: emailFromToken,
        name: name,
        id: userId,
        user_id: userId,
        token: token,
      }

      // Store user data and token
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      localStorage.setItem("token", userData.token)

      // Check if user needs to update profile
      const res = await getUserById(userId)
      const phone = res?.data?.user_information?.phone_number

      return {
        requiresProfileUpdate: !phone
      }
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}