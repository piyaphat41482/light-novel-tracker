// ฟังก์ชันดึงข้อมูล wishlist จาก Supabase พร้อม join ข้อมูล series ที่เกี่ยวข้อง

import { supabase } from '@/lib/supabase'
import type { WishlistItem } from '@/types/database'

export async function fetchWishlist(): Promise<WishlistItem[]> {
  const { data, error } = await supabase
    .from('wishlist_items')
    .select(`
      *,
      series:series(
        id, title_original, title_english, title_thai,
        media_type, cover_image_url,
        publisher:publishers(id, name)
      )
    `)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)

  return (data ?? []) as unknown as WishlistItem[]
}