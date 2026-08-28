// ฟอร์มเพิ่ม/แก้ไข wishlist item ใช้ร่วมกันทั้งหน้า Add และ Edit
// โครงสร้างเดียวกับ SeriesForm แต่เรียบง่ายกว่ามาก เพราะ wishlist item เป็นข้อมูลอิสระ

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  wishlistFormSchema,
  type WishlistFormValues,
} from '@/lib/validation/wishlistSchema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface WishlistFormProps {
  defaultValues: WishlistFormValues
  onSubmit: (values: WishlistFormValues) => void
  submitLabel: string
}

const inputClass = 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white'
const labelClass = 'text-slate-700 dark:text-slate-300'

export default function WishlistForm({
  defaultValues,
  onSubmit,
  submitLabel,
}: WishlistFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<WishlistFormValues>({
    resolver: zodResolver(wishlistFormSchema),
    defaultValues,
  })

  const mediaType = watch('media_type')
  const priority = watch('priority')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-xl">
      <div className="space-y-2">
        <Label htmlFor="title" className={labelClass}>
          ชื่อเรื่องที่อยากได้ *
        </Label>
        <Input id="title" className={inputClass} {...register('title')} />
        {errors.title && (
          <p className="text-red-400 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label className={labelClass}>ประเภท *</Label>
        <Select
          value={mediaType}
          onValueChange={(value) => {
            if (value !== null) {
              setValue('media_type', value as WishlistFormValues['media_type'])
            }
          }}
        >
          <SelectTrigger className={inputClass}>
            <SelectValue placeholder="เลือกประเภท" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light_novel">ไลท์โนเวล</SelectItem>
            <SelectItem value="manga">มังงะ</SelectItem>
          </SelectContent>
        </Select>
        {errors.media_type && (
          <p className="text-red-400 text-sm">{errors.media_type.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label className={labelClass}>ระดับความสำคัญ</Label>
        <Select
          value={priority}
          onValueChange={(value) => {
            if (value !== null) {
              setValue('priority', value as WishlistFormValues['priority'])
            }
          }}
        >
          <SelectTrigger className={inputClass}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high">สำคัญมาก</SelectItem>
            <SelectItem value="medium">ปานกลาง</SelectItem>
            <SelectItem value="low">ไม่รีบ</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="estimated_price" className={labelClass}>
          ราคาประมาณ (บาท)
        </Label>
        <Input
          id="estimated_price"
          type="number"
          className={inputClass}
          {...register('estimated_price', { valueAsNumber: true })}
        />
        {errors.estimated_price && (
          <p className="text-red-400 text-sm">{errors.estimated_price.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="preferred_store" className={labelClass}>
          ร้านที่อยากซื้อ
        </Label>
        <Input
          id="preferred_store"
          className={inputClass}
          {...register('preferred_store')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reminder_date" className={labelClass}>
          วันที่อยากให้เตือน
        </Label>
        <Input
          id="reminder_date"
          type="date"
          className={inputClass}
          {...register('reminder_date')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes" className={labelClass}>
          โน้ต
        </Label>
        <Textarea
          id="notes"
          rows={3}
          className={inputClass}
          {...register('notes')}
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {submitLabel}
      </Button>
    </form>
  )
}