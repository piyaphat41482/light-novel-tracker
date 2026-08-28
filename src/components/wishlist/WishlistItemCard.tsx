// การ์ดแสดงรายการ wishlist หนึ่งชิ้น - เป็นอิสระจาก series แล้ว
// มีปุ่มแก้ไข/ลบในตัว

import { Link } from 'react-router-dom'
import { Pencil, Trash2 } from 'lucide-react'
import type { WishlistItem, WishlistPriority } from '@/types/database'

interface WishlistItemCardProps {
  item: WishlistItem
  onDelete: (id: string) => void
}

const priorityConfig: Record<WishlistPriority, { label: string; className: string }> = {
  high: { label: 'สำคัญมาก', className: 'bg-red-500/10 text-red-500 dark:text-red-400 border-red-500/30' },
  medium: { label: 'ปานกลาง', className: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30' },
  low: { label: 'ไม่รีบ', className: 'bg-slate-500/10 text-slate-500 dark:text-slate-400 border-slate-500/30' },
}

export default function WishlistItemCard({ item, onDelete }: WishlistItemCardProps) {
  const priority = priorityConfig[item.priority]
  const emoji = item.media_type === 'manga' ? '📗' : '📕'

  return (
    <div className="flex gap-4 bg-slate-100 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
      <div className="shrink-0 w-16 aspect-[2/3] bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center text-2xl">
        {emoji}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-slate-900 dark:text-white font-semibold text-sm truncate">
            {item.title}
          </p>
          <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border ${priority.className}`}>
            {priority.label}
          </span>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400 mt-2">
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
          <p className="text-slate-400 dark:text-slate-500 text-xs mt-2 italic">{item.notes}</p>
        )}

        <div className="flex items-center gap-3 mt-3">
          <Link
            to={`/wishlist/${item.id}/edit`}
            className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <Pencil size={12} />
            แก้ไข
          </Link>
          <button
            onClick={() => onDelete(item.id)}
            className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"
          >
            <Trash2 size={12} />
            ลบ
          </button>
        </div>
      </div>
    </div>
  )
}