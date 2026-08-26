// Component แสดง error state พร้อมปุ่มลองใหม่ ใช้ซ้ำได้ทุกหน้าที่มี useQuery
// ตาม requirement เรื่อง Error Handling ใน Phase 1 - สำคัญมากเพราะผู้ใช้อาจเจอเน็ตหลุดบ่อยตอนอยู่ในร้านหนังสือ

import { AlertTriangle, RotateCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorStateProps {
  message: string
  onRetry: () => void
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <AlertTriangle size={40} className="text-red-400 mb-4" />
      <p className="text-white font-medium mb-1">เกิดข้อผิดพลาด</p>
      <p className="text-slate-400 text-sm mb-6 max-w-sm">{message}</p>
      <Button onClick={onRetry} variant="outline" className="gap-2">
        <RotateCw size={16} />
        ลองอีกครั้ง
      </Button>
    </div>
  )
}