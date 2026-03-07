import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface AlertTemplateProps {
  children: ReactNode
  type?: 'info' | 'success' | 'warning' | 'error'
  className?: string
}

const typeMap = {
  info: 'bg-blue-50 text-blue-800 border-blue-200',
  success: 'bg-green-50 text-green-800 border-green-200',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  error: 'bg-red-50 text-red-800 border-red-200',
}

export function AlertTemplate({ children, type = 'info', className }: AlertTemplateProps) {
  return (
    <div className={cn('border-l-4 p-4 rounded', typeMap[type], className)}>
      {children}
    </div>
  )
}
