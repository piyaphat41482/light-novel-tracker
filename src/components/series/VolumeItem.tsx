// แสดงเล่มเดียว กดเพื่อ toggle owned/missing ได้ทันที (ไม่ต้องเข้าหน้า Edit)
// ตามที่ออกแบบไว้ใน Phase 4: เล่มที่ขาดต้องเป็นสีเด่นชัด

import { Check, X } from 'lucide-react'

interface VolumeItemProps {
  label: string // เช่น "Volume 4" หรือ "Limited Edition"
  isOwned: boolean
  onToggle: () => void
}

export default function VolumeItem({ label, isOwned, onToggle }: VolumeItemProps) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
        isOwned
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
          : 'bg-red-500/10 border-red-500/30 text-red-400'
      }`}
    >
      {isOwned ? <Check size={14} /> : <X size={14} />}
      {label}
    </button>
  )
}