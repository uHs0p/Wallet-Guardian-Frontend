"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Shield, Menu, X, Home, AlertTriangle, Settings, HelpCircle, Wallet, Volume2, VolumeX } from "lucide-react"
import { CryptoCard } from "@/components/ui-elements/crypto-card"
import { useRoutes } from "@/app/routes"

interface NavigationSystemProps {
  onCursorEnter: (variant: string, text?: string) => void
  onCursorLeave: () => void
  toggleAudio: () => void
  audioEnabled: boolean
}

export function NavigationSystem({ onCursorEnter, onCursorLeave, toggleAudio, audioEnabled }: NavigationSystemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { currentRoute, setCurrentRoute } = useRoutes()

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

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "anomalies", label: "Anomalies", icon: AlertTriangle },
    { id: "wallet", label: "Wallet", icon: Wallet },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "help", label: "Help", icon: HelpCircle },
  ]

  return (
    <>
      <motion.div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="container mx-auto px-6">
          <CryptoCard className="py-2 px-4">
            <div className="flex items-center justify-between">
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Shield className="h-6 w-6 mr-2 text-[#00FFB2]" />
                <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00FFB2] to-[#0074F0]">
                  Quantum-Safe Wallet Guardian
                </h1>
              </motion.div>

              <div className="flex items-center space-x-4">
                <button
                  className="p-2 rounded-full hover:bg-[#0A1A2F] transition-colors"
                  onMouseEnter={() => onCursorEnter("hover", "Sound")}
                  onMouseLeave={onCursorLeave}
                  onClick={toggleAudio}
                >
                  {audioEnabled ? (
                    <Volume2 className="h-5 w-5 text-[#00FFB2]" />
                  ) : (
                    <VolumeX className="h-5 w-5 text-[#8B9CAF]" />
                  )}
                </button>

                <motion.button
                  className="lg:hidden p-2 rounded-full hover:bg-[#0A1A2F] transition-colors"
                  onClick={toggleMenu}
                  onMouseEnter={() => onCursorEnter("button", "Menu")}
                  onMouseLeave={onCursorLeave}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.button>

                <motion.nav
                  className="hidden lg:flex items-center space-x-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {menuItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <motion.button
                        key={item.id}
                        className={`px-4 py-2 rounded-lg flex items-center transition-colors ${
                          currentRoute === item.id
                            ? "bg-[#00FFB2]/10 text-[#00FFB2]"
                            : "text-[#8B9CAF] hover:text-white hover:bg-[#0A1A2F]"
                        }`}
                        onClick={() => setCurrentRoute(item.id as any)}
                        onMouseEnter={() => onCursorEnter("button", item.label)}
                        onMouseLeave={onCursorLeave}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {item.label}
                      </motion.button>
                    )
                  })}
                </motion.nav>
              </div>
            </div>
          </CryptoCard>
        </div>
      </motion.div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={toggleMenu} />
          <motion.div
            className="absolute top-20 right-4 w-64 p-4"
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CryptoCard className="p-4">
              <nav className="flex flex-col space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      className={`px-4 py-3 rounded-lg flex items-center transition-colors ${
                        currentRoute === item.id
                          ? "bg-[#00FFB2]/10 text-[#00FFB2]"
                          : "text-[#8B9CAF] hover:text-white hover:bg-[#0A1A2F]"
                      }`}
                      onClick={() => {
                        setCurrentRoute(item.id as any)
                        setIsOpen(false)
                      }}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {item.label}
                    </button>
                  )
                })}
              </nav>
            </CryptoCard>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
