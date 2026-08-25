// แสดงรายการเล่มทั้งหมดของซีรีส์หนึ่งเรื่อง เป็น grid ของ VolumeItem
// จัดการ state ของแต่ละเล่มไว้ตรงนี้ แล้วส่ง callback ให้ VolumeItem แต่ละอันเรียกใช้

import type { Volume } from '@/types/database'
import VolumeItem from './VolumeItem'

interface VolumeChecklistProps {
  volumes: Volume[]
  onToggleVolume: (volumeId: string) => void
}

export default function VolumeChecklist({
  volumes,
  onToggleVolume,
}: VolumeChecklistProps) {
  // แยกเล่มปกติ กับฉบับพิเศษออกจากกัน เพื่อจัดกลุ่มแสดงผลแยกส่วน
  const regularVolumes = volumes.filter((v) => !v.is_special_edition)
  const specialVolumes = volumes.filter((v) => v.is_special_edition)

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {regularVolumes.map((volume) => (
          <VolumeItem
            key={volume.id}
            label={
              volume.volume_title
                ? volume.volume_title
                : `Volume ${volume.volume_number}`
            }
            isOwned={volume.is_owned}
            onToggle={() => onToggleVolume(volume.id)}
          />
        ))}
      </div>

      {specialVolumes.length > 0 && (
        <div>
          <p className="text-slate-500 text-xs mb-2">ฉบับพิเศษ</p>
          <div className="flex flex-wrap gap-2">
            {specialVolumes.map((volume) => (
              <VolumeItem
                key={volume.id}
                label={volume.volume_title || `Volume ${volume.volume_number}`}
                isOwned={volume.is_owned}
                onToggle={() => onToggleVolume(volume.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}