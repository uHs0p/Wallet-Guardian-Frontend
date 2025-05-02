"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, ExternalLink, RefreshCw, QrCode } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { EnhancedQRCode } from "@/components/enhanced-qr-code"

interface WalletStatsProps {
  walletInfo: any
  isLoading: boolean
  onCursorEnter: (variant: string, text?: string) => void
  onCursorLeave: () => void
  playSound: (sound: string) => void
}

export function WalletStats({ walletInfo, isLoading, onCursorEnter, onCursorLeave, playSound }: WalletStatsProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    playSound("success")
    setTimeout(() => setCopied(false), 2000)
  }

  const truncateAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  if (isLoading || !walletInfo) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4">
        <p className="text-sm text-[#8B9CAF] mb-1">Wallet Address</p>
        <div className="flex items-center">
          <div className="flex-1 font-mono text-sm bg-[#0A1A2F]/50 p-2 rounded-md border border-[#0A1A2F] mr-2 overflow-hidden overflow-ellipsis">
            {walletInfo.address}
          </div>
          <div className="flex space-x-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => copyToClipboard(walletInfo.address)}
                    className="p-2 rounded-md bg-[#0A1A2F]/50 border border-[#0A1A2F] text-[#8B9CAF] hover:text-[#00FFB2] hover:bg-[#00FFB2]/10 hover:border-[#00FFB2]/30 transition-colors"
                    onMouseEnter={() => onCursorEnter("button", "Copy")}
                    onMouseLeave={onCursorLeave}
                  >
                    {copied ? <Badge className="bg-[#00FFB2] text-black">Copied!</Badge> : <Copy className="h-4 w-4" />}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy address</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => window.open(`https://etherscan.io/address/${walletInfo.address}`, "_blank")}
                    className="p-2 rounded-md bg-[#0A1A2F]/50 border border-[#0A1A2F] text-[#8B9CAF] hover:text-[#00FFB2] hover:bg-[#00FFB2]/10 hover:border-[#00FFB2]/30 transition-colors"
                    onMouseEnter={() => onCursorEnter("button", "View")}
                    onMouseLeave={onCursorLeave}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View on Etherscan</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="p-2 rounded-md bg-[#0A1A2F]/50 border border-[#0A1A2F] text-[#8B9CAF] hover:text-[#00FFB2] hover:bg-[#00FFB2]/10 hover:border-[#00FFB2]/30 transition-colors"
                  onMouseEnter={() => onCursorEnter("button", "QR")}
                  onMouseLeave={onCursorLeave}
                  onClick={() => playSound("click")}
                >
                  <QrCode className="h-4 w-4" />
                </button>
              </DialogTrigger>
              <DialogContent className="bg-[#050B14]/90 backdrop-blur-xl border border-[#0A1A2F]">
                <DialogHeader>
                  <DialogTitle className="text-[#00FFB2] flex items-center">
                    <QrCode className="h-5 w-5 mr-2" />
                    Quantum-Safe Wallet QR
                  </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center p-4">
                  <EnhancedQRCode value={`ethereum:${walletInfo.address}`} />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="bg-[#0A1A2F]/50 p-4 rounded-lg border border-[#0A1A2F] hover:border-[#00FFB2]/30 hover:bg-[#00FFB2]/5 transition-all duration-200"
        >
          <p className="text-xs text-[#8B9CAF] mb-1">Balance</p>
          <p className="text-2xl font-bold text-[#00FFB2]">{walletInfo.balance} ETH</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="bg-[#0A1A2F]/50 p-4 rounded-lg border border-[#0A1A2F] hover:border-[#5643FD]/30 hover:bg-[#5643FD]/5 transition-all duration-200"
        >
          <p className="text-xs text-[#8B9CAF] mb-1">Transactions</p>
          <p className="text-2xl font-bold text-[#5643FD]">{walletInfo.transactionCount}</p>
        </motion.div>
      </div>

      <div className="flex items-center justify-between text-xs text-[#8B9CAF] mt-4">
        <div className="flex items-center">
          <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
          <span>Last updated: {walletInfo.lastUpdated}</span>
        </div>
        <button
          className="text-[#00FFB2] hover:text-[#00FFB2]/80 transition-colors flex items-center"
          onClick={() => {
            window.open(`https://etherscan.io/address/${walletInfo.address}`, "_blank")
            playSound("click")
          }}
          onMouseEnter={() => onCursorEnter("link", "Verify")}
          onMouseLeave={onCursorLeave}
        >
          Verify on Etherscan
          <ExternalLink className="h-3 w-3 ml-1" />
        </button>
      </div>
    </div>
  )
}
