"use client"

import ChangeColorToggle from "@/components/ChangeColorToggle"
import Header from "@/components/Header"
import Footer from "@/components/aboutus/Footer"
import { Outlet } from "react-router-dom"
import { createContext, useContext, useState } from "react"

// Create context for modal state
const ModalContext = createContext()

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("useModal must be used within ModalProvider")
  }
  return context
}

const MainLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        {/* Background Pattern */}
        <div className="fixed inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fillRule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fillOpacity=&quot;.02&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40 pointer-events-none"></div>

        {/* Floating Color Toggle */}
        <div className="fixed top-6 right-6 z-50">
          <div className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg border border-white/50">
            <ChangeColorToggle />
          </div>
        </div>

        {/* Enhanced Header */}
        <div className="relative z-40">
          <Header />
        </div>

        {/* Main Content */}
        <main className="relative z-10">
          <Outlet />
        </main>

        {/* Footer */}
        <div className="relative z-10">
          <Footer />
        </div>

        {/* Decorative Elements - Only show when no modal is open */}
        {!isModalOpen && (
          <div className="fixed inset-0 pointer-events-none overflow-hidden decorative-elements">
            {/* Top Left Gradient Orb */}
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float"></div>

            {/* Top Right Gradient Orb */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-float animation-delay-200"></div>

            {/* Bottom Left Gradient Orb */}
            <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-float animation-delay-300"></div>

            {/* Bottom Right Gradient Orb */}
            <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-float animation-delay-500"></div>

            {/* Center Floating Orb */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-violet-400/10 to-fuchsia-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
          </div>
        )}

        {/* Floating Particles - Only show when no modal is open */}
        {!isModalOpen && (
          <div className="fixed inset-0 pointer-events-none overflow-hidden floating-particles">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-30 animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${10 + Math.random() * 20}s`,
                }}
              ></div>
            ))}
          </div>
        )}
      </div>
    </ModalContext.Provider>
  )
}

export default MainLayout
