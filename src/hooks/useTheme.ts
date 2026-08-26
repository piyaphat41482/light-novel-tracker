// custom hook สำหรับเรียกใช้ ThemeContext ได้ง่ายๆ
// แทนที่จะต้อง import useContext + ThemeContext ทุกที่ที่ต้องใช้ธีม

import { useContext } from 'react'
import { ThemeContext } from '@/contexts/ThemeContext'

export function useTheme() {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error('useTheme ต้องถูกเรียกใช้ภายใน <ThemeProvider> เท่านั้น')
  }

  return context
}