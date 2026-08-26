// แถบควบคุม filter และ sort สำหรับหน้า Collection
// component นี้ไม่เก็บ state เอง แต่รับค่าปัจจุบันและฟังก์ชันเปลี่ยนค่าเข้ามาจากหน้าแม่ (Collection Page)
// แพทเทิร์นนี้เรียกว่า "controlled component"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export type MediaFilter = 'all' | 'light_novel' | 'manga'
export type SortOption = 'title' | 'recently_updated' | 'completion' | 'owned_count'

interface FilterSortBarProps {
  mediaFilter: MediaFilter
  onMediaFilterChange: (value: MediaFilter) => void
  sortBy: SortOption
  onSortByChange: (value: SortOption) => void
  resultCount: number
}

export default function FilterSortBar({
  mediaFilter,
  onMediaFilterChange,
  sortBy,
  onSortByChange,
  resultCount,
}: FilterSortBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
<Select
  value={mediaFilter}
  onValueChange={(value) => {
    if (value !== null) onMediaFilterChange(value)
  }}
>
        <SelectTrigger className="w-36 bg-slate-800 border-slate-700 text-white">
          <SelectValue placeholder="ประเภท" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">ทั้งหมด</SelectItem>
          <SelectItem value="light_novel">ไลท์โนเวล</SelectItem>
          <SelectItem value="manga">มังงะ</SelectItem>
        </SelectContent>
      </Select>

<Select
  value={sortBy}
  onValueChange={(value) => {
    if (value !== null) onSortByChange(value)
  }}
>
        <SelectTrigger className="w-44 bg-slate-800 border-slate-700 text-white">
          <SelectValue placeholder="เรียงตาม" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="title">ชื่อเรื่อง (A-Z)</SelectItem>
          <SelectItem value="recently_updated">อัปเดตล่าสุด</SelectItem>
          <SelectItem value="completion">% ความสมบูรณ์</SelectItem>
          <SelectItem value="owned_count">จำนวนเล่มที่มี</SelectItem>
        </SelectContent>
      </Select>

      <span className="text-slate-400 text-sm ml-auto">
        {resultCount} เรื่อง
      </span>
    </div>
  )
}