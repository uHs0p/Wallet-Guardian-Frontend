"use client"

import { Search, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SearchFiltersProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  timeFilter: string
  setTimeFilter: (filter: string) => void
}

export function SearchFilters({ searchTerm, setSearchTerm, timeFilter, setTimeFilter }: SearchFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          type="text"
          placeholder="Search by hash, address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-gray-900 border-gray-800 text-gray-300 focus:border-emerald-600 focus:ring-emerald-600/20"
        />
      </div>

      <div className="w-full md:w-48">
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="bg-gray-900 border-gray-800 text-gray-300 focus:border-emerald-600 focus:ring-emerald-600/20">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-gray-500" />
              <SelectValue placeholder="Time Range" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-gray-800">
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="hour">Last Hour</SelectItem>
            <SelectItem value="day">Last 24 Hours</SelectItem>
            <SelectItem value="week">Last Week</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
