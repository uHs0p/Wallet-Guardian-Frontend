"use client"

import { useEffect } from "react"
import { Terminal } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface HackerModeToggleProps {
  enabled: boolean
  onToggle: () => void
}

export function HackerModeToggle({ enabled, onToggle }: HackerModeToggleProps) {
  useEffect(() => {
    // Add or remove the hacker mode styles when enabled/disabled
    const root = document.documentElement

    if (enabled) {
      root.classList.add("hacker-mode")

      // Add glitch animation styles
      const style = document.createElement("style")
      style.id = "hacker-mode-styles"
      style.innerHTML = `
        .hacker-mode * {
          text-shadow: 0 0 5px rgba(16, 185, 129, 0.7);
        }
        
        .hacker-mode .glitch {
          animation: glitch 1s linear infinite;
        }
        
        @keyframes glitch {
          2%, 64% {
            transform: translate(2px, 0) skew(0deg);
          }
          4%, 60% {
            transform: translate(-2px, 0) skew(0deg);
          }
          62% {
            transform: translate(0, 0) skew(5deg);
          }
        }
      `
      document.head.appendChild(style)

      return () => {
        root.classList.remove("hacker-mode")
        const styleElement = document.getElementById("hacker-mode-styles")
        if (styleElement) {
          styleElement.remove()
        }
      }
    } else {
      root.classList.remove("hacker-mode")
      const styleElement = document.getElementById("hacker-mode-styles")
      if (styleElement) {
        styleElement.remove()
      }
    }
  }, [enabled])

  return (
    <div className="flex items-center space-x-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center space-x-2">
              <Switch
                id="hacker-mode"
                checked={enabled}
                onCheckedChange={onToggle}
                className={`${enabled ? "bg-emerald-900" : "bg-gray-700"}`}
              />
              <Label
                htmlFor="hacker-mode"
                className={`text-sm cursor-pointer flex items-center ${enabled ? "text-emerald-400" : "text-gray-400"}`}
              >
                <Terminal className={`h-4 w-4 mr-1 ${enabled ? "text-emerald-400" : "text-gray-400"}`} />
                Hacker Mode
              </Label>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Enable glitch effects for the true hacker experience</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
