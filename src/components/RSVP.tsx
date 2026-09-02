import React, { useState } from 'react'
import { Send, CheckCircle2, MessageSquare, Users, User } from 'lucide-react'
import { weddingConfig } from '../config/wedding'
import { createWhatsAppRSVPUrl } from '../utils/helpers'
import { RSVPService } from '../services/rsvpService'

interface RSVPProps {
  initialGuestName: string
  onRSVPSubmitted: () => void
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void
}

export const RSVP: React.FC<RSVPProps> = ({
  initialGuestName,
  onRSVPSubmitted,
  showToast,
}) => {
  const { rsvp, features } = weddingConfig
  const [name, setName] = useState(
    initialGuestName !== 'Tamu Undangan' ? initialGuestName : ''
  )
  const [attendance, setAttendance] = useState<'Hadir' | 'Tidak Hadir' | 'Belum Pasti'>('Hadir')
  const [guestCount, setGuestCount] = useState<number>(1)
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  if (!features.rsvp) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      showToast('Silakan masukkan nama Anda terlebih dahulu.', 'error')
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

      // If RSVP has whatsapp number, give option to also send to WhatsApp
      if (rsvp.whatsappNumber) {
        const waUrl = createWhatsAppRSVPUrl(
          rsvp.whatsappNumber,
          name.trim(),
          attendance,
          guestCount,
          message.trim()
        )
        // Only auto open if provider is not webhook
        if (rsvp.provider === 'none') {
          window.open(waUrl, '_blank')
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
                Konfirmasi kehadiran Anda telah tercatat. Doa restu Anda sangat berarti bagi kami.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-6 py-2 rounded-full border border-wedding-gold text-wedding-dark text-xs font-semibold hover:bg-wedding-cream transition-colors cursor-pointer"
              >
                Kirim Konfirmasi Lain
              </button>
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
                    placeholder="Contoh: Dimas Aditya & Partner"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-wedding-sand text-wedding-dark text-sm focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-wedding-dark mb-2">
                  Konfirmasi Kehadiran <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { key: 'Hadir', label: 'Ya, Saya Hadir' },
                    { key: 'Tidak Hadir', label: 'Maaf, Tidak Hadir' },
                    { key: 'Belum Pasti', label: 'Masih Ragu' },
                  ].map((option) => (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => setAttendance(option.key as any)}
                      className={`p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all text-center flex items-center justify-center gap-2 cursor-pointer ${
                        attendance === option.key
                          ? 'bg-wedding-dark text-white border-wedding-dark shadow-md'
                          : 'bg-white border-wedding-sand text-wedding-charcoal hover:border-wedding-gold'
                      }`}
                    >
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {attendance === 'Hadir' && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-wedding-dark mb-2">
                    Jumlah Tamu
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-wedding-muted">
                      <Users className="w-4 h-4" />
                    </div>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-wedding-sand text-wedding-dark text-sm focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent transition-all"
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
                  <div className="absolute top-3 left-3.5 pointer-events-none text-wedding-muted">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tuliskan doa dan ucapan selamat untuk kedua mempelai..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-wedding-sand text-wedding-dark text-sm focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="gold-shimmer-btn w-full py-3.5 rounded-xl font-sans text-sm font-semibold tracking-wider uppercase text-wedding-dark shadow-luxury flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-98 transition-all disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Mengirimkan...' : 'Kirim Konfirmasi & Ucapan'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
