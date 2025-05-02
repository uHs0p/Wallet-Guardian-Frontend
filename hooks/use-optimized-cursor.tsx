"use client"

import { useState, useEffect, useCallback } from "react"
import { useMotionValue, useSpring } from "framer-motion"

export function useOptimizedCursor() {
  const [variant, setVariant] = useState("default")
  const [text, setText] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  // Use motion values for smoother cursor movement
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Apply spring physics for smooth following
  const springConfig = { damping: 25, stiffness: 300 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  // Throttle mouse move updates for better performance
  const updateMousePosition = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    },
    [mouseX, mouseY],
  )

  useEffect(() => {
    // Use passive event listener for better performance
    document.addEventListener("mousemove", updateMousePosition, { passive: true })
    document.addEventListener("mouseenter", () => setIsVisible(true))
    document.addEventListener("mouseleave", () => setIsVisible(false))

    return () => {
      document.removeEventListener("mousemove", updateMousePosition)
      document.removeEventListener("mouseenter", () => setIsVisible(true))
      document.removeEventListener("mouseleave", () => setIsVisible(false))
    }
  }, [updateMousePosition])

  const onCursorEnter = useCallback((newVariant: string, newText = "") => {
    setVariant(newVariant)
    setText(newText)
  }, [])

  const onCursorLeave = useCallback(() => {
    setVariant("default")
    setText("")
  }, [])

  return {
    cursorX,
    cursorY,
    variant,
    text,
    isVisible,
    onCursorEnter,
    onCursorLeave,
  }
}
