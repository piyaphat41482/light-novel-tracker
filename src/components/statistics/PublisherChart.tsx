// กราฟวงกลมแสดงสัดส่วนจำนวนซีรีส์ตามสำนักพิมพ์

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

interface PublisherChartProps {
  data: ChartDataItem[]
}

// สีชุดหนึ่งที่ใช้วนไปเรื่อยๆ ถ้าสำนักพิมพ์เยอะกว่าจำนวนสีที่มี
const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

export default function PublisherChart({ data }: PublisherChartProps) {
  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
      <h3 className="text-white font-semibold mb-4">สัดส่วนตามสำนักพิมพ์</h3>
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