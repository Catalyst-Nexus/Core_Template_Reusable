import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonTemplateProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'danger'
}

export function ButtonTemplate({
  children,
  className,
  variant = 'primary',
  ...props
}: ButtonTemplateProps) {
  const base = 'px-4 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  }
  return (
    <button
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  )
}
