// หน้าแก้ไขรายการที่อยากได้

import { useParams, useNavigate, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchWishlistItemById } from '@/lib/queries/wishlist'
import { updateWishlistItem } from '@/lib/mutations/wishlist'
import WishlistForm from '@/components/wishlist/WishlistForm'
import type { WishlistFormValues } from '@/lib/validation/wishlistSchema'

export default function EditWishlistPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: item, isLoading } = useQuery({
    queryKey: ['wishlist', id],
    queryFn: () => fetchWishlistItemById(id!),
    enabled: !!id,
  })

  const mutation = useMutation({
    mutationFn: (values: WishlistFormValues) => updateWishlistItem(id!, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] })
      navigate('/wishlist')
    },
  })

  if (isLoading) {
    return <div className="p-8 text-slate-500 dark:text-slate-400">กำลังโหลดข้อมูล...</div>
  }

  if (!item) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-400 dark:text-slate-500 mb-4">ไม่พบรายการที่ต้องการแก้ไข</p>
        <Link to="/wishlist" className="text-emerald-500 dark:text-emerald-400 hover:underline">
          กลับไปหน้า Wishlist
        </Link>
      </div>
    )
  }

  const defaultValues: WishlistFormValues = {
    title: item.title,
    media_type: item.media_type,
    priority: item.priority,
    estimated_price: item.estimated_price ?? undefined,
    preferred_store: item.preferred_store ?? '',
    reminder_date: item.reminder_date ?? '',
    notes: item.notes ?? '',
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        แก้ไข: {item.title}
      </h1>

      {mutation.isError && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          บันทึกไม่สำเร็จ: {mutation.error.message}
        </div>
      )}

      <WishlistForm
        defaultValues={defaultValues}
        onSubmit={(values) => mutation.mutate(values)}
        submitLabel={mutation.isPending ? 'กำลังบันทึก...' : 'บันทึกการแก้ไข'}
      />
    </div>
  )
}