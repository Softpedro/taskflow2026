import type { ReactNode } from 'react'

interface TaskModalProps {
  header: ReactNode
  children: ReactNode
  footer: ReactNode
  onClose: () => void
}

export function TaskModal({ header, footer, children, onClose }: TaskModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="w-full max-w-md rounded-lg bg-white p-4" onClick={(e) => e.stopPropagation()}>
        {/* Cada slot se renderiza en SU zona fija */}
        <div className="mb-3 border-b border-gray-200 pb-2 font-semibold">{header}</div>
        <div className="mb-4">{children}</div>
        <div className="flex justify-end gap-2 border-t border-gray-200 pt-3">{footer}</div>
      </div>
    </div>
  )
}