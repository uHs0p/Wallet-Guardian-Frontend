"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { formatDistanceToNow } from "date-fns"
import { AlertTriangle, ExternalLink, Info, Shield } from "lucide-react"
import { GlowingButton } from "@/components/ui-elements/glowing-button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

interface AnomalyPanelProps {
  anomalies: any[]
  isLoading: boolean
  onCursorEnter: (variant: string, text?: string) => void
  onCursorLeave: () => void
  playSound: (sound: string) => void
}

export function AnomalyPanel({ anomalies, isLoading, onCursorEnter, onCursorLeave, playSound }: AnomalyPanelProps) {
  const [selectedAnomaly, setSelectedAnomaly] = useState<any | null>(null)

  const truncateAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-red-500 bg-red-500/20 border-red-500/30"
    if (score >= 50) return "text-orange-500 bg-orange-500/20 border-orange-500/30"
    return "text-yellow-500 bg-yellow-500/20 border-yellow-500/30"
  }

  return (
    <div>
      {isLoading && anomalies.length === 0 ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border border-white/10 rounded-lg p-3">
              <div className="flex justify-between mb-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
              </div>
              <Skeleton className="h-4 w-full mt-2" />
            </div>
          ))}
        </div>
      ) : anomalies.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-6 text-gray-500">
          <div className="bg-green-500/20 p-3 rounded-full mb-3">
            <Shield className="h-8 w-8 text-green-500" />
          </div>
          <p className="text-green-500 font-medium">No anomalies detected</p>
          <p className="text-xs text-gray-400 mt-1">Your wallet is currently secure</p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {anomalies.slice(0, 5).map((anomaly, index) => (
              <motion.div
                key={anomaly.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="p-3 rounded-lg border border-red-500/30 bg-red-500/5 hover:bg-red-500/10 transition-colors duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="p-2 rounded-full mr-3 bg-red-500/20 text-red-400">
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <button
                          className="font-mono text-sm hover:text-red-400 transition-colors"
                          onClick={() => window.open(`https://etherscan.io/tx/${anomaly.hash}`, "_blank")}
                          onMouseEnter={() => onCursorEnter("link", "View")}
                          onMouseLeave={onCursorLeave}
                        >
                          {`${anomaly.hash.substring(0, 8)}...${anomaly.hash.substring(anomaly.hash.length - 6)}`}
                          <ExternalLink className="h-3 w-3 ml-1 inline" />
                        </button>
                      </div>

                      <div className="mt-1 text-xs text-gray-400">
                        <span>{truncateAddress(anomaly.from)}</span>
                        <span className="mx-1">→</span>
                        <span>{truncateAddress(anomaly.to)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-red-400">{anomaly.value} ETH</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {formatDistanceToNow(new Date(anomaly.timestamp), { addSuffix: true })}
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex justify-between items-center">
                  <Badge className={`${getRiskColor(anomaly.riskScore)}`}>Risk Score: {anomaly.riskScore}</Badge>

                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        className="text-xs text-gray-400 hover:text-red-400 transition-colors flex items-center"
                        onClick={() => {
                          setSelectedAnomaly(anomaly)
                          playSound("alert")
                        }}
                        onMouseEnter={() => onCursorEnter("button", "Explain")}
                        onMouseLeave={onCursorLeave}
                      >
                        <Info className="h-3 w-3 mr-1" />
                        Explain
                      </button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900/90 backdrop-blur-xl border border-red-500/30">
                      <DialogHeader>
                        <DialogTitle className="text-red-400 flex items-center">
                          <AlertTriangle className="h-5 w-5 mr-2" />
                          Anomaly Explanation
                        </DialogTitle>
                      </DialogHeader>
                      {selectedAnomaly && (
                        <div className="mt-4 space-y-4">
                          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                            <h4 className="text-sm font-medium text-gray-300 mb-2">Transaction Details</h4>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <p className="text-gray-500">Hash</p>
                                <p className="font-mono text-gray-300 break-all">{selectedAnomaly.hash}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Value</p>
                                <p className="text-red-400 font-bold">{selectedAnomaly.value} ETH</p>
                              </div>
                              <div>
                                <p className="text-gray-500">From</p>
                                <p className="font-mono text-gray-300 break-all">{selectedAnomaly.from}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">To</p>
                                <p className="font-mono text-gray-300 break-all">{selectedAnomaly.to}</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-gray-300 mb-2">AI Analysis</h4>
                            <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30 text-sm text-gray-300">
                              <p>{selectedAnomaly.reason}</p>
                            </div>
                          </div>

                          <div className="flex justify-end">
                            <GlowingButton
                              variant="danger"
                              size="sm"
                              onClick={() => window.open(`https://etherscan.io/tx/${selectedAnomaly.hash}`, "_blank")}
                              onMouseEnter={() => onCursorEnter("button", "Verify")}
                              onMouseLeave={onCursorLeave}
                            >
                              Verify on Blockchain
                              <ExternalLink className="h-4 w-4 ml-2" />
                            </GlowingButton>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {anomalies.length > 5 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center"
            >
              <button
                className="text-sm text-red-400 hover:text-red-300 transition-colors"
                onMouseEnter={() => onCursorEnter("button", "View All")}
                onMouseLeave={onCursorLeave}
              >
                View All Anomalies ({anomalies.length})
              </button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}
