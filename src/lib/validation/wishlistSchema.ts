// กำหนดกฎตรวจสอบข้อมูลฟอร์ม Add/Edit Wishlist Item

import { z } from 'zod'

export const wishlistFormSchema = z.object({
  title: z.string().min(1, 'กรุณาใส่ชื่อเรื่อง'),
  media_type: z.enum(['light_novel', 'manga'], {
    required_error: 'กรุณาเลือกประเภท',
  }),
  priority: z.enum(['low', 'medium', 'high']),
  estimated_price: z
    .number({ invalid_type_error: 'กรุณาใส่ตัวเลข' })
    .positive('ต้องมากกว่า 0')
    .optional(),
  preferred_store: z.string().optional(),
  reminder_date: z.string().optional(),
  notes: z.string().optional(),
})

export type WishlistFormValues = z.infer<typeof wishlistFormSchema>