// ฟังก์ชันเพิ่ม/แก้ไข/ลบ wishlist item

import { supabase } from '@/lib/supabase'
import type { WishlistFormValues } from '@/lib/validation/wishlistSchema'

function preparePayload(values: WishlistFormValues) {
  return {
    title: values.title,
    media_type: values.media_type,
    priority: values.priority,
    estimated_price: values.estimated_price || null,
    preferred_store: values.preferred_store || null,
    reminder_date: values.reminder_date || null,
    notes: values.notes || null,
  }
}

export async function createWishlistItem(
  values: WishlistFormValues
): Promise<void> {
  const { error } = await supabase
    .from('wishlist_items')
    .insert(preparePayload(values))
  if (error) throw new Error(error.message)
}

export async function updateWishlistItem(
  id: string,
  values: WishlistFormValues
): Promise<void> {
  const { error } = await supabase
    .from('wishlist_items')
    .update(preparePayload(values))
    .eq('id', id)
  if (error) throw new Error(error.message)
}

export async function deleteWishlistItem(id: string): Promise<void> {
  const { error } = await supabase.from('wishlist_items').delete().eq('id', id)
  if (error) throw new Error(error.message)
}