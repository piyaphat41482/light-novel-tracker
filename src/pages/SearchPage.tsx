// หน้า Search - ตอนนี้ค้นหาจากข้อมูลจริงใน Supabase (ผ่าน cache ของ TanStack Query)

import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { fetchAllSeries } from '@/lib/queries/series'
import { searchSeries } from '@/lib/searchHelpers'
import SearchResultItem from '@/components/search/SearchResultItem'

export default function SearchPage() {
  const [query, setQuery] = useState('')

  // ใช้ queryKey ['series'] เดียวกับ Dashboard/Collection
  // ถ้าเคยเปิดหน้าอื่นมาก่อน ข้อมูลจะมีอยู่ใน cache แล้ว ค้นหาได้ทันทีไม่ต้องรอโหลด
  const { data: seriesList, isLoading } = useQuery({
    queryKey: ['series'],
    queryFn: fetchAllSeries,
  })

  const results = useMemo(
    () => searchSeries(seriesList ?? [], query),
    [seriesList, query]
  )

  return (
    <div className="flex flex-col h-screen md:h-auto">
      <div className="sticky top-0 bg-white dark:bg-slate-900 p-4 border-b border-slate-200 dark:border-slate-800 z-10">
        <div className="relative">
<Search
  size={18}
  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
/>
<input
  type="text"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  placeholder="ค้นหาชื่อเรื่อง, ผู้แต่ง, สำนักพิมพ์..."
  autoFocus
  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
/>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <p className="text-slate-400 dark:text-slate-500 text-center py-12 px-4">
            กำลังโหลดข้อมูล...
          </p>
        ) : query.trim() === '' ? (
          <p className="text-slate-400 dark:text-slate-500 text-center py-12 px-4">
            เริ่มพิมพ์เพื่อค้นหาในคอลเลกชันของคุณ
          </p>
        ) : results.length === 0 ? (
          <p className="text-slate-400 dark:text-slate-500 text-center py-12 px-4">
            ไม่พบ &quot;{query}&quot; ในคอลเลกชันของคุณ
          </p>
        ) : (
          results.map((series) => (
            <SearchResultItem key={series.id} series={series} />
          ))
        )}
      </div>
    </div>
  )
}