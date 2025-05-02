"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, X } from "lucide-react"

interface SearchBarProps {
  onSearch: (term: string) => void
  placeholder?: string
  onCursorEnter: (variant: string, text?: string) => void
  onCursorLeave: () => void
}

export function SearchBar({ onSearch, placeholder = "Search...", onCursorEnter, onCursorLeave }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  const handleClear = () => {
    setSearchTerm("")
    onSearch("")
  }

  return (
    <motion.div
      className={`relative rounded-lg border ${
        isFocused ? "border-[#00FFB2]/50 bg-[#0A1A2F]/50" : "border-[#0A1A2F] bg-[#0A1A2F]/30"
      } backdrop-blur-md transition-all duration-300`}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center px-4 py-3">
        <Search
          className={`h-5 w-5 mr-2 ${isFocused ? "text-[#00FFB2]" : "text-[#8B9CAF]"} transition-colors duration-300`}
        />
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none outline-none text-white placeholder-[#8B9CAF]"
          onFocus={() => {
            setIsFocused(true)
            onCursorEnter("hover", "Type")
          }}
          onBlur={() => {
            setIsFocused(false)
            onCursorLeave()
          }}
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="text-[#8B9CAF] hover:text-white transition-colors"
            onMouseEnter={() => onCursorEnter("button", "Clear")}
            onMouseLeave={onCursorLeave}
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {isFocused && (
        <motion.div
          className="absolute -inset-px rounded-lg pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 rounded-lg border border-[#00FFB2]/50 opacity-50" />
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00FFB2] to-[#0074F0]" />
        </motion.div>
      )}
    </motion.div>
  )
}
