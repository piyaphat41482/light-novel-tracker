// หน้า Statistics - รวมกราฟสถิติทั้งหมดของคอลเลกชัน

import { mockSeries } from '@/data/mockSeries'
import {
  groupByPublisher,
  groupByGenre,
  getOwnedVsMissingData,
} from '@/lib/seriesHelpers'
import PublisherChart from '@/components/statistics/PublisherChart'
import GenreChart from '@/components/statistics/GenreChart'
import CompletionChart from '@/components/statistics/CompletionChart'

export default function StatisticsPage() {
  const publisherData = groupByPublisher(mockSeries)
  const genreData = groupByGenre(mockSeries)
  const completionData = getOwnedVsMissingData(mockSeries)

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