export const decodeJWT = (token) => {
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
    console.error("Error decoding JWT:", error)
    return null
  }
}

export const isTokenExpired = (token, bufferMinutes = 5) => {
  if (!token) return true

  try {
    const decoded = decodeJWT(token)
    if (!decoded || !decoded.exp) return true

    const currentTime = Date.now() / 1000
    const bufferTime = bufferMinutes * 60 // Convert minutes to seconds

    return decoded.exp - bufferTime < currentTime
  } catch (error) {
    console.error("Error checking token expiration:", error)
    return true
  }
}

export const getTokenExpirationDate = (token) => {
  try {
    const decoded = decodeJWT(token)
    return decoded?.exp ? new Date(decoded.exp * 1000) : null
  } catch (error) {
    return null
  }
}

export const getTimeUntilExpiration = (token) => {
  try {
    const decoded = decodeJWT(token)
    if (!decoded?.exp) return null

    const expirationTime = decoded.exp * 1000
    const currentTime = Date.now()

    return Math.max(0, expirationTime - currentTime)
  } catch (error) {
    return null
  }
}
