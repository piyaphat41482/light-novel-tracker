// หน้าเพิ่มรายการอยากได้ใหม่ - เป็นอิสระจากคอลเลกชัน ไม่ต้องมีซีรีส์อยู่ในระบบมาก่อน

import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createWishlistItem } from '@/lib/mutations/wishlist'
import WishlistForm from '@/components/wishlist/WishlistForm'
import type { WishlistFormValues } from '@/lib/validation/wishlistSchema'

const emptyDefaults: WishlistFormValues = {
  title: '',
  media_type: 'light_novel',
  priority: 'medium',
  preferred_store: '',
  reminder_date: '',
  notes: '',
}

export default function AddWishlistPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createWishlistItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] })
      navigate('/wishlist')
    },
  })

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        เพิ่มรายการที่อยากได้
      </h1>

      {mutation.isError && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          บันทึกไม่สำเร็จ: {mutation.error.message}
        </div>
      )}

      <WishlistForm
        defaultValues={emptyDefaults}
        onSubmit={(values) => mutation.mutate(values)}
        submitLabel={mutation.isPending ? 'กำลังบันทึก...' : 'บันทึก'}
      />
    </div>
  )
}