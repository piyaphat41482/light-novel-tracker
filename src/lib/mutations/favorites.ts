// ฟังก์ชันสลับสถานะ is_favorite ของซีรีส์

import { supabase } from '@/lib/supabase'

export async function toggleFavorite(
  seriesId: string,
  newValue: boolean
): Promise<void> {
  const { error } = await supabase
    .from('series')
    .update({ is_favorite: newValue })
    .eq('id', seriesId)

  if (error) throw new Error(error.message)
}