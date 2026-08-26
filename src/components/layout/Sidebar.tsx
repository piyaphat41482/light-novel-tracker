// แถบเมนูด้านข้าง แสดงเฉพาะบนจอกว้าง (เดสก์ท็อป/แท็บเล็ต)
// ใช้ NavLink แทน Link ธรรมดา เพราะ NavLink บอกได้ว่า "อยู่หน้านี้อยู่หรือเปล่า" ทำให้ไฮไลต์เมนูที่เลือกอยู่ได้

import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Library,
  Search,
  Heart,
  BarChart3,
  Settings,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/collection', label: 'Collection', icon: Library },
  { to: '/search', label: 'Search', icon: Search },
  { to: '/wishlist', label: 'Wishlist', icon: Heart },
  { to: '/statistics', label: 'Statistics', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  return (
<aside className="hidden md:flex md:w-56 md:flex-col md:fixed md:inset-y-0 bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 p-4 transition-colors">
  <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 px-2">
        📚 My Collection
      </h2>
      <nav className="flex flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
  ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white'
  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
              )
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}