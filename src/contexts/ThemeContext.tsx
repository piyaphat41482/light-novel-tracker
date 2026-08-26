// Context สำหรับจัดการธีม (dark/light) ทั่วทั้งแอป
// เก็บค่าไว้ใน localStorage ด้วย เพื่อให้จำการตั้งค่าไว้แม้ปิดเบราว์เซอร์ไปแล้ว

import { createContext, useEffect, useState, type ReactNode } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

// สร้าง context เปล่าๆ ไว้ก่อน ค่าเริ่มต้นเป็น undefined
// (บังคับให้ต้องใช้ผ่าน Provider เท่านั้น ป้องกันการเรียกใช้ผิดที่)
export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
)

const STORAGE_KEY = 'light-novel-tracker-theme'

function getInitialTheme(): Theme {
  // เช็คว่าเคยตั้งค่าไว้ใน localStorage หรือยัง
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'dark' || stored === 'light') return stored

  // ถ้าไม่เคยตั้ง ใช้ dark เป็นค่าเริ่มต้น ตามที่ requirement ระบุไว้ (Dark mode by default)
  return 'dark'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  // ทุกครั้งที่ theme เปลี่ยน: บันทึกลง localStorage + ใส่/เอา class "dark" ออกจาก <html>
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme)

    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  function toggleTheme() {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}