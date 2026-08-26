// หน้า Statistics - ดึงข้อมูลจริงจาก Supabase (ใช้ query เดียวกับ Dashboard/Collection/Search)

import { useQuery } from '@tanstack/react-query'
import { fetchAllSeries } from '@/lib/queries/series'
import {
  groupByPublisher,
  groupByGenre,
  getOwnedVsMissingData,
} from '@/lib/seriesHelpers'
import PublisherChart from '@/components/statistics/PublisherChart'
import GenreChart from '@/components/statistics/GenreChart'
import CompletionChart from '@/components/statistics/CompletionChart'

export default function StatisticsPage() {
  const { data: seriesList, isLoading, error } = useQuery({
    queryKey: ['series'],
    queryFn: fetchAllSeries,
  })

  if (isLoading) {
    return <div className="p-8 text-slate-400">กำลังโหลดข้อมูล...</div>
  }

  if (error) {
    return <div className="p-8 text-red-400">เกิดข้อผิดพลาด: {error.message}</div>
  }

  const series = seriesList ?? []
  const publisherData = groupByPublisher(series)
  const genreData = groupByGenre(series)
  const completionData = getOwnedVsMissingData(series)

  if (series.length === 0) {
    return (
      <div className="p-4 md:p-8">
        <h1 className="text-2xl font-bold text-white mb-6">Statistics</h1>
        <p className="text-slate-400">
          ยังไม่มีข้อมูลในคอลเลกชัน ลองเพิ่มซีรีส์ก่อนเพื่อดูสถิติ
        </p>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold text-white mb-6">Statistics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CompletionChart data={completionData} />
        <PublisherChart data={publisherData} />
        <GenreChart data={genreData} title="สัดส่วนไลท์โนเวล vs มังงะ" />
      </div>
    </div>
  )
}