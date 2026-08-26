// หน้าแก้ไขซีรีส์ - บันทึกลง Supabase จริงแล้ว

import { useParams, useNavigate, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchSeriesById } from '@/lib/queries/series'
import { updateSeries } from '@/lib/mutations/series'
import SeriesForm from '@/components/series/SeriesForm'
import type { SeriesFormValues } from '@/lib/validation/seriesSchema'

export default function EditSeriesPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    data: series,
    isLoading,
    error: fetchError,
  } = useQuery({
    queryKey: ['series', id],
    queryFn: () => fetchSeriesById(id!),
    enabled: !!id,
  })

  const mutation = useMutation({
    mutationFn: (values: SeriesFormValues) => updateSeries(id!, values),
    onSuccess: () => {
      // invalidate ทั้ง cache ของ list และของหน้า detail เรื่องนี้โดยเฉพาะ
      queryClient.invalidateQueries({ queryKey: ['series'] })
      navigate(`/series/${id}`)
    },
  })

  if (isLoading) {
    return <div className="p-8 text-slate-400">กำลังโหลดข้อมูล...</div>
  }

  if (fetchError || !series) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-400 mb-4">ไม่พบซีรีส์ที่ต้องการแก้ไข</p>
        <Link to="/collection" className="text-emerald-400 hover:underline">
          กลับไปหน้า Collection
        </Link>
      </div>
    )
  }

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
    mutation.mutate(values)
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold text-white mb-6">
        แก้ไข: {series.title_english || series.title_original}
      </h1>

      {mutation.isError && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          บันทึกไม่สำเร็จ: {mutation.error.message}
        </div>
      )}

      <SeriesForm
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        submitLabel={mutation.isPending ? 'กำลังบันทึก...' : 'บันทึกการแก้ไข'}
      />
    </div>
  )
}