// ฟังก์ชันช่วยคำนวณค่าต่างๆ จากข้อมูล series
// แยกออกมาต่างหากเพื่อให้เรียกใช้ซ้ำได้จากหลายหน้า (Dashboard, Statistics, Collection)

import type { Series } from '@/types/database'

// นับจำนวนเล่มที่มีอยู่ในซีรีส์หนึ่งเรื่อง
export function countOwnedVolumes(series: Series): number {
  if (!series.volumes) return 0
  return series.volumes.filter((v) => v.is_owned).length
}

// นับจำนวนเล่มทั้งหมดของซีรีส์หนึ่งเรื่อง
export function countTotalVolumes(series: Series): number {
  return series.volumes?.length ?? 0
}

// คำนวณเปอร์เซ็นต์ความสมบูรณ์ของซีรีส์หนึ่งเรื่อง
export function calculateCompletionPercent(series: Series): number {
  const total = countTotalVolumes(series)
  if (total === 0) return 0
  const owned = countOwnedVolumes(series)
  return Math.round((owned / total) * 100)
}

// เช็คว่าซีรีส์นี้ครบสมบูรณ์แล้วหรือยัง (มีครบทุกเล่ม)
export function isSeriesComplete(series: Series): boolean {
  const total = countTotalVolumes(series)
  if (total === 0) return false
  return countOwnedVolumes(series) === total
}

// คำนวณสถิติภาพรวมของคอลเลกชันทั้งหมด (ใช้สำหรับหน้า Dashboard)
export function calculateDashboardStats(seriesList: Series[]) {
  const totalSeries = seriesList.length

  const totalOwnedVolumes = seriesList.reduce(
    (sum, series) => sum + countOwnedVolumes(series),
    0
  )

  const totalVolumes = seriesList.reduce(
    (sum, series) => sum + countTotalVolumes(series),
    0
  )

  const totalMissingVolumes = totalVolumes - totalOwnedVolumes

  const completedSeriesCount = seriesList.filter(isSeriesComplete).length

  const ongoingSeriesCount = seriesList.filter(
    (s) => s.publication_status === 'ongoing'
  ).length

  const wishlistCount = seriesList.filter((s) => s.is_wishlist).length

  return {
    totalSeries,
    totalOwnedVolumes,
    totalMissingVolumes,
    completedSeriesCount,
    ongoingSeriesCount,
    wishlistCount,
  }
}

// จัดกลุ่มจำนวนซีรีส์ตามสำนักพิมพ์ สำหรับกราฟวงกลม
export function groupByPublisher(seriesList: Series[]) {
  const counts = new Map<string, number>()

  for (const series of seriesList) {
    const name = series.publisher?.name ?? 'ไม่ระบุ'
    counts.set(name, (counts.get(name) ?? 0) + 1)
  }

  return Array.from(counts.entries()).map(([name, value]) => ({ name, value }))
}

// จัดกลุ่มจำนวนซีรีส์ตามแนวเรื่อง (genre) สำหรับกราฟวงกลม
export function groupByGenre(seriesList: Series[]) {
  const counts = new Map<string, number>()

  for (const series of seriesList) {
    // ตอนนี้ series ยังไม่มี field genres ใน mock data
    // เราจะใช้ media_type แทนไปก่อน (เดี๋ยวเปลี่ยนเป็น genre จริงตอนเชื่อม Supabase)
    const label = series.media_type === 'manga' ? 'มังงะ' : 'ไลท์โนเวล'
    counts.set(label, (counts.get(label) ?? 0) + 1)
  }

  return Array.from(counts.entries()).map(([name, value]) => ({ name, value }))
}

// รวมยอด owned vs missing ทั้งคอลเลกชัน สำหรับกราฟแท่ง
export function getOwnedVsMissingData(seriesList: Series[]) {
  const owned = seriesList.reduce((sum, s) => sum + countOwnedVolumes(s), 0)
  const total = seriesList.reduce((sum, s) => sum + countTotalVolumes(s), 0)
  const missing = total - owned

  return [
    { name: 'มีแล้ว', value: owned },
    { name: 'ยังขาด', value: missing },
  ]
}