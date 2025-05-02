"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Shield, Bell, Moon, Sun, Palette, Lock, User, Key, Save, Check, AlertTriangle } from "lucide-react"
import { CryptoCard } from "@/components/ui-elements/crypto-card"
import { NeonButton } from "@/components/ui-elements/neon-button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { DataFlowLines } from "@/components/data-flow-lines"

interface SettingsPageProps {
  onCursorEnter: (variant: string, text?: string) => void
  onCursorLeave: () => void
  playSound: (sound: string) => void
}

export function SettingsPage({ onCursorEnter, onCursorLeave, playSound }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState("security")
  const [darkMode, setDarkMode] = useState(true)
  const [hackerMode, setHackerMode] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [anomalyAlerts, setAnomalyAlerts] = useState(true)
  const [transactionAlerts, setTransactionAlerts] = useState(true)
  const [primaryColor, setPrimaryColor] = useState("#00FFB2")
  const [accentColor, setAccentColor] = useState("#0074F0")
  const [saveSuccess, setSaveSuccess] = useState(false)

  const tabs = [
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "account", label: "Account", icon: User },
  ]

  const handleSave = () => {
    playSound("success")
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-24">
      <motion.div className="absolute top-0 left-0 right-0 h-96 pointer-events-none">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00FFB2] via-[#00D1FF] to-[#0074F0]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Settings
            </motion.h1>
            <motion.p
              className="mt-4 text-xl text-[#8B9CAF] max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Customize your wallet security and experience
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className="mt-20 mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <CryptoCard className="p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    className={`w-full px-4 py-3 rounded-lg flex items-center transition-colors ${
                      activeTab === tab.id
                        ? "bg-[#00FFB2]/10 text-[#00FFB2] border border-[#00FFB2]/30"
                        : "text-[#8B9CAF] hover:text-white hover:bg-[#0A1A2F] border border-transparent"
                    }`}
                    onClick={() => {
                      setActiveTab(tab.id)
                      playSound("click")
                    }}
                    onMouseEnter={() => onCursorEnter("button", tab.label)}
                    onMouseLeave={onCursorLeave}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </CryptoCard>
        </div>

        <div className="md:col-span-3 relative">
          <DataFlowLines />

          {activeTab === "security" && (
            <CryptoCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-[#00FFB2]" />
                  <h2 className="text-xl font-bold">Security Settings</h2>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-[#0A1A2F]/50 p-4 rounded-lg border border-[#0A1A2F]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium mb-1">Quantum-Safe Encryption</h3>
                      <p className="text-sm text-[#8B9CAF]">Enable post-quantum cryptographic protection</p>
                    </div>
                    <Switch
                      checked={true}
                      disabled
                      onCheckedChange={() => {}}
                      className="data-[state=checked]:bg-[#00FFB2]"
                    />
                  </div>
                </div>

                <div className="bg-[#0A1A2F]/50 p-4 rounded-lg border border-[#0A1A2F]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium mb-1">Two-Factor Authentication</h3>
                      <p className="text-sm text-[#8B9CAF]">Require 2FA for all transactions</p>
                    </div>
                    <Switch
                      checked={true}
                      onCheckedChange={(checked) => {
                        playSound(checked ? "success" : "click")
                      }}
                      className="data-[state=checked]:bg-[#00FFB2]"
                    />
                  </div>
                </div>

                <div className="bg-[#0A1A2F]/50 p-4 rounded-lg border border-[#0A1A2F]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium mb-1">Transaction Limits</h3>
                      <p className="text-sm text-[#8B9CAF]">Set maximum transaction amount</p>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="number"
                        className="w-24 bg-[#050B14] border border-[#0A1A2F] rounded-md px-2 py-1 text-right mr-2"
                        defaultValue="5.0"
                        onMouseEnter={() => onCursorEnter("hover", "Edit")}
                        onMouseLeave={onCursorLeave}
                      />
                      <span>ETH</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0A1A2F]/50 p-4 rounded-lg border border-[#0A1A2F]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium mb-1">Whitelist Addresses</h3>
                      <p className="text-sm text-[#8B9CAF]">Only allow transactions to approved addresses</p>
                    </div>
                    <Switch
                      checked={false}
                      onCheckedChange={(checked) => {
                        playSound(checked ? "success" : "click")
                      }}
                      className="data-[state=checked]:bg-[#00FFB2]"
                    />
                  </div>
                </div>

                <div className="bg-[#0A1A2F]/50 p-4 rounded-lg border border-[#0A1A2F]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium mb-1">Auto-Lock Timeout</h3>
                      <p className="text-sm text-[#8B9CAF]">Automatically lock wallet after inactivity</p>
                    </div>
                    <div className="flex items-center">
                      <select
                        className="bg-[#050B14] border border-[#0A1A2F] rounded-md px-2 py-1"
                        defaultValue="15"
                        onMouseEnter={() => onCursorEnter("hover", "Select")}
                        onMouseLeave={onCursorLeave}
                      >
                        <option value="5">5 minutes</option>
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <NeonButton
                    onClick={handleSave}
                    onMouseEnter={() => onCursorEnter("button", "Save")}
                    onMouseLeave={onCursorLeave}
                  >
                    {saveSuccess ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </NeonButton>
                </div>
              </div>
            </CryptoCard>
          )}

          {activeTab === "notifications" && (
            <CryptoCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-[#00FFB2]" />
                  <h2 className="text-xl font-bold">Notification Settings</h2>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-[#0A1A2F]/50 p-4 rounded-lg border border-[#0A1A2F]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium mb-1">Enable Notifications</h3>
                      <p className="text-sm text-[#8B9CAF]">Receive alerts and updates</p>
                    </div>
                    <Switch
                      checked={notificationsEnabled}
                      onCheckedChange={(checked) => {
                        setNotificationsEnabled(checked)
                        playSound(checked ? "success" : "click")
                      }}
                      className="data-[state=checked]:bg-[#00FFB2]"
                    />
                  </div>
                </div>

                <div className="bg-[#0A1A2F]/50 p-4 rounded-lg border border-[#0A1A2F]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium mb-1">Sound Effects</h3>
                      <p className="text-sm text-[#8B9CAF]">Play sounds for notifications and actions</p>
                    </div>
                    <Switch
                      checked={soundEnabled}
                      onCheckedChange={(checked) => {
                        setSoundEnabled(checked)
                        playSound(checked ? "success" : "click")
                      }}
                      className="data-[state=checked]:bg-[#00FFB2]"
                    />
                  </div>
                </div>

                <div className="bg-[#0A1A2F]/50 p-4 rounded-lg border border-[#0A1A2F]">
                  <h3 className="font-medium mb-3">Notification Types</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-[#FF3B3B]" />
                        <Label htmlFor="anomaly-alerts" className="text-sm">
                          Anomaly Alerts
                        </Label>
                      </div>
                      <Switch
                        id="anomaly-alerts"
                        checked={anomalyAlerts}
                        onCheckedChange={(checked) => {
                          setAnomalyAlerts(checked)
                          playSound(checked ? "success" : "click")
                        }}
                        className="data-[state=checked]:bg-[#00FFB2]"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-[#00FFB2]" />
                        <Label htmlFor="transaction-alerts" className="text-sm">
                          Transaction Notifications
                        </Label>
                      </div>
                      <Switch
                        id="transaction-alerts"
                        checked={transactionAlerts}
                        onCheckedChange={(checked) => {
                          setTransactionAlerts(checked)
                          playSound(checked ? "success" : "click")
                        }}
                        className="data-[state=checked]:bg-[#00FFB2]"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Lock className="h-4 w-4 mr-2 text-[#0074F0]" />
                        <Label htmlFor="security-alerts" className="text-sm">
                          Security Updates
                        </Label>
                      </div>
                      <Switch
                        id="security-alerts"
                        checked={true}
                        onCheckedChange={() => {
                          playSound("click")
                        }}
                        className="data-[state=checked]:bg-[#00FFB2]"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-[#0A1A2F]/50 p-4 rounded-lg border border-[#0A1A2F]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium mb-1">Notification Threshold</h3>
                      <p className="text-sm text-[#8B9CAF]">Minimum transaction value to trigger notification</p>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="number"
                        className="w-24 bg-[#050B14] border border-[#0A1A2F] rounded-md px-2 py-1 text-right mr-2"
                        defaultValue="0.1"
                        onMouseEnter={() => onCursorEnter("hover", "Edit")}
                        onMouseLeave={onCursorLeave}
                      />
                      <span>ETH</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <NeonButton
                    onClick={handleSave}
                    onMouseEnter={() => onCursorEnter("button", "Save")}
                    onMouseLeave={onCursorLeave}
                  >
                    {saveSuccess ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </NeonButton>
                </div>
              </div>
            </CryptoCard>
          )}

          {activeTab === "appearance" && (
            <CryptoCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Palette className="h-5 w-5 mr-2 text-[#00FFB2]" />
                  <h2 className="text-xl font-bold">Appearance Settings</h2>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-[#0A1A2F]/50 p-4 rounded-lg border border-[#0A1A2F]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium mb-1">Theme Mode</h3>
                      <p className="text-sm text-[#8B9CAF]">Choose between light and dark mode</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className={`p-2 rounded-md flex items-center justify-center ${
                          !darkMode
                            ? "bg-[#00FFB2]/20 text-[#00FFB2] border border-[#00FFB2]/30"
                            : "bg-[#0A1A2F] text-[#8B9CAF] border border-[#0A1A2F]"
                        }`}
                        onClick={() => {
                          setDarkMode(false)
                          playSound("click")
                        }}
                        onMouseEnter={() => onCursorEnter("button", "Light")}
                        onMouseLeave={onCursorLeave}
                      >
                        <Sun className="h-5 w-5" />
                      </button>
                      <button
                        className={`p-2 rounded-md flex items-center justify-center ${
                          darkMode
                            ? "bg-[#00FFB2]/20 text-[#00FFB2] border border-[#00FFB2]/30"
                            : "bg-[#0A1A2F] text-[#8B9CAF] border border-[#0A1A2F]"
                        }`}
                        onClick={() => {
                          setDarkMode(true)
                          playSound("click")
                        }}
                        onMouseEnter={() => onCursorEnter("button", "Dark")}
                        onMouseLeave={onCursorLeave}
                      >
                        <Moon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0A1A2F]/50 p-4 rounded-lg border border-[#0A1A2F]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium mb-1">Hacker Mode</h3>
                      <p className="text-sm text-[#8B9CAF]">Enable glitch effects and terminal aesthetics</p>
                    </div>
                    <Switch
                      checked={hackerMode}
                      onCheckedChange={(checked) => {
                        setHackerMode(checked)
                        playSound(checked ? "success" : "click")
                      }}
                      className="data-[state=checked]:bg-[#00FFB2]"
                    />
                  </div>
                </div>

                <div className="bg-[#0A1A2F]/50 p-4 rounded-lg border border-[#0A1A2F]">
                  <h3 className="font-medium mb-3">Color Scheme</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="primary-color" className="text-sm block mb-2">
                        Primary Color
                      </Label>
                      <div className="flex items-center">
                        <div
                          className="w-8 h-8 rounded-md mr-2"
                          style={{ backgroundColor: primaryColor }}
                        ></div>
                        <input
                          id="primary-color"
                          type="text"
                          className="flex-1 bg-[#050B14] border border-[#0A1A2F] rounded-md px-2 py-1"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          onMouseEnter={() => onCursorEnter("hover", "Edit")}
                          onMouseLeave={onCursorLeave}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="accent-color" className="text-sm block mb-2">
                        Accent Color
                      </Label>
                      <div className="flex items-center">
                        <div
                          className="w-8 h-8 rounded-md mr-2"
                          style={{ backgroundColor: accentColor }}
                        ></div>
                        <input
                          id="accent-color"
                          type="text"
                          className="flex-1 bg-[#050B14] border border-[#0A1A2F] rounded-md px-2 py-1"
                          value={accentColor}
                          onChange={(e) => setAccentColor(e.target.value)}
                          onMouseEnter={() => onCursorEnter("hover", "Edit")}
                          onMouseLeave={onCursorLeave}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0A1A2F]/50 p-4 rounded-lg border border-[#0A1A2F]">
                  <h3 className="font-medium mb-3">Theme Presets</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { name: "Quantum", primary: "#00FFB2", accent: "#0074F0" },
                      { name: "Neon", primary: "#FF00FF", accent: "#00FFFF" },
                      { name: "Sunset", primary: "#FF5E62", accent: "#FF9966" },
                      { name: "Ocean", primary: "#2E3192", accent: "#1BFFFF" },
                    ].map((theme) => (
                      <button
                        key={theme.name}
                        className="p-2 rounded-md border border-[#0A1A2F] hover:border-[#00FFB2]/30 transition-colors"
                        style={{
                          background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
                        }}
                        onClick={() => {
                          setPrimaryColor(theme.primary)
                          setAccentColor(theme.accent)
                          playSound("click")
                        }}
                        onMouseEnter={() => onCursorEnter("button", theme.name)}
                        onMouseLeave={onCursorLeave}
                      >
                        <span className="block text-center text-xs font-bold text-white py-1 bg-black/30 rounded">
                          {theme.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <NeonButton
                    onClick={handleSave}
                    onMouseEnter={() => onCursorEnter("button", "Save")}
                    onMouseLeave={onCursorLeave}
                  >
                    {saveSuccess ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </NeonButton>
                </div>
              </div>
            </CryptoCard>
          )}

          {activeTab === "account" && (
            <CryptoCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-[#00FFB2]" />
                  <h2 className="text-xl font-bold">Account Settings</h2>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-[#0A1A2F]/50 p-4 rounded-lg border border-[#0A1A2F]">
                  <h3 className="font-medium mb-3">Profile Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="username" className="text-sm block mb-2">
                        Username
                      </Label>
                      <input
                        id="username"
                        type="text"
                        className="w-full bg-[#050B14] border border-[#0A1A2F] rounded-md px-3 py-2"
                        defaultValue="QuantumUser"
                        onMouseEnter={() => onCursorEnter("hover", "Edit")}
                        onMouseLeave={onCursorLeave}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm block mb-2">
                        Email Address
                      </Label>
                      <input
                        id="email"
                        type="email"
                        className="w-full bg-[#050B14] border border-[#0A1A2F] rounded-md px-3 py-2"
                        defaultValue="user@example.com"
                        onMouseEnter={() => onCursorEnter("hover", "Edit")}
                        onMouseLeave={onCursorLeave}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-[#0A1A2F]/50 p-4 rounded-lg border border-[#0A1A2F]">
                  <h3 className="font-medium mb-3">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="current-password" className="text-sm block mb-2">
                        Current Password
                      </Label>
                      <input
                        id="current-password"
                        type="password"
                        className="w-full bg-[#050B14] border border-[#0A1A2F] rounded-md px-3 py-2"
                        placeholder="••••••••••••"
                        onMouseEnter={() => onCursorEnter("hover", "Edit")}
                        onMouseLeave={onCursorLeave}
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-password" className="text-sm block mb-2">
                        New Password
                      </Label>
                      <input
                        id="new-password"
                        type="password"
                        className="w-full bg-[#050B14] border border-[#0A1A2F] rounded-md px-3 py-2"
                        placeholder="••••••••••••"
                        onMouseEnter={() => onCursorEnter("hover", "Edit")}
                        onMouseLeave={onCursorLeave}
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password" className="text-sm block mb-2">
                        Confirm New Password
                      </Label>
                      <input
                        id="confirm-password"
                        type="password"
                        className="w-full bg-[#050B14] border border-[#0A1A2F] rounded-md px-3 py-2"
                        placeholder="••••••••••••"
                        onMouseEnter={() => onCursorEnter("hover", "Edit")}
                        onMouseLeave={onCursorLeave}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-[#0A1A2F]/50 p-4 rounded-lg border border-[#0A1A2F]">
                  <h3 className="font-medium mb-3">Recovery Options</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Key className="h-4 w-4 mr-2 text-[#00FFB2]" />
                        <span className="text-sm">Recovery Phrase</span>
                      </div>
                      <NeonButton
                        size="sm"
                        onClick={() => playSound("click")}
                        onMouseEnter={() => onCursorEnter("button", "View")}
                        onMouseLeave={onCursorLeave}
                      >
                        View Phrase
                      </NeonButton>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-[#00FFB2]" />
                        <span className="text-sm">Backup Wallet</span>
                      </div>
                      <NeonButton
                        size="sm"
                        onClick={() => playSound("click")}
                        onMouseEnter={() => onCursorEnter("button", "Backup")}
                        onMouseLeave={onCursorLeave}
                      >
                        Create Backup
                      </NeonButton>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <NeonButton
                    onClick={handleSave}
                    onMouseEnter={() => onCursorEnter("button", "Save")}
                    onMouseLeave={onCursorLeave}
                  >
                    {saveSuccess ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </NeonButton>
                </div>
              </div>
            </CryptoCard>

Now, let's update the app/page.tsx file to use our new pages:

\
