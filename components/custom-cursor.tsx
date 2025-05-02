"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface CustomCursorProps {
  variant: string
  text: string
}

export function CustomCursor({ variant, text }: CustomCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener("mousemove", updateMousePosition)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  const variants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
    button: {
      width: 80,
      height: 80,
      backgroundColor: "rgba(0, 255, 178, 0.1)",
      border: "1px solid rgba(0, 255, 178, 0.3)",
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
    },
    hover: {
      width: 64,
      height: 64,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
    },
    link: {
      width: 64,
      height: 64,
      backgroundColor: "rgba(0, 116, 240, 0.1)",
      border: "1px solid rgba(0, 116, 240, 0.3)",
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
    },
    chart: {
      width: 24,
      height: 24,
      backgroundColor: "rgba(0, 255, 178, 0.2)",
      border: "1px solid rgba(0, 255, 178, 0.4)",
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
    },
    tab: {
      width: 64,
      height: 64,
      backgroundColor: "rgba(0, 255, 178, 0.1)",
      border: "1px solid rgba(0, 255, 178, 0.3)",
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
    },
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 flex items-center justify-center"
        variants={variants}
        animate={variant}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        {text && variant !== "default" && <span className="text-xs font-medium text-white opacity-80">{text}</span>}
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-difference bg-white"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: variant !== "default" ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        style={{ opacity: isVisible ? 1 : 0 }}
      />
    </>
  )
}
