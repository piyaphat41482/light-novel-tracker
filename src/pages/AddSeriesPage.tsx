// หน้าเพิ่มซีรีส์ใหม่
// ตอนนี้ submit แล้วแค่ log ค่าดูก่อน (ยังไม่บันทึกถาวร - จะเชื่อม Supabase ใน milestone ถัดไป)

import { useNavigate } from 'react-router-dom'
import SeriesForm from '@/components/series/SeriesForm'
import type { SeriesFormValues } from '@/lib/validation/seriesSchema'

const emptyDefaults: SeriesFormValues = {
  title_original: '',
  title_english: '',
  title_thai: '',
  media_type: 'light_novel',
  publication_status: 'ongoing',
  reading_status: 'not_started',
  synopsis: '',
  cover_image_url: '',
  storage_location: '',
  notes: '',
  is_favorite: false,
  is_wishlist: false,
}

export default function AddSeriesPage() {
  const navigate = useNavigate()

  function handleSubmit(values: SeriesFormValues) {
    // TODO: ใน milestone ถัดไปตรงนี้จะเปลี่ยนเป็นการบันทึกลง Supabase จริง
    console.log('ข้อมูลที่จะบันทึก:', values)
    alert('บันทึกสำเร็จ! (ตอนนี้ยังเป็นแค่ตัวอย่าง ยังไม่บันทึกจริงลงฐานข้อมูล)')
    navigate('/collection')
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold text-white mb-6">เพิ่มซีรีส์ใหม่</h1>
      <SeriesForm
        defaultValues={emptyDefaults}
        onSubmit={handleSubmit}
        submitLabel="บันทึก"
      />
    </div>
  )
}