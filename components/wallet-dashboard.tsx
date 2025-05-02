"use client"

import type React from "react"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Shield, AlertTriangle, Activity, Wallet, RefreshCw, ChevronDown, ChevronUp } from "lucide-react"
import { CryptoCard } from "@/components/ui-elements/crypto-card"
import { NeonButton } from "@/components/ui-elements/neon-button"
import { TransactionList } from "@/components/transaction-list"
import { AnomalyPanel } from "@/components/anomaly-panel"
import { WalletStats } from "@/components/wallet-stats"
import { TransactionVisualizer } from "@/components/transaction-visualizer"
import { SearchBar } from "@/components/ui-elements/search-bar"
import { DataFlowLines } from "@/components/data-flow-lines"

interface WalletDashboardProps {
  transactions: any[]
  anomalies: any[]
  walletInfo: any
  isLoading: boolean
  error: string | null
  loadMoreTransactions: () => void
  onCursorEnter: (variant: string, text?: string) => void
  onCursorLeave: () => void
  containerRef: React.RefObject<HTMLDivElement>
  playSound: (sound: string) => void
}

export function WalletDashboard({
  transactions,
  anomalies,
  walletInfo,
  isLoading,
  error,
  loadMoreTransactions,
  onCursorEnter,
  onCursorLeave,
  containerRef,
  playSound,
}: WalletDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeSection, setActiveSection] = useState("overview")
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    overview: true,
    transactions: true,
    anomalies: true,
    visualizer: true,
  })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  const toggleSection = (section: string) => {
    playSound("click")
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-20">
        <CryptoCard className="p-8 text-center">
          <AlertTriangle className="h-16 w-16 mx-auto text-[#FF3B3B] mb-4" />
          <h2 className="text-2xl font-bold text-[#FF3B3B] mb-4">Connection Error</h2>
          <p className="text-[#8B9CAF] mb-6">{error}</p>
          <NeonButton
            onClick={() => window.location.reload()}
            onMouseEnter={() => onCursorEnter("button", "Retry")}
            onMouseLeave={onCursorLeave}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry Connection
          </NeonButton>
        </CryptoCard>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-24">
      <motion.div style={{ opacity, scale }} className="absolute top-0 left-0 right-0 h-96 pointer-events-none">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00FFB2] via-[#00D1FF] to-[#0074F0]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Wallet Dashboard
            </motion.h1>
            <motion.p
              className="mt-4 text-xl text-[#8B9CAF] max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Real-time monitoring and quantum-safe protection
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className="mt-20 mb-8">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search transactions by hash or address..."
          onCursorEnter={onCursorEnter}
          onCursorLeave={onCursorLeave}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
        <DataFlowLines />

        <div className="lg:col-span-1 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <CryptoCard className="overflow-hidden">
              <div
                className="p-4 flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection("overview")}
                onMouseEnter={() => onCursorEnter("hover", "Toggle")}
                onMouseLeave={onCursorLeave}
              >
                <div className="flex items-center">
                  <Wallet className="h-5 w-5 mr-2 text-[#00FFB2]" />
                  <h2 className="text-lg font-semibold">Wallet Overview</h2>
                </div>
                {expandedSections.overview ? (
                  <ChevronUp className="h-5 w-5 text-[#8B9CAF]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#8B9CAF]" />
                )}
              </div>

              {expandedSections.overview && (
                <div className="p-4 pt-0">
                  <WalletStats
                    walletInfo={walletInfo}
                    isLoading={isLoading}
                    onCursorEnter={onCursorEnter}
                    onCursorLeave={onCursorLeave}
                    playSound={playSound}
                  />
                </div>
              )}
            </CryptoCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <CryptoCard className="overflow-hidden">
              <div
                className="p-4 flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection("anomalies")}
                onMouseEnter={() => onCursorEnter("hover", "Toggle")}
                onMouseLeave={onCursorLeave}
              >
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-[#FF3B3B]" />
                  <h2 className="text-lg font-semibold">Anomaly Alerts</h2>
                </div>
                {expandedSections.anomalies ? (
                  <ChevronUp className="h-5 w-5 text-[#8B9CAF]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#8B9CAF]" />
                )}
              </div>

              {expandedSections.anomalies && (
                <div className="p-4 pt-0">
                  <AnomalyPanel
                    anomalies={anomalies}
                    isLoading={isLoading}
                    onCursorEnter={onCursorEnter}
                    onCursorLeave={onCursorLeave}
                    playSound={playSound}
                  />
                </div>
              )}
            </CryptoCard>
          </motion.div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <CryptoCard className="overflow-hidden">
              <div
                className="p-4 flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection("visualizer")}
                onMouseEnter={() => onCursorEnter("hover", "Toggle")}
                onMouseLeave={onCursorLeave}
              >
                <div className="flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-[#00FFB2]" />
                  <h2 className="text-lg font-semibold">Transaction Activity</h2>
                </div>
                {expandedSections.visualizer ? (
                  <ChevronUp className="h-5 w-5 text-[#8B9CAF]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#8B9CAF]" />
                )}
              </div>

              {expandedSections.visualizer && (
                <div className="p-4 pt-0">
                  <TransactionVisualizer
                    transactions={transactions}
                    isLoading={isLoading}
                    onCursorEnter={onCursorEnter}
                    onCursorLeave={onCursorLeave}
                    playSound={playSound}
                  />
                </div>
              )}
            </CryptoCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <CryptoCard className="overflow-hidden">
              <div
                className="p-4 flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection("transactions")}
                onMouseEnter={() => onCursorEnter("hover", "Toggle")}
                onMouseLeave={onCursorLeave}
              >
                <div className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-[#00FFB2]" />
                  <h2 className="text-lg font-semibold">Transaction Feed</h2>
                </div>
                {expandedSections.transactions ? (
                  <ChevronUp className="h-5 w-5 text-[#8B9CAF]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#8B9CAF]" />
                )}
              </div>

              {expandedSections.transactions && (
                <div className="p-4 pt-0">
                  <TransactionList
                    transactions={transactions}
                    searchTerm={searchTerm}
                    isLoading={isLoading}
                    loadMore={loadMoreTransactions}
                    onCursorEnter={onCursorEnter}
                    onCursorLeave={onCursorLeave}
                    playSound={playSound}
                  />
                </div>
              )}
            </CryptoCard>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
