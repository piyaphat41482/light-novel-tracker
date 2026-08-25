// ไฟล์นี้สร้าง "ตัวเชื่อมต่อ" (client) ไปยัง Supabase
// ทุกไฟล์ในโปรเจกต์ที่ต้องคุยกับฐานข้อมูล จะ import ตัวแปร `supabase` จากที่นี่

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'ไม่พบ Supabase URL หรือ Anon Key กรุณาตรวจสอบไฟล์ .env'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)