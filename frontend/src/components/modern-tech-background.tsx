"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

interface ModernTechBackgroundProps {
  className?: string
}

export default function ModernTechBackground({ className = "" }: ModernTechBackgroundProps) {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"
  const primaryColor = isDark ? "hsl(210, 100%, 70%)" : "hsl(210, 100%, 50%)"
  const secondaryColor = isDark ? "hsl(180, 100%, 70%)" : "hsl(180, 100%, 50%)"

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Primary Glow Effect */}
      <div 
        className={`absolute inset-0 blur-[40px] ${isDark ? 'opacity-[0.25]' : 'opacity-[0.15]'}`}
        style={{
          background: `radial-gradient(ellipse 800px 400px at center, ${primaryColor}, transparent)`,
        }}
      />
      
      {/* Secondary Glow Effect */}
      <div 
        className={`absolute inset-0 blur-[80px] ${isDark ? 'opacity-[0.15]' : 'opacity-[0.08]'}`}
        style={{
          background: `radial-gradient(ellipse 600px 300px at center, ${secondaryColor}, transparent)`,
        }}
      />

      {/* Floating Gradient Orbs */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`orb-${i}`}
          className={`absolute rounded-full blur-sm ${isDark ? 'opacity-50' : 'opacity-30'}`}
          style={{
            width: `${20 + Math.random() * 60}px`,
            height: `${20 + Math.random() * 60}px`,
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            background: `radial-gradient(circle, ${primaryColor}, transparent)`,
            animation: `float-orb-${i % 4} ${15 + Math.random() * 20}s infinite linear`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}

      {/* Geometric Tech Shapes */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={`shape-${i}`}
          className={`absolute ${isDark ? 'opacity-35' : 'opacity-20'} ${
            i % 3 === 0 ? 'w-8 h-8' : i % 3 === 1 ? 'w-6 h-6 rounded-full' : 'w-10 h-6'
          }`}
          style={{
            left: `${15 + Math.random() * 70}%`,
            top: `${15 + Math.random() * 70}%`,
            background: `linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`,
            borderRadius: i % 3 === 0 ? '4px' : i % 3 === 1 ? '50%' : '8px',
            animation: `tech-shape-${i % 3} ${8 + Math.random() * 7}s infinite ease-in-out`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      {/* Particle Grid */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className={`absolute w-1 h-1 rounded-full ${isDark ? 'opacity-60' : 'opacity-40'}`}
            style={{
              left: `${(i % 5) * 20}%`,
              top: `${Math.floor(i / 5) * 20}%`,
              background: primaryColor,
              animation: `particle-pulse ${3 + Math.random() * 2}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Neural Network Connections */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        {Array.from({ length: 12 }).map((_, i) => {
          const x1 = 10 + Math.random() * 80
          const y1 = 10 + Math.random() * 80
          const x2 = 10 + Math.random() * 80
          const y2 = 10 + Math.random() * 80
          
          return (
            <line
              key={`connection-${i}`}
              x1={`${x1}%`}
              y1={`${y1}%`}
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="url(#connectionGradient)"
              strokeWidth="1"
              opacity={isDark ? "0.5" : "0.3"}
              style={{
                animation: `connection-animate ${10 + Math.random() * 5}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            />
          )
        })}
      </svg>

      {/* Rotating Neural Network Pattern */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className={`w-96 h-96 ${isDark ? 'opacity-20' : 'opacity-10'}`}
          style={{
            background: `conic-gradient(from 0deg, ${primaryColor}, ${secondaryColor}, ${primaryColor})`,
            borderRadius: '50%',
            animation: 'neural-rotate 60s infinite linear',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes float-orb-0 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          25% { transform: translate3d(100px, -50px, 0) scale(1.2); }
          50% { transform: translate3d(-50px, 100px, 0) scale(0.8); }
          75% { transform: translate3d(50px, -100px, 0) scale(1.1); }
        }
        
        @keyframes float-orb-1 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          25% { transform: translate3d(-100px, 50px, 0) scale(0.8); }
          50% { transform: translate3d(50px, -100px, 0) scale(1.2); }
          75% { transform: translate3d(-50px, 100px, 0) scale(0.9); }
        }
        
        @keyframes float-orb-2 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          25% { transform: translate3d(50px, 100px, 0) scale(1.1); }
          50% { transform: translate3d(-100px, -50px, 0) scale(0.8); }
          75% { transform: translate3d(100px, 50px, 0) scale(1.2); }
        }
        
        @keyframes float-orb-3 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          25% { transform: translate3d(-50px, -100px, 0) scale(1.2); }
          50% { transform: translate3d(100px, 50px, 0) scale(0.8); }
          75% { transform: translate3d(-100px, -50px, 0) scale(1.1); }
        }

        @keyframes tech-shape-0 {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); opacity: 0.2; }
          25% { transform: translate3d(20px, -20px, 0) rotate(90deg) scale(1.2); opacity: 0.4; }
          50% { transform: translate3d(-20px, 20px, 0) rotate(180deg) scale(0.8); opacity: 0.2; }
          75% { transform: translate3d(20px, 20px, 0) rotate(270deg) scale(1.1); opacity: 0.3; }
        }

        @keyframes tech-shape-1 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.2; }
          25% { transform: translate3d(-20px, -20px, 0) scale(1.3); opacity: 0.5; }
          50% { transform: translate3d(20px, 20px, 0) scale(0.7); opacity: 0.2; }
          75% { transform: translate3d(-20px, 20px, 0) scale(1.1); opacity: 0.4; }
        }

        @keyframes tech-shape-2 {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); opacity: 0.2; }
          25% { transform: translate3d(15px, -15px, 0) rotate(45deg) scale(1.1); opacity: 0.3; }
          50% { transform: translate3d(-15px, 15px, 0) rotate(90deg) scale(0.9); opacity: 0.2; }
          75% { transform: translate3d(15px, 15px, 0) rotate(135deg) scale(1.2); opacity: 0.4; }
        }

        @keyframes particle-pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.5); }
        }

        @keyframes connection-animate {
          0%, 100% { stroke-dasharray: 0 1000; opacity: 0.1; }
          50% { stroke-dasharray: 1000 0; opacity: 0.4; }
        }

        @keyframes neural-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
} 