// หน้ารายละเอียดซีรีส์ - หน้าที่สำคัญที่สุดของแอปตาม use case หลัก
// แสดงข้อมูลครบถ้วน + Volume Checklist ที่กดแก้ไขได้ทันที

import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Heart, Pencil } from 'lucide-react'
import { mockSeries } from '@/data/mockSeries'
import {
  countOwnedVolumes,
  countTotalVolumes,
  calculateCompletionPercent,
} from '@/lib/seriesHelpers'
import VolumeChecklist from '@/components/series/VolumeChecklist'
import type { Volume } from '@/types/database'

export default function SeriesDetailPage() {
  const { id } = useParams<{ id: string }>()
  const series = mockSeries.find((s) => s.id === id)

  // เก็บ state ของเล่มไว้แยกต่างหาก เพื่อให้ toggle แล้วหน้าจออัปเดตทันที
  // เริ่มต้นจากข้อมูลของ series ที่เจอ (หรือ array ว่างถ้าหาไม่เจอ)
  const [volumes, setVolumes] = useState<Volume[]>(series?.volumes ?? [])

  // ถ้าหา series ตาม id ไม่เจอเลย (เช่น URL พิมพ์ผิด หรือถูกลบไปแล้ว)
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
    setVolumes((prev) =>
      prev.map((v) => (v.id === volumeId ? { ...v, is_owned: !v.is_owned } : v))
    )
  }

  const owned = countOwnedVolumes({ ...series, volumes })
  const total = countTotalVolumes({ ...series, volumes })
  const percent = calculateCompletionPercent({ ...series, volumes })
  const title = series.title_english || series.title_original || series.title_thai

  return (
    <div className="pb-8">
      {/* แถบบนสุด: ปุ่มย้อนกลับ + แก้ไข */}
      <div className="sticky top-0 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 py-3 flex items-center justify-between z-10">
        <Link to="/collection" className="text-slate-400 hover:text-white">
          <ArrowLeft size={20} />
        </Link>
        <Link to={`/series/${series.id}/edit`} className="text-slate-400 hover:text-white">
            <Pencil size={20} />
        </Link>
      </div>

      <div className="p-4 md:p-8 md:grid md:grid-cols-[280px_1fr] md:gap-8">
        {/* คอลัมน์ซ้าย: ปก + ข้อมูลพื้นฐาน (บนเดสก์ท็อป) */}
        <div>
          <div className="aspect-[2/3] bg-slate-800 rounded-xl overflow-hidden mb-4">
            {series.cover_image_url ? (
              <img
                src={series.cover_image_url}
                alt={title ?? ''}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-600">
                ไม่มีรูปปก
              </div>
            )}
          </div>

          <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 mb-4">
            <Heart size={16} className={series.is_favorite ? 'fill-red-400 text-red-400' : ''} />
            {series.is_favorite ? 'อยู่ในรายการโปรด' : 'เพิ่มในรายการโปรด'}
          </button>
        </div>

        {/* คอลัมน์ขวา: ชื่อเรื่อง + checklist + รายละเอียด */}
        <div className="mt-6 md:mt-0">
          <h1 className="text-2xl font-bold text-white mb-1">{title}</h1>
          {series.title_original && series.title_original !== title && (
            <p className="text-slate-500 text-sm mb-1">{series.title_original}</p>
          )}
          {series.publisher && (
            <p className="text-slate-400 text-sm mb-4">{series.publisher.name}</p>
          )}

          {/* Progress bar */}
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="text-slate-300 text-sm mb-6">
            มี {owned} จาก {total} เล่ม ({percent}%)
          </p>

          {/* Volume Checklist - ส่วนสำคัญที่สุด อยู่สูงในหน้าจอตามที่ออกแบบไว้ */}
          <h2 className="text-lg font-semibold text-white mb-3">รายการเล่ม</h2>
          <VolumeChecklist volumes={volumes} onToggleVolume={handleToggleVolume} />

          {/* รายละเอียดเพิ่มเติม - อยู่ล่างสุด เพราะเช็คไม่บ่อยเท่า checklist */}
          {series.synopsis && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-white mb-2">เรื่องย่อ</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                {series.synopsis}
              </p>
            </div>
          )}

          {series.authors && series.authors.length > 0 && (
            <div className="mt-4">
              <span className="text-slate-500 text-sm">ผู้แต่ง: </span>
              <span className="text-slate-300 text-sm">
                {series.authors.map((a) => a.name).join(', ')}
              </span>
            </div>
          )}

          {series.storage_location && (
            <div className="mt-2">
              <span className="text-slate-500 text-sm">เก็บไว้ที่: </span>
              <span className="text-slate-300 text-sm">
                {series.storage_location}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}