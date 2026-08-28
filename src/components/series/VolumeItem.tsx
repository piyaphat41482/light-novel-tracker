// แสดงเล่มเดียว — คลิกหลักเพื่อ toggle owned/missing, มีปุ่มลบเล็กๆ แยกต่างหาก
// ใช้ <div> ห่อนอกสุด (ไม่ใช่ <button>) เพื่อไม่ให้เกิดปัญหา "ปุ่มซ้อนปุ่ม"

import { motion } from 'framer-motion'
import { Check, X, Trash2 } from 'lucide-react'

interface VolumeItemProps {
  label: string
  isOwned: boolean
  onToggle: () => void
  onDelete: () => void
}

export default function VolumeItem({
  label,
  isOwned,
  onToggle,
  onDelete,
}: VolumeItemProps) {
  return (
    <div
      className={`flex items-center rounded-lg border text-sm font-medium overflow-hidden ${
        isOwned
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
          : 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400'
      }`}
    >
      <motion.button
        onClick={onToggle}
        whileTap={{ scale: 0.92 }}
        className="flex items-center gap-2 px-3 py-2"
      >
        {isOwned ? <Check size={14} /> : <X size={14} />}
        {label}
      </motion.button>

      <button
        onClick={onDelete}
        className="px-2 py-2 hover:bg-black/10 dark:hover:bg-white/10 transition-colors border-l border-current/20"
        aria-label={`ลบ ${label}`}
      >
        <Trash2 size={12} />
      </button>
    </div>
  )
}