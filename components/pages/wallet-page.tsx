"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Wallet,
  ExternalLink,
  Shield,
  RefreshCw,
  BarChart3,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  AlertTriangle,
} from "lucide-react"
import { CryptoCard } from "@/components/ui-elements/crypto-card"
import { NeonButton } from "@/components/ui-elements/neon-button"
import { WalletStats } from "@/components/wallet-stats"
import { TransactionList } from "@/components/transaction-list"
import { SearchBar } from "@/components/ui-elements/search-bar"
import { DataFlowLines } from "@/components/data-flow-lines"
import { EnhancedQRCode } from "@/components/enhanced-qr-code"

interface WalletPageProps {
  walletInfo: any
  transactions: any[]
  isLoading: boolean
  onCursorEnter: (variant: string, text?: string) => void
  onCursorLeave: () => void
  playSound: (sound: string) => void
  loadMoreTransactions: () => void
}

export function WalletPage({
  walletInfo,
  transactions,
  isLoading,
  onCursorEnter,
  onCursorLeave,
  playSound,
  loadMoreTransactions,
}: WalletPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("overview")

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: Wallet },
    { id: "transactions", label: "Transactions", icon: ArrowUpRight },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "history", label: "History", icon: Clock },
  ]

  return (
    <div className="container mx-auto px-4 md:px-6 py-24">
      <motion.div className="absolute top-0 left-0 right-0 h-96 pointer-events-none">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00FFB2] via-[#00D1FF] to-[#0074F0]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Wallet Management
            </motion.h1>
            <motion.p
              className="mt-4 text-xl text-[#8B9CAF] max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Secure wallet monitoring and transaction management
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className="mt-20 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search transactions by hash or address..."
              onCursorEnter={onCursorEnter}
              onCursorLeave={onCursorLeave}
            />
          </div>

          <div className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <NeonButton
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "outline"}
                  onClick={() => {
                    setActiveTab(tab.id)
                    playSound("click")
                  }}
                  onMouseEnter={() => onCursorEnter("button", tab.label)}
                  onMouseLeave={onCursorLeave}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </NeonButton>
              )
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
        <DataFlowLines />

        {activeTab === "overview" && (
          <>
            <div className="lg:col-span-1">
              <CryptoCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Wallet className="h-5 w-5 mr-2 text-[#00FFB2]" />
                    <h2 className="text-xl font-bold">Wallet Overview</h2>
                  </div>
                  <div className="bg-[#00FFB2]/10 text-[#00FFB2] px-3 py-1 rounded-full text-xs flex items-center">
                    <Shield className="h-3 w-3 mr-1" />
                    Quantum-Safe
                  </div>
                </div>

                <div className="flex flex-col items-center mb-6">
                  <EnhancedQRCode value={walletInfo?.address || ""} size={200} />
                </div>

                <WalletStats
                  walletInfo={walletInfo}
                  isLoading={isLoading}
                  onCursorEnter={onCursorEnter}
                  onCursorLeave={onCursorLeave}
                  playSound={playSound}
                />
              </CryptoCard>
            </div>

            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 gap-6">
                <CryptoCard className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-[#00FFB2]" />
                      <h2 className="text-xl font-bold">Balance History</h2>
                    </div>
                    <div className="bg-[#0A1A2F] px-3 py-1 rounded-full text-sm">Last 30 Days</div>
                  </div>

                  <div className="h-64 flex items-end justify-between">
                    {[...Array(14)].map((_, i) => {
                      const height = 30 + Math.random() * 70
                      return (
                        <div key={i} className="flex flex-col items-center w-full">
                          <div className="relative w-full px-1">
                            <div
                              className="w-full bg-gradient-to-t from-[#00FFB2]/80 to-[#00FFB2]/20 rounded-t-md"
                              style={{ height: `${height}%` }}
                            ></div>
                            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#00FFB2]/0 to-[#00FFB2]/20 rounded-t-md"></div>
                          </div>
                          <div className="text-xs text-[#8B9CAF] mt-2">{i + 1}</div>
                        </div>
                      )
                    })}
                  </div>
                </CryptoCard>

                <CryptoCard className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <ArrowUpRight className="h-5 w-5 mr-2 text-[#00FFB2]" />
                      <h2 className="text-xl font-bold">Recent Transactions</h2>
                    </div>
                    <NeonButton
                      size="sm"
                      onClick={() => setActiveTab("transactions")}
                      onMouseEnter={() => onCursorEnter("button", "View All")}
                      onMouseLeave={onCursorLeave}
                    >
                      View All
                    </NeonButton>
                  </div>

                  <TransactionList
                    transactions={transactions.slice(0, 3)}
                    searchTerm=""
                    isLoading={isLoading}
                    loadMore={() => {}}
                    onCursorEnter={onCursorEnter}
                    onCursorLeave={onCursorLeave}
                    playSound={playSound}
                  />
                </CryptoCard>
              </div>
            </div>
          </>
        )}

        {activeTab === "transactions" && (
          <div className="lg:col-span-3">
            <CryptoCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <ArrowUpRight className="h-5 w-5 mr-2 text-[#00FFB2]" />
                  <h2 className="text-xl font-bold">Transaction History</h2>
                </div>
                <div className="flex gap-2">
                  <NeonButton
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      playSound("click")
                    }}
                    onMouseEnter={() => onCursorEnter("button", "All")}
                    onMouseLeave={onCursorLeave}
                  >
                    All
                  </NeonButton>
                  <NeonButton
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      playSound("click")
                    }}
                    onMouseEnter={() => onCursorEnter("button", "Sent")}
                    onMouseLeave={onCursorLeave}
                  >
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    Sent
                  </NeonButton>
                  <NeonButton
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      playSound("click")
                    }}
                    onMouseEnter={() => onCursorEnter("button", "Received")}
                    onMouseLeave={onCursorLeave}
                  >
                    <ArrowDownLeft className="h-3 w-3 mr-1" />
                    Received
                  </NeonButton>
                </div>
              </div>

              <TransactionList
                transactions={transactions}
                searchTerm={searchTerm}
                isLoading={isLoading}
                loadMore={loadMoreTransactions}
                onCursorEnter={onCursorEnter}
                onCursorLeave={onCursorLeave}
                playSound={playSound}
              />
            </CryptoCard>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="lg:col-span-3">
            <CryptoCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-[#00FFB2]" />
                  <h2 className="text-xl font-bold">Wallet Analytics</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-[#0A1A2F]/50 p-4 rounded-lg border border-[#0A1A2F] hover:border-[#00FFB2]/30 transition-all">
                  <h3 className="text-sm text-[#8B9CAF] mb-2">Total Transactions</h3>
                  <p className="text-3xl font-bold text-[#00FFB2]">{transactions.length}</p>
                  <div className="flex items-center text-xs text-[#8B9CAF] mt-2">
                    <ArrowUpRight className="h-3 w-3 mr-1 text-[#00FFB2]" />
                    <span className="text-[#00FFB2]">+12%</span>
                    <span className="ml-1">vs. last month</span>
                  </div>
                </div>

                <div className="bg-[#0A1A2F]/50 p-4 rounded-lg border border-[#0A1A2F] hover:border-[#00FFB2]/30 transition-all">
                  <h3 className="text-sm text-[#8B9CAF] mb-2">Average Transaction</h3>
                  <p className="text-3xl font-bold text-[#00FFB2]">0.85 ETH</p>
                  <div className="flex items-center text-xs text-[#8B9CAF] mt-2">
                    <ArrowDownLeft className="h-3 w-3 mr-1 text-[#FF3B3B]" />
                    <span className="text-[#FF3B3B]">-3%</span>
                    <span className="ml-1">vs. last month</span>
                  </div>
                </div>

                <div className="bg-[#0A1A2F]/50 p-4 rounded-lg border border-[#0A1A2F] hover:border-[#00FFB2]/30 transition-all">
                  <h3 className="text-sm text-[#8B9CAF] mb-2">Gas Spent</h3>
                  <p className="text-3xl font-bold text-[#00FFB2]">0.12 ETH</p>
                  <div className="flex items-center text-xs text-[#8B9CAF] mt-2">
                    <ArrowUpRight className="h-3 w-3 mr-1 text-[#FF3B3B]" />
                    <span className="text-[#FF3B3B]">+8%</span>
                    <span className="ml-1">vs. last month</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0A1A2F]/50 p-6 rounded-lg border border-[#0A1A2F]">
                  <h3 className="text-lg font-bold mb-4">Transaction Types</h3>
                  <div className="h-64 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full border-8 border-[#00FFB2]/30 relative">
                        <div
                          className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-transparent border-t-[#00FFB2]"
                          style={{ transform: "rotate(45deg)" }}
                        ></div>
                        <div
                          className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-transparent border-r-[#0074F0]"
                          style={{ transform: "rotate(45deg)" }}
                        ></div>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 bg-[#0A1A2F]/80 p-2 rounded">
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 bg-[#00FFB2] rounded-full mr-2"></div>
                        <span className="text-xs">Outgoing (65%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-[#0074F0] rounded-full mr-2"></div>
                        <span className="text-xs">Incoming (35%)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0A1A2F]/50 p-6 rounded-lg border border-[#0A1A2F]">
                  <h3 className="text-lg font-bold mb-4">Activity Heatmap</h3>
                  <div className="grid grid-cols-7 gap-1">
                    {[...Array(7)].map((_, day) => (
                      <div key={day} className="text-center text-xs text-[#8B9CAF] mb-1">
                        {["S", "M", "T", "W", "T", "F", "S"][day]}
                      </div>
                    ))}
                    {[...Array(24)].map((_, hour) =>
                      [...Array(7)].map((_, day) => {
                        const intensity = Math.random()
                        let bgColor = "bg-[#0A1A2F]"
                        if (intensity > 0.8) bgColor = "bg-[#00FFB2]"
                        else if (intensity > 0.6) bgColor = "bg-[#00FFB2]/60"
                        else if (intensity > 0.3) bgColor = "bg-[#00FFB2]/30"

                        return (
                          <div
                            key={`${hour}-${day}`}
                            className={`w-full aspect-square rounded-sm ${bgColor}`}
                            title={`${hour}:00 - ${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day]}`}
                          ></div>
                        )
                      }),
                    )}
                  </div>
                </div>
              </div>
            </CryptoCard>
          </div>
        )}

        {activeTab === "history" && (
          <div className="lg:col-span-3">
            <CryptoCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-[#00FFB2]" />
                  <h2 className="text-xl font-bold">Wallet History</h2>
                </div>
              </div>

              <div className="relative pl-6 border-l border-[#0A1A2F]">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="mb-8 relative">
                    <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-[#00FFB2]/20 border-2 border-[#00FFB2] flex items-center justify-center">
                      <div className="w-1 h-1 bg-[#00FFB2] rounded-full"></div>
                    </div>
                    <div className="bg-[#0A1A2F]/50 p-4 rounded-lg border border-[#0A1A2F]">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          {i === 0 ? (
                            <Shield className="h-4 w-4 mr-2 text-[#00FFB2]" />
                          ) : i === 1 ? (
                            <ArrowUpRight className="h-4 w-4 mr-2 text-[#00FFB2]" />
                          ) : i === 2 ? (
                            <ArrowDownLeft className="h-4 w-4 mr-2 text-[#0074F0]" />
                          ) : i === 3 ? (
                            <RefreshCw className="h-4 w-4 mr-2 text-[#5643FD]" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 mr-2 text-[#FF3B3B]" />
                          )}
                          <h3 className="font-medium">
                            {i === 0
                              ? "Wallet Created"
                              : i === 1
                                ? "First Transaction Sent"
                                : i === 2
                                  ? "Largest Transaction Received"
                                  : i === 3
                                    ? "Connected to dApp"
                                    : "Anomaly Detected"}
                          </h3>
                        </div>
                        <div className="text-xs text-[#8B9CAF]">
                          {new Date(Date.now() - i * 86400000 * 7).toLocaleDateString()}
                        </div>
                      </div>
                      <p className="text-sm text-[#8B9CAF]">
                        {i === 0
                          ? "Wallet was created and secured with quantum-resistant encryption."
                          : i === 1
                            ? "First transaction of 0.5 ETH was sent to 0x742d...8f44e."
                            : i === 2
                              ? "Received 2.35 ETH from 0x8f1a...9b23."
                              : i === 3
                                ? "Connected to Uniswap for token swapping."
                                : "Unusual transaction pattern detected and blocked."}
                      </p>
                      {i !== 0 && (
                        <div className="mt-2 flex justify-end">
                          <button
                            className="text-xs text-[#00FFB2] hover:text-[#00FFB2]/80 flex items-center"
                            onMouseEnter={() => onCursorEnter("link", "View")}
                            onMouseLeave={onCursorLeave}
                          >
                            View Details
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CryptoCard>
          </div>
        )}
      </div>
    </div>
  )
}
