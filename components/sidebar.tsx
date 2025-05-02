"use client"

import { useState } from "react"
import { Shield, Menu, X, Home, AlertTriangle, Settings, HelpCircle, Wallet, Lock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
  walletAddress: string
}

export function Sidebar({ isOpen, toggleSidebar, walletAddress }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("dashboard")

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "anomalies", label: "Anomalies", icon: AlertTriangle },
    { id: "wallet", label: "Wallet", icon: Wallet },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "help", label: "Help & Support", icon: HelpCircle },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={toggleSidebar} />}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-950 border-r border-gray-800 z-50 transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <div className="flex items-center">
              <Shield className="h-6 w-6 mr-2 text-emerald-400" />
              <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-purple-500">
                Wallet Guardian
              </h1>
            </div>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
              <X className="h-5 w-5 text-gray-400" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-1 px-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.id}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start text-left ${
                        activeItem === item.id
                          ? "bg-gray-800 text-emerald-400"
                          : "text-gray-400 hover:text-gray-100 hover:bg-gray-800/50"
                      }`}
                      onClick={() => setActiveItem(item.id)}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {item.label}
                      {item.id === "anomalies" && (
                        <span className="ml-auto bg-red-900/50 text-red-400 text-xs px-2 py-1 rounded-full">3</span>
                      )}
                    </Button>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-800">
            <div className="bg-gray-900 rounded-lg p-3 border border-gray-800">
              <div className="flex items-center mb-2">
                <Lock className="h-4 w-4 mr-2 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-400">Quantum-Safe</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-5 w-5 ml-auto">
                        <HelpCircle className="h-3 w-3 text-gray-500" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Protected by quantum-resistant encryption</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-emerald-400 text-xs"
              >
                <Wallet className="h-3 w-3 mr-2" />
                Connect Wallet
                <ChevronRight className="h-3 w-3 ml-auto" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile toggle button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 z-40 md:hidden bg-gray-900 border-gray-700 shadow-lg"
        onClick={toggleSidebar}
      >
        <Menu className="h-5 w-5 text-emerald-400" />
      </Button>
    </>
  )
}
