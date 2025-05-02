"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { AlertTriangle, ExternalLink, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

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

interface AnomalyAlertsProps {
  anomalies: Anomaly[]
  isLoading: boolean
}

export function AnomalyAlerts({ anomalies, isLoading }: AnomalyAlertsProps) {
  const [selectedAnomaly, setSelectedAnomaly] = useState<Anomaly | null>(null)

  const truncateAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-red-500 bg-red-950/50 border-red-800"
    if (score >= 50) return "text-orange-500 bg-orange-950/50 border-orange-800"
    return "text-yellow-500 bg-yellow-950/50 border-yellow-800"
  }

  return (
    <Card className="border border-gray-800 bg-gray-900 shadow-lg hover:shadow-red-900/20 transition-all duration-300">
      <CardHeader className="border-b border-gray-800 bg-gray-950 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
            <CardTitle className="text-lg font-bold text-red-500">Anomaly Alerts</CardTitle>
          </div>
          <Badge variant="outline" className="bg-red-950/50 text-red-400 border-red-800">
            {anomalies.length} Detected
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="p-4 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border border-gray-800 rounded-lg p-3">
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
            <div className="bg-green-900/20 p-3 rounded-full mb-3">
              <AlertTriangle className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-green-500 font-medium">No anomalies detected</p>
            <p className="text-xs text-gray-400 mt-1">Your wallet is currently secure</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {anomalies.slice(0, 5).map((anomaly) => (
              <div
                key={anomaly.id}
                className="p-3 hover:bg-gray-800/50 transition-colors duration-150 border-l-4 border-red-500"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="p-2 rounded-full mr-3 bg-red-900/30 text-red-400">
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <Button
                          variant="link"
                          className="p-0 h-auto text-gray-300 hover:text-red-400 font-mono text-sm"
                          onClick={() => window.open(`https://etherscan.io/tx/${anomaly.hash}`, "_blank")}
                        >
                          {`${anomaly.hash.substring(0, 8)}...${anomaly.hash.substring(anomaly.hash.length - 6)}`}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </Button>
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
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-gray-400 hover:text-red-400"
                        onClick={() => setSelectedAnomaly(anomaly)}
                      >
                        <Info className="h-3 w-3 mr-1" />
                        Explain
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 border border-gray-800">
                      <DialogHeader>
                        <DialogTitle className="text-red-400 flex items-center">
                          <AlertTriangle className="h-5 w-5 mr-2" />
                          Anomaly Explanation
                        </DialogTitle>
                      </DialogHeader>
                      {selectedAnomaly && (
                        <div className="mt-4 space-y-4">
                          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
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
                            <div className="bg-red-950/20 p-4 rounded-lg border border-red-900/50 text-sm text-gray-300">
                              <p>{selectedAnomaly.reason}</p>
                            </div>
                          </div>

                          <div className="flex justify-end">
                            <Button
                              variant="outline"
                              className="border-red-800 text-red-400 hover:bg-red-900/30"
                              onClick={() => window.open(`https://etherscan.io/tx/${selectedAnomaly.hash}`, "_blank")}
                            >
                              Verify on Blockchain
                              <ExternalLink className="h-4 w-4 ml-2" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}

            {anomalies.length > 5 && (
              <div className="p-3 flex justify-center">
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-red-400"
                >
                  View All Anomalies ({anomalies.length})
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
