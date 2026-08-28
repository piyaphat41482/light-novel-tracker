// ฟังก์ชันดึงข้อมูล wishlist จาก Supabase - ตอนนี้เป็นข้อมูลอิสระ ไม่ต้อง join กับ series แล้ว

import { supabase } from '@/lib/supabase'
import type { WishlistItem } from '@/types/database'

export async function fetchWishlist(): Promise<WishlistItem[]> {
  const { data, error } = await supabase
    .from('wishlist_items')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function fetchWishlistItemById(
  id: string
): Promise<WishlistItem | null> {
  const { data, error } = await supabase
    .from('wishlist_items')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) throw new Error(error.message)
  return data
}