import { cn } from '@/lib/utils'
import type { ImgHTMLAttributes } from 'react'

interface AvatarTemplateProps extends ImgHTMLAttributes<HTMLImageElement> {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-20 h-20',
}

export function AvatarTemplate({ size = 'md', className, ...props }: AvatarTemplateProps) {
  return (
    <img
      className={cn('rounded-full object-cover', sizeMap[size], className)}
      {...props}
    />
  )
}
