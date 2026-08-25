// หน้า Dashboard - สรุปภาพรวมคอลเลกชันทั้งหมด
// ใช้ mock data ไปก่อน จะเปลี่ยนเป็นข้อมูลจริงจาก Supabase ใน milestone ถัดไป

import { mockSeries } from '@/data/mockSeries'
import { calculateDashboardStats } from '@/lib/seriesHelpers'
import StatCard from '@/components/dashboard/StatCard'
import SeriesCard from '@/components/series/SeriesCard'

export default function DashboardPage() {
  const stats = calculateDashboardStats(mockSeries)

  // "เพิ่มล่าสุด" เอาแค่ 5 อันดับแรก เรียงตามวันที่สร้าง (ใหม่สุดก่อน)
  const recentlyAdded = [...mockSeries]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 5)

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>

      {/* กลุ่มสถิติ 6 อัน */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        <StatCard label="Total Series" value={stats.totalSeries} />
        <StatCard
          label="Owned Volumes"
          value={stats.totalOwnedVolumes}
          accentColor="text-emerald-400"
        />
        <StatCard
          label="Missing Volumes"
          value={stats.totalMissingVolumes}
          accentColor="text-red-400"
        />
        <StatCard label="Completed Series" value={stats.completedSeriesCount} />
        <StatCard label="Ongoing Series" value={stats.ongoingSeriesCount} />
        <StatCard label="Wishlist" value={stats.wishlistCount} />
      </div>

      {/* Recently Added */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-3">
          Recently Added
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {recentlyAdded.map((series) => (
            <SeriesCard key={series.id} series={series} />
          ))}
        </div>
      </section>
    </div>
  )
}