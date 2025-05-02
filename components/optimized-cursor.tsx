"use client"

import { motion, useTransform } from "framer-motion"
import { useOptimizedCursor } from "@/hooks/use-optimized-cursor"

export function OptimizedCursor() {
  const { cursorX, cursorY, variant, text, isVisible } = useOptimizedCursor()

  // Transform cursor position based on variant
  const width = useTransform(() =>
    variant === "default"
      ? 32
      : variant === "button"
        ? 80
        : variant === "hover"
          ? 64
          : variant === "link"
            ? 64
            : variant === "chart"
              ? 24
              : 64,
  )

  const height = useTransform(() =>
    variant === "default"
      ? 32
      : variant === "button"
        ? 80
        : variant === "hover"
          ? 64
          : variant === "link"
            ? 64
            : variant === "chart"
              ? 24
              : 64,
  )

  const x = useTransform(cursorX, (value) => value - width.get() / 2)

  const y = useTransform(cursorY, (value) => value - height.get() / 2)

  // Get background color based on variant
  const getBgColor = () => {
    switch (variant) {
      case "button":
        return "rgba(0, 255, 178, 0.1)"
      case "hover":
        return "rgba(255, 255, 255, 0.1)"
      case "link":
        return "rgba(0, 116, 240, 0.1)"
      case "chart":
        return "rgba(0, 255, 178, 0.2)"
      case "tab":
        return "rgba(0, 255, 178, 0.1)"
      default:
        return "rgba(255, 255, 255, 0.05)"
    }
  }

  // Get border color based on variant
  const getBorderColor = () => {
    switch (variant) {
      case "button":
        return "rgba(0, 255, 178, 0.3)"
      case "hover":
        return "rgba(255, 255, 255, 0.2)"
      case "link":
        return "rgba(0, 116, 240, 0.3)"
      case "chart":
        return "rgba(0, 255, 178, 0.4)"
      case "tab":
        return "rgba(0, 255, 178, 0.3)"
      default:
        return "rgba(255, 255, 255, 0.1)"
    }
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 flex items-center justify-center will-change-transform"
        style={{
          x,
          y,
          width,
          height,
          backgroundColor: getBgColor(),
          border: `1px solid ${getBorderColor()}`,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
      >
        {text && variant !== "default" && (
          <span className="text-xs font-medium text-white opacity-80 select-none">{text}</span>
        )}
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-difference bg-white will-change-transform"
        style={{
          x: useTransform(cursorX, (value) => value - 3),
          y: useTransform(cursorY, (value) => value - 3),
          scale: variant !== "default" ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
    </>
  )
}
