// ไฟล์นี้กำหนดรูปร่างของข้อมูลแต่ละตาราง ให้ตรงกับ schema ที่สร้างไว้ใน Supabase
// ทุกครั้งที่ดึงหรือส่งข้อมูล เราจะใช้ type พวกนี้เป็นตัวเช็คความถูกต้อง

export type MediaType = 'light_novel' | 'manga'
export type PublicationStatus = 'ongoing' | 'completed' | 'hiatus'
export type ReadingStatus = 'not_started' | 'reading' | 'completed'
export type WishlistPriority = 'low' | 'medium' | 'high'

export interface Publisher {
  id: string
  name: string
}

export interface Author {
  id: string
  name: string
}

export interface Volume {
  id: string
  series_id: string
  volume_number: string
  volume_title: string | null
  is_special_edition: boolean
  is_owned: boolean
}

export interface Series {
  id: string
  title_original: string | null
  title_english: string | null
  title_thai: string | null
  alternative_names: string[] | null
  media_type: MediaType
  publisher_id: string | null
  publisher?: Publisher // ข้อมูลสำนักพิมพ์ที่ join มาด้วย (optional เพราะบางทีอาจไม่ได้ดึงมา)
  authors?: Author[] // ผู้แต่ง อาจมีหลายคน
  synopsis: string | null
  isbn: string | null
  publication_status: PublicationStatus
  latest_volume: number | null
  cover_image_url: string | null
  reading_status: ReadingStatus
  is_favorite: boolean
  is_wishlist: boolean
  notes: string | null
  storage_location: string | null
  volumes?: Volume[] // เล่มทั้งหมดของซีรีส์นี้
  created_at: string
  updated_at: string
}

export interface WishlistItem {
  id: string
  title: string
  media_type: MediaType
  priority: WishlistPriority
  estimated_price: number | null
  preferred_store: string | null
  reminder_date: string | null
  notes: string | null
  created_at: string
}