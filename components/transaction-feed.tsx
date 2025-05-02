"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { ArrowUpRight, ExternalLink, AlertTriangle, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Transaction {
  hash: string
  from: string
  to: string
  value: string
  timestamp: number
  gasFee: string
  isAnomaly?: boolean
}

interface TransactionFeedProps {
  transactions: Transaction[]
  searchTerm: string
  timeFilter: string
  isLoading: boolean
  loadMore: () => void
}

export function TransactionFeed({ transactions, searchTerm, timeFilter, isLoading, loadMore }: TransactionFeedProps) {
  const [expandedTx, setExpandedTx] = useState<string | null>(null)

  const truncateAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  const truncateHash = (hash: string) => {
    return `${hash.substring(0, 10)}...${hash.substring(hash.length - 6)}`
  }

  const filterTransactions = () => {
    let filtered = [...transactions]

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (tx) =>
          tx.hash.toLowerCase().includes(term) ||
          tx.from.toLowerCase().includes(term) ||
          tx.to.toLowerCase().includes(term),
      )
    }

    // Apply time filter
    if (timeFilter !== "all") {
      const now = Date.now()
      const timeFilters = {
        hour: 60 * 60 * 1000,
        day: 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
      }

      filtered = filtered.filter((tx) => now - tx.timestamp < timeFilters[timeFilter as keyof typeof timeFilters])
    }

    return filtered
  }

  const filteredTransactions = filterTransactions()

  return (
    <Card className="border border-gray-800 bg-gray-900 shadow-lg hover:shadow-emerald-900/20 transition-all duration-300">
      <CardHeader className="border-b border-gray-800 bg-gray-950 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ArrowUpRight className="h-5 w-5 mr-2 text-emerald-400" />
            <CardTitle className="text-lg font-bold text-emerald-400">Transaction Feed</CardTitle>
          </div>
          <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-700">
            {filteredTransactions.length} Transactions
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="p-4 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="border border-gray-800 rounded-lg p-4">
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
          <div className="flex flex-col items-center justify-center p-8 text-gray-500">
            <AlertTriangle className="h-12 w-12 mb-4 text-gray-600" />
            <p className="text-lg font-medium">No transactions found</p>
            <p className="text-sm">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {filteredTransactions.map((tx) => (
              <div
                key={tx.hash}
                className={`p-4 hover:bg-gray-800/50 transition-colors duration-150 ${tx.isAnomaly ? "border-l-4 border-red-500" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div
                      className={`p-2 rounded-full mr-3 ${tx.isAnomaly ? "bg-red-900/30 text-red-400" : "bg-emerald-900/30 text-emerald-400"}`}
                    >
                      {tx.isAnomaly ? <AlertTriangle className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="link"
                                className="p-0 h-auto text-gray-300 hover:text-emerald-400 font-mono text-sm"
                                onClick={() => window.open(`https://etherscan.io/tx/${tx.hash}`, "_blank")}
                              >
                                {truncateHash(tx.hash)}
                                <ExternalLink className="h-3 w-3 ml-1" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View on Etherscan</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        {tx.isAnomaly && (
                          <Badge className="ml-2 bg-red-900/50 text-red-400 border-red-700">Anomaly</Badge>
                        )}
                      </div>

                      <div className="mt-1 text-sm">
                        <div className="flex items-center text-gray-400">
                          <span className="text-xs mr-1">From:</span>
                          <Button
                            variant="link"
                            className="p-0 h-auto text-gray-300 hover:text-emerald-400 font-mono text-xs"
                            onClick={() => window.open(`https://etherscan.io/address/${tx.from}`, "_blank")}
                          >
                            {truncateAddress(tx.from)}
                          </Button>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <span className="text-xs mr-1">To:</span>
                          <Button
                            variant="link"
                            className="p-0 h-auto text-gray-300 hover:text-emerald-400 font-mono text-xs"
                            onClick={() => window.open(`https://etherscan.io/address/${tx.to}`, "_blank")}
                          >
                            {truncateAddress(tx.to)}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-emerald-400">{tx.value} ETH</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {formatDistanceToNow(new Date(tx.timestamp), { addSuffix: true })}
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    Gas Fee: <span className="text-gray-400">{tx.gasFee} ETH</span>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-gray-400 hover:text-emerald-400"
                    onClick={() => setExpandedTx(expandedTx === tx.hash ? null : tx.hash)}
                  >
                    {expandedTx === tx.hash ? "Hide Details" : "Show Details"}
                  </Button>
                </div>

                {expandedTx === tx.hash && (
                  <div className="mt-3 p-3 bg-gray-800 rounded-md border border-gray-700 text-xs">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-gray-500">Transaction Hash</p>
                        <p className="font-mono text-gray-300 break-all">{tx.hash}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Timestamp</p>
                        <p className="text-gray-300">{new Date(tx.timestamp).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">From</p>
                        <p className="font-mono text-gray-300 break-all">{tx.from}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">To</p>
                        <p className="font-mono text-gray-300 break-all">{tx.to}</p>
                      </div>
                    </div>

                    <div className="mt-2 flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs border-emerald-800 text-emerald-400 hover:bg-emerald-900/30"
                        onClick={() => window.open(`https://etherscan.io/tx/${tx.hash}`, "_blank")}
                      >
                        Verify on Blockchain
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="p-4 flex justify-center">
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-emerald-400"
                onClick={loadMore}
              >
                Load More
                <ArrowDown className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
