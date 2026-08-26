// หน้าเพิ่มซีรีส์ใหม่ - บันทึกลง Supabase จริงแล้ว

import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createSeries } from '@/lib/mutations/series'
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
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createSeries,
    onSuccess: (newSeriesId) => {
      // invalidate cache ของรายการ series ทั้งหมด (Dashboard, Collection, Search จะเห็นซีรีส์ใหม่)
      queryClient.invalidateQueries({ queryKey: ['series'] })
      // พาไปหน้า Detail ของซีรีส์ที่เพิ่งสร้างเลย (ใช้ id จริงที่ได้กลับมาจากฐานข้อมูล)
      navigate(`/series/${newSeriesId}`)
    },
  })

  function handleSubmit(values: SeriesFormValues) {
    mutation.mutate(values)
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold text-white mb-6">เพิ่มซีรีส์ใหม่</h1>

      {mutation.isError && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          บันทึกไม่สำเร็จ: {mutation.error.message}
        </div>
      )}

      <SeriesForm
        defaultValues={emptyDefaults}
        onSubmit={handleSubmit}
        submitLabel={mutation.isPending ? 'กำลังบันทึก...' : 'บันทึก'}
      />
    </div>
  )
}