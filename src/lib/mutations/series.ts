// ฟังก์ชันสำหรับเพิ่ม/แก้ไขข้อมูล series ใน Supabase

import { supabase } from '@/lib/supabase'
import type { SeriesFormValues } from '@/lib/validation/seriesSchema'

// แปลงค่าจากฟอร์ม (ที่อาจมี string ว่าง) ให้เป็นรูปแบบที่ฐานข้อมูลต้องการ (null แทน string ว่าง)
function prepareSeriesPayload(values: SeriesFormValues) {
  return {
    title_original: values.title_original || null,
    title_english: values.title_english || null,
    title_thai: values.title_thai || null,
    media_type: values.media_type,
    publication_status: values.publication_status,
    reading_status: values.reading_status,
    latest_volume: values.latest_volume || null,
    synopsis: values.synopsis || null,
    cover_image_url: values.cover_image_url || null,
    storage_location: values.storage_location || null,
    notes: values.notes || null,
    is_favorite: values.is_favorite,
    is_wishlist: values.is_wishlist,
  }
}

// สร้างซีรีส์ใหม่ พร้อมสร้างเล่ม 1 ถึง latest_volume ให้อัตโนมัติ (ทั้งหมดเป็น "ยังไม่มี")
export async function createSeries(values: SeriesFormValues): Promise<string> {
  const payload = prepareSeriesPayload(values)

  const { data: newSeries, error: seriesError } = await supabase
    .from('series')
    .insert(payload)
    .select('id')
    .single()

  if (seriesError) throw new Error(seriesError.message)

  // ถ้ากรอกจำนวนเล่มไว้ ให้สร้างเล่ม 1..N อัตโนมัติ
  if (values.latest_volume && values.latest_volume > 0) {
    const volumesToInsert = Array.from(
      { length: values.latest_volume },
      (_, i) => ({
        series_id: newSeries.id,
        volume_number: String(i + 1),
        is_owned: false,
      })
    )

    const { error: volumesError } = await supabase
      .from('volumes')
      .insert(volumesToInsert)

    if (volumesError) throw new Error(volumesError.message)
  }

  return newSeries.id
}

// แก้ไขซีรีส์ที่มีอยู่แล้ว (ไม่แตะต้อง volumes เดิม)
export async function updateSeries(
  id: string,
  values: SeriesFormValues
): Promise<void> {
  const payload = prepareSeriesPayload(values)

  const { error } = await supabase.from('series').update(payload).eq('id', id)

  if (error) throw new Error(error.message)
}