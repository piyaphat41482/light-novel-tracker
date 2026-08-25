// หน้า Collection - แสดงนิยาย/มังงะทั้งหมด พร้อม filter และ sort
// ใช้ mock data ไปก่อน จะเปลี่ยนเป็นข้อมูลจริงจาก Supabase ใน milestone หลังจากนี้

import { useState, useMemo } from 'react'
import { mockSeries } from '@/data/mockSeries'
import SeriesCard from '@/components/series/SeriesCard'
import FilterSortBar, {
  type MediaFilter,
  type SortOption,
} from '@/components/collection/FilterSortBar'
import {
  countOwnedVolumes,
  calculateCompletionPercent,
} from '@/lib/seriesHelpers'

export default function CollectionPage() {
  const [mediaFilter, setMediaFilter] = useState<MediaFilter>('all')
  const [sortBy, setSortBy] = useState<SortOption>('title')

  // useMemo: คำนวณรายการที่กรอง+เรียงแล้วใหม่ "เฉพาะตอนที่" mediaFilter หรือ sortBy เปลี่ยน
  // ถ้าไม่ใช้ useMemo โค้ดนี้จะรันซ้ำทุกครั้งที่หน้าจอวาดใหม่ แม้ค่าจะไม่ได้เปลี่ยนเลยก็ตาม
  const filteredAndSorted = useMemo(() => {
    let result = mockSeries

    // ขั้นตอนกรอง (filter)
    if (mediaFilter !== 'all') {
      result = result.filter((series) => series.media_type === mediaFilter)
    }

    // ขั้นตอนเรียง (sort) - ทำสำเนาก่อนเสมอ ตามที่เรียนรู้ไปใน milestone ก่อน
    const sorted = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'title': {
          const titleA = a.title_english || a.title_original || ''
          const titleB = b.title_english || b.title_original || ''
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
  }, [mediaFilter, sortBy])

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold text-white mb-6">Collection</h1>

      <FilterSortBar
        mediaFilter={mediaFilter}
        onMediaFilterChange={setMediaFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        resultCount={filteredAndSorted.length}
      />

      {filteredAndSorted.length === 0 ? (
        <p className="text-slate-400 text-center py-12">
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