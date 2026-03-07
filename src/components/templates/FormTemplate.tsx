import { cn } from '@/lib/utils'
import type { ReactNode, FormHTMLAttributes } from 'react'

interface FormTemplateProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode
  className?: string
}

export function FormTemplate({ children, className, ...props }: FormTemplateProps) {
  return (
    <form className={cn('space-y-4', className)} {...props}>
      {children}
    </form>
  )
}
