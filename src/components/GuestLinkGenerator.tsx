import React, { useState } from 'react'
import { Share2, Copy, Check, Send, X, Sparkles, UserPlus } from 'lucide-react'
import { weddingConfig } from '../config/wedding'
import { generateGuestUrl, generateWhatsAppBroadcastMessage, copyToClipboard } from '../utils/helpers'

interface GuestLinkGeneratorProps {
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void
}

export const GuestLinkGenerator: React.FC<GuestLinkGeneratorProps> = ({ showToast }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [guestNameInput, setGuestNameInput] = useState('')
  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedMessage, setCopiedMessage] = useState(false)

  if (!weddingConfig.features.guestLinkGenerator) return null

  const targetName = guestNameInput.trim() || 'Nama Tamu'
  const generatedUrl = generateGuestUrl(targetName)
  const broadcastText = generateWhatsAppBroadcastMessage(targetName, generatedUrl)

  const handleCopyLink = async () => {
    const success = await copyToClipboard(generatedUrl)
    if (success) {
      setCopiedLink(true)
      showToast('Link undangan khusus berhasil disalin!', 'success')
      setTimeout(() => setCopiedLink(false), 2000)
    }
  }

  const handleCopyMessage = async () => {
    const success = await copyToClipboard(broadcastText)
    if (success) {
      setCopiedMessage(true)
      showToast('Format pesan WhatsApp berhasil disalin!', 'success')
      setTimeout(() => setCopiedMessage(false), 2000)
    }
  }

  const handleShareToWhatsApp = () => {
    const waUrl = `https://wa.me/?text=${encodeURIComponent(broadcastText)}`
    window.open(waUrl, '_blank')
  }

  return (
    <>
      {/* Floating Trigger Button on Bottom-Left */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 left-16 sm:bottom-8 sm:left-24 z-40 px-3.5 py-2.5 rounded-full bg-wedding-dark text-wedding-gold border border-wedding-gold/60 shadow-luxury hover:bg-wedding-charcoal hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 text-xs font-semibold backdrop-blur-md cursor-pointer"
        aria-label="Buat Link Undangan Tamu"
        title="Tool Khusus Mempelai: Buat Link Undangan Tamu WhatsApp"
      >
        <Share2 className="w-3.5 h-3.5 text-wedding-gold" />
        <span className="hidden sm:inline">Bagikan Undangan</span>
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="glass-card-dark text-white p-6 sm:p-8 rounded-3xl max-w-lg w-full border border-wedding-gold/50 shadow-2xl relative animate-fade-up max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2.5 mb-2">
              <div className="p-2 rounded-xl bg-wedding-gold/20 text-wedding-gold">
                <UserPlus className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Generator Link Tamu
              </h3>
            </div>
            <p className="text-xs text-gray-300 mb-6">
              Fitur khusus untuk mempelai: Masukkan nama tamu untuk menghasilkan tautan undangan personal yang siap dibagikan via WhatsApp.
            </p>

            {/* Input Guest Name */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-wedding-gold-light mb-1.5">
                  Nama Tamu / Keluarga
                </label>
                <input
                  type="text"
                  value={guestNameInput}
                  onChange={(e) => setGuestNameInput(e.target.value)}
                  placeholder="Contoh: Bapak Joko Wirowidjojo & Keluarga"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-wedding-gold"
                />
              </div>

              {/* Generated URL Box */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-wedding-gold-light mb-1.5">
                  URL Undangan Khusus:
                </label>
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-wedding-gold-light break-all select-all">
                  {generatedUrl}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-4 py-2.5 rounded-xl border border-wedding-gold text-wedding-gold-light hover:bg-wedding-gold hover:text-wedding-dark text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedLink ? 'Link Tersalin!' : 'Salin Link Undangan'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleShareToWhatsApp}
                  className="gold-shimmer-btn px-4 py-2.5 rounded-xl text-wedding-dark text-xs font-bold flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Bagikan ke WhatsApp</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleCopyMessage}
                className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedMessage ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedMessage ? 'Teks WhatsApp Tersalin!' : 'Salin Seluruh Teks Broadcast WhatsApp'}</span>
              </button>
            </div>

            {/* Preview Box */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
              <div className="flex items-center gap-1.5 text-wedding-gold text-[11px] font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pratinjau Pesan:</span>
              </div>
              <p className="whitespace-pre-line text-[11px] leading-relaxed line-clamp-4 italic text-gray-400">
                {broadcastText}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
