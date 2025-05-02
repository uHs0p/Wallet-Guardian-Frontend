"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CryptoCardProps {
  children: React.ReactNode
  className?: string
  hoverEffect?: boolean
}

export function CryptoCard({ children, className, hoverEffect = true }: CryptoCardProps) {
  return (
    <motion.div
      className={cn(
        "relative rounded-xl border border-[#0A1A2F] bg-[#050B14]/80 backdrop-blur-lg overflow-hidden",
        className,
      )}
      whileHover={hoverEffect ? { y: -5, transition: { duration: 0.2 } } : {}}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1A2F]/30 to-transparent pointer-events-none" />

      {/* Hexagonal grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/images/hex-grid.svg')] bg-repeat opacity-5 pointer-events-none" />

      {children}

      {/* Subtle border glow */}
      <div className="absolute inset-0 rounded-xl border border-[#00FFB2]/5 pointer-events-none" />
    </motion.div>
  )
}
