"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface NeonButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: "default" | "outline" | "danger"
  size?: "default" | "sm" | "lg"
  isLoading?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export function NeonButton({
  children,
  onClick,
  className,
  variant = "default",
  size = "default",
  isLoading = false,
  onMouseEnter,
  onMouseLeave,
}: NeonButtonProps) {
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
        return "border border-[#0A1A2F] bg-transparent hover:border-[#00FFB2]/50 text-white"
      case "danger":
        return "bg-gradient-to-r from-[#FF3B3B] to-[#FF3B3B]/80 hover:from-[#FF3B3B]/80 hover:to-[#FF3B3B] text-white"
      default:
        return "bg-gradient-to-r from-[#00FFB2] to-[#0074F0] hover:from-[#0074F0] hover:to-[#00FFB2] text-white"
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
            variant === "danger" ? "bg-[#FF3B3B]" : "bg-[#00FFB2]",
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
