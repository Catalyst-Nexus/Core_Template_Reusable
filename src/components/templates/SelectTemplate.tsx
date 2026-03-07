import { cn } from '@/lib/utils'
import type { SelectHTMLAttributes, ReactNode } from 'react'

interface SelectTemplateProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode
  className?: string
}

export function SelectTemplate({ children, className, ...props }: SelectTemplateProps) {
  return (
    <select
      className={cn('block w-full rounded border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50', className)}
      {...props}
    >
      {children}
    </select>
  )
}
