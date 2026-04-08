"use client"

import { useEffect, useState, useCallback } from "react"
import { useTheme } from "next-themes"

interface Position {
  x: number
  y: number
}

interface PointerStyle {
  id: string
  name: string
  description: string
}

interface CustomPointerProps {
  style?: "glow" | "ripple" | "neon" | "auto"
  size?: "small" | "medium" | "large"
  color?: "blue" | "cyan" | "purple" | "green" | "auto"
  intensity?: "low" | "medium" | "high"
  className?: string
  disabled?: boolean
}

const POINTER_STYLES: Record<string, PointerStyle> = {
  glow: {
    id: "glow",
    name: "Glowing Circle",
    description: "Soft glowing circle that follows the mouse"
  },
  ripple: {
    id: "ripple", 
    name: "Ripple Effect",
    description: "Expanding circle with ripple animation"
  },
  neon: {
    id: "neon",
    name: "Neon Dot",
    description: "Bright neon dot with outer glow"
  }
}

const SIZE_CONFIG = {
  small: { base: 12, glow: 20, ripple: 30 },
  medium: { base: 16, glow: 28, ripple: 40 },
  large: { base: 20, glow: 36, ripple: 50 }
}

const COLOR_CONFIG = {
  blue: {
    primary: "rgb(59, 130, 246)",
    secondary: "rgb(147, 197, 253)",
    glow: "rgba(59, 130, 246, 0.6)"
  },
  cyan: {
    primary: "rgb(6, 182, 212)",
    secondary: "rgb(103, 232, 249)",
    glow: "rgba(6, 182, 212, 0.6)"
  },
  purple: {
    primary: "rgb(147, 51, 234)",
    secondary: "rgb(196, 181, 253)",
    glow: "rgba(147, 51, 234, 0.6)"
  },
  green: {
    primary: "rgb(34, 197, 94)",
    secondary: "rgb(134, 239, 172)",
    glow: "rgba(34, 197, 94, 0.6)"
  }
}

const INTENSITY_CONFIG = {
  low: { opacity: 0.4, blur: "blur-sm" },
  medium: { opacity: 0.7, blur: "blur-md" },
  high: { opacity: 1.0, blur: "blur-lg" }
}

export default function CustomPointer({
  style = "auto",
  size = "medium",
  color = "auto",
  intensity = "medium",
  className = "",
  disabled = false
}: CustomPointerProps) {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; timestamp: number }>>([])
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Auto-detect theme-based colors
  const getThemeColors = useCallback(() => {
    if (!mounted) return COLOR_CONFIG.blue
    
    const isDark = theme === "dark"
    if (color === "auto") {
      return isDark ? COLOR_CONFIG.cyan : COLOR_CONFIG.blue
    }
    return COLOR_CONFIG[color]
  }, [theme, color, mounted])

  // Auto-detect style based on theme
  const getActiveStyle = useCallback(() => {
    if (style === "auto") {
      return theme === "dark" ? "neon" : "glow"
    }
    return style
  }, [style, theme])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (disabled) return
    
    setPosition({ x: e.clientX, y: e.clientY })
    setIsVisible(true)

    // Add ripple effect for ripple style
    if (getActiveStyle() === "ripple") {
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      }
      setRipples(prev => [...prev.slice(-2), newRipple]) // Keep only last 3 ripples
    }
  }, [disabled, getActiveStyle])

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false)
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (!disabled) {
      setIsVisible(true)
    }
  }, [disabled])

  useEffect(() => {
    if (!mounted) return

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVisible(false)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter, mounted])

  // Clean up old ripples
  useEffect(() => {
    if (ripples.length === 0) return

    const timer = setTimeout(() => {
      setRipples(prev => prev.filter(ripple => Date.now() - ripple.timestamp < 1000))
    }, 100)

    return () => clearTimeout(timer)
  }, [ripples])

  if (!mounted || disabled) return null

  const activeStyle = getActiveStyle()
  const colors = getThemeColors()
  const sizeConfig = SIZE_CONFIG[size]
  const intensityConfig = INTENSITY_CONFIG[intensity]
  const offset = sizeConfig.base / 2

  const renderGlowStyle = () => (
    <div
      className={`pointer-events-none fixed top-0 left-0 z-50 transition-all duration-150 ease-out ${className}`}
      style={{
        transform: `translate(${position.x - offset}px, ${position.y - offset}px)`,
        opacity: isVisible ? intensityConfig.opacity : 0,
      }}
    >
      {/* Outer glow */}
      <div 
        className={`absolute inset-0 rounded-full ${intensityConfig.blur}`}
        style={{
          width: sizeConfig.glow,
          height: sizeConfig.glow,
          left: -sizeConfig.glow / 2 + offset,
          top: -sizeConfig.glow / 2 + offset,
          background: colors.glow,
        }}
      />
      {/* Inner circle */}
      <div 
        className="absolute rounded-full"
        style={{
          width: sizeConfig.base,
          height: sizeConfig.base,
          left: 0,
          top: 0,
          background: colors.primary,
          boxShadow: `0 0 10px ${colors.primary}`,
        }}
      />
    </div>
  )

  const renderRippleStyle = () => (
    <div
      className={`pointer-events-none fixed top-0 left-0 z-50 transition-all duration-150 ease-out ${className}`}
      style={{
        transform: `translate(${position.x - offset}px, ${position.y - offset}px)`,
        opacity: isVisible ? intensityConfig.opacity : 0,
      }}
    >
      {/* Main dot */}
      <div 
        className="absolute rounded-full animate-pulse"
        style={{
          width: sizeConfig.base,
          height: sizeConfig.base,
          left: 0,
          top: 0,
          background: colors.primary,
          boxShadow: `0 0 15px ${colors.primary}`,
        }}
      />
      
      {/* Ripple effects */}
      {ripples.map((ripple) => {
        const age = Date.now() - ripple.timestamp
        const progress = Math.min(age / 1000, 1)
        const scale = 1 + progress * 2
        const opacity = (1 - progress) * intensityConfig.opacity
        
        return (
          <div
            key={ripple.id}
            className="absolute rounded-full border-2 animate-ping"
            style={{
              width: sizeConfig.ripple,
              height: sizeConfig.ripple,
              left: -sizeConfig.ripple / 2 + offset,
              top: -sizeConfig.ripple / 2 + offset,
              borderColor: colors.primary,
              opacity,
              transform: `scale(${scale})`,
              animationDuration: '1s',
            }}
          />
        )
      })}
    </div>
  )

  const renderNeonStyle = () => (
    <div
      className={`pointer-events-none fixed top-0 left-0 z-50 transition-all duration-150 ease-out ${className}`}
      style={{
        transform: `translate(${position.x - offset}px, ${position.y - offset}px)`,
        opacity: isVisible ? intensityConfig.opacity : 0,
      }}
    >
      {/* Outer neon ring */}
      <div 
        className={`absolute rounded-full ${intensityConfig.blur}`}
        style={{
          width: sizeConfig.glow,
          height: sizeConfig.glow,
          left: -sizeConfig.glow / 2 + offset,
          top: -sizeConfig.glow / 2 + offset,
          background: `radial-gradient(circle, ${colors.glow}, transparent)`,
          animation: 'neon-pulse 2s ease-in-out infinite alternate',
        }}
      />
      
      {/* Inner bright dot */}
      <div 
        className="absolute rounded-full"
        style={{
          width: sizeConfig.base,
          height: sizeConfig.base,
          left: 0,
          top: 0,
          background: colors.secondary,
          boxShadow: `
            0 0 5px ${colors.primary},
            0 0 10px ${colors.primary},
            0 0 15px ${colors.primary},
            0 0 20px ${colors.primary}
          `,
          animation: 'neon-flicker 3s ease-in-out infinite',
        }}
      />
      
      {/* Core bright center */}
      <div 
        className="absolute rounded-full"
        style={{
          width: sizeConfig.base / 2,
          height: sizeConfig.base / 2,
          left: sizeConfig.base / 4,
          top: sizeConfig.base / 4,
          background: colors.primary,
          boxShadow: `0 0 8px ${colors.primary}`,
        }}
      />
    </div>
  )

  const renderPointer = () => {
    switch (activeStyle) {
      case "ripple":
        return renderRippleStyle()
      case "neon":
        return renderNeonStyle()
      case "glow":
      default:
        return renderGlowStyle()
    }
  }

  return (
    <>
      {renderPointer()}
      <style>{`
        @keyframes neon-pulse {
          0% { 
            opacity: 0.3;
            transform: scale(1);
          }
          100% { 
            opacity: 0.8;
            transform: scale(1.1);
          }
        }
        
        @keyframes neon-flicker {
          0%, 100% { 
            opacity: 1;
            filter: brightness(1);
          }
          50% { 
            opacity: 0.8;
            filter: brightness(1.2);
          }
        }
      `}</style>
    </>
  )
}

// Export the styles for external use
export { POINTER_STYLES, SIZE_CONFIG, COLOR_CONFIG, INTENSITY_CONFIG }
export type { CustomPointerProps, PointerStyle }
