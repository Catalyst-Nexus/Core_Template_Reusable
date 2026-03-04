import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'

interface BaseDialogProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  onSubmit: () => void
  submitLabel?: string
  cancelLabel?: string
}

export const BaseDialog = ({
  open,
  onClose,
  title,
  children,
  onSubmit,
  submitLabel = 'Create',
  cancelLabel = 'Cancel',
}: BaseDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-surface border border-border rounded-2xl shadow-2xl z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-border">
            <Dialog.Title className="text-lg font-semibold text-primary">
              {title}
            </Dialog.Title>
            <Dialog.Close className="p-2 rounded-lg hover:bg-background transition-colors text-muted">
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>

          {/* Body */}
          <div className="p-5">{children}</div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-5 border-t border-border">
            <Dialog.Close className="px-4 py-2.5 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-background transition-colors">
              {cancelLabel}
            </Dialog.Close>
            <button
              className="px-4 py-2.5 bg-success text-white rounded-lg text-sm font-medium hover:bg-success/90 transition-colors"
              onClick={onSubmit}
            >
              {submitLabel}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

// Form Input Component
interface FormInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: 'text' | 'email' | 'textarea'
  rows?: number
}

export const FormInput = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  rows = 4,
}: FormInputProps) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-medium text-foreground">{label}</label>
    {type === 'textarea' ? (
      <textarea
        className="w-full px-3 py-2.5 border border-border rounded-lg text-sm bg-background text-foreground placeholder:text-muted focus:outline-none focus:border-success resize-none"
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    ) : (
      <input
        type={type}
        className="w-full px-3 py-2.5 border border-border rounded-lg text-sm bg-background text-foreground placeholder:text-muted focus:outline-none focus:border-success"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    )}
  </div>
)

export default BaseDialog
