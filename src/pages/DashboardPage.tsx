// หน้า Dashboard - ตอนนี้ดึงข้อมูลจริงจาก Supabase แล้ว (ไม่ใช้ mock data อีกต่อไป)

import { useQuery } from '@tanstack/react-query'
import { fetchAllSeries } from '@/lib/queries/series'
import { calculateDashboardStats } from '@/lib/seriesHelpers'
import StatCard from '@/components/dashboard/StatCard'
import SeriesCard from '@/components/series/SeriesCard'
import StatCardSkeleton from '@/components/dashboard/StatCardSkeleton'
import SeriesCardSkeleton from '@/components/series/SeriesCardSkeleton'

export default function DashboardPage() {
  const {
    data: seriesList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['series'],
    queryFn: fetchAllSeries,
  })

  // สถานะกำลังโหลด - แสดงข้อความง่ายๆ ไปก่อน (Phase 8 จะทำ skeleton loading ให้สวยขึ้น)
if (isLoading) {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      <h2 className="text-lg font-semibold text-white mb-3">Recently Added</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <SeriesCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

  // สถานะ error - ดึงข้อมูลไม่สำเร็จ
  if (error) {
    return (
      <div className="p-8 text-red-400">
        เกิดข้อผิดพลาด: {error.message}
      </div>
    )
  }

  const series = seriesList ?? []
  const stats = calculateDashboardStats(series)

  const recentlyAdded = [...series]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 5)

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>

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

      <section>
        <h2 className="text-lg font-semibold text-white mb-3">
          Recently Added
        </h2>
        {recentlyAdded.length === 0 ? (
          <p className="text-slate-500 text-sm">
            ยังไม่มีซีรีส์ในคอลเลกชัน ลองเพิ่มซีรีส์แรกดูสิ
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {recentlyAdded.map((series) => (
              <SeriesCard key={series.id} series={series} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}