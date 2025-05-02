"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Shield } from "lucide-react"

export function IntroSequence() {
  const [step, setStep] = useState(0)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [securityChecks, setSecurityChecks] = useState<string[]>([])

  useEffect(() => {
    // Simulate security checks
    const checks = [
      "Initializing quantum encryption...",
      "Verifying blockchain integrity...",
      "Establishing secure connection...",
      "Analyzing network for threats...",
      "Generating cryptographic keys...",
      "Synchronizing with consensus nodes...",
    ]

    let currentCheck = 0
    const checkInterval = setInterval(() => {
      if (currentCheck < checks.length) {
        setSecurityChecks((prev) => [...prev, checks[currentCheck]])
        currentCheck++
      } else {
        clearInterval(checkInterval)
      }
    }, 500)

    // Simulate loading progress
    const loadingInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProgress = prev + (100 - prev) * 0.1
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 200)

    // Sequence steps
    const stepTimers = [setTimeout(() => setStep(1), 1000), setTimeout(() => setStep(2), 2000)]

    return () => {
      clearInterval(checkInterval)
      clearInterval(loadingInterval)
      stepTimers.forEach(clearTimeout)
    }
  }, [])

  return (
    <motion.div
      key="loader"
      className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-[#050B14]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <div className="max-w-md w-full px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative flex justify-center mb-8"
        >
          <div className="relative">
            <Shield className="h-20 w-20 text-[#00FFB2]" />

            {/* Animated hexagon */}
            <motion.div
              className="absolute inset-0 border-2 border-[#00FFB2] rounded-full"
              initial={{ scale: 1, opacity: 0.3 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            />

            {/* Animated hexagon grid */}
            <motion.div
              className="absolute -inset-12 opacity-20"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <div className="w-full h-full border-2 border-[#00FFB2] rounded-full" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00FFB2] to-[#0074F0]"
        >
          Quantum-Safe Wallet Guardian
        </motion.h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-8">
          <div className="h-1 w-full bg-[#0A1A2F] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#00FFB2] to-[#0074F0]"
              initial={{ width: "0%" }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="mt-4 h-24 overflow-hidden font-mono">
            <div className="space-y-1">
              {securityChecks.map((check, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-xs text-[#00FFB2]"
                >
                  <span className="text-[#0074F0]">$</span> {check}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loadingProgress > 80 ? 1 : 0 }}
          className="mt-6 text-center text-sm text-[#8B9CAF]"
        >
          Establishing secure connection to the blockchain...
        </motion.div>
      </div>
    </motion.div>
  )
}
