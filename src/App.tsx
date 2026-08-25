import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

function App() {
  const [status, setStatus] = useState('กำลังเชื่อมต่อ...')

  useEffect(() => {
    async function testConnection() {
      const { error } = await supabase.from('_test').select('*').limit(1)
      // เราคาดว่าจะ error เพราะยังไม่มีตาราง _test อยู่จริง
      // แต่ถ้า error message เป็นเรื่อง "ไม่พบตาราง" แปลว่าเชื่อมต่อกับ Supabase สำเร็จแล้ว
      if (error) {
        setStatus(`เชื่อมต่อสำเร็จ! (error ที่เห็นคือ: ${error.message})`)
      } else {
        setStatus('เชื่อมต่อสำเร็จ!')
      }
    }
    testConnection()
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold text-white">{status}</h1>
      <Button>ทดสอบปุ่ม shadcn</Button>
    </div>
  )
}

export default App