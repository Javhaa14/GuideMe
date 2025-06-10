"use client"

import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import EnhancedChatBot from "./enhanced-chatbot"

export default function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleMinimize = () => {
    // Keep the chat open but minimized
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-xl hover:shadow-2xl transition-all hover:scale-110 animate-pulse z-50"
          onClick={handleToggle}
        >
          <MessageCircle className="w-7 h-7" />
        </Button>
      )}

      {/* Enhanced Chatbot */}
      <EnhancedChatBot isOpen={isOpen} onClose={handleClose} onMinimize={handleMinimize} />
    </>
  )
}
