// Layout หลักของแอป - ห่อทุกหน้าไว้ด้วยกัน
// จัดการ Sidebar (เดสก์ท็อป) และ BottomNav (มือถือ) พร้อมกัน
// ใช้ <Outlet /> เป็นจุดที่ React Router จะเอาเนื้อหาของแต่ละหน้ามาแสดงตรงนี้

import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import BottomNav from './BottomNav'

export default function Layout() {
  return (
<div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
      <Sidebar />

      {/* md:pl-56 = เว้นพื้นที่ด้านซ้ายให้ Sidebar บนจอกว้าง ไม่ทับเนื้อหา */}
      <div className="md:pl-56">
        {/* pb-20 = เว้นพื้นที่ด้านล่างให้ BottomNav บนมือถือ ไม่บังเนื้อหา */}
        <main className="pb-20 md:pb-0">
          <Outlet />
        </main>
      </div>

      <BottomNav />
    </div>
  )
}