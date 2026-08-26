// การ์ดแสดงซีรีส์หนึ่งเรื่อง ใช้ซ้ำได้ทั้งหน้า Dashboard และ Collection
// ตามดีไซน์ที่วางแผนไว้ใน Phase 4: ปก, ชื่อ, สำนักพิมพ์, progress bar, badge สถานะ

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Series } from '@/types/database'
import {
  countOwnedVolumes,
  countTotalVolumes,
  calculateCompletionPercent,
} from '@/lib/seriesHelpers'

interface SeriesCardProps {
  series: Series
}

export default function SeriesCard({ series }: SeriesCardProps) {
  const owned = countOwnedVolumes(series)
  const total = countTotalVolumes(series)
  const percent = calculateCompletionPercent(series)
  const title = series.title_english || series.title_original || series.title_thai

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to={`/series/${series.id}`}
        className="block bg-slate-800 rounded-xl overflow-hidden hover:bg-slate-750 transition-colors border border-slate-700"
      >
        {/* ปกหนังสือ - ถ้ายังไม่มีรูป แสดงกรอบสีพื้นแทน */}
        <div className="aspect-[2/3] bg-slate-700 flex items-center justify-center">
          {series.cover_image_url ? (
            <img
              src={series.cover_image_url}
              alt={title ?? 'Cover'}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-slate-500 text-sm">ไม่มีรูปปก</span>
          )}
        </div>

        <div className="p-3">
          <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1">
            {title}
          </h3>
          {series.publisher && (
            <p className="text-slate-400 text-xs mb-2">{series.publisher.name}</p>
          )}

          {/* Progress bar */}
          <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden mb-1">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300">
              {owned}/{total}
            </span>
            <span className="text-slate-400">{percent}%</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}