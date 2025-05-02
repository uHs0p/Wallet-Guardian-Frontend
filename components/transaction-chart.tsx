"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { ChartContainer, ChartTooltip, ChartTooltipContent, Line, LineChart, XAxis, YAxis } from "@/components/ui/chart"

interface Transaction {
  hash: string
  from: string
  to: string
  value: string
  timestamp: number
  gasFee: string
}

interface TransactionChartProps {
  transactions: Transaction[]
  isLoading: boolean
}

export function TransactionChart({ transactions, isLoading }: TransactionChartProps) {
  const [chartType, setChartType] = useState<"value" | "gas">("value")

  const prepareChartData = () => {
    if (!transactions.length) return []

    // Sort transactions by timestamp
    const sortedTransactions = [...transactions].sort((a, b) => a.timestamp - b.timestamp)

    return sortedTransactions.map((tx) => ({
      timestamp: tx.timestamp,
      value: Number.parseFloat(tx.value),
      gasFee: Number.parseFloat(tx.gasFee),
      hash: tx.hash.substring(0, 8) + "...",
      from: tx.from.substring(0, 6) + "..." + tx.from.substring(tx.from.length - 4),
      to: tx.to.substring(0, 6) + "..." + tx.to.substring(tx.to.length - 4),
    }))
  }

  const chartData = prepareChartData()

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatValue = (value: number) => {
    return chartType === "value" ? `${value.toFixed(4)} ETH` : `${value.toFixed(6)} ETH`
  }

  const getChartColor = () => {
    return chartType === "value" ? "#10b981" : "#8b5cf6"
  }

  return (
    <div>
      <Tabs defaultValue="value" className="w-full" onValueChange={(value) => setChartType(value as "value" | "gas")}>
        <div className="flex justify-between items-center mb-4">
          <TabsList className="bg-gray-800 border border-gray-700">
            <TabsTrigger
              value="value"
              className="data-[state=active]:bg-emerald-900/30 data-[state=active]:text-emerald-400"
            >
              Transaction Value
            </TabsTrigger>
            <TabsTrigger
              value="gas"
              className="data-[state=active]:bg-purple-900/30 data-[state=active]:text-purple-400"
            >
              Gas Fees
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="value" className="mt-0">
          {renderChart("value")}
        </TabsContent>

        <TabsContent value="gas" className="mt-0">
          {renderChart("gas")}
        </TabsContent>
      </Tabs>
    </div>
  )

  function renderChart(type: "value" | "gas") {
    if (isLoading) {
      return <Skeleton className="h-[300px] w-full" />
    }

    if (chartData.length === 0) {
      return (
        <div className="h-[300px] flex items-center justify-center text-gray-500 border border-gray-800 rounded-lg">
          No transaction data available
        </div>
      )
    }

    return (
      <div className="h-[300px] w-full">
        <ChartContainer>
          <LineChart data={chartData}>
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatDate}
              stroke="#4b5563"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <YAxis
              dataKey={type === "value" ? "value" : "gasFee"}
              tickFormatter={formatValue}
              stroke="#4b5563"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="bg-gray-900 border border-gray-800 shadow-lg"
                  labelClassName="text-gray-400"
                  valueClassName={type === "value" ? "text-emerald-400" : "text-purple-400"}
                  labelFormatter={(label) => new Date(label).toLocaleString()}
                  formatter={(value) => formatValue(Number(value))}
                />
              }
            />
            <Line
              type="monotone"
              dataKey={type === "value" ? "value" : "gasFee"}
              stroke={getChartColor()}
              strokeWidth={2}
              dot={{ fill: getChartColor(), r: 4 }}
              activeDot={{ r: 6, fill: getChartColor() }}
            />
          </LineChart>
        </ChartContainer>
      </div>
    )
  }
}
