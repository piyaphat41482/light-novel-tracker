// หน้า Search - ค้นหาแบบ instant ตามที่พิมพ์
// นี่คือหน้าที่สำคัญที่สุดของแอป ตาม use case หลัก: ยืนในร้านหนังสือ เช็คว่ามีเล่มนี้หรือยัง

import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { mockSeries } from '@/data/mockSeries'
import { searchSeries } from '@/lib/searchHelpers'
import SearchResultItem from '@/components/search/SearchResultItem'

export default function SearchPage() {
  const [query, setQuery] = useState('')

  // ค้นหาใหม่ทุกครั้งที่ query เปลี่ยน (useMemo ป้องกันการคำนวณซ้ำโดยไม่จำเป็น)
  const results = useMemo(() => searchSeries(mockSeries, query), [query])

  return (
    <div className="flex flex-col h-screen md:h-auto">
      {/* แถบค้นหา - sticky ติดด้านบนเสมอ ตามที่ออกแบบไว้ใน Phase 4 */}
      <div className="sticky top-0 bg-slate-900 p-4 border-b border-slate-800 z-10">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาชื่อเรื่อง, ผู้แต่ง, สำนักพิมพ์..."
            autoFocus
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* ผลลัพธ์ */}
      <div className="flex-1 overflow-y-auto">
        {query.trim() === '' ? (
          <p className="text-slate-500 text-center py-12 px-4">
            เริ่มพิมพ์เพื่อค้นหาในคอลเลกชันของคุณ
          </p>
        ) : results.length === 0 ? (
          <p className="text-slate-500 text-center py-12 px-4">
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