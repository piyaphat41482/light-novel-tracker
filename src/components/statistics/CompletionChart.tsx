// กราฟแท่งแสดงจำนวนเล่มที่มีแล้ว vs ยังขาด ทั้งคอลเลกชัน

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

interface ChartDataItem {
  name: string
  value: number
}

interface CompletionChartProps {
  data: ChartDataItem[]
}

export default function CompletionChart({ data }: CompletionChartProps) {
  return (
<div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
  <h3 className="text-slate-900 dark:text-white font-semibold mb-4">เล่มที่มีแล้ว vs ยังขาด</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.name === 'มีแล้ว' ? '#10b981' : '#ef4444'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}