// ฟังก์ชันดึงข้อมูล series จาก Supabase พร้อม join ตารางที่เกี่ยวข้อง
// แทนที่ mockSeries.ts ที่เคยใช้ทดสอบ UI

import { supabase } from '@/lib/supabase'
import type { Series } from '@/types/database'

// select string นี้บอก Supabase ว่า "เอาข้อมูลจากตารางไหนบ้าง มา join กันยังไง"
// เขียนแยกไว้เป็นค่าคงที่ เพราะจะใช้ซ้ำหลายฟังก์ชัน
const SERIES_SELECT = `
  *,
  publisher:publishers(id, name),
  volumes(*),
  authors:series_authors(author:authors(id, name))
`

// ดึง series ทั้งหมด พร้อมข้อมูลที่ join มาด้วย
export async function fetchAllSeries(): Promise<Series[]> {
  const { data, error } = await supabase
    .from('series')
    .select(SERIES_SELECT)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)

  return (data ?? []).map(transformSeriesRow)
}

// ดึง series เรื่องเดียวตาม id
export async function fetchSeriesById(id: string): Promise<Series | null> {
  const { data, error } = await supabase
    .from('series')
    .select(SERIES_SELECT)
    .eq('id', id)
    .maybeSingle()

  if (error) throw new Error(error.message)
  if (!data) return null

  return transformSeriesRow(data)
}

// แปลงรูปร่างข้อมูลดิบจาก Supabase ให้ตรงกับ type Series ที่แอปใช้
// จำเป็นเพราะ authors ที่ join ผ่าน junction table จะได้มาเป็น
// [{ author: { id, name } }, ...] ต้อง "แกะ" ให้เหลือแค่ [{ id, name }, ...]
function transformSeriesRow(row: any): Series {
  return {
    ...row,
    authors: row.authors?.map((a: any) => a.author) ?? [],
  }
}