// ข้อมูลจำลอง wishlist ไว้ทดสอบ UI
// อ้างอิง series_id ไปยัง mock series ที่มีอยู่แล้ว (จำลองการ join)

import type { WishlistItem } from '@/types/database'
import { mockSeries } from './mockSeries'

export const mockWishlist: WishlistItem[] = [
  {
    id: 'w1',
    series_id: '1', // อ้างอิงถึง "86 Eighty-Six" ใน mockSeries
    series: mockSeries.find((s) => s.id === '1'),
    priority: 'high',
    estimated_price: 250,
    preferred_store: 'ร้านนายอินทร์',
    reminder_date: '2026-09-15',
    notes: 'รอเล่ม 13-14 วางขาย',
    created_at: '2026-08-01T00:00:00Z',
  },
  {
    id: 'w2',
    series_id: '3', // อ้างอิงถึง "Frieren" ใน mockSeries
    series: mockSeries.find((s) => s.id === '3'),
    priority: 'medium',
    estimated_price: 150,
    preferred_store: 'Kinokuniya',
    reminder_date: null,
    notes: null,
    created_at: '2026-07-15T00:00:00Z',
  },
]