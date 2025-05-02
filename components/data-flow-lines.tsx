"use client"

import { useEffect, useRef, memo } from "react"

function DataFlowLinesComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const dataLinesRef = useRef<any[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size with device pixel ratio for sharper rendering
    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        const { width, height } = container.getBoundingClientRect()
        const dpr = window.devicePixelRatio || 1
        canvas.width = width * dpr
        canvas.height = height * dpr
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`
        ctx.scale(dpr, dpr)
      }
    }

    resizeCanvas()

    // Throttled resize handler
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 100)
    }

    window.addEventListener("resize", handleResize)

    // Data flow line class
    class DataLine {
      startX: number
      startY: number
      endX: number
      endY: number
      progress: number
      speed: number
      color: string
      width: number
      pulseSpeed: number
      pulsePhase: number

      constructor() {
        const { width, height } = canvas.getBoundingClientRect()
        this.startX = Math.random() * width
        this.startY = Math.random() * height
        this.endX = Math.random() * width
        this.endY = Math.random() * height
        this.progress = 0
        this.speed = Math.random() * 0.01 + 0.002
        this.color = this.getRandomColor()
        this.width = Math.random() * 1 + 0.5
        this.pulseSpeed = Math.random() * 0.05 + 0.01
        this.pulsePhase = Math.random() * Math.PI * 2
      }

      getRandomColor() {
        const colors = [
          "#00FFB2", // Cyan
          "#0074F0", // Blue
          "#5643FD", // Purple
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.progress += this.speed
        this.pulsePhase += this.pulseSpeed

        if (this.progress >= 1) {
          this.reset()
        }
      }

      reset() {
        this.startX = this.endX
        this.startY = this.endY
        const { width, height } = canvas.getBoundingClientRect()
        this.endX = Math.random() * width
        this.endY = Math.random() * height
        this.progress = 0
      }

      draw(ctx: CanvasRenderingContext2D) {
        const x = this.startX + (this.endX - this.startX) * this.progress
        const y = this.startY + (this.endY - this.startY) * this.progress

        // Draw data packet
        const pulse = Math.sin(this.pulsePhase) * 0.5 + 0.5
        const size = 2 + pulse * 2

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = 0.7
        ctx.fill()

        // Draw trail
        const trailLength = 0.2
        const trailStart = Math.max(0, this.progress - trailLength)
        const trailStartX = this.startX + (this.endX - this.startX) * trailStart
        const trailStartY = this.startY + (this.endY - this.startY) * trailStart

        ctx.beginPath()
        ctx.moveTo(trailStartX, trailStartY)
        ctx.lineTo(x, y)
        ctx.strokeStyle = this.color
        ctx.lineWidth = this.width
        ctx.globalAlpha = 0.3
        ctx.stroke()
      }
    }

    // Create data lines
    const lineCount = 15
    dataLinesRef.current = Array.from({ length: lineCount }, () => new DataLine())

    // Animation loop with requestAnimationFrame
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw data lines
      dataLinesRef.current.forEach((line) => {
        line.update()
        line.draw(ctx)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  )
}

// Memoize the component to prevent unnecessary re-renders
export const DataFlowLines = memo(DataFlowLinesComponent)
