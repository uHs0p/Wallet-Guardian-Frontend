"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { Shield, Lock, Zap, Cpu, Database, Code, Volume2, VolumeX } from "lucide-react"
import { NeonButton } from "@/components/ui-elements/neon-button"
import { CryptoCard } from "@/components/ui-elements/crypto-card"

interface HexGridProps {
  onEnterDashboard: () => void
  onCursorEnter: (variant: string, text?: string) => void
  onCursorLeave: () => void
  toggleAudio: () => void
  audioEnabled: boolean
}

export function HexGrid({ onEnterDashboard, onCursorEnter, onCursorLeave, toggleAudio, audioEnabled }: HexGridProps) {
  const controls = useAnimation()
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: 1 } })
  }, [controls])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return

    const { clientX, clientY } = e
    const { left, top, width, height } = containerRef.current.getBoundingClientRect()

    const x = (clientX - left) / width - 0.5
    const y = (clientY - top) / height - 0.5

    setMousePosition({ x, y })
  }

  const features = [
    {
      title: "Quantum Encryption",
      description: "Post-quantum cryptographic algorithms secure your assets against future threats",
      icon: Shield,
      color: "from-[#00FFB2] to-[#00D1FF]",
    },
    {
      title: "Real-time Monitoring",
      description: "Continuous surveillance with instant alerts for suspicious transactions",
      icon: Zap,
      color: "from-[#0074F0] to-[#5643FD]",
    },
    {
      title: "AI Threat Detection",
      description: "Advanced algorithms identify unusual patterns and potential security risks",
      icon: Cpu,
      color: "from-[#5643FD] to-[#00FFB2]",
    },
    {
      title: "Blockchain Verification",
      description: "Direct integration with blockchain explorers for transparent verification",
      icon: Database,
      color: "from-[#00D1FF] to-[#0074F0]",
    },
    {
      title: "Smart Contract Audit",
      description: "Automated analysis of smart contract vulnerabilities and risks",
      icon: Code,
      color: "from-[#00FFB2] to-[#5643FD]",
    },
    {
      title: "Multi-chain Support",
      description: "Protect assets across multiple blockchain networks simultaneously",
      icon: Lock,
      color: "from-[#0074F0] to-[#00FFB2]",
    },
  ]

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden" onMouseMove={handleMouseMove}>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-2 backdrop-blur-lg bg-[#050B14]/80" : "py-4"}`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Shield className="h-8 w-8 mr-2 text-[#00FFB2]" />
              <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00FFB2] to-[#0074F0]">
                Quantum-Safe Wallet Guardian
              </h1>
            </motion.div>

            <motion.div
              className="flex items-center space-x-6"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <button
                className="text-[#8B9CAF] hover:text-white transition-colors"
                onMouseEnter={() => onCursorEnter("hover", "Sound")}
                onMouseLeave={onCursorLeave}
                onClick={toggleAudio}
              >
                {audioEnabled ? <Volume2 className="h-5 w-5 text-[#00FFB2]" /> : <VolumeX className="h-5 w-5" />}
              </button>

              <a
                href="#features"
                className="text-[#8B9CAF] hover:text-white transition-colors"
                onMouseEnter={() => onCursorEnter("hover", "View")}
                onMouseLeave={onCursorLeave}
              >
                Features
              </a>

              <NeonButton
                onClick={onEnterDashboard}
                onMouseEnter={() => onCursorEnter("button", "Enter")}
                onMouseLeave={onCursorLeave}
              >
                Launch App
              </NeonButton>
            </motion.div>
          </div>
        </div>
      </header>

      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-6 py-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div className="lg:w-1/2" initial={{ opacity: 0, y: 20 }} animate={controls}>
              <motion.h2
                className="text-4xl md:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="block">Next Generation</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFB2] via-[#00D1FF] to-[#0074F0]">
                  Blockchain Security
                </span>
                <span className="block">For Your Digital Assets</span>
              </motion.h2>

              <motion.p
                className="mt-6 text-xl text-[#8B9CAF] max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Quantum-resistant protection with AI-powered anomaly detection for your blockchain transactions. Stay
                ahead of threats with cutting-edge security technology.
              </motion.p>

              <motion.div
                className="mt-10 flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <NeonButton
                  size="lg"
                  onClick={onEnterDashboard}
                  onMouseEnter={() => onCursorEnter("button", "Enter")}
                  onMouseLeave={onCursorLeave}
                >
                  <Shield className="mr-2 h-5 w-5" />
                  Enter Dashboard
                </NeonButton>

                <button
                  className="px-6 py-3 border border-[#0A1A2F] rounded-lg text-[#8B9CAF] hover:text-white hover:border-[#00FFB2]/30 transition-colors flex items-center"
                  onMouseEnter={() => onCursorEnter("hover", "Learn")}
                  onMouseLeave={onCursorLeave}
                >
                  <Lock className="mr-2 h-5 w-5" />
                  Learn More
                </button>
              </motion.div>

              <motion.div
                className="mt-12 flex items-center space-x-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00FFB2] to-[#0074F0] border-2 border-[#050B14] flex items-center justify-center text-xs font-bold"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[#8B9CAF]">
                  <span className="text-white font-semibold">2,500+</span> wallets protected
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div
                className="relative"
                style={{
                  transform: `perspective(1000px) rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * -10}deg)`,
                  transition: "transform 0.1s ease-out",
                }}
              >
                <CryptoCard className="p-6 max-w-md mx-auto">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-[#00FFB2]/20 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-[#00FFB2]" />
                      </div>
                      <h3 className="ml-3 text-lg font-semibold">Transaction Security</h3>
                    </div>
                    <span className="px-2 py-1 bg-[#00FFB2]/10 text-[#00FFB2] text-xs rounded-full">Active</span>
                  </div>

                  <div className="space-y-4">
                    <div className="p-3 bg-[#0A1A2F] rounded-lg border border-[#0A1A2F]">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[#0074F0]/20 flex items-center justify-center">
                            <Lock className="h-4 w-4 text-[#0074F0]" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium">Outgoing Transaction</p>
                            <p className="text-xs text-[#8B9CAF]">0x742d...8f44e → 0x391a...2c91</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-[#00FFB2]">1.45 ETH</span>
                      </div>
                    </div>

                    <div className="p-3 bg-[#FF3B3B]/5 rounded-lg border border-[#FF3B3B]/20">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[#FF3B3B]/20 flex items-center justify-center">
                            <Zap className="h-4 w-4 text-[#FF3B3B]" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-[#FF3B3B]">Anomaly Detected</p>
                            <p className="text-xs text-[#8B9CAF]">Unusual amount for this address</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-[#FF3B3B]">5.32 ETH</span>
                      </div>
                    </div>

                    <div className="p-3 bg-[#0A1A2F] rounded-lg border border-[#0A1A2F]">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[#00FFB2]/20 flex items-center justify-center">
                            <Lock className="h-4 w-4 text-[#00FFB2]" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium">Incoming Transaction</p>
                            <p className="text-xs text-[#8B9CAF]">0x8f1a...9b23 → 0x742d...8f44e</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-[#00FFB2]">0.75 ETH</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#0A1A2F]">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-[#8B9CAF]">Quantum-Safe Protection</p>
                      <div className="flex items-center">
                        <span className="block w-2 h-2 rounded-full bg-[#00FFB2] mr-2 animate-pulse"></span>
                        <p className="text-sm text-[#00FFB2]">Active</p>
                      </div>
                    </div>
                  </div>
                </CryptoCard>

                {/* Decorative elements */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#5643FD]/20 rounded-full blur-3xl"></div>
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#00FFB2]/20 rounded-full blur-3xl"></div>

                {/* Animated circuit lines */}
                <svg
                  className="absolute -inset-10 z-[-1] opacity-30"
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    <path d="M0 50 H100 M50 0 V100" stroke="#00FFB2" strokeWidth="0.5" fill="none" />
                    <circle cx="50" cy="50" r="3" fill="#00FFB2" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFB2] to-[#0074F0]">
              Advanced Security Features
            </h2>
            <p className="text-[#8B9CAF] max-w-2xl mx-auto">
              Our quantum-resistant technology provides unparalleled protection for your blockchain assets.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onMouseEnter={() => onCursorEnter("hover", "View")}
                onMouseLeave={onCursorLeave}
              >
                <CryptoCard className="h-full p-6 hover:border-[#00FFB2]/30 transition-colors">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} bg-opacity-20 flex items-center justify-center mb-4`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-[#8B9CAF]">{feature.description}</p>
                </CryptoCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
