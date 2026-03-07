import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface BadgeTemplateProps {
  children: ReactNode
  color?: 'gray' | 'blue' | 'green' | 'red' | 'yellow'
  className?: string
}

const colorMap = {
  gray: 'bg-gray-100 text-gray-800',
  blue: 'bg-blue-100 text-blue-800',
  green: 'bg-green-100 text-green-800',
  red: 'bg-red-100 text-red-800',
  yellow: 'bg-yellow-100 text-yellow-800',
}

export function BadgeTemplate({ children, color = 'gray', className }: BadgeTemplateProps) {
  return (
    <span className={cn('inline-block rounded px-2 py-0.5 text-xs font-semibold', colorMap[color], className)}>
      {children}
    </span>
  )
}
