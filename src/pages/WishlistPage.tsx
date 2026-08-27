// หน้า Wishlist - ดึงข้อมูลจริงจาก Supabase

import { useQuery } from '@tanstack/react-query'
import { fetchWishlist } from '@/lib/queries/wishlist'
import WishlistItemCard from '@/components/wishlist/WishlistItemCard'
import type { WishlistPriority } from '@/types/database'
import ErrorState from '@/components/ui/error-state'

const priorityOrder: Record<WishlistPriority, number> = {
  high: 0,
  medium: 1,
  low: 2,
}

export default function WishlistPage() {
const { data: wishlist, isLoading, error, refetch } = useQuery({
  queryKey: ['wishlist'],
  queryFn: fetchWishlist,
})

  if (isLoading) {
    return <div className="p-8 text-slate-400">กำลังโหลดข้อมูล...</div>
  }

if (error) {
  return <ErrorState message={error.message} onRetry={() => refetch()} />
}
  const sortedWishlist = [...(wishlist ?? [])].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  )

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Wishlist</h1>

      {sortedWishlist.length === 0 ? (
<p className="text-slate-400 dark:text-slate-500 text-center py-12">
  ยังไม่มีรายการที่อยากได้ ลองไปกดหัวใจในหน้ารายละเอียดซีรีส์ดูสิ
</p>
      ) : (
        <div className="space-y-3 max-w-2xl">
          {sortedWishlist.map((item) => (
            <WishlistItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}