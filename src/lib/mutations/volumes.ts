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
// ลบเล่มเดียวทิ้ง
export async function deleteVolume(volumeId: string): Promise<void> {
  const { error } = await supabase.from('volumes').delete().eq('id', volumeId)
  if (error) throw new Error(error.message)
}

// เพิ่มเล่มเดียวด้วยมือ (ใช้กับเล่มพิเศษ เช่น "เล่ม 0" หรือฉบับพิเศษที่ไม่ได้อยู่ในลำดับปกติ)
export async function addVolume(params: {
  seriesId: string
  volumeNumber: string
  isSpecialEdition: boolean
}): Promise<void> {
  const { error } = await supabase.from('volumes').insert({
    series_id: params.seriesId,
    volume_number: params.volumeNumber,
    is_special_edition: params.isSpecialEdition,
    is_owned: false,
  })
  if (error) throw new Error(error.message)
}