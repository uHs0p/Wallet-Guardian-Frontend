"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

interface TransactionVisualizerProps {
  transactions: any[]
  isLoading: boolean
  onCursorEnter: (variant: string, text?: string) => void
  onCursorLeave: () => void
  playSound: (sound: string) => void
}

export function TransactionVisualizer({
  transactions,
  isLoading,
  onCursorEnter,
  onCursorLeave,
  playSound,
}: TransactionVisualizerProps) {
  const [activeTab, setActiveTab] = useState("value")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; data: any } | null>(null)

  useEffect(() => {
    if (isLoading || !transactions.length || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Sort transactions by timestamp
    const sortedTransactions = [...transactions].sort((a, b) => a.timestamp - b.timestamp)

    // Extract values based on active tab
    const values = sortedTransactions.map((tx) =>
      activeTab === "value" ? Number.parseFloat(tx.value) : Number.parseFloat(tx.gasFee),
    )

    const timestamps = sortedTransactions.map((tx) => tx.timestamp)

    // Find min and max for scaling
    const minValue = Math.min(...values)
    const maxValue = Math.max(...values)
    const minTime = Math.min(...timestamps)
    const maxTime = Math.max(...timestamps)

    // Padding
    const padding = 40
    const graphWidth = canvas.width - padding * 2
    const graphHeight = canvas.height - padding * 2

    // Draw axes
    ctx.strokeStyle = "#4b5563"
    ctx.lineWidth = 1

    // X-axis
    ctx.beginPath()
    ctx.moveTo(padding, canvas.height - padding)
    ctx.lineTo(canvas.width - padding, canvas.height - padding)
    ctx.stroke()

    // Y-axis
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, canvas.height - padding)
    ctx.stroke()

    // Draw grid lines
    ctx.strokeStyle = "#374151"
    ctx.lineWidth = 0.5

    // Horizontal grid lines
    for (let i = 1; i < 5; i++) {
      const y = padding + (graphHeight / 5) * i
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(canvas.width - padding, y)
      ctx.stroke()

      // Y-axis labels
      const labelValue = maxValue - ((maxValue - minValue) / 5) * i
      ctx.fillStyle = "#9ca3af"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "right"
      ctx.fillText(
        activeTab === "value" ? labelValue.toFixed(2) + " ETH" : labelValue.toFixed(6) + " ETH",
        padding - 5,
        y + 3,
      )
    }

    // Vertical grid lines
    for (let i = 1; i < 5; i++) {
      const x = padding + (graphWidth / 5) * i
      ctx.beginPath()
      ctx.moveTo(x, padding)
      ctx.lineTo(x, canvas.height - padding)
      ctx.stroke()

      // X-axis labels (time)
      const labelTime = new Date(minTime + ((maxTime - minTime) / 5) * i)
      ctx.fillStyle = "#9ca3af"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(
        labelTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        x,
        canvas.height - padding + 15,
      )
    }

    // Store points for hover detection
    const points: { x: number; y: number; data: any }[] = []

    // Draw data points and line
    if (values.length > 1) {
      ctx.strokeStyle = activeTab === "value" ? "#10b981" : "#8b5cf6"
      ctx.lineWidth = 2
      ctx.beginPath()

      for (let i = 0; i < sortedTransactions.length; i++) {
        const tx = sortedTransactions[i]
        const value = activeTab === "value" ? Number.parseFloat(tx.value) : Number.parseFloat(tx.gasFee)

        // Scale to canvas
        const x = padding + ((tx.timestamp - minTime) / (maxTime - minTime)) * graphWidth
        const y = canvas.height - padding - ((value - minValue) / (maxValue - minValue)) * graphHeight

        // Store point for hover detection
        points.push({ x, y, data: tx })

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.stroke()

      // Draw points
      for (const point of points) {
        ctx.fillStyle = activeTab === "value" ? "#10b981" : "#8b5cf6"
        ctx.beginPath()
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Add hover detection
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      // Find closest point
      let closestPoint = null
      let closestDistance = Number.POSITIVE_INFINITY

      for (const point of points) {
        const distance = Math.sqrt(Math.pow(mouseX - point.x, 2) + Math.pow(mouseY - point.y, 2))
        if (distance < 20 && distance < closestDistance) {
          closestDistance = distance
          closestPoint = point
        }
      }

      if (closestPoint) {
        setHoveredPoint(closestPoint)
        canvas.style.cursor = "pointer"
      } else {
        setHoveredPoint(null)
        canvas.style.cursor = "default"
      }
    }

    canvas.addEventListener("mousemove", handleMouseMove)

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
    }
  }, [transactions, isLoading, activeTab])

  const formatValue = (value: number) => {
    return activeTab === "value" ? `${value.toFixed(4)} ETH` : `${value.toFixed(6)} ETH`
  }

  return (
    <div className="h-[300px]">
      <Tabs defaultValue="value" className="w-full" onValueChange={(value) => setActiveTab(value)}>
        <div className="flex justify-between items-center mb-4">
          <TabsList className="bg-white/5 border border-white/10">
            <TabsTrigger
              value="value"
              className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
              onMouseEnter={() => onCursorEnter("tab", "Value")}
              onMouseLeave={onCursorLeave}
            >
              Transaction Value
            </TabsTrigger>
            <TabsTrigger
              value="gas"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
              onMouseEnter={() => onCursorEnter("tab", "Gas")}
              onMouseLeave={onCursorLeave}
            >
              Gas Fees
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="value" className="mt-0 h-full">
          {renderChart()}
        </TabsContent>

        <TabsContent value="gas" className="mt-0 h-full">
          {renderChart()}
        </TabsContent>
      </Tabs>

      {/* Tooltip for hovered point */}
      {hoveredPoint && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bg-gray-900/90 backdrop-blur-sm border border-white/10 p-2 rounded-lg shadow-lg text-xs z-10"
          style={{
            left: `${hoveredPoint.x + 10}px`,
            top: `${hoveredPoint.y - 70}px`,
            transform: "translateX(-50%)",
          }}
        >
          <div className="font-medium text-gray-300">{new Date(hoveredPoint.data.timestamp).toLocaleString()}</div>
          <div className={activeTab === "value" ? "text-emerald-400" : "text-purple-400"}>
            {activeTab === "value"
              ? `${Number.parseFloat(hoveredPoint.data.value).toFixed(4)} ETH`
              : `${Number.parseFloat(hoveredPoint.data.gasFee).toFixed(6)} ETH`}
          </div>
          <div className="text-gray-400 font-mono">{hoveredPoint.data.hash.substring(0, 8)}...</div>
        </motion.div>
      )}
    </div>
  )

  function renderChart() {
    if (isLoading && !transactions.length) {
      return <Skeleton className="h-[220px] w-full" />
    }

    if (!transactions.length) {
      return (
        <div className="h-[220px] flex items-center justify-center text-gray-500 border border-white/10 rounded-lg">
          No transaction data available
        </div>
      )
    }

    return (
      <div className="relative h-[220px]">
        <canvas
          ref={canvasRef}
          width={800}
          height={220}
          className="w-full h-full"
          onMouseEnter={() => onCursorEnter("chart", "")}
          onMouseLeave={() => {
            onCursorLeave()
            setHoveredPoint(null)
          }}
        />
      </div>
    )
  }
}
