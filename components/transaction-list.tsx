"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, AlertTriangle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { NeonButton } from "@/components/ui-elements/neon-button"

interface TransactionListProps {
  transactions: any[]
  searchTerm: string
  isLoading: boolean
  loadMore: () => void
  onCursorEnter: (variant: string, text?: string) => void
  onCursorLeave: () => void
  playSound: (sound: string) => void
}

export function TransactionList({
  transactions,
  searchTerm,
  isLoading,
  loadMore,
  onCursorEnter,
  onCursorLeave,
  playSound,
}: TransactionListProps) {
  const [expandedTx, setExpandedTx] = useState<string | null>(null)

  const truncateAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  const truncateHash = (hash: string) => {
    return `${hash.substring(0, 10)}...${hash.substring(hash.length - 6)}`
  }

  const filterTransactions = () => {
    if (!searchTerm) return transactions

    const term = searchTerm.toLowerCase()
    return transactions.filter(
      (tx) =>
        tx.hash.toLowerCase().includes(term) ||
        tx.from.toLowerCase().includes(term) ||
        tx.to.toLowerCase().includes(term),
    )
  }

  const filteredTransactions = filterTransactions()

  const toggleExpand = (hash: string) => {
    playSound("click")
    setExpandedTx(expandedTx === hash ? null : hash)
  }

  return (
    <div>
      {isLoading && transactions.length === 0 ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border border-[#0A1A2F] rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
              </div>
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-2/3 mt-2" />
            </div>
          ))}
        </div>
      ) : filteredTransactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-[#8B9CAF]">
          <AlertTriangle className="h-12 w-12 mb-4 text-[#8B9CAF]" />
          <p className="text-lg font-medium">No transactions found</p>
          <p className="text-sm">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTransactions.map((tx) => (
            <motion.div
              key={tx.hash}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-lg border ${
                tx.isAnomaly ? "border-[#FF3B3B]/30 bg-[#FF3B3B]/5" : "border-[#0A1A2F] bg-[#0A1A2F]/30"
              } hover:bg-[#0A1A2F]/50 transition-colors duration-200`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <div
                    className={`p-2 rounded-full mr-3 ${
                      tx.isAnomaly ? "bg-[#FF3B3B]/20 text-[#FF3B3B]" : "bg-[#00FFB2]/20 text-[#00FFB2]"
                    }`}
                  >
                    {tx.isAnomaly ? <AlertTriangle className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <button
                        className="font-mono text-sm hover:text-[#00FFB2] transition-colors"
                        onClick={() => window.open(`https://etherscan.io/tx/${tx.hash}`, "_blank")}
                        onMouseEnter={() => onCursorEnter("link", "View")}
                        onMouseLeave={onCursorLeave}
                      >
                        {truncateHash(tx.hash)}
                        <ExternalLink className="h-3 w-3 ml-1 inline" />
                      </button>

                      {tx.isAnomaly && (
                        <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-[#FF3B3B]/20 text-[#FF3B3B]">
                          Anomaly
                        </span>
                      )}
                    </div>

                    <div className="mt-1 text-xs text-[#8B9CAF]">
                      <span>{truncateAddress(tx.from)}</span>
                      <span className="mx-1">→</span>
                      <span>{truncateAddress(tx.to)}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`font-bold ${tx.isAnomaly ? "text-[#FF3B3B]" : "text-[#00FFB2]"}`}>
                    {tx.value} ETH
                  </div>
                  <div className="text-xs text-[#8B9CAF] mt-1">
                    {new Date(tx.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>

              <div className="mt-2 flex justify-between items-center">
                <div className="text-xs text-[#8B9CAF]">Gas Fee: {tx.gasFee} ETH</div>

                <button
                  className={`text-xs ${
                    tx.isAnomaly ? "text-[#FF3B3B]/80 hover:text-[#FF3B3B]" : "text-[#8B9CAF] hover:text-[#00FFB2]"
                  } transition-colors`}
                  onClick={() => toggleExpand(tx.hash)}
                  onMouseEnter={() => onCursorEnter("button", expandedTx === tx.hash ? "Hide" : "Show")}
                  onMouseLeave={onCursorLeave}
                >
                  {expandedTx === tx.hash ? "Hide Details" : "Show Details"}
                </button>
              </div>

              {expandedTx === tx.hash && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 p-3 bg-[#0A1A2F]/70 rounded-md border border-[#0A1A2F] text-xs"
                >
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-[#8B9CAF]">Transaction Hash</p>
                      <p className="font-mono text-white break-all">{tx.hash}</p>
                    </div>
                    <div>
                      <p className="text-[#8B9CAF]">Timestamp</p>
                      <p className="text-white">{new Date(tx.timestamp).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[#8B9CAF]">From</p>
                      <p className="font-mono text-white break-all">{tx.from}</p>
                    </div>
                    <div>
                      <p className="text-[#8B9CAF]">To</p>
                      <p className="font-mono text-white break-all">{tx.to}</p>
                    </div>
                  </div>

                  <div className="mt-2 flex justify-end">
                    <NeonButton
                      size="sm"
                      onClick={() => window.open(`https://etherscan.io/tx/${tx.hash}`, "_blank")}
                      onMouseEnter={() => onCursorEnter("button", "Verify")}
                      onMouseLeave={onCursorLeave}
                    >
                      Verify on Blockchain
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </NeonButton>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}

          {filteredTransactions.length > 0 && (
            <div className="pt-4 flex justify-center">
              <NeonButton
                variant="outline"
                onClick={() => {
                  loadMore()
                  playSound("click")
                }}
                onMouseEnter={() => onCursorEnter("button", "Load")}
                onMouseLeave={onCursorLeave}
              >
                Load More Transactions
              </NeonButton>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
