// Skeleton ของ StatCard - ใช้ตอนกำลังโหลดสถิติหน้า Dashboard

import { Skeleton } from '@/components/ui/skeleton'

export default function StatCardSkeleton() {
  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
      <Skeleton className="h-3 w-16 mb-2" />
      <Skeleton className="h-7 w-10" />
    </div>
  )
}