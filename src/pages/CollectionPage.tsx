// หน้า Collection - ดึงข้อมูลจริงจาก Supabase

import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { fetchAllSeries } from '@/lib/queries/series'
import SeriesCard from '@/components/series/SeriesCard'
import FilterSortBar, {
  type MediaFilter,
  type SortOption,
} from '@/components/collection/FilterSortBar'
import {
  countOwnedVolumes,
  calculateCompletionPercent,
} from '@/lib/seriesHelpers'
import SeriesCardSkeleton from '@/components/series/SeriesCardSkeleton'
import ErrorState from '@/components/ui/error-state'

export default function CollectionPage() {
  const [mediaFilter, setMediaFilter] = useState<MediaFilter>('all')
  const [sortBy, setSortBy] = useState<SortOption>('title')

  // ใช้ queryKey เดียวกับ Dashboard ('series') - TanStack Query จะใช้ cache ร่วมกัน
  // ถ้าเพิ่งเปิด Dashboard มาก่อน หน้านี้จะโหลดเร็วมากเพราะมีข้อมูลอยู่ใน cache แล้ว
 const { data: seriesList, isLoading, error, refetch } = useQuery({
  queryKey: ['series'],
  queryFn: fetchAllSeries,
})

  const filteredAndSorted = useMemo(() => {
    const series = seriesList ?? []
    let result = series

    if (mediaFilter !== 'all') {
      result = result.filter((s) => s.media_type === mediaFilter)
    }

    const sorted = [...result].sort((a, b) => {
      switch (sortBy) {
case 'title': {
  const titleA = a.title_thai || a.title_english || a.title_original || ''
  const titleB = b.title_thai || b.title_english || b.title_original || ''
  return titleA.localeCompare(titleB)
}
        case 'recently_updated':
          return (
            new Date(b.updated_at).getTime() -
            new Date(a.updated_at).getTime()
          )
        case 'completion':
          return calculateCompletionPercent(b) - calculateCompletionPercent(a)
        case 'owned_count':
          return countOwnedVolumes(b) - countOwnedVolumes(a)
        default:
          return 0
      }
    })

    return sorted
  }, [seriesList, mediaFilter, sortBy])

if (isLoading) {
  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Collection</h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <SeriesCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

if (error) {
  return <ErrorState message={error.message} onRetry={() => refetch()} />
}

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Collection</h1>
        <Link
          to="/series/new"
          className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium px-3 py-2 rounded-lg transition-colors"
        >
          <Plus size={16} />
          เพิ่มซีรีส์
        </Link>
      </div>

      <FilterSortBar
        mediaFilter={mediaFilter}
        onMediaFilterChange={setMediaFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        resultCount={filteredAndSorted.length}
      />

      {filteredAndSorted.length === 0 ? (
<p className="text-slate-400 dark:text-slate-500 text-center py-12">
  ไม่พบรายการที่ตรงกับตัวกรอง
</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredAndSorted.map((series) => (
            <SeriesCard key={series.id} series={series} />
          ))}
        </div>
      )}
    </div>
  )
}