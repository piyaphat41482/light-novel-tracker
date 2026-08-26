import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import DashboardPage from '@/pages/DashboardPage'
import CollectionPage from '@/pages/CollectionPage'
import SearchPage from '@/pages/SearchPage'
import SeriesDetailPage from '@/pages/SeriesDetailPage'
import AddSeriesPage from '@/pages/AddSeriesPage'
import EditSeriesPage from '@/pages/EditSeriesPage'
import WishlistPage from '@/pages/WishlistPage'
import StatisticsPage from '@/pages/StatisticsPage'
import SettingsPage from '@/pages/SettingsPage'

function App() {
  return (
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
  )
}

export default App