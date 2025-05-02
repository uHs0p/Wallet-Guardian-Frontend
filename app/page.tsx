"use client"

import { useState, useEffect, useRef, lazy, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useWalletData } from "@/hooks/use-wallet-data"
import { BlockchainCanvas } from "@/components/blockchain-canvas"
import { HexGrid } from "@/components/hex-grid"
import { NavigationSystem } from "@/components/navigation-system"
import { WalletDashboard } from "@/components/wallet-dashboard"
import { IntroSequence } from "@/components/intro-sequence"
import { OptimizedCursor } from "@/components/optimized-cursor"
import { useAudio } from "@/hooks/use-audio"
import { useOptimizedCursor } from "@/hooks/use-optimized-cursor"
import { AnomaliesPage } from "@/components/pages/anomalies-page"
import { WalletPage } from "@/components/pages/wallet-page"
import { SettingsPage } from "@/components/pages/settings-page"
import { RouteProvider, useRoutes } from "@/app/routes"

// Lazy load components that aren't needed immediately
const DataFlowLines = lazy(() => import("@/components/data-flow-lines").then((mod) => ({ default: mod.DataFlowLines })))

function DashboardContent() {
  const searchParams = useSearchParams()
  const walletAddress = searchParams.get("address") || "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
  const [isLoaded, setIsLoaded] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const { cursorX, cursorY, variant, text, isVisible, onCursorEnter, onCursorLeave } = useOptimizedCursor()
  const { currentRoute, setCurrentRoute } = useRoutes()

  const { transactions, anomalies, walletInfo, isLoading, error, loadMoreTransactions } = useWalletData(walletAddress)

  // Initialize audio effects
  const { playSound } = useAudio()

  useEffect(() => {
    // Simulate loading sequence
    const timer1 = setTimeout(() => {
      setIsLoaded(true)
    }, 3000)

    return () => {
      clearTimeout(timer1)
    }
  }, [])

  const handleEnterDashboard = () => {
    playSound("enter")
    setShowDashboard(true)
  }

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled)
    playSound("click")
  }

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case "anomalies":
        return (
          <AnomaliesPage
            anomalies={anomalies}
            isLoading={isLoading}
            onCursorEnter={onCursorEnter}
            onCursorLeave={onCursorLeave}
            playSound={playSound}
          />
        )
      case "wallet":
        return (
          <WalletPage
            walletInfo={walletInfo}
            transactions={transactions}
            isLoading={isLoading}
            onCursorEnter={onCursorEnter}
            onCursorLeave={onCursorLeave}
            playSound={playSound}
            loadMoreTransactions={loadMoreTransactions}
          />
        )
      case "settings":
        return <SettingsPage onCursorEnter={onCursorEnter} onCursorLeave={onCursorLeave} playSound={playSound} />
      default:
        return (
          <WalletDashboard
            transactions={transactions}
            anomalies={anomalies}
            walletInfo={walletInfo}
            isLoading={isLoading}
            error={error}
            loadMoreTransactions={loadMoreTransactions}
            onCursorEnter={onCursorEnter}
            onCursorLeave={onCursorLeave}
            containerRef={containerRef}
            playSound={playSound}
          />
        )
    }
  }

  return (
    <>
      <OptimizedCursor />

      <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-[#050B14] text-white">
        <BlockchainCanvas />

        <AnimatePresence mode="wait">
          {!isLoaded ? (
            <IntroSequence />
          ) : !showDashboard ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              className="relative z-10"
            >
              <HexGrid
                onEnterDashboard={handleEnterDashboard}
                onCursorEnter={onCursorEnter}
                onCursorLeave={onCursorLeave}
                toggleAudio={toggleAudio}
                audioEnabled={audioEnabled}
              />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <NavigationSystem
                onCursorEnter={onCursorEnter}
                onCursorLeave={onCursorLeave}
                toggleAudio={toggleAudio}
                audioEnabled={audioEnabled}
              />

              <Suspense fallback={null}>{renderCurrentPage()}</Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default function Dashboard() {
  return (
    <RouteProvider>
      <DashboardContent />
    </RouteProvider>
  )
}
