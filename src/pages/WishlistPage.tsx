// หน้า Wishlist - รายการอยากได้ที่เป็นอิสระจากคอลเลกชัน

import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchWishlist } from '@/lib/queries/wishlist'
import { deleteWishlistItem } from '@/lib/mutations/wishlist'
import WishlistItemCard from '@/components/wishlist/WishlistItemCard'
import ErrorState from '@/components/ui/error-state'
import type { WishlistPriority } from '@/types/database'

const priorityOrder: Record<WishlistPriority, number> = { high: 0, medium: 1, low: 2 }

export default function WishlistPage() {
  const queryClient = useQueryClient()
  const { data: wishlist, isLoading, error, refetch } = useQuery({
    queryKey: ['wishlist'],
    queryFn: fetchWishlist,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteWishlistItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wishlist'] }),
  })

  function handleDelete(id: string) {
    if (window.confirm('ลบรายการนี้ออกจาก wishlist ใช่ไหม?')) {
      deleteMutation.mutate(id)
    }
  }

  if (isLoading) {
    return <div className="p-8 text-slate-500 dark:text-slate-400">กำลังโหลดข้อมูล...</div>
  }

  if (error) {
    return <ErrorState message={error.message} onRetry={() => refetch()} />
  }

  const sortedWishlist = [...(wishlist ?? [])].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  )

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Wishlist</h1>
        <Link
          to="/wishlist/new"
          className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium px-3 py-2 rounded-lg transition-colors"
        >
          <Plus size={16} />
          เพิ่มรายการ
        </Link>
      </div>

      {sortedWishlist.length === 0 ? (
        <p className="text-slate-400 dark:text-slate-500 text-center py-12">
          ยังไม่มีรายการที่อยากได้ ลองกด "เพิ่มรายการ" ดูสิ
        </p>
      ) : (
        <div className="space-y-3 max-w-2xl">
          {sortedWishlist.map((item) => (
            <WishlistItemCard key={item.id} item={item} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}