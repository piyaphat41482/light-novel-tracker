// กราฟวงกลมแสดงสัดส่วน (ตอนนี้ใช้ media_type แทน genre จริง จนกว่าจะเชื่อม Supabase)
// โครงสร้างเดียวกับ PublisherChart แต่แยกไฟล์ไว้เผื่ออนาคตอยากปรับแต่งให้ต่างกัน

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface ChartDataItem {
  name: string
  value: number
}

interface GenreChartProps {
  data: ChartDataItem[]
  title: string
}

const COLORS = ['#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b']

export default function GenreChart({ data, title }: GenreChartProps) {
  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={(entry) => `${entry.name}: ${entry.value}`}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}