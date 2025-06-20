import { useState, useEffect } from "react"
import { useTokenExpiration } from "../hooks/useTokenExpiration"
import { useAuth } from "../providers/AuthContext"

const SessionExpirationWarning = () => {
  const { isExpiringSoon, formattedTimeUntilExpiration } = useTokenExpiration()
  const { logout } = useAuth()
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    setShowWarning(isExpiringSoon)
  }, [isExpiringSoon])

  if (!showWarning) return null

  return (
    <div className="fixed top-4 right-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-lg z-50 max-w-sm">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">Session Expiring Soon</h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>Your session will expire in {formattedTimeUntilExpiration}.</p>
          </div>
          <div className="mt-4 flex space-x-2">
            <button
              onClick={() => window.location.reload()}
              className="bg-yellow-100 px-2 py-1 text-sm font-medium text-yellow-800 rounded hover:bg-yellow-200"
            >
              Extend Session
            </button>
            <button
              onClick={() => setShowWarning(false)}
              className="bg-transparent px-2 py-1 text-sm font-medium text-yellow-800 rounded hover:bg-yellow-100"
            >
              Dismiss
            </button>
          </div>
        </div>
        <div className="ml-auto pl-3">
          <button onClick={() => setShowWarning(false)} className="inline-flex text-yellow-400 hover:text-yellow-600">
            <span className="sr-only">Close</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SessionExpirationWarning
