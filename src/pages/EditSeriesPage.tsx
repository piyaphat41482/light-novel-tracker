// หน้าแก้ไขซีรีส์ที่มีอยู่แล้ว
// ใช้ SeriesForm ตัวเดียวกับ AddSeriesPage แต่ preload ค่าเดิมของซีรีส์นั้นเข้าไป

import { useParams, useNavigate, Link } from 'react-router-dom'
import { mockSeries } from '@/data/mockSeries'
import SeriesForm from '@/components/series/SeriesForm'
import type { SeriesFormValues } from '@/lib/validation/seriesSchema'

export default function EditSeriesPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const series = mockSeries.find((s) => s.id === id)

  if (!series) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-400 mb-4">ไม่พบซีรีส์ที่ต้องการแก้ไข</p>
        <Link to="/collection" className="text-emerald-400 hover:underline">
          กลับไปหน้า Collection
        </Link>
      </div>
    )
  }

  // แปลงข้อมูล series (ที่อาจมี null) ให้เป็นรูปแบบที่ฟอร์มต้องการ (string ว่างแทน null)
  const defaultValues: SeriesFormValues = {
    title_original: series.title_original ?? '',
    title_english: series.title_english ?? '',
    title_thai: series.title_thai ?? '',
    media_type: series.media_type,
    publication_status: series.publication_status,
    reading_status: series.reading_status,
    latest_volume: series.latest_volume ?? undefined,
    synopsis: series.synopsis ?? '',
    cover_image_url: series.cover_image_url ?? '',
    storage_location: series.storage_location ?? '',
    notes: series.notes ?? '',
    is_favorite: series.is_favorite,
    is_wishlist: series.is_wishlist,
  }

  function handleSubmit(values: SeriesFormValues) {
    // TODO: ใน milestone ถัดไปตรงนี้จะเปลี่ยนเป็นการอัปเดตลง Supabase จริง
    console.log('ข้อมูลที่จะอัปเดต:', values)
    alert('อัปเดตสำเร็จ! (ตอนนี้ยังเป็นแค่ตัวอย่าง ยังไม่บันทึกจริงลงฐานข้อมูล)')
    navigate(`/series/${id}`)
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold text-white mb-6">
        แก้ไข: {series.title_english || series.title_original}
      </h1>
      <SeriesForm
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        submitLabel="บันทึกการแก้ไข"
      />
    </div>
  )
}