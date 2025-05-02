"use client"

import { useEffect, useRef } from "react"

export function BlockchainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Hexagon class for blockchain visualization
    class Hexagon {
      x: number
      y: number
      size: number
      color: string
      alpha: number
      rotation: number
      rotationSpeed: number
      pulseSpeed: number
      pulseAmount: number
      pulsePhase: number
      connections: Hexagon[]
      isActive: boolean
      activationTime: number
      activationDuration: number

      constructor(x: number, y: number, size: number) {
        this.x = x
        this.y = y
        this.size = size
        this.color = this.getRandomColor()
        this.alpha = Math.random() * 0.3 + 0.1
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.01
        this.pulseSpeed = Math.random() * 0.02 + 0.01
        this.pulseAmount = Math.random() * 0.2 + 0.1
        this.pulsePhase = Math.random() * Math.PI * 2
        this.connections = []
        this.isActive = false
        this.activationTime = 0
        this.activationDuration = 1000 + Math.random() * 2000
      }

      getRandomColor() {
        const colors = [
          "#00FFB2", // Cyan
          "#0074F0", // Blue
          "#5643FD", // Purple
          "#00D1FF", // Light blue
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update(time: number) {
        this.rotation += this.rotationSpeed
        this.pulsePhase += this.pulseSpeed

        // Simulate blockchain activity
        if (Math.random() < 0.001) {
          this.activate(time)
        }

        // Update activation state
        if (this.isActive && time - this.activationTime > this.activationDuration) {
          this.isActive = false

          // Propagate activation to connected hexagons
          if (this.connections.length > 0 && Math.random() < 0.7) {
            const randomConnection = this.connections[Math.floor(Math.random() * this.connections.length)]
            randomConnection.activate(time)
          }
        }
      }

      activate(time: number) {
        this.isActive = true
        this.activationTime = time
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        const pulse = Math.sin(this.pulsePhase) * this.pulseAmount
        const currentSize = this.size * (1 + pulse)

        // Calculate activation progress
        let activationProgress = 0
        if (this.isActive) {
          activationProgress = Math.min(1, (time - this.activationTime) / this.activationDuration)
          // Glow effect when active
          ctx.shadowBlur = 15
          ctx.shadowColor = this.color
        } else {
          ctx.shadowBlur = 0
        }

        // Draw hexagon
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)

        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i
          const x = currentSize * Math.cos(angle)
          const y = currentSize * Math.sin(angle)
          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.closePath()

        // Fill with gradient based on activation
        if (this.isActive) {
          const gradient = ctx.createLinearGradient(-currentSize, -currentSize, currentSize, currentSize)
          gradient.addColorStop(0, `${this.color}`)
          gradient.addColorStop(1, "#0A1A2F")
          ctx.fillStyle = gradient
          ctx.globalAlpha = Math.min(0.3 + activationProgress * 0.4, 0.7)
        } else {
          ctx.fillStyle = this.color
          ctx.globalAlpha = this.alpha
        }

        ctx.fill()

        // Draw border
        ctx.strokeStyle = this.color
        ctx.lineWidth = this.isActive ? 2 : 0.5
        ctx.globalAlpha = this.isActive ? 0.8 : 0.3
        ctx.stroke()

        ctx.restore()
      }

      drawConnections(ctx: CanvasRenderingContext2D, time: number) {
        this.connections.forEach((connection) => {
          // Check if either hexagon is active
          const isConnectionActive = this.isActive || connection.isActive

          ctx.beginPath()
          ctx.moveTo(this.x, this.y)
          ctx.lineTo(connection.x, connection.y)

          if (isConnectionActive) {
            // Create animated data flow effect
            const gradient = ctx.createLinearGradient(this.x, this.y, connection.x, connection.y)
            gradient.addColorStop(0, `${this.color}80`)
            gradient.addColorStop((time % 1000) / 1000, `${this.color}FF`)
            gradient.addColorStop(1, `${connection.color}80`)

            ctx.strokeStyle = gradient
            ctx.lineWidth = 2
            ctx.globalAlpha = 0.7
          } else {
            ctx.strokeStyle = "#0A1A2F"
            ctx.lineWidth = 0.5
            ctx.globalAlpha = 0.2
          }

          ctx.stroke()
        })
      }
    }

    // Create hexagon grid
    const hexagons: Hexagon[] = []
    const hexSize = 30
    const spacing = hexSize * 2.5
    const columns = Math.ceil(canvas.width / spacing) + 2
    const rows = Math.ceil(canvas.height / spacing) + 2

    for (let col = -1; col < columns; col++) {
      for (let row = -1; row < rows; row++) {
        const x = col * spacing + ((row % 2) * spacing) / 2
        const y = row * spacing * 0.866 // Height of hexagon = size * sqrt(3)/2

        // Add some randomness to position
        const randomX = (Math.random() - 0.5) * spacing * 0.5
        const randomY = (Math.random() - 0.5) * spacing * 0.5

        hexagons.push(new Hexagon(x + randomX, y + randomY, hexSize))
      }
    }

    // Create connections between nearby hexagons
    hexagons.forEach((hexagon) => {
      hexagons.forEach((other) => {
        if (hexagon !== other) {
          const dx = hexagon.x - other.x
          const dy = hexagon.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < spacing * 1.5 && Math.random() < 0.3) {
            hexagon.connections.push(other)
          }
        }
      })
    })

    // Animation loop
    let animationFrameId: number
    const lastTime = 0

    const animate = (timestamp: number) => {
      const time = timestamp
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background
      ctx.fillStyle = "#050B14"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw connections first (behind hexagons)
      hexagons.forEach((hexagon) => {
        hexagon.drawConnections(ctx, time)
      })

      // Update and draw hexagons
      hexagons.forEach((hexagon) => {
        hexagon.update(time)
        hexagon.draw(ctx, time)
      })

      // Randomly activate hexagons to simulate blockchain activity
      if (Math.random() < 0.02) {
        const randomHexagon = hexagons[Math.floor(Math.random() * hexagons.length)]
        randomHexagon.activate(time)
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ background: "#050B14" }} />
}
