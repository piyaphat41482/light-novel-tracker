// การ์ดแสดงตัวเลขสถิติ 1 อัน รองรับทั้ง dark และ light mode
// accentColor ยังคงเป็นสีเดิม (เขียว/แดง) เพราะสื่อความหมายเฉพาะ ไม่ควรเปลี่ยนตามธีม

interface StatCardProps {
  label: string
  value: number
  accentColor?: string
}

export default function StatCard({
  label,
  value,
  accentColor = 'text-slate-900 dark:text-white',
}: StatCardProps) {
  return (
    <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
      <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">{label}</p>
      <p className={`text-2xl font-bold ${accentColor}`}>{value}</p>
    </div>
  )
}