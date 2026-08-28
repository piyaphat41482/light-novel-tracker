// ฟอร์มเพิ่ม/แก้ไขซีรีส์ ใช้ร่วมกันทั้งหน้า Add และ Edit
// รับค่าเริ่มต้น (defaultValues) เข้ามา - ถ้าเป็นหน้า Add จะเป็นค่าว่าง ถ้าเป็นหน้า Edit จะเป็นข้อมูลเดิมของซีรีส์นั้น

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { seriesFormSchema, type SeriesFormValues } from '@/lib/validation/seriesSchema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SeriesFormProps {
  defaultValues: SeriesFormValues
  onSubmit: (values: SeriesFormValues) => void
  submitLabel: string
}

const inputClass = 'bg-slate-800 border-slate-700 text-white'
const labelClass = 'text-slate-300'

export default function SeriesForm({
  defaultValues,
  onSubmit,
  submitLabel,
}: SeriesFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SeriesFormValues>({
    resolver: zodResolver(seriesFormSchema),
    defaultValues,
  })

  const mediaType = watch('media_type')
  const publicationStatus = watch('publication_status')
  const readingStatus = watch('reading_status')
  const isFavorite = watch('is_favorite')
  const isWishlist = watch('is_wishlist')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-xl">
      {/* ชื่อเรื่อง 3 ภาษา */}
      <div className="space-y-2">
        <Label htmlFor="title_english" className={labelClass}>
          ชื่อภาษาอังกฤษ
        </Label>
        <Input
          id="title_english"
          className={inputClass}
          {...register('title_english')}
        />
        {errors.title_english && (
          <p className="text-red-400 text-sm">{errors.title_english.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="title_original" className={labelClass}>
          ชื่อภาษาญี่ปุ่น
        </Label>
        <Input
          id="title_original"
          className={inputClass}
          {...register('title_original')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="title_thai" className={labelClass}>
          ชื่อภาษาไทย
        </Label>
        <Input
          id="title_thai"
          className={inputClass}
          {...register('title_thai')}
        />
      </div>

      {/* ประเภท */}
      <div className="space-y-2">
        <Label className={labelClass}>ประเภท *</Label>
        <Select
          value={mediaType}
          onValueChange={(value) =>
            setValue('media_type', value as SeriesFormValues['media_type'])
          }
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

      {/* สถานะการตีพิมพ์ */}
      <div className="space-y-2">
        <Label className={labelClass}>สถานะการตีพิมพ์</Label>
        <Select
          value={publicationStatus}
          onValueChange={(value) =>
            setValue(
              'publication_status',
              value as SeriesFormValues['publication_status']
            )
          }
        >
          <SelectTrigger className={inputClass}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ongoing">กำลังตีพิมพ์</SelectItem>
            <SelectItem value="completed">จบแล้ว</SelectItem>
            <SelectItem value="hiatus">หยุดพักชั่วคราว</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* สถานะการอ่าน */}
      <div className="space-y-2">
        <Label className={labelClass}>สถานะการอ่านของฉัน</Label>
        <Select
          value={readingStatus}
          onValueChange={(value) =>
            setValue('reading_status', value as SeriesFormValues['reading_status'])
          }
        >
          <SelectTrigger className={inputClass}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="not_started">ยังไม่เริ่มอ่าน</SelectItem>
            <SelectItem value="reading">กำลังอ่าน</SelectItem>
            <SelectItem value="completed">อ่านจบแล้ว</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* เล่มล่าสุด */}
      <div className="space-y-2">
        <Label htmlFor="latest_volume" className={labelClass}>
          เล่มล่าสุดที่วางขาย
        </Label>
        <Input
          id="latest_volume"
          type="number"
          className={inputClass}
          {...register('latest_volume', { valueAsNumber: true })}
        />
        {errors.latest_volume && (
          <p className="text-red-400 text-sm">{errors.latest_volume.message}</p>
        )}
      </div>
      {/* สำนักพิมพ์ */}
      <div className="space-y-2">
        <Label htmlFor="publisher_name" className={labelClass}>
          สำนักพิมพ์
        </Label>
        <Input
          id="publisher_name"
          className={inputClass}
          placeholder="เช่น Kadokawa"
          {...register('publisher_name')}
        />
      </div>

      {/* ผู้แต่ง */}
      <div className="space-y-2">
        <Label htmlFor="author_names" className={labelClass}>
          ผู้แต่ง
        </Label>
        <Input
          id="author_names"
          className={inputClass}
          placeholder="ถ้ามีหลายคน คั่นด้วยจุลภาค เช่น Asato Asato, คนอื่น"
          {...register('author_names')}
        />
      </div>
      {/* เรื่องย่อ */}
      <div className="space-y-2">
        <Label htmlFor="synopsis" className={labelClass}>
          เรื่องย่อ
        </Label>
        <Textarea
          id="synopsis"
          rows={4}
          className={inputClass}
          {...register('synopsis')}
        />
      </div>

      {/* ลิงก์รูปปก */}
      <div className="space-y-2">
        <Label htmlFor="cover_image_url" className={labelClass}>
          ลิงก์รูปปก
        </Label>
        <Input
          id="cover_image_url"
          placeholder="https://..."
          className={inputClass}
          {...register('cover_image_url')}
        />
        {errors.cover_image_url && (
          <p className="text-red-400 text-sm">
            {errors.cover_image_url.message}
          </p>
        )}
        <p className="text-slate-500 text-xs">
          ตอนนี้ยังใส่ได้แค่ลิงก์รูปเท่านั้น ระบบอัปโหลดรูปจากเครื่องจะเพิ่มทีหลัง
        </p>
      </div>

      {/* เก็บไว้ที่ */}
      <div className="space-y-2">
        <Label htmlFor="storage_location" className={labelClass}>
          เก็บไว้ที่
        </Label>
        <Input
          id="storage_location"
          className={inputClass}
          {...register('storage_location')}
        />
      </div>

      {/* โน้ต */}
      <div className="space-y-2">
        <Label htmlFor="notes" className={labelClass}>
          โน้ตส่วนตัว
        </Label>
        <Textarea
          id="notes"
          rows={3}
          className={inputClass}
          {...register('notes')}
        />
      </div>

      {/* Toggle switches */}
      <div className="flex items-center justify-between">
        <Label htmlFor="is_favorite" className={labelClass}>
          รายการโปรด
        </Label>
        <Switch
          id="is_favorite"
          checked={isFavorite}
          onCheckedChange={(checked) => setValue('is_favorite', checked)}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="is_wishlist" className={labelClass}>
          อยากได้ (Wishlist)
        </Label>
        <Switch
          id="is_wishlist"
          checked={isWishlist}
          onCheckedChange={(checked) => setValue('is_wishlist', checked)}
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {submitLabel}
      </Button>
    </form>
  )
}