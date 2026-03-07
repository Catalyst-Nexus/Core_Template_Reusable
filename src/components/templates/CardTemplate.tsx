import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface CardTemplateProps {
  children: ReactNode
  className?: string
}

export function CardTemplate({ children, className }: CardTemplateProps) {
  return (
    <div className={cn('bg-white rounded-lg shadow p-6', className)}>
      {children}
    </div>
  )
}
