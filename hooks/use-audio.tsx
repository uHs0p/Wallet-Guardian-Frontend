"use client"

import { useState, useEffect, useCallback } from "react"

type SoundType = "hover" | "click" | "enter" | "error" | "success" | "select" | "alert"

export function useAudio() {
  const [sounds, setSounds] = useState<Record<SoundType, HTMLAudioElement | null>>({
    hover: null,
    click: null,
    enter: null,
    error: null,
    success: null,
    select: null,
    alert: null,
  })

  // Initialize audio elements
  useEffect(() => {
    // Create audio elements for each sound type
    const audioElements: Record<SoundType, HTMLAudioElement> = {
      hover: new Audio("/sounds/hover.mp3"),
      click: new Audio("/sounds/click.mp3"),
      enter: new Audio("/sounds/enter.mp3"),
      error: new Audio("/sounds/error.mp3"),
      success: new Audio("/sounds/success.mp3"),
      select: new Audio("/sounds/select.mp3"),
      alert: new Audio("/sounds/alert.mp3"),
    }

    // Set volume for all sounds
    Object.values(audioElements).forEach((audio) => {
      audio.volume = 0.3
    })

    setSounds(audioElements)

    // Cleanup function
    return () => {
      Object.values(audioElements).forEach((audio) => {
        audio.pause()
        audio.currentTime = 0
      })
    }
  }, [])

  // Function to play a sound
  const playSound = useCallback(
    (type: SoundType) => {
      const sound = sounds[type]
      if (sound) {
        // Reset the audio to the beginning if it's already playing
        sound.currentTime = 0
        sound.play().catch((error) => {
          // Handle autoplay restrictions
          console.log("Audio playback error:", error)
        })
      }
    },
    [sounds],
  )

  return { playSound }
}
