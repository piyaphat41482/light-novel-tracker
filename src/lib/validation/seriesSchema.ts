// กำหนดกฎการตรวจสอบข้อมูลฟอร์ม Add/Edit Series ด้วย Zod
// สร้าง TypeScript type ให้อัตโนมัติจาก schema นี้ ไม่ต้องเขียนซ้ำ

import { z } from 'zod'

export const seriesFormSchema = z
  .object({
    title_original: z.string().optional(),
    title_english: z.string().optional(),
    title_thai: z.string().optional(),
    media_type: z.enum(['light_novel', 'manga'], {
      required_error: 'กรุณาเลือกประเภท',
    }),
    publication_status: z.enum(['ongoing', 'completed', 'hiatus']),
    reading_status: z.enum(['not_started', 'reading', 'completed']),
    latest_volume: z
      .number({ invalid_type_error: 'กรุณาใส่ตัวเลข' })
      .int('ต้องเป็นจำนวนเต็ม')
      .positive('ต้องมากกว่า 0')
      .optional(),
    synopsis: z.string().optional(),
    cover_image_url: z
      .string()
      .url('ลิงก์รูปภาพไม่ถูกต้อง')
      .optional()
      .or(z.literal('')), // อนุญาตให้เป็นค่าว่างได้ด้วย (ยังไม่ใส่รูป)
    storage_location: z.string().optional(),
    notes: z.string().optional(),
        publisher_name: z.string().optional(),
    author_names: z.string().optional(), // คั่นหลายคนด้วยจุลภาค เช่น "Asato Asato, คนอื่น"
    is_favorite: z.boolean(),
    is_wishlist: z.boolean(),
  })
  // custom validation: บังคับว่าต้องมีชื่ออย่างน้อย 1 ภาษา (ตรงกับ constraint ที่ตั้งไว้ในฐานข้อมูล Phase 6)
  .refine(
    (data) => data.title_original || data.title_english || data.title_thai,
    {
      message: 'กรุณาใส่ชื่อเรื่องอย่างน้อย 1 ภาษา',
      path: ['title_english'], // จะแสดง error message ใต้ช่องนี้
    }
  )

// สร้าง TypeScript type จาก schema อัตโนมัติ - ไม่ต้องเขียน interface แยกต่างหาก
export type SeriesFormValues = z.infer<typeof seriesFormSchema>