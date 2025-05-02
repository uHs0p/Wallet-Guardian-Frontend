"use client"

import { useState, useEffect } from "react"

interface Transaction {
  hash: string
  from: string
  to: string
  value: string
  timestamp: number
  gasFee: string
  isAnomaly?: boolean
}

interface Anomaly {
  id: string
  hash: string
  from: string
  to: string
  value: string
  timestamp: number
  riskScore: number
  reason: string
}

interface WalletInfo {
  address: string
  balance: string
  transactionCount: number
  lastUpdated: string
}

export function useWalletData(walletAddress: string) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [anomalies, setAnomalies] = useState<Anomaly[]>([])
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  // Mock data generation for demonstration
  const generateMockData = () => {
    // Generate wallet info
    const mockWalletInfo: WalletInfo = {
      address: walletAddress,
      balance: (Math.random() * 10).toFixed(4),
      transactionCount: Math.floor(Math.random() * 1000) + 100,
      lastUpdated: new Date().toLocaleString(),
    }

    // Generate transactions
    const mockTransactions: Transaction[] = []
    const now = Date.now()

    for (let i = 0; i < 10; i++) {
      const isOutgoing = Math.random() > 0.5
      const timestamp = now - Math.floor(Math.random() * 86400000) // Random time in the last 24 hours

      mockTransactions.push({
        hash: `0x${Math.random().toString(16).substring(2, 42)}`,
        from: isOutgoing ? walletAddress : `0x${Math.random().toString(16).substring(2, 42)}`,
        to: isOutgoing ? `0x${Math.random().toString(16).substring(2, 42)}` : walletAddress,
        value: (Math.random() * 2).toFixed(4),
        timestamp,
        gasFee: (Math.random() * 0.01).toFixed(6),
        isAnomaly: Math.random() < 0.2, // 20% chance of being an anomaly
      })
    }

    // Sort by timestamp (newest first)
    mockTransactions.sort((a, b) => b.timestamp - a.timestamp)

    // Generate anomalies
    const mockAnomalies: Anomaly[] = []
    const anomalyReasons = [
      "Unusually large transaction amount compared to historical patterns.",
      "Transaction to a known high-risk address flagged by our security database.",
      "Unusual transaction timing outside of your normal activity hours.",
      "Multiple rapid transactions in succession, potential account draining attempt.",
      "First interaction with a newly created contract address with no verification.",
    ]

    // Filter transactions marked as anomalies
    const anomalyTransactions = mockTransactions.filter((tx) => tx.isAnomaly)

    anomalyTransactions.forEach((tx, index) => {
      mockAnomalies.push({
        id: `anomaly-${index}`,
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        value: tx.value,
        timestamp: tx.timestamp,
        riskScore: Math.floor(Math.random() * 50) + 50, // 50-100 risk score
        reason: anomalyReasons[Math.floor(Math.random() * anomalyReasons.length)],
      })
    })

    return { mockWalletInfo, mockTransactions, mockAnomalies }
  }

  // Initial data fetch
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      try {
        // In a real app, this would be an API call to your backend
        // For demo purposes, we'll use mock data
        setTimeout(() => {
          const { mockWalletInfo, mockTransactions, mockAnomalies } = generateMockData()

          setWalletInfo(mockWalletInfo)
          setTransactions(mockTransactions)
          setAnomalies(mockAnomalies)
          setIsLoading(false)
        }, 1500) // Simulate network delay
      } catch (err) {
        setError("Failed to fetch wallet data. Please try again later.")
        setIsLoading(false)
      }
    }

    fetchData()

    // Set up SSE for real-time updates (simulated)
    const eventSource = setupMockSSE()

    return () => {
      // Clean up event source
      eventSource.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress])

  // Function to simulate Server-Sent Events for real-time updates
  const setupMockSSE = () => {
    // This is a mock implementation of EventSource
    const mockEventSource = {
      close: () => clearInterval(intervalId),
    }

    // Simulate incoming events every 10 seconds
    const intervalId = setInterval(() => {
      // 30% chance of new transaction
      if (Math.random() < 0.3) {
        const newTransaction: Transaction = {
          hash: `0x${Math.random().toString(16).substring(2, 42)}`,
          from: Math.random() > 0.5 ? walletAddress : `0x${Math.random().toString(16).substring(2, 42)}`,
          to: Math.random() > 0.5 ? `0x${Math.random().toString(16).substring(2, 42)}` : walletAddress,
          value: (Math.random() * 2).toFixed(4),
          timestamp: Date.now(),
          gasFee: (Math.random() * 0.01).toFixed(6),
          isAnomaly: Math.random() < 0.2,
        }

        setTransactions((prev) => [newTransaction, ...prev])

        // If it's an anomaly, add to anomalies list
        if (newTransaction.isAnomaly) {
          const anomalyReasons = [
            "Unusually large transaction amount compared to historical patterns.",
            "Transaction to a known high-risk address flagged by our security database.",
            "Unusual transaction timing outside of your normal activity hours.",
            "Multiple rapid transactions in succession, potential account draining attempt.",
            "First interaction with a newly created contract address with no verification.",
          ]

          const newAnomaly: Anomaly = {
            id: `anomaly-${Date.now()}`,
            hash: newTransaction.hash,
            from: newTransaction.from,
            to: newTransaction.to,
            value: newTransaction.value,
            timestamp: newTransaction.timestamp,
            riskScore: Math.floor(Math.random() * 50) + 50, // 50-100 risk score
            reason: anomalyReasons[Math.floor(Math.random() * anomalyReasons.length)],
          }

          setAnomalies((prev) => [newAnomaly, ...prev])
        }

        // Update wallet info
        setWalletInfo((prev) => {
          if (!prev) return prev

          return {
            ...prev,
            balance: (Number.parseFloat(prev.balance) + (Math.random() * 0.01 - 0.005)).toFixed(4),
            transactionCount: prev.transactionCount + 1,
            lastUpdated: new Date().toLocaleString(),
          }
        })
      }
    }, 10000)

    return mockEventSource
  }

  // Function to load more transactions
  const loadMoreTransactions = () => {
    setIsLoading(true)

    // Simulate loading more transactions
    setTimeout(() => {
      const { mockTransactions } = generateMockData()
      setTransactions((prev) => [...prev, ...mockTransactions])
      setPage((prev) => prev + 1)
      setIsLoading(false)
    }, 1000)
  }

  return {
    transactions,
    anomalies,
    walletInfo,
    isLoading,
    error,
    loadMoreTransactions,
  }
}
