// แถบเมนูด้านล่าง แสดงเฉพาะบนจอแคบ (มือถือ)
// ตามที่คุยกันใน Phase 4 - นิ้วโป้งเอื้อมด้านล่างจอง่ายกว่า

import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Library, Search, Heart, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', label: 'หน้าแรก', icon: LayoutDashboard },
  { to: '/collection', label: 'คอลเลกชัน', icon: Library },
  { to: '/search', label: 'ค้นหา', icon: Search },
  { to: '/wishlist', label: 'อยากได้', icon: Heart },
  { to: '/statistics', label: 'สถิติ', icon: BarChart3 },
]

export default function BottomNav() {
  return (
   <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex justify-around py-2 z-50">
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            cn(
              'flex flex-col items-center gap-1 px-3 py-1 rounded-lg text-xs transition-colors',
              isActive ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'
            )
          }
        >
          <Icon size={20} />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}