// การ์ดแสดงรายการ wishlist หนึ่งชิ้น พร้อม priority badge, ราคา, ร้านค้า

import { Link } from 'react-router-dom'
import type { WishlistItem, WishlistPriority } from '@/types/database'

interface WishlistItemCardProps {
  item: WishlistItem
}

// map ระดับความสำคัญ ไปเป็นสีและข้อความภาษาไทย
const priorityConfig: Record<WishlistPriority, { label: string; className: string }> = {
  high: { label: 'สำคัญมาก', className: 'bg-red-500/10 text-red-400 border-red-500/30' },
  medium: { label: 'ปานกลาง', className: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
  low: { label: 'ไม่รีบ', className: 'bg-slate-500/10 text-slate-400 border-slate-500/30' },
}

export default function WishlistItemCard({ item }: WishlistItemCardProps) {
  const series = item.series
  if (!series) return null // ป้องกันกรณี join ไม่เจอข้อมูลซีรีส์

  const title = series.title_english || series.title_original || series.title_thai
  const priority = priorityConfig[item.priority]

  return (
    <div className="flex gap-4 bg-slate-800 rounded-xl p-4 border border-slate-700">
      {/* ปกเล็กๆ ด้านซ้าย */}
      <Link
        to={`/series/${series.id}`}
        className="shrink-0 w-16 aspect-[2/3] bg-slate-700 rounded-lg overflow-hidden"
      >
        {series.cover_image_url ? (
          <img
            src={series.cover_image_url}
            alt={title ?? ''}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">
            ไม่มีรูป
          </div>
        )}
      </Link>

      {/* รายละเอียด */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <Link
            to={`/series/${series.id}`}
            className="text-white font-semibold text-sm hover:underline truncate"
          >
            {title}
          </Link>
          <span
            className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border ${priority.className}`}
          >
            {priority.label}
          </span>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400 mt-2">
          {item.estimated_price !== null && (
            <span>💰 ~{item.estimated_price.toLocaleString()} บาท</span>
          )}
          {item.preferred_store && <span>🏪 {item.preferred_store}</span>}
          {item.reminder_date && (
            <span>
              ⏰{' '}
              {new Date(item.reminder_date).toLocaleDateString('th-TH', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          )}
        </div>

        {item.notes && (
          <p className="text-slate-500 text-xs mt-2 italic">{item.notes}</p>
        )}
      </div>
    </div>
  )
}