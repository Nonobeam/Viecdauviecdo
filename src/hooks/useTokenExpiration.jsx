import { useState, useEffect } from "react"
import { useAuth } from "../providers/AuthContext"

// Custom hook to get token expiration info
export const useTokenExpiration = () => {
  const { user, isAuthenticated } = useAuth()
  const [timeUntilExpiration, setTimeUntilExpiration] = useState(null)
  const [isExpiringSoon, setIsExpiringSoon] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      setTimeUntilExpiration(null)
      setIsExpiringSoon(false)
      return
    }

    const token = localStorage.getItem("token")
    if (!token) return

    const updateExpirationInfo = () => {
      try {
        const base64Url = token.split(".")[1]
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join(""),
        )
        const decoded = JSON.parse(jsonPayload)

        if (decoded.exp) {
          const expirationTime = decoded.exp * 1000
          const currentTime = Date.now()
          const timeLeft = expirationTime - currentTime

          setTimeUntilExpiration(timeLeft)
          setIsExpiringSoon(timeLeft <= 600000) // 10 minutes
        }
      } catch (error) {
        console.error("Error parsing token expiration:", error)
      }
    }

    updateExpirationInfo()
    const intervalId = setInterval(updateExpirationInfo, 60000) // Update every minute

    return () => clearInterval(intervalId)
  }, [isAuthenticated])

  const formatTimeUntilExpiration = () => {
    if (!timeUntilExpiration || timeUntilExpiration <= 0) return null

    const minutes = Math.floor(timeUntilExpiration / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days} day${days > 1 ? "s" : ""}`
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""}`
    return `${minutes} minute${minutes > 1 ? "s" : ""}`
  }

  return {
    timeUntilExpiration,
    isExpiringSoon,
    formattedTimeUntilExpiration: formatTimeUntilExpiration(),
  }
}
