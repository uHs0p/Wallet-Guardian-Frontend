"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Shield, Menu, X, Home, AlertTriangle, Settings, HelpCircle, Wallet } from "lucide-react"
import { GlassmorphicCard } from "@/components/ui-elements/glassmorphic-card"

interface FloatingNavProps {
  onCursorEnter: (variant: string, text?: string) => void
  onCursorLeave: () => void
}

export function FloatingNav({ onCursorEnter, onCursorLeave }: FloatingNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeItem, setActiveItem] = useState("dashboard")

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
          <GlassmorphicCard className="py-2 px-4">
            <div className="flex items-center justify-between">
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Shield className="h-6 w-6 mr-2 text-emerald-400" />
                <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-purple-500">
                  Quantum-Safe Wallet Guardian
                </h1>
              </motion.div>

              <div className="flex items-center space-x-4">
                <motion.button
                  className="lg:hidden p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
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
                          activeItem === item.id
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                        onClick={() => setActiveItem(item.id)}
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
          </GlassmorphicCard>
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
            <GlassmorphicCard className="p-4">
              <nav className="flex flex-col space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      className={`px-4 py-3 rounded-lg flex items-center transition-colors ${
                        activeItem === item.id
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                      onClick={() => {
                        setActiveItem(item.id)
                        setIsOpen(false)
                      }}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {item.label}
                    </button>
                  )
                })}
              </nav>
            </GlassmorphicCard>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
