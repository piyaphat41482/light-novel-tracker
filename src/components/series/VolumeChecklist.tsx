// แสดงรายการเล่มทั้งหมด เรียงตามเลขเล่ม พร้อมฟอร์มเพิ่มเล่มใหม่ด้วยมือ
// (ใช้กับกรณีเล่มพิเศษ เช่น "เล่ม 0" ที่ไม่ได้ถูกสร้างอัตโนมัติจาก latest_volume)

import { useState } from 'react'
import { Plus } from 'lucide-react'
import type { Volume } from '@/types/database'
import VolumeItem from './VolumeItem'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface VolumeChecklistProps {
  volumes: Volume[]
  onToggleVolume: (volumeId: string) => void
  onDeleteVolume: (volumeId: string) => void
  onAddVolume: (volumeNumber: string, isSpecialEdition: boolean) => void
}

function sortByVolumeNumber(a: Volume, b: Volume): number {
  const numA = Number(a.volume_number)
  const numB = Number(b.volume_number)
  if (!isNaN(numA) && !isNaN(numB)) return numA - numB
  return a.volume_number.localeCompare(b.volume_number)
}

export default function VolumeChecklist({
  volumes,
  onToggleVolume,
  onDeleteVolume,
  onAddVolume,
}: VolumeChecklistProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newVolumeNumber, setNewVolumeNumber] = useState('')
  const [isSpecial, setIsSpecial] = useState(false)

  const regularVolumes = volumes
    .filter((v) => !v.is_special_edition)
    .sort(sortByVolumeNumber)
  const specialVolumes = volumes
    .filter((v) => v.is_special_edition)
    .sort(sortByVolumeNumber)

  function handleAddSubmit() {
    if (!newVolumeNumber.trim()) return
    onAddVolume(newVolumeNumber.trim(), isSpecial)
    setNewVolumeNumber('')
    setIsSpecial(false)
    setShowAddForm(false)
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {regularVolumes.map((volume) => (
          <VolumeItem
            key={volume.id}
            label={
              volume.volume_title ? volume.volume_title : `Volume ${volume.volume_number}`
            }
            isOwned={volume.is_owned}
            onToggle={() => onToggleVolume(volume.id)}
            onDelete={() => onDeleteVolume(volume.id)}
          />
        ))}
      </div>

      {specialVolumes.length > 0 && (
        <div className="mb-4">
          <p className="text-slate-400 dark:text-slate-500 text-xs mb-2">ฉบับพิเศษ</p>
          <div className="flex flex-wrap gap-2">
            {specialVolumes.map((volume) => (
              <VolumeItem
                key={volume.id}
                label={volume.volume_title || `Volume ${volume.volume_number}`}
                isOwned={volume.is_owned}
                onToggle={() => onToggleVolume(volume.id)}
                onDelete={() => onDeleteVolume(volume.id)}
              />
            ))}
          </div>
        </div>
      )}

      {showAddForm ? (
        <div className="flex flex-wrap items-center gap-2 bg-slate-100 dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
          <Input
            placeholder="เลขเล่ม เช่น 0"
            value={newVolumeNumber}
            onChange={(e) => setNewVolumeNumber(e.target.value)}
            className="w-32 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
          />
          <label className="flex items-center gap-1.5 text-sm text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={isSpecial}
              onChange={(e) => setIsSpecial(e.target.checked)}
            />
            ฉบับพิเศษ
          </label>
          <Button size="sm" onClick={handleAddSubmit}>
            เพิ่ม
          </Button>
          <Button size="sm" variant="outline" onClick={() => setShowAddForm(false)}>
            ยกเลิก
          </Button>
        </div>
      ) : (
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <Plus size={16} />
          เพิ่มเล่ม (เช่น เล่ม 0, ฉบับพิเศษ)
        </button>
      )}
    </div>
  )
}