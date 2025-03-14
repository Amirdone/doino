"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // جلوگیری از مشکل Hydration در Next.js
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // جلوگیری از رندر در سمت سرور

  // بررسی حالت سیستم و انتخاب تم مناسب
  const currentTheme = theme === "system" ? systemTheme : theme

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
    >
      {currentTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}