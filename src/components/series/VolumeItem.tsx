// แสดงเล่มเดียว กดเพื่อ toggle owned/missing ได้ทันที
// เพิ่ม micro-interaction ตอนกด (scale เล็กน้อย) ให้รู้สึกตอบสนองทันทีที่แตะ

import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

interface VolumeItemProps {
  label: string
  isOwned: boolean
  onToggle: () => void
}

export default function VolumeItem({ label, isOwned, onToggle }: VolumeItemProps) {
  return (
    <motion.button
      onClick={onToggle}
      whileTap={{ scale: 0.92 }}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
        isOwned
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
          : 'bg-red-500/10 border-red-500/30 text-red-400'
      }`}
    >
      {isOwned ? <Check size={14} /> : <X size={14} />}
      {label}
    </motion.button>
  )
}