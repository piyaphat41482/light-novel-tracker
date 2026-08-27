// หน้ารายละเอียดซีรีส์ - ตอนนี้ดึงข้อมูลจริงจาก Supabase และบันทึกการ toggle เล่มถาวรแล้ว

import { useParams, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, Heart, Pencil } from 'lucide-react'
import { fetchSeriesById } from '@/lib/queries/series'
import { toggleVolumeOwned } from '@/lib/mutations/volumes'
import {
  countOwnedVolumes,
  countTotalVolumes,
  calculateCompletionPercent,
} from '@/lib/seriesHelpers'
import VolumeChecklist from '@/components/series/VolumeChecklist'
import { Skeleton } from '@/components/ui/skeleton'
import ErrorState from '@/components/ui/error-state'

export default function SeriesDetailPage() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()

const {
  data: series,
  isLoading,
  error,
  refetch,
} = useQuery({
  queryKey: ['series', id],
  queryFn: () => fetchSeriesById(id!),
  enabled: !!id,
})

  // ตั้งค่า mutation สำหรับ toggle เล่ม
  const toggleMutation = useMutation({
    mutationFn: ({ volumeId, newValue }: { volumeId: string; newValue: boolean }) =>
      toggleVolumeOwned(volumeId, newValue),
    onSuccess: () => {
      // บอก TanStack Query ว่า cache ของ series ทั้งหมดเก่าแล้ว ให้โหลดใหม่
      // ครอบคลุมทั้งหน้านี้ (series detail), Dashboard, และ Collection ที่ใช้ queryKey ['series'] ร่วมกัน
      queryClient.invalidateQueries({ queryKey: ['series'] })
    },
  })

if (isLoading) {
  return (
    <div className="p-4 md:p-8 md:grid md:grid-cols-[280px_1fr] md:gap-8">
      <div>
        <Skeleton className="aspect-[2/3] rounded-xl mb-4" />
        <Skeleton className="h-9 w-full rounded-lg" />
      </div>
      <div className="mt-6 md:mt-0 space-y-3">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-2 w-full rounded-full mt-4" />
        <div className="flex flex-wrap gap-2 mt-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-20 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}

if (error) {
  return <ErrorState message={error.message} onRetry={() => refetch()} />
}

if (!series) {
  return (
    <div className="p-8 text-center">
      <p className="text-slate-400 mb-4">ไม่พบซีรีส์ที่ต้องการ</p>
      <Link to="/collection" className="text-emerald-400 hover:underline">
        กลับไปหน้า Collection
      </Link>
    </div>
  )
}

  function handleToggleVolume(volumeId: string) {
    const volume = series!.volumes?.find((v) => v.id === volumeId)
    if (!volume) return
    toggleMutation.mutate({ volumeId, newValue: !volume.is_owned })
  }

  const owned = countOwnedVolumes(series)
  const total = countTotalVolumes(series)
  const percent = calculateCompletionPercent(series)
  const title = series.title_english || series.title_original || series.title_thai

  return (
    <div className="pb-8">
<div className="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between z-10">
  <Link to="/collection" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
    <ArrowLeft size={20} />
  </Link>
  <Link to={`/series/${series.id}/edit`} className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
    <Pencil size={20} />
  </Link>
</div>

      <div className="p-4 md:p-8 md:grid md:grid-cols-[280px_1fr] md:gap-8">
        <div>
          <div className="aspect-[2/3] bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden mb-4">
            {series.cover_image_url ? (
              <img
                src={series.cover_image_url}
                alt={title ?? ''}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-600">
                ไม่มีรูปปก
              </div>
            )}
          </div>

          <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 mb-4">
            <Heart
              size={16}
              className={series.is_favorite ? 'fill-red-400 text-red-400' : ''}
            />
            {series.is_favorite ? 'อยู่ในรายการโปรด' : 'เพิ่มในรายการโปรด'}
          </button>
        </div>

        <div className="mt-6 md:mt-0">
<h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{title}</h1>
{series.title_original && series.title_original !== title && (
  <p className="text-slate-500 dark:text-slate-500 text-sm mb-1">{series.title_original}</p>
)}
{series.publisher && (
  <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{series.publisher.name}</p>
)}

          <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
<p className="text-slate-700 dark:text-slate-300 text-sm mb-6">
  มี {owned} จาก {total} เล่ม ({percent}%)
</p>

<h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">รายการเล่ม</h2>
          <VolumeChecklist
            volumes={series.volumes ?? []}
            onToggleVolume={handleToggleVolume}
          />
          {toggleMutation.isPending && (
            <p className="text-slate-500 text-xs mt-2">กำลังบันทึก...</p>
          )}
          {toggleMutation.isError && (
            <p className="text-red-400 text-xs mt-2">
              บันทึกไม่สำเร็จ: {toggleMutation.error.message}
            </p>
          )}

          {series.synopsis && (
  <div className="mt-8">
    <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">เรื่องย่อ</h2>
    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
      {series.synopsis}
    </p>
  </div>
)}

{series.authors && series.authors.length > 0 && (
  <div className="mt-4">
    <span className="text-slate-400 dark:text-slate-500 text-sm">ผู้แต่ง: </span>
    <span className="text-slate-700 dark:text-slate-300 text-sm">
      {series.authors.map((a) => a.name).join(', ')}
    </span>
  </div>
)}

{series.storage_location && (
  <div className="mt-2">
    <span className="text-slate-400 dark:text-slate-500 text-sm">เก็บไว้ที่: </span>
    <span className="text-slate-700 dark:text-slate-300 text-sm">
      {series.storage_location}
    </span>
  </div>
)}
        </div>
      </div>
    </div>
  )
}