import { useState } from "react"

export const useLoginNotification = () => {
  const [isOpen, setIsOpen] = useState(false)

  const showLoginNotification = () => {
    setIsOpen(true)
  }

  const hideLoginNotification = () => {
    setIsOpen(false)
  }

  return {
    isOpen,
    showLoginNotification,
    hideLoginNotification
  }
}
