// หน้า Settings - ตั้งค่าทั่วไปของแอป
// หมายเหตุ: การสลับ dark/light mode จริงจะทำใน Phase 8 (Polish)
// ตอนนี้เป็นแค่ UI แสดงตำแหน่งไว้ก่อน

import { useState } from 'react'
import { Moon, Info, Database, ExternalLink } from 'lucide-react'
import { Switch } from '@/components/ui/switch'

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true)

  return (
    <div className="p-4 md:p-8 max-w-xl">
      <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>

      <section className="mb-6">
        <h2 className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-3">
          การแสดงผล
        </h2>
        <div className="bg-slate-800 rounded-xl border border-slate-700 divide-y divide-slate-700">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Moon size={18} className="text-slate-400" />
              <div>
                <p className="text-white text-sm font-medium">โหมดมืด</p>
                <p className="text-slate-500 text-xs">
                  ระบบสลับธีมเต็มรูปแบบจะพร้อมใช้งานเร็วๆ นี้
                </p>
              </div>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-3">
          ข้อมูล
        </h2>
        <div className="bg-slate-800 rounded-xl border border-slate-700 divide-y divide-slate-700">
          <button className="w-full flex items-center gap-3 p-4 text-left hover:bg-slate-750 transition-colors">
            <Database size={18} className="text-slate-400" />
            <div>
              <p className="text-white text-sm font-medium">ส่งออกข้อมูล</p>
              <p className="text-slate-500 text-xs">จะเพิ่มในเวอร์ชันถัดไป</p>
            </div>
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-3">
          เกี่ยวกับ
        </h2>
        <div className="bg-slate-800 rounded-xl border border-slate-700 divide-y divide-slate-700">
          <div className="flex items-center gap-3 p-4">
            <Info size={18} className="text-slate-400" />
            <div>
              <p className="text-white text-sm font-medium">
                Light Novel & Manga Tracker
              </p>
              <p className="text-slate-500 text-xs">เวอร์ชัน 0.1.0 (กำลังพัฒนา)</p>
            </div>
          </div>
          
            <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 hover:bg-slate-750 transition-colors"
          >
            <ExternalLink size={18} className="text-slate-400" />
            <p className="text-white text-sm font-medium">ซอร์สโค้ดบน GitHub</p>
          </a>
        </div>
      </section>
    </div>
  )
}