// Skeleton ของ SeriesCard - ใช้ตอนกำลังโหลดข้อมูล series
// โครงสร้างต้องเหมือน SeriesCard.tsx จริงๆ (ปก + ชื่อ + progress bar) เพื่อไม่ให้หน้าจอ "กระโดด" ตอนข้อมูลโหลดเสร็จ

import { Skeleton } from '@/components/ui/skeleton'

export default function SeriesCardSkeleton() {
  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
      {/* ปกหนังสือ - สัดส่วนเดียวกับของจริง */}
      <Skeleton className="aspect-[2/3] rounded-none" />

      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-1.5 w-full rounded-full mt-2" />
        <div className="flex justify-between">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-8" />
        </div>
      </div>
    </div>
  )
}