"use client"

import { useEffect, useRef } from "react"

interface QRCodeProps {
  value: string
  size?: number
  bgColor?: string
  fgColor?: string
}

export default function QRCode({ value, size = 128, bgColor = "#1f2937", fgColor = "#10b981" }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // This is a simplified QR code generator for demonstration
    const drawQRCode = async () => {
      if (!canvasRef.current) return

      const ctx = canvasRef.current.getContext("2d")
      if (!ctx) return

      // Draw a placeholder QR code
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, size, size)

      // Draw a border
      ctx.strokeStyle = fgColor
      ctx.lineWidth = 2
      ctx.strokeRect(4, 4, size - 8, size - 8)

      // Draw a pattern that looks like a QR code
      ctx.fillStyle = fgColor

      // Draw corner squares (typical in QR codes)
      ctx.fillRect(10, 10, 20, 20)
      ctx.fillRect(size - 30, 10, 20, 20)
      ctx.fillRect(10, size - 30, 20, 20)

      // Draw some random squares to make it look like a QR code
      for (let i = 0; i < 20; i++) {
        const x = Math.floor(Math.random() * (size - 10)) + 5
        const y = Math.floor(Math.random() * (size - 10)) + 5
        const s = Math.floor(Math.random() * 10) + 2
        ctx.fillRect(x, y, s, s)
      }

      // Add wallet text
      ctx.font = "10px monospace"
      ctx.textAlign = "center"
      ctx.fillText("Wallet", size / 2, size / 2 - 10)
      ctx.fillText(value.substring(0, 6) + "..." + value.substring(value.length - 4), size / 2, size / 2 + 10)
    }

    drawQRCode()
  }, [value, size, bgColor, fgColor])

  return (
    <div className="inline-block p-2 bg-gray-800 rounded-lg border border-gray-700">
      <canvas ref={canvasRef} width={size} height={size} className="rounded-md" />
    </div>
  )
}
