"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Shield, Lock, Sparkles, ChevronDown, ExternalLink } from "lucide-react"
import { GlowingButton } from "@/components/ui-elements/glowing-button"
import { GlassmorphicCard } from "@/components/ui-elements/glassmorphic-card"
import { FloatingIcons } from "@/components/floating-icons"

interface LandingHeroProps {
  onEnterDashboard: () => void
  onCursorEnter: (variant: string, text?: string) => void
  onCursorLeave: () => void
}

export function LandingHero({ onEnterDashboard, onCursorEnter, onCursorLeave }: LandingHeroProps) {
  const [scrolled, setScrolled] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return

    const { clientX, clientY } = e
    const { left, top, width, height } = heroRef.current.getBoundingClientRect()

    const x = (clientX - left) / width - 0.5
    const y = (clientY - top) / height - 0.5

    const elements = heroRef.current.querySelectorAll(".parallax-element")
    elements.forEach((el) => {
      const speed = Number.parseFloat(el.getAttribute("data-speed") || "0")
      const rotateX = y * 10 * speed
      const rotateY = -x * 10 * speed
      const translateZ = 50 * speed
      ;(el as HTMLElement).style.transform =
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`
    })
  }

  return (
    <motion.div
      key="landing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/30 backdrop-blur-lg" : "bg-transparent"}`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Shield className="h-8 w-8 mr-2 text-emerald-400" />
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-purple-500">
                Quantum-Safe Wallet Guardian
              </h1>
            </motion.div>

            <motion.div
              className="flex items-center space-x-6"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <a
                href="#features"
                className="text-gray-300 hover:text-white transition-colors"
                onMouseEnter={() => onCursorEnter("hover", "View")}
                onMouseLeave={onCursorLeave}
              >
                Features
              </a>
              <a
                href="#security"
                className="text-gray-300 hover:text-white transition-colors"
                onMouseEnter={() => onCursorEnter("hover", "View")}
                onMouseLeave={onCursorLeave}
              >
                Security
              </a>
              <GlowingButton
                onClick={onEnterDashboard}
                onMouseEnter={() => onCursorEnter("button", "Enter")}
                onMouseLeave={onCursorLeave}
              >
                Launch App
              </GlowingButton>
            </motion.div>
          </div>
        </div>
      </header>

      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        onMouseMove={handleMouseMove}
      >
        <FloatingIcons />

        <div className="container mx-auto px-6 py-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.h2
                className="text-4xl md:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="block">Secure Your</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-purple-500">
                  Ethereum Assets
                </span>
                <span className="block">With Quantum Protection</span>
              </motion.h2>

              <motion.p
                className="mt-6 text-xl text-gray-300 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Real-time monitoring and AI-powered anomaly detection for your blockchain transactions. Stay one step
                ahead of threats with quantum-resistant security.
              </motion.p>

              <motion.div
                className="mt-10 flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <GlowingButton
                  size="lg"
                  onClick={onEnterDashboard}
                  onMouseEnter={() => onCursorEnter("button", "Enter")}
                  onMouseLeave={onCursorLeave}
                >
                  <Shield className="mr-2 h-5 w-5" />
                  Enter Dashboard
                </GlowingButton>

                <button
                  className="px-6 py-3 border border-gray-700 rounded-lg text-gray-300 hover:text-white hover:border-gray-500 transition-colors flex items-center"
                  onMouseEnter={() => onCursorEnter("hover", "Learn")}
                  onMouseLeave={onCursorLeave}
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
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
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-purple-500 border-2 border-black flex items-center justify-center text-xs font-bold"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-400">
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
              <div className="parallax-element" data-speed="0.5">
                <GlassmorphicCard className="p-6 max-w-md mx-auto">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-emerald-400" />
                      </div>
                      <h3 className="ml-3 text-lg font-semibold">Transaction Security</h3>
                    </div>
                    <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full">Active</span>
                  </div>

                  <div className="space-y-4">
                    <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                            <Lock className="h-4 w-4 text-purple-400" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium">Outgoing Transaction</p>
                            <p className="text-xs text-gray-400">0x742d...8f44e → 0x391a...2c91</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-emerald-400">1.45 ETH</span>
                      </div>
                    </div>

                    <div className="p-3 bg-red-500/5 rounded-lg border border-red-500/20">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                            <Sparkles className="h-4 w-4 text-red-400" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-red-400">Anomaly Detected</p>
                            <p className="text-xs text-gray-400">Unusual amount for this address</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-red-400">5.32 ETH</span>
                      </div>
                    </div>

                    <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <Lock className="h-4 w-4 text-emerald-400" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium">Incoming Transaction</p>
                            <p className="text-xs text-gray-400">0x8f1a...9b23 → 0x742d...8f44e</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-emerald-400">0.75 ETH</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">Quantum-Safe Protection</p>
                      <div className="flex items-center">
                        <span className="block w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
                        <p className="text-sm text-emerald-400">Active</p>
                      </div>
                    </div>
                  </div>
                </GlassmorphicCard>
              </div>

              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-600/30 rounded-full blur-3xl"></div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-600/20 rounded-full blur-3xl"></div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <p className="text-gray-400 text-sm mb-2">Scroll to explore</p>
          <ChevronDown className="h-5 w-5 text-gray-400 animate-bounce" />
        </motion.div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced Security Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our quantum-resistant technology provides unparalleled protection for your blockchain assets.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Real-Time Monitoring",
                description:
                  "Continuous surveillance of your wallet activity with instant alerts for suspicious transactions.",
                icon: "activity",
                color: "emerald",
              },
              {
                title: "AI Anomaly Detection",
                description: "Advanced machine learning algorithms identify unusual patterns and potential threats.",
                icon: "brain",
                color: "purple",
              },
              {
                title: "Quantum Encryption",
                description: "Future-proof security using quantum-resistant cryptographic algorithms.",
                icon: "shield",
                color: "blue",
              },
              {
                title: "Transaction Analysis",
                description: "Detailed insights into your transaction history with visual data representation.",
                icon: "bar-chart",
                color: "amber",
              },
              {
                title: "Smart Alerts",
                description: "Customizable notification system that adapts to your transaction patterns.",
                icon: "bell",
                color: "red",
              },
              {
                title: "Blockchain Verification",
                description: "Direct integration with Etherscan for transparent transaction verification.",
                icon: "link",
                color: "indigo",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onMouseEnter={() => onCursorEnter("hover", "View")}
                onMouseLeave={onCursorLeave}
              >
                <GlassmorphicCard className="h-full p-6 hover:border-emerald-500/50 transition-colors">
                  <div
                    className={`w-12 h-12 rounded-lg bg-${feature.color}-500/20 flex items-center justify-center mb-4`}
                  >
                    <Shield className={`h-6 w-6 text-${feature.color}-400`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="security" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/10 to-purple-900/10 pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Quantum-Safe Security</h2>
              <p className="text-gray-300 mb-6">
                Traditional encryption methods are vulnerable to quantum computing attacks. Our platform implements
                post-quantum cryptographic algorithms that secure your assets against both current and future threats.
              </p>

              <div className="space-y-4">
                {[
                  "Post-quantum cryptographic algorithms",
                  "Multi-layered security architecture",
                  "Real-time threat intelligence",
                  "Zero-knowledge proof verification",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                    </div>
                    <p className="text-gray-300">{item}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <GlowingButton
                  onClick={onEnterDashboard}
                  onMouseEnter={() => onCursorEnter("button", "Enter")}
                  onMouseLeave={onCursorLeave}
                >
                  Experience the Dashboard
                </GlowingButton>
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <GlassmorphicCard className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Security Status</h3>
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-sm rounded-full">Protected</span>
                  </div>

                  <div className="space-y-6">
                    {[
                      { name: "Quantum Resistance", value: 98, color: "emerald" },
                      { name: "Threat Detection", value: 92, color: "blue" },
                      { name: "Transaction Security", value: 95, color: "purple" },
                    ].map((metric, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <p className="text-sm text-gray-300">{metric.name}</p>
                          <p className="text-sm font-medium">{metric.value}%</p>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-${metric.color}-500`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${metric.value}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <Lock className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-sm font-medium">Quantum Encryption Active</h4>
                        <p className="text-xs text-gray-400 mt-1">
                          Your wallet is protected by advanced quantum-resistant algorithms, securing your assets
                          against both classical and quantum computing attacks.
                        </p>
                      </div>
                    </div>
                  </div>
                </GlassmorphicCard>

                <div className="absolute -top-5 -right-5 w-20 h-20 bg-emerald-500/30 rounded-full blur-xl"></div>
                <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-purple-500/30 rounded-full blur-xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <Shield className="h-6 w-6 mr-2 text-emerald-400" />
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-purple-500">
                  Quantum-Safe Wallet Guardian
                </h3>
              </div>
              <p className="mt-2 text-sm text-gray-400 max-w-md">
                Advanced blockchain security with quantum-resistant encryption. Protecting your digital assets today and
                tomorrow.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-sm font-semibold mb-3 text-white">Product</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      Security
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-3 text-white">Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      API
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      Guides
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-3 text-white">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">© 2025 Quantum-Safe Wallet Guardian. All rights reserved.</p>

            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  )
}
