"use client"

import { useState } from "react"
import { Wallet, Copy, ExternalLink, Shield, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import QRCode from "@/components/qr-code"

interface WalletInfoType {
  address: string
  balance: string
  transactionCount: number
  lastUpdated: string
}

interface WalletOverviewProps {
  walletInfo: WalletInfoType | null
  isLoading: boolean
}

export function WalletOverview({ walletInfo, isLoading }: WalletOverviewProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const truncateAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  return (
    <Card className="border border-gray-800 bg-gray-900 shadow-lg hover:shadow-emerald-900/20 transition-all duration-300">
      <CardHeader className="border-b border-gray-800 bg-gray-950 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Wallet className="h-5 w-5 mr-2 text-emerald-400" />
            <CardTitle className="text-lg font-bold text-emerald-400">Wallet Overview</CardTitle>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge
                  variant="outline"
                  className="bg-emerald-950 text-emerald-400 border-emerald-700 px-2 py-1 text-xs"
                >
                  <Shield className="h-3 w-3 mr-1" />
                  Quantum-Safe
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Protected by quantum-resistant encryption</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {isLoading || !walletInfo ? (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row items-center justify-between mb-4">
              <div className="mb-4 md:mb-0 flex-shrink-0">
                <QRCode value={walletInfo.address} size={120} />
              </div>
              <div className="flex-1 md:ml-6 space-y-3">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Wallet Address</p>
                  <div className="flex items-center">
                    <p className="font-mono text-sm bg-gray-800 p-2 rounded-md border border-gray-700 mr-2 overflow-hidden overflow-ellipsis">
                      {walletInfo.address}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(walletInfo.address)}
                      className="h-8 w-8 text-gray-400 hover:text-emerald-400 hover:bg-gray-800"
                    >
                      {copied ? <Badge className="bg-emerald-500">Copied!</Badge> : <Copy className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-emerald-400 hover:bg-gray-800"
                      onClick={() => window.open(`https://etherscan.io/address/${walletInfo.address}`, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                    <p className="text-xs text-gray-400 mb-1">Balance</p>
                    <p className="text-lg font-bold text-emerald-400">{walletInfo.balance} ETH</p>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                    <p className="text-xs text-gray-400 mb-1">Transactions</p>
                    <p className="text-lg font-bold text-purple-400">{walletInfo.transactionCount}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
              <div className="flex items-center">
                <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                <span>Last updated: {walletInfo.lastUpdated}</span>
              </div>
              <Button
                variant="link"
                size="sm"
                className="text-emerald-400 p-0 h-auto"
                onClick={() => window.open(`https://etherscan.io/address/${walletInfo.address}`, "_blank")}
              >
                Verify on Etherscan
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
