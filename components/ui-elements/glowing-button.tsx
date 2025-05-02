"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface GlowingButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: "default" | "outline" | "danger"
  size?: "default" | "sm" | "lg"
  isLoading?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export function GlowingButton({
  children,
  onClick,
  className,
  variant = "default",
  size = "default",
  isLoading = false,
  onMouseEnter,
  onMouseLeave,
}: GlowingButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (onMouseEnter) onMouseEnter()
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (onMouseLeave) onMouseLeave()
  }

  const getVariantClasses = () => {
    switch (variant) {
      case "outline":
        return "border border-white/20 bg-transparent hover:bg-white/5 text-white"
      case "danger":
        return "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white"
      default:
        return "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white"
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-3 py-1.5 text-sm"
      case "lg":
        return "px-6 py-3 text-lg"
      default:
        return "px-4 py-2"
    }
  }

  return (
    <motion.button
      className={cn(
        "relative rounded-lg font-medium flex items-center justify-center transition-all duration-200",
        getVariantClasses(),
        getSizeClasses(),
        isLoading && "opacity-80 cursor-not-allowed",
        className,
      )}
      onClick={isLoading ? undefined : onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {isHovered && variant !== "outline" && (
        <motion.div
          className={cn(
            "absolute inset-0 rounded-lg opacity-50 blur-xl",
            variant === "danger" ? "bg-red-500" : "bg-emerald-500",
          )}
          layoutId={`glow-${variant}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        children
      )}
    </motion.button>
  )
}
