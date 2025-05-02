"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import type QRCodeStyling from "qr-code-styling"
import { Shield } from "lucide-react"

interface EnhancedQRCodeProps {
  value: string
  size?: number
  logoSize?: number
  dotColor?: string
  backgroundColor?: string
  cornerColor?: string
  cornerDotColor?: string
}

export function EnhancedQRCode({
  value,
  size = 240,
  logoSize = 60,
  dotColor = "#00FFB2",
  backgroundColor = "#050B14",
  cornerColor = "#0074F0",
  cornerDotColor = "#5643FD",
}: EnhancedQRCodeProps) {
  const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Dynamically import QR code styling library (client-side only)
    import("qr-code-styling").then((QRCodeStyling) => {
      const qrCodeInstance = new QRCodeStyling.default({
        width: size,
        height: size,
        type: "svg",
        data: value,
        image: "/images/shield-logo.svg",
        dotsOptions: {
          color: dotColor,
          type: "rounded",
        },
        cornersSquareOptions: {
          color: cornerColor,
          type: "extra-rounded",
        },
        cornersDotOptions: {
          color: cornerDotColor,
          type: "dot",
        },
        backgroundOptions: {
          color: backgroundColor,
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 10,
          hideBackgroundDots: true,
          imageSize: logoSize / size,
        },
      })
      setQrCode(qrCodeInstance)
    })
  }, [value, size, logoSize, dotColor, backgroundColor, cornerColor, cornerDotColor])

  useEffect(() => {
    if (qrCode && ref.current) {
      ref.current.innerHTML = ""
      qrCode.append(ref.current)
      setTimeout(() => setIsLoaded(true), 100)
    }
  }, [qrCode])

  return (
    <div className="relative">
      {/* QR Code Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9 }}
        transition={{ duration: 0.3 }}
        className="relative bg-[#050B14] p-4 rounded-lg border border-[#0A1A2F] overflow-hidden"
      >
        {/* Animated background effects */}
        <div className="absolute inset-0 bg-[#050B14] overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FFB2] to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FFB2] to-transparent" />
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#00FFB2] to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#00FFB2] to-transparent" />
          </div>

          {/* Animated scan line */}
          <motion.div
            className="absolute left-0 right-0 h-1 bg-[#00FFB2]/20"
            initial={{ top: 0 }}
            animate={{ top: "100%" }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00FFB2]" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00FFB2]" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00FFB2]" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00FFB2]" />
        </div>

        {/* Actual QR code */}
        <div ref={ref} className="relative z-10" />

        {/* Loading state */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#050B14]">
            <Shield className="h-10 w-10 text-[#00FFB2] animate-pulse" />
          </div>
        )}
      </motion.div>

      {/* Wallet address display */}
      <div className="mt-3 text-center">
        <p className="text-xs text-[#8B9CAF] mb-1">Wallet Address</p>
        <p className="text-sm font-mono text-white break-all max-w-full px-2">{value}</p>
      </div>

      {/* Scan instructions */}
      <div className="mt-2 text-center">
        <p className="text-xs text-[#00FFB2]">Scan to verify on blockchain</p>
      </div>
    </div>
  )
}
