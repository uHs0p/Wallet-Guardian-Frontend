"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setDarkMode(savedTheme === "dark")
    }
  }, [])

  const toggleTheme = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem("theme", newMode ? "dark" : "light")

    // This is a placeholder - in a real app, you would apply the theme change
    // to the document or through a theme context
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9 border-gray-700 bg-gray-800 hover:bg-gray-700"
          >
            {darkMode ? <Moon className="h-5 w-5 text-purple-400" /> : <Sun className="h-5 w-5 text-yellow-400" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle {darkMode ? "light" : "dark"} mode</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
