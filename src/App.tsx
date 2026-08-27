// จุดตั้งค่า routing หลักของแอปทั้งหมด
// ใช้ React.lazy() เพื่อแบ่งโค้ดแต่ละหน้าออกเป็นไฟล์แยก โหลดเฉพาะตอนเข้าหน้านั้นจริงๆ
// ช่วยลดขนาดไฟล์ JS หลักที่ต้องโหลดตอนเปิดแอปครั้งแรก

import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'

// lazy() รับฟังก์ชันที่ import แบบ dynamic (import()) แทนการ import ปกติด้านบนไฟล์
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const CollectionPage = lazy(() => import('@/pages/CollectionPage'))
const SearchPage = lazy(() => import('@/pages/SearchPage'))
const SeriesDetailPage = lazy(() => import('@/pages/SeriesDetailPage'))
const AddSeriesPage = lazy(() => import('@/pages/AddSeriesPage'))
const EditSeriesPage = lazy(() => import('@/pages/EditSeriesPage'))
const WishlistPage = lazy(() => import('@/pages/WishlistPage'))
const StatisticsPage = lazy(() => import('@/pages/StatisticsPage'))
const SettingsPage = lazy(() => import('@/pages/SettingsPage'))

// ตัว fallback ง่ายๆ ที่โชว์ระหว่างรอโหลดไฟล์ของหน้านั้น (ปกติเร็วมาก อาจไม่ทันเห็นด้วยซ้ำ)
function PageLoading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh] text-slate-400">
      กำลังโหลดหน้า...
    </div>
  )
}

function App() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="collection" element={<CollectionPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="series/new" element={<AddSeriesPage />} />
          <Route path="series/:id" element={<SeriesDetailPage />} />
          <Route path="series/:id/edit" element={<EditSeriesPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="statistics" element={<StatisticsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App