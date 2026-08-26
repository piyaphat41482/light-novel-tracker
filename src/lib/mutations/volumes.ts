// ฟังก์ชันสำหรับแก้ไขข้อมูล volumes ใน Supabase
// แยกจาก queries/series.ts เพราะนี่คือฝั่ง "เขียน" ข้อมูล ไม่ใช่ "อ่าน"

import { supabase } from '@/lib/supabase'

// สลับสถานะ is_owned ของเล่มหนึ่งเล่ม
export async function toggleVolumeOwned(
  volumeId: string,
  newValue: boolean
): Promise<void> {
  const { error } = await supabase
    .from('volumes')
    .update({ is_owned: newValue })
    .eq('id', volumeId)

  if (error) throw new Error(error.message)
}