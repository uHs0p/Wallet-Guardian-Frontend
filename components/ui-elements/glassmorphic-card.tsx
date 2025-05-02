"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlassmorphicCardProps {
  children: React.ReactNode
  className?: string
  hoverEffect?: boolean
}

export function GlassmorphicCard({ children, className, hoverEffect = true }: GlassmorphicCardProps) {
  return (
    <motion.div
      className={cn(
        "relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg overflow-hidden",
        className,
      )}
      whileHover={hoverEffect ? { y: -5, transition: { duration: 0.2 } } : {}}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 pointer-events-none" />
      {children}
    </motion.div>
  )
}
