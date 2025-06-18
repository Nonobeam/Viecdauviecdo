"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"

const AuthContext = createContext({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
})

// Helper function to decode JWT token
const decodeToken = (token) => {
  try {
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error("Error decoding token:", error)
    return null
  }
}

// Helper function to check if token is expired
const isTokenExpired = (token) => {
  if (!token) return true

  try {
    const decoded = decodeToken(token)
    if (!decoded || !decoded.exp) return true

    const currentTime = Date.now() / 1000
    // Add 5 minute buffer before actual expiration
    return decoded.exp - 300 < currentTime
  } catch (error) {
    console.error("Error checking token expiration:", error)
    return true
  }
}

// Helper function to get token expiration time
const getTokenExpirationTime = (token) => {
  try {
    const decoded = decodeToken(token)
    return decoded?.exp ? decoded.exp * 1000 : null
  } catch (error) {
    return null
  }
}

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

      await new Promise((resolve) => setTimeout(resolve, 300))

      setUser(null)
      localStorage.removeItem("user")
      localStorage.removeItem("token")

      if (typeof document !== "undefined") {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      }
    } catch (error) {
      console.error("Logout error:", error)
      // Force cleanup even if error occurs
      setUser(null)
      localStorage.removeItem("user")
      localStorage.removeItem("token")
    } finally {
      setLoading(false)
    }
  }, [])

  // Check token expiration and auto-logout
  const checkTokenExpiration = useCallback(() => {
    const storedToken = localStorage.getItem("token")

    if (storedToken && isTokenExpired(storedToken)) {
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

    const expirationTime = getTokenExpirationTime(storedToken)
    if (!expirationTime) return

    const timeUntilExpiration = expirationTime - Date.now()

    // If token expires in less than 5 minutes, logout immediately
    if (timeUntilExpiration <= 300000) {
      // 5 minutes in milliseconds
      logout("expired")
      return
    }

    // Set timer to logout 5 minutes before expiration
    const timeoutId = setTimeout(() => {
      logout("expired")
    }, timeUntilExpiration - 300000) // 5 minutes before expiration

    return () => clearTimeout(timeoutId)
  }, [user, logout])

  // Periodic token validation (every 5 minutes)
  useEffect(() => {
    if (!isAuthenticated) return

    const intervalId = setInterval(() => {
      checkTokenExpiration()
    }, 300000) // Check every 5 minutes

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
          if (isTokenExpired(storedToken)) {
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

  const login = async (tokenOrEmail, password) => {
    try {
      setLoading(true)

      let userData = null

      if (!password && typeof tokenOrEmail === "string") {
        const token = tokenOrEmail

        // Check if provided token is expired
        if (isTokenExpired(token)) {
          throw new Error("Token is expired")
        }

        try {
          await new Promise((resolve) => setTimeout(resolve, 500))

          // In a real app, you'd get this from your API or decode from JWT
          userData = {
            email: "user@example.com",
            name: "Test User",
            id: Date.now(),
            token: token,
          }
        } catch (error) {
          throw new Error("Invalid token")
        }
      } else if (password && tokenOrEmail) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        if (tokenOrEmail.includes("@") && password.length >= 6) {
          // Create a mock JWT token with expiration (1 hour from now)
          const mockTokenPayload = {
            email: tokenOrEmail,
            exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
            iat: Math.floor(Date.now() / 1000),
          }

          // This is a mock token - in real app, you'd get this from your API
          const mockToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(mockTokenPayload))}.mock-signature`

          userData = {
            email: tokenOrEmail,
            name: "Test User",
            id: Date.now(),
            token: mockToken,
          }
        } else {
          throw new Error("Invalid email or password")
        }
      } else {
        throw new Error("Invalid login parameters")
      }

      // Store user data and token
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))

      if (userData.token) {
        localStorage.setItem("token", userData.token)
      }

      return userData
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
