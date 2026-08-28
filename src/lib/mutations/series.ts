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
// หาสำนักพิมพ์ที่มีชื่อตรงกัน ถ้าไม่มีให้สร้างใหม่ คืนค่า id กลับมา
async function findOrCreatePublisher(name: string): Promise<string> {
  const trimmed = name.trim()

  const { data: existing } = await supabase
    .from('publishers')
    .select('id')
    .eq('name', trimmed)
    .maybeSingle()

  if (existing) return existing.id

  const { data: created, error } = await supabase
    .from('publishers')
    .insert({ name: trimmed })
    .select('id')
    .single()

  if (error) throw new Error(error.message)
  return created.id
}

// หาผู้แต่งที่มีชื่อตรงกัน ถ้าไม่มีให้สร้างใหม่ คืนค่า id กลับมา
async function findOrCreateAuthor(name: string): Promise<string> {
  const trimmed = name.trim()

  const { data: existing } = await supabase
    .from('authors')
    .select('id')
    .eq('name', trimmed)
    .maybeSingle()

  if (existing) return existing.id

  const { data: created, error } = await supabase
    .from('authors')
    .insert({ name: trimmed })
    .select('id')
    .single()

  if (error) throw new Error(error.message)
  return created.id
}

// อัปเดตความสัมพันธ์ series ↔ authors ทั้งหมด
// ลบของเดิมทิ้งก่อนแล้วสร้างใหม่ทั้งชุด (ง่ายและปลอดภัยกว่าคำนวณว่าอันไหนเพิ่ม/ลบ)
async function syncSeriesAuthors(
  seriesId: string,
  authorNames: string[]
): Promise<void> {
  const { error: deleteError } = await supabase
    .from('series_authors')
    .delete()
    .eq('series_id', seriesId)
  if (deleteError) throw new Error(deleteError.message)

  if (authorNames.length === 0) return

  const authorIds = await Promise.all(authorNames.map(findOrCreateAuthor))
  const rows = authorIds.map((authorId) => ({
    series_id: seriesId,
    author_id: authorId,
  }))

  const { error: insertError } = await supabase
    .from('series_authors')
    .insert(rows)
  if (insertError) throw new Error(insertError.message)
}
// สร้างซีรีส์ใหม่ พร้อมสร้างเล่ม 1 ถึง latest_volume ให้อัตโนมัติ (ทั้งหมดเป็น "ยังไม่มี")
export async function createSeries(values: SeriesFormValues): Promise<string> {
  // หาหรือสร้างสำนักพิมพ์ก่อน (ถ้ามีการกรอก)
  let publisherId: string | null = null
  if (values.publisher_name && values.publisher_name.trim()) {
    publisherId = await findOrCreatePublisher(values.publisher_name)
  }

  const payload = {
    ...prepareSeriesPayload(values),
    publisher_id: publisherId,
  }

  const { data: newSeries, error: seriesError } = await supabase
    .from('series')
    .insert(payload)
    .select('id')
    .single()

  if (seriesError) throw new Error(seriesError.message)

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

  // เชื่อมผู้แต่ง (ถ้ามีการกรอก)
  if (values.author_names && values.author_names.trim()) {
    const names = values.author_names
      .split(',')
      .map((n) => n.trim())
      .filter(Boolean)
    if (names.length > 0) {
      await syncSeriesAuthors(newSeries.id, names)
    }
  }

  return newSeries.id
}

// แก้ไขซีรีส์ที่มีอยู่แล้ว (ไม่แตะต้อง volumes เดิม)
export async function updateSeries(
  id: string,
  values: SeriesFormValues
): Promise<void> {
  let publisherId: string | null = null
  if (values.publisher_name && values.publisher_name.trim()) {
    publisherId = await findOrCreatePublisher(values.publisher_name)
  }

  const payload = {
    ...prepareSeriesPayload(values),
    publisher_id: publisherId,
  }

  const { error } = await supabase.from('series').update(payload).eq('id', id)
  if (error) throw new Error(error.message)

  const names = (values.author_names ?? '')
    .split(',')
    .map((n) => n.trim())
    .filter(Boolean)
  await syncSeriesAuthors(id, names)
}

// เช็คว่าถ้าปรับ latest_volume ใหม่ ต้องสร้างเล่มเพิ่มไหม
// คืนค่าจำนวนเล่มที่ "จะถูกสร้างเพิ่ม" (0 ถ้าไม่ต้องทำอะไร)
// เช็คว่าถ้าปรับ latest_volume ใหม่ ต้องสร้างเล่มเพิ่มหรือลบเล่มส่วนเกินไหม
// กฎ: เพิ่มเล่มใหม่ได้เสมอ / ลบได้เฉพาะเล่มส่วนเกินที่ยังไม่เคย mark ว่า owned เท่านั้น (ปลอดภัย ไม่เสียข้อมูล)
export async function syncVolumesWithLatestVolume(
  seriesId: string,
  newLatestVolume: number
): Promise<{ added: number; removed: number; keptOwned: number }> {
  const { data: existingVolumes, error: fetchError } = await supabase
    .from('volumes')
    .select('id, volume_number, is_owned')
    .eq('series_id', seriesId)
    .eq('is_special_edition', false)

  if (fetchError) throw new Error(fetchError.message)

  const volumes = existingVolumes ?? []
  const existingNumbers = new Set(volumes.map((v) => Number(v.volume_number)))
  const currentMax = existingNumbers.size > 0 ? Math.max(...existingNumbers) : 0

  let added = 0
  let removed = 0
  let keptOwned = 0

  // กรณีเพิ่มจำนวน: สร้างเล่มใหม่ที่ยังไม่มี
  if (newLatestVolume > currentMax) {
    const volumesToAdd = []
    for (let i = currentMax + 1; i <= newLatestVolume; i++) {
      if (!existingNumbers.has(i)) {
        volumesToAdd.push({
          series_id: seriesId,
          volume_number: String(i),
          is_owned: false,
        })
      }
    }
    if (volumesToAdd.length > 0) {
      const { error: insertError } = await supabase
        .from('volumes')
        .insert(volumesToAdd)
      if (insertError) throw new Error(insertError.message)
      added = volumesToAdd.length
    }
  }

  // กรณีลดจำนวน: หาเล่มที่เลขเกิน newLatestVolume มา แล้วแยกว่าลบได้ไหม
  if (newLatestVolume < currentMax) {
    const excessVolumes = volumes.filter(
      (v) => Number(v.volume_number) > newLatestVolume
    )

    const safeToDelete = excessVolumes.filter((v) => !v.is_owned)
    const mustKeep = excessVolumes.filter((v) => v.is_owned)

    if (safeToDelete.length > 0) {
      const { error: deleteError } = await supabase
        .from('volumes')
        .delete()
        .in(
          'id',
          safeToDelete.map((v) => v.id)
        )
      if (deleteError) throw new Error(deleteError.message)
      removed = safeToDelete.length
    }

    keptOwned = mustKeep.length
  }

  return { added, removed, keptOwned }
}
// ลบซีรีส์ทั้งเรื่อง — cascade delete จะลบ volumes, wishlist_items,
// series_authors ฯลฯ ที่เกี่ยวข้องให้อัตโนมัติ (ตั้งค่าไว้ตั้งแต่ Phase 3)
export async function deleteSeries(id: string): Promise<void> {
  const { error } = await supabase.from('series').delete().eq('id', id)
  if (error) throw new Error(error.message)
}