"use client"

import { Outlet } from "react-router-dom"
import ChangeColorToggle from "@/components/ChangeColorToggle"
import Header from "@/components/Header"

const MainLayout = () => {
  return (
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

      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Top Left Gradient Orb */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>

        {/* Top Right Gradient Orb */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>

        {/* Bottom Left Gradient Orb */}
        <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>

        {/* Bottom Right Gradient Orb */}
        <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl"></div>

        {/* Center Floating Orb */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-violet-400/10 to-fuchsia-400/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
            }}
          ></div>
        ))}
      </div>

      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }
        
        .fixed div:nth-child(odd) {
          animation: float 15s ease-in-out infinite;
        }
        
        .fixed div:nth-child(even) {
          animation: float 20s ease-in-out infinite reverse;
        }
      `}</style>
    </div>
  )
}

export default MainLayout
