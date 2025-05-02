"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

// Define available routes
export type RouteType = "dashboard" | "anomalies" | "wallet" | "settings"

// Create a context for route management
interface RouteContextType {
  currentRoute: RouteType
  setCurrentRoute: (route: RouteType) => void
}

export const RouteContext = createContext<RouteContextType>({
  currentRoute: "dashboard",
  setCurrentRoute: () => {},
})

// Custom hook for using routes
export function useRoutes() {
  const context = useContext(RouteContext)
  if (!context) {
    throw new Error("useRoutes must be used within a RouteProvider")
  }
  return context
}

// Route provider component
export function RouteProvider({ children }: { children: React.ReactNode }) {
  const [currentRoute, setCurrentRoute] = useState<RouteType>("dashboard")

  return <RouteContext.Provider value={{ currentRoute, setCurrentRoute }}>{children}</RouteContext.Provider>
}
