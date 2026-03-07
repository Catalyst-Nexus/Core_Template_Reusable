import { cn } from '@/lib/utils'
import type { InputHTMLAttributes } from 'react'

interface InputTemplateProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export function InputTemplate({ className, ...props }: InputTemplateProps) {
  return (
    <input
      className={cn('block w-full rounded border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50', className)}
      {...props}
    />
  )
}
