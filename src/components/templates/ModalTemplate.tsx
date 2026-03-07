import * as Dialog from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface ModalTemplateProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  children: ReactNode
}

export function ModalTemplate({ open, onOpenChange, title, children }: ModalTemplateProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
          {title && <Dialog.Title className="text-lg font-semibold mb-4">{title}</Dialog.Title>}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
