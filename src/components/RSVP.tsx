import React, { useState } from 'react'
import { CheckCircle2, User, Users, MessageSquare, Send, Check } from 'lucide-react'
import { weddingConfig } from '../config/wedding'
import { RSVPService } from '../services/rsvpService'
import { createWhatsAppRSVPUrl } from '../utils/helpers'

interface RSVPProps {
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void
  onRSVPSubmitted: () => void
  initialGuestName?: string
}

export const RSVP: React.FC<RSVPProps> = ({
  showToast,
  onRSVPSubmitted,
  initialGuestName = '',
}) => {
  const [name, setName] = useState(initialGuestName)
  const [attendance, setAttendance] = useState<'Hadir' | 'Tidak Hadir' | 'Belum Pasti'>('Hadir')
  const [guestCount, setGuestCount] = useState(1)
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState<string | null>(null)

  const { features, rsvp } = weddingConfig

  if (!features.rsvp) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      showToast('Mohon masukkan nama lengkap Anda', 'error')
      return
    }

    setIsSubmitting(true)

    try {
      const result = await RSVPService.submitRSVP({
        name: name.trim(),
        attendance,
        guestCount,
        message: message.trim() || 'Selamat berbahagia untuk kedua mempelai!',
      })

      // Notify parent to refresh wishes list
      onRSVPSubmitted()

      // Generate WhatsApp confirmation URL
      if (rsvp.whatsappNumber) {
        const waUrl = createWhatsAppRSVPUrl(
          rsvp.whatsappNumber,
          name.trim(),
          attendance,
          guestCount,
          message.trim()
        )
        setWhatsappRedirectUrl(waUrl)
        
        // Auto open WhatsApp in new tab
        try {
          window.open(waUrl, '_blank')
        } catch {
          // Ignore popup block
        }
      }

      setSubmitted(true)
      showToast(result.message, 'success')
      setMessage('')
    } catch {
      showToast('Gagal mengirimkan konfirmasi. Data tersimpan di perangkat lokal.', 'info')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="rsvp" className="py-24 px-4 bg-wedding-cream/30 relative">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-cinzel text-xs sm:text-sm tracking-[0.35em] text-wedding-gold font-bold uppercase mb-2">
            Reservation
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-wedding-dark font-normal">
            Konfirmasi Kehadiran
          </h2>
          <p className="text-xs sm:text-sm text-wedding-muted mt-3 max-w-md mx-auto">
            Mohon kesediaan Bapak/Ibu/Saudara/i untuk mengonfirmasi kehadiran Anda demi kelancaran persiapan acara.
          </p>
        </div>

        <div className="glass-card p-6 sm:p-10 rounded-3xl border border-wedding-gold/30 shadow-luxury">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center mx-auto mb-4 text-emerald-600 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-wedding-dark mb-2">
                Terima Kasih atas Konfirmasinya!
              </h3>
              <p className="text-sm text-wedding-charcoal mb-6 max-w-md mx-auto">
                Konfirmasi kehadiran &amp; doa restu Anda telah berhasil tersimpan dan tampil di Buku Tamu.
              </p>

              {whatsappRedirectUrl && (
                <div className="mb-6">
                  <a
                    href={whatsappRedirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs shadow-md hover:scale-105 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Pesan Konfirmasi ke WhatsApp</span>
                  </a>
                </div>
              )}

              <div>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false)
                    setWhatsappRedirectUrl(null)
                  }}
                  className="px-6 py-2 rounded-full border border-wedding-gold text-wedding-dark text-xs font-semibold hover:bg-wedding-cream transition-colors cursor-pointer"
                >
                  Kirim Konfirmasi Lain
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-wedding-dark mb-2">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-wedding-muted">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Bapak Joko &amp; Keluarga"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-wedding-sand bg-white/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-wedding-gold/50 focus:border-wedding-gold text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-wedding-dark mb-2">
                  Konfirmasi Kehadiran <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {(['Hadir', 'Tidak Hadir', 'Belum Pasti'] as const).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setAttendance(status)}
                      className={`py-3 px-2 sm:px-4 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        attendance === status
                          ? 'bg-wedding-dark text-wedding-gold border-wedding-dark shadow-md'
                          : 'bg-white/60 text-wedding-charcoal border-wedding-sand hover:bg-white'
                      }`}
                    >
                      {attendance === status && <Check className="w-3.5 h-3.5" />}
                      <span>{status}</span>
                    </button>
                  ))}
                </div>
              </div>

              {attendance === 'Hadir' && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-wedding-dark mb-2">
                    Jumlah Tamu yang Hadir
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-wedding-muted">
                      <Users className="w-4 h-4" />
                    </div>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-wedding-sand bg-white/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-wedding-gold/50 focus:border-wedding-gold text-sm transition-all cursor-pointer"
                    >
                      {Array.from({ length: rsvp.maxGuestsPerRSVP || 4 }, (_, i) => i + 1).map(
                        (num) => (
                          <option key={num} value={num}>
                            {num} Orang
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-wedding-dark mb-2">
                  Ucapan &amp; Doa Restu
                </label>
                <div className="relative">
                  <div className="absolute top-3.5 left-3.5 pointer-events-none text-wedding-muted">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tuliskan ucapan dan doa restu untuk kedua mempelai..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-wedding-sand bg-white/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-wedding-gold/50 focus:border-wedding-gold text-sm transition-all resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="gold-shimmer-btn w-full py-3.5 rounded-xl font-sans text-sm font-bold uppercase tracking-wider text-wedding-dark shadow-luxury hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Mengirimkan...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Kirim Konfirmasi Kehadiran</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
