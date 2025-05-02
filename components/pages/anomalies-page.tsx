"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, Filter, ChevronDown, Calendar, BarChart3, Shield } from "lucide-react"
import { CryptoCard } from "@/components/ui-elements/crypto-card"
import { NeonButton } from "@/components/ui-elements/neon-button"
import { AnomalyPanel } from "@/components/anomaly-panel"
import { SearchBar } from "@/components/ui-elements/search-bar"
import { DataFlowLines } from "@/components/data-flow-lines"

interface AnomaliesPageProps {
  anomalies: any[]
  isLoading: boolean
  onCursorEnter: (variant: string, text?: string) => void
  onCursorLeave: () => void
  playSound: (sound: string) => void
}

export function AnomaliesPage({ anomalies, isLoading, onCursorEnter, onCursorLeave, playSound }: AnomaliesPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState("all")
  const [selectedRiskLevel, setSelectedRiskLevel] = useState("all")
  const [selectedView, setSelectedView] = useState("list")

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  const toggleFilter = () => {
    setFilterOpen(!filterOpen)
    playSound("click")
  }

  const filterAnomalies = () => {
    let filtered = [...anomalies]

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (anomaly) =>
          anomaly.hash.toLowerCase().includes(term) ||
          anomaly.from.toLowerCase().includes(term) ||
          anomaly.to.toLowerCase().includes(term) ||
          anomaly.reason.toLowerCase().includes(term),
      )
    }

    // Apply timeframe filter
    if (selectedTimeframe !== "all") {
      const now = Date.now()
      const timeFilters = {
        day: 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        month: 30 * 24 * 60 * 60 * 1000,
      }

      filtered = filtered.filter(
        (anomaly) => now - anomaly.timestamp < timeFilters[selectedTimeframe as keyof typeof timeFilters],
      )
    }

    // Apply risk level filter
    if (selectedRiskLevel !== "all") {
      const riskLevels = {
        high: 80,
        medium: 50,
        low: 0,
      }

      filtered = filtered.filter((anomaly) => {
        if (selectedRiskLevel === "high") return anomaly.riskScore >= riskLevels.high
        if (selectedRiskLevel === "medium")
          return anomaly.riskScore >= riskLevels.medium && anomaly.riskScore < riskLevels.high
        return anomaly.riskScore < riskLevels.medium
      })
    }

    return filtered
  }

  const filteredAnomalies = filterAnomalies()

  return (
    <div className="container mx-auto px-4 md:px-6 py-24">
      <motion.div className="absolute top-0 left-0 right-0 h-96 pointer-events-none">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF3B3B] via-[#FF5C5C] to-[#FF8080]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Anomaly Detection
            </motion.h1>
            <motion.p
              className="mt-4 text-xl text-[#8B9CAF] max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              AI-powered security alerts and threat analysis
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className="mt-20 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search anomalies by hash, address, or description..."
              onCursorEnter={onCursorEnter}
              onCursorLeave={onCursorLeave}
            />
          </div>

          <div className="flex gap-2">
            <NeonButton
              variant={selectedView === "list" ? "default" : "outline"}
              onClick={() => {
                setSelectedView("list")
                playSound("click")
              }}
              onMouseEnter={() => onCursorEnter("button", "List")}
              onMouseLeave={onCursorLeave}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              List
            </NeonButton>
            <NeonButton
              variant={selectedView === "chart" ? "default" : "outline"}
              onClick={() => {
                setSelectedView("chart")
                playSound("click")
              }}
              onMouseEnter={() => onCursorEnter("button", "Chart")}
              onMouseLeave={onCursorLeave}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </NeonButton>
            <NeonButton
              variant="outline"
              onClick={toggleFilter}
              onMouseEnter={() => onCursorEnter("button", "Filter")}
              onMouseLeave={onCursorLeave}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
              <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${filterOpen ? "rotate-180" : ""}`} />
            </NeonButton>
          </div>
        </div>

        {filterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4"
          >
            <CryptoCard className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-[#8B9CAF] mb-2">Time Range</label>
                  <div className="flex flex-wrap gap-2">
                    {["all", "day", "week", "month"].map((timeframe) => (
                      <button
                        key={timeframe}
                        className={`px-3 py-1 rounded-md text-sm flex items-center ${
                          selectedTimeframe === timeframe
                            ? "bg-[#00FFB2]/20 text-[#00FFB2] border border-[#00FFB2]/30"
                            : "bg-[#0A1A2F] text-[#8B9CAF] border border-[#0A1A2F] hover:border-[#00FFB2]/20"
                        }`}
                        onClick={() => {
                          setSelectedTimeframe(timeframe)
                          playSound("select")
                        }}
                        onMouseEnter={() => onCursorEnter("button", "Select")}
                        onMouseLeave={onCursorLeave}
                      >
                        <Calendar className="h-3 w-3 mr-1" />
                        {timeframe === "all"
                          ? "All Time"
                          : timeframe === "day"
                            ? "Last 24h"
                            : timeframe === "week"
                              ? "Last Week"
                              : "Last Month"}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#8B9CAF] mb-2">Risk Level</label>
                  <div className="flex flex-wrap gap-2">
                    {["all", "high", "medium", "low"].map((risk) => (
                      <button
                        key={risk}
                        className={`px-3 py-1 rounded-md text-sm flex items-center ${
                          selectedRiskLevel === risk
                            ? risk === "high"
                              ? "bg-[#FF3B3B]/20 text-[#FF3B3B] border border-[#FF3B3B]/30"
                              : risk === "medium"
                                ? "bg-[#FFA500]/20 text-[#FFA500] border border-[#FFA500]/30"
                                : "bg-[#FFCC00]/20 text-[#FFCC00] border border-[#FFCC00]/30"
                            : "bg-[#0A1A2F] text-[#8B9CAF] border border-[#0A1A2F] hover:border-[#00FFB2]/20"
                        }`}
                        onClick={() => {
                          setSelectedRiskLevel(risk)
                          playSound("select")
                        }}
                        onMouseEnter={() => onCursorEnter("button", "Select")}
                        onMouseLeave={onCursorLeave}
                      >
                        <AlertTriangle
                          className={`h-3 w-3 mr-1 ${
                            risk === "high"
                              ? "text-[#FF3B3B]"
                              : risk === "medium"
                                ? "text-[#FFA500]"
                                : risk === "low"
                                  ? "text-[#FFCC00]"
                                  : ""
                          }`}
                        />
                        {risk === "all" ? "All Risks" : `${risk.charAt(0).toUpperCase() + risk.slice(1)} Risk`}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-end">
                  <NeonButton
                    onClick={() => {
                      setSelectedTimeframe("all")
                      setSelectedRiskLevel("all")
                      setSearchTerm("")
                      playSound("click")
                    }}
                    onMouseEnter={() => onCursorEnter("button", "Reset")}
                    onMouseLeave={onCursorLeave}
                    className="w-full"
                  >
                    Reset Filters
                  </NeonButton>
                </div>
              </div>
            </CryptoCard>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 relative">
        <DataFlowLines />

        {selectedView === "list" ? (
          <CryptoCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-[#FF3B3B]" />
                <h2 className="text-xl font-bold">Detected Anomalies</h2>
              </div>
              <div className="bg-[#0A1A2F] px-3 py-1 rounded-full text-sm">
                {filteredAnomalies.length} {filteredAnomalies.length === 1 ? "Anomaly" : "Anomalies"} Detected
              </div>
            </div>

            <AnomalyPanel
              anomalies={filteredAnomalies}
              isLoading={isLoading}
              onCursorEnter={onCursorEnter}
              onCursorLeave={onCursorLeave}
              playSound={playSound}
            />
          </CryptoCard>
        ) : (
          <CryptoCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-[#00FFB2]" />
                <h2 className="text-xl font-bold">Anomaly Analytics</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-[#0A1A2F]/50 p-4 rounded-lg border border-[#0A1A2F] hover:border-[#FF3B3B]/30 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm text-[#8B9CAF]">High Risk Anomalies</h3>
                  <div className="bg-[#FF3B3B]/20 text-[#FF3B3B] px-2 py-1 rounded-full text-xs">
                    {anomalies.filter((a) => a.riskScore >= 80).length}
                  </div>
                </div>
                <p className="text-3xl font-bold text-[#FF3B3B]">
                  {((anomalies.filter((a) => a.riskScore >= 80).length / anomalies.length) * 100).toFixed(1)}%
                </p>
                <div className="h-1 bg-[#0A1A2F] rounded-full mt-2">
                  <div
                    className="h-full bg-[#FF3B3B] rounded-full"
                    style={{
                      width: `${(anomalies.filter((a) => a.riskScore >= 80).length / anomalies.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="bg-[#0A1A2F]/50 p-4 rounded-lg border border-[#0A1A2F] hover:border-[#FFA500]/30 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm text-[#8B9CAF]">Medium Risk Anomalies</h3>
                  <div className="bg-[#FFA500]/20 text-[#FFA500] px-2 py-1 rounded-full text-xs">
                    {anomalies.filter((a) => a.riskScore >= 50 && a.riskScore < 80).length}
                  </div>
                </div>
                <p className="text-3xl font-bold text-[#FFA500]">
                  {(
                    (anomalies.filter((a) => a.riskScore >= 50 && a.riskScore < 80).length / anomalies.length) *
                    100
                  ).toFixed(1)}
                  %
                </p>
                <div className="h-1 bg-[#0A1A2F] rounded-full mt-2">
                  <div
                    className="h-full bg-[#FFA500] rounded-full"
                    style={{
                      width: `${(anomalies.filter((a) => a.riskScore >= 50 && a.riskScore < 80).length / anomalies.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="bg-[#0A1A2F]/50 p-4 rounded-lg border border-[#0A1A2F] hover:border-[#FFCC00]/30 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm text-[#8B9CAF]">Low Risk Anomalies</h3>
                  <div className="bg-[#FFCC00]/20 text-[#FFCC00] px-2 py-1 rounded-full text-xs">
                    {anomalies.filter((a) => a.riskScore < 50).length}
                  </div>
                </div>
                <p className="text-3xl font-bold text-[#FFCC00]">
                  {((anomalies.filter((a) => a.riskScore < 50).length / anomalies.length) * 100).toFixed(1)}%
                </p>
                <div className="h-1 bg-[#0A1A2F] rounded-full mt-2">
                  <div
                    className="h-full bg-[#FFCC00] rounded-full"
                    style={{
                      width: `${(anomalies.filter((a) => a.riskScore < 50).length / anomalies.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-[#0A1A2F]/50 p-6 rounded-lg border border-[#0A1A2F] mb-6">
              <h3 className="text-lg font-bold mb-4">Anomaly Distribution Over Time</h3>
              <div className="h-64 flex items-end justify-between">
                {[...Array(7)].map((_, i) => {
                  const height = 30 + Math.random() * 70
                  return (
                    <div key={i} className="flex flex-col items-center w-full">
                      <div className="relative w-full px-1">
                        <div
                          className="w-full bg-gradient-to-t from-[#FF3B3B]/80 to-[#FF3B3B]/20 rounded-t-md"
                          style={{ height: `${height}%` }}
                        ></div>
                        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#FF3B3B]/0 to-[#FF3B3B]/20 rounded-t-md"></div>
                      </div>
                      <div className="text-xs text-[#8B9CAF] mt-2">Day {i + 1}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0A1A2F]/50 p-6 rounded-lg border border-[#0A1A2F]">
                <h3 className="text-lg font-bold mb-4">Common Anomaly Types</h3>
                <div className="space-y-4">
                  {[
                    { type: "Unusual Transaction Amount", percentage: 35 },
                    { type: "Suspicious Address", percentage: 28 },
                    { type: "Abnormal Timing", percentage: 20 },
                    { type: "Contract Interaction", percentage: 17 },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{item.type}</span>
                        <span className="text-[#00FFB2]">{item.percentage}%</span>
                      </div>
                      <div className="h-1 bg-[#0A1A2F] rounded-full">
                        <div
                          className="h-full bg-gradient-to-r from-[#00FFB2] to-[#0074F0] rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0A1A2F]/50 p-6 rounded-lg border border-[#0A1A2F]">
                <h3 className="text-lg font-bold mb-4">Security Recommendations</h3>
                <div className="space-y-3">
                  {[
                    "Enable multi-signature for high-value transactions",
                    "Set up transaction limits for your wallet",
                    "Regularly review authorized contracts and revoke unused permissions",
                    "Consider using a hardware wallet for additional security",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mt-1 mr-3 p-1 rounded-full bg-[#00FFB2]/20 text-[#00FFB2]">
                        <Shield className="h-3 w-3" />
                      </div>
                      <p className="text-sm text-[#8B9CAF]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CryptoCard>
        )}
      </div>
    </div>
  )
}
