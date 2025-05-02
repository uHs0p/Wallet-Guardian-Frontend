"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Shield, Lock, Sparkles, Activity, Wallet, AlertTriangle } from "lucide-react"

export function FloatingIcons() {
  const [icons, setIcons] = useState<any[]>([])

  useEffect(() => {
    // Generate random icons
    const iconComponents = [Shield, Lock, Sparkles, Activity, Wallet, AlertTriangle]
    const colors = ["emerald", "purple", "blue", "amber", "red"]

    const generatedIcons = Array.from({ length: 15 }, (_, i) => {
      const IconComponent = iconComponents[Math.floor(Math.random() * iconComponents.length)]
      const color = colors[Math.floor(Math.random() * colors.length)]

      return {
        id: i,
        icon: IconComponent,
        color,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      }
    })

    setIcons(generatedIcons)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((item) => {
        const Icon = item.icon

        return (
          <motion.div
            key={item.id}
            className="absolute"
            initial={{
              x: `${item.x}%`,
              y: `${item.y}%`,
              opacity: 0,
            }}
            animate={{
              y: [`${item.y}%`, `${item.y - 20}%`, `${item.y}%`],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            <div className={`text-${item.color}-400 opacity-20`}>
              <Icon size={item.size} />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
