// การ์ดแสดงตัวเลขสถิติ 1 อัน ใช้ซ้ำ 6 ครั้งในหน้า Dashboard
// เช่น "Total Series: 200", "Missing Volumes: 45"

interface StatCardProps {
  label: string
  value: number
  accentColor?: string
}

export default function StatCard({
  label,
  value,
  accentColor = 'text-white',
}: StatCardProps) {
  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
      <p className="text-slate-400 text-xs mb-1">{label}</p>
      <p className={`text-2xl font-bold ${accentColor}`}>{value}</p>
    </div>
  )
}