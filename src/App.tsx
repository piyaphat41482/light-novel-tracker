// จุดตั้งค่า routing หลักของแอปทั้งหมด
// กำหนดว่า URL ไหน แสดง component ไหน

import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import DashboardPage from '@/pages/DashboardPage'
import CollectionPage from '@/pages/CollectionPage'
import WishlistPage from '@/pages/WishlistPage'
import StatisticsPage from '@/pages/StatisticsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="collection" element={<CollectionPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="statistics" element={<StatisticsPage />} />
      </Route>
    </Routes>
  )
}

export default App