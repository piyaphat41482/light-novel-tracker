// หน้า Wishlist - แสดงรายการที่อยากได้ เรียงตามความสำคัญก่อนเสมอ

import { mockWishlist } from '@/data/mockWishlist'
import WishlistItemCard from '@/components/wishlist/WishlistItemCard'
import type { WishlistPriority } from '@/types/database'

// กำหนดลำดับความสำคัญไว้เป็นตัวเลข เพื่อใช้เรียงลำดับ (high ต้องมาก่อนเสมอ)
const priorityOrder: Record<WishlistPriority, number> = {
  high: 0,
  medium: 1,
  low: 2,
}

export default function WishlistPage() {
  const sortedWishlist = [...mockWishlist].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  )

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold text-white mb-6">Wishlist</h1>

      {sortedWishlist.length === 0 ? (
        <p className="text-slate-400 text-center py-12">
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