import React from 'react'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'

export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'info'
  text: string
}

interface ToastProps {
  toasts: ToastMessage[]
  onDismiss: (id: string) => void
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null

  return (
    <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl shadow-2xl border backdrop-blur-md transition-all duration-300 animate-fade-in ${
            toast.type === 'success'
              ? 'bg-wedding-card/95 border-wedding-gold text-wedding-dark shadow-wedding-gold/20'
              : toast.type === 'error'
              ? 'bg-red-50/95 border-red-300 text-red-900 shadow-red-500/10'
              : 'bg-wedding-card/95 border-wedding-sand text-wedding-dark'
          }`}
        >
          <div className="flex items-center gap-3">
            {toast.type === 'success' && (
              <CheckCircle className="w-5 h-5 text-wedding-gold flex-shrink-0" />
            )}
            {toast.type === 'error' && (
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            )}
            {toast.type === 'info' && (
              <Info className="w-5 h-5 text-wedding-muted flex-shrink-0" />
            )}
            <p className="text-sm font-medium">{toast.text}</p>
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-wedding-muted hover:text-wedding-dark p-1 rounded-md transition-colors"
            aria-label="Tutup notifikasi"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
