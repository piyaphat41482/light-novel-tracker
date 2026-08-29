// รายการผลการค้นหา 1 แถว รองรับทั้ง dark และ light mode

import { Link } from 'react-router-dom'
import type { Series } from '@/types/database'
import { countOwnedVolumes, countTotalVolumes } from '@/lib/seriesHelpers'

interface SearchResultItemProps {
  series: Series
}

export default function SearchResultItem({ series }: SearchResultItemProps) {
  const owned = countOwnedVolumes(series)
  const total = countTotalVolumes(series)
  const isComplete = total > 0 && owned === total
  const title = series.title_thai || series.title_english || series.title_original
  const emoji = series.media_type === 'manga' ? '📗' : '📕'

  return (
    <Link
      to={`/series/${series.id}`}
      className="flex items-center justify-between px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border-b border-slate-200 dark:border-slate-800"
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-lg shrink-0">{emoji}</span>
        <div className="min-w-0">
          <p className="text-slate-900 dark:text-white text-sm font-medium truncate">{title}</p>
          {series.publisher && (
            <p className="text-slate-500 dark:text-slate-500 text-xs truncate">
              {series.publisher.name}
            </p>
          )}
        </div>
      </div>

      <span
        className={`text-sm font-medium shrink-0 ml-3 ${
          isComplete ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'
        }`}
      >
        {owned}/{total} {isComplete && '✓'}
      </span>
    </Link>
  )
}