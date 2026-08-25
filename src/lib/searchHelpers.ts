// ฟังก์ชันค้นหา series จากคำค้นหา
// ค้นหาแบบ "ไม่สนตัวพิมพ์เล็ก-ใหญ่" (case-insensitive) ข้ามหลาย field พร้อมกัน

import type { Series } from '@/types/database'

// ฟังก์ชันช่วยเช็คว่า text มีคำค้นหาอยู่ไหม (ปลอดภัยแม้ text เป็น null)
function includesQuery(text: string | null | undefined, query: string): boolean {
  if (!text) return false
  return text.toLowerCase().includes(query.toLowerCase())
}

export function searchSeries(seriesList: Series[], query: string): Series[] {
  const trimmedQuery = query.trim()

  // ถ้าไม่ได้พิมพ์อะไรเลย ให้คืนค่าว่าง (ไม่แสดงผลอะไร จนกว่าจะเริ่มพิมพ์)
  if (trimmedQuery === '') return []

  return seriesList.filter((series) => {
    // เช็คชื่อเรื่องทุกภาษา
    if (includesQuery(series.title_original, trimmedQuery)) return true
    if (includesQuery(series.title_english, trimmedQuery)) return true
    if (includesQuery(series.title_thai, trimmedQuery)) return true

    // เช็คชื่ออื่นๆ (เป็น array ต้องวนเช็คทีละตัว)
    if (series.alternative_names?.some((name) => includesQuery(name, trimmedQuery))) {
      return true
    }

    // เช็คผู้แต่ง (เป็น array ของ object ต้องเช็คที่ .name)
    if (series.authors?.some((author) => includesQuery(author.name, trimmedQuery))) {
      return true
    }

    // เช็คสำนักพิมพ์
    if (includesQuery(series.publisher?.name, trimmedQuery)) return true

    // เช็คเลขเล่ม (เผื่อค้นหาว่า "เล่ม 5" มีเรื่องไหนบ้าง)
    if (
      series.volumes?.some((v) => includesQuery(v.volume_number, trimmedQuery))
    ) {
      return true
    }

    return false
  })
}