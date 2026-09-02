import React, { useState } from 'react'
import { Gift as GiftIcon, Copy, Check, QrCode, MapPin, CreditCard, ChevronDown, ChevronUp } from 'lucide-react'
import { weddingConfig } from '../config/wedding'
import { copyToClipboard } from '../utils/helpers'
import { SafeImage } from './SafeImage'

interface GiftProps {
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void
}

export const Gift: React.FC<GiftProps> = ({ showToast }) => {
  const { gift, features } = weddingConfig
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null)
  const [showQris, setShowQris] = useState(false)
  const [showAddress, setShowAddress] = useState(false)

  if (!features.gift || !gift) return null

  const isQrisActive = features.qris && gift.qris?.enabled && gift.qris.image

  const handleCopyAccount = async (accountNumber: string, bank: string) => {
    const success = await copyToClipboard(accountNumber)
    if (success) {
      setCopiedAccount(accountNumber)
      showToast(`Nomor rekening ${bank} berhasil disalin!`, 'success')
      setTimeout(() => setCopiedAccount(null), 2500)
    } else {
      showToast('Gagal menyalin nomor rekening.', 'error')
    }
  }

  const handleCopyAddress = async (addressText: string) => {
    const success = await copyToClipboard(addressText)
    if (success) {
      showToast('Alamat pengiriman kado berhasil disalin!', 'success')
    }
  }

  return (
    <section id="gift" className="py-24 px-4 bg-wedding-cream/30 relative">
      <div className="max-w-3xl mx-auto text-center">
        {/* Section Header */}
        <div className="mb-12">
          <div className="w-14 h-14 rounded-full bg-wedding-card border border-wedding-gold/40 flex items-center justify-center mx-auto mb-4 shadow-luxury">
            <GiftIcon className="w-6 h-6 text-wedding-gold" />
          </div>
          <p className="font-cinzel text-xs sm:text-sm tracking-[0.35em] text-wedding-gold font-bold uppercase mb-2">
            Wedding Gift
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-wedding-dark font-normal">
            {gift.title}
          </h2>
          <p className="text-xs sm:text-sm text-wedding-muted mt-3 max-w-lg mx-auto leading-relaxed">
            {gift.description}
          </p>
        </div>

        {/* Bank Accounts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 text-left">
          {gift.accounts.map((acc, index) => (
            <div
              key={index}
              className="glass-card p-6 rounded-2xl border border-wedding-gold/30 shadow-luxury flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-wedding-gold" />
                  <span className="font-serif font-bold text-sm sm:text-base text-wedding-dark">
                    {acc.bank}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-[11px] uppercase tracking-wider text-wedding-muted font-medium mb-1">
                  Nomor Rekening
                </p>
                <p className="font-mono text-lg sm:text-xl font-bold tracking-wider text-wedding-dark">
                  {acc.accountNumber}
                </p>
                <p className="text-xs text-wedding-charcoal mt-0.5">
                  a.n. <span className="font-semibold">{acc.accountName}</span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleCopyAccount(acc.accountNumber, acc.bank)}
                className="w-full py-2.5 px-4 rounded-xl border border-wedding-gold text-wedding-dark hover:bg-wedding-gold hover:text-white text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer group-hover:shadow-sm"
              >
                {copiedAccount === acc.accountNumber ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-wedding-gold" />
                    <span>Salin No. Rekening</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* QRIS & Physical Gift Collapsible Options */}
        <div className="space-y-4 max-w-xl mx-auto">
          {/* QRIS Toggle Button (Only if enabled) */}
          {isQrisActive && (
            <div className="glass-card rounded-2xl border border-wedding-gold/30 overflow-hidden shadow-sm">
              <button
                onClick={() => setShowQris(!showQris)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-wedding-cream/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-wedding-card border border-wedding-sand text-wedding-gold">
                    <QrCode className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-wedding-dark">
                      QRIS Pembayaran Digital
                    </h4>
                    <p className="text-xs text-wedding-muted">
                      Scan via BCA Mobile, GoPay, OVO, ShopeePay, Dana, dll.
                    </p>
                  </div>
                </div>
                {showQris ? <ChevronUp className="w-4 h-4 text-wedding-muted" /> : <ChevronDown className="w-4 h-4 text-wedding-muted" />}
              </button>

              {showQris && (
                <div className="p-6 bg-white border-t border-wedding-sand/50 flex flex-col items-center animate-fade-in">
                  <SafeImage
                    src={gift.qris!.image}
                    alt="QRIS Digital Gift"
                    fallbackText="QRIS Pembayaran"
                    className="w-64 max-w-full rounded-xl shadow-md border border-gray-200"
                  />
                  <p className="text-xs text-wedding-muted mt-3">
                    Scan QR code di atas menggunakan aplikasi perbankan atau e-wallet pilihan Anda.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Physical Gift Mailing Address */}
          {gift.physicalGiftAddress && (
            <div className="glass-card rounded-2xl border border-wedding-gold/30 overflow-hidden shadow-sm">
              <button
                onClick={() => setShowAddress(!showAddress)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-wedding-cream/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-wedding-card border border-wedding-sand text-wedding-gold">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-wedding-dark">
                      Kirim Kado Fisik
                    </h4>
                    <p className="text-xs text-wedding-muted">
                      Alamat pengiriman parcel / kado untuk kedua mempelai
                    </p>
                  </div>
                </div>
                {showAddress ? <ChevronUp className="w-4 h-4 text-wedding-muted" /> : <ChevronDown className="w-4 h-4 text-wedding-muted" />}
              </button>

              {showAddress && (
                <div className="p-6 bg-white border-t border-wedding-sand/50 text-left space-y-3 animate-fade-in">
                  <div>
                    <p className="text-xs text-wedding-muted font-medium">Penerima:</p>
                    <p className="font-semibold text-sm text-wedding-dark">
                      {gift.physicalGiftAddress.recipient} ({gift.physicalGiftAddress.phone})
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-wedding-muted font-medium">Alamat:</p>
                    <p className="text-sm text-wedding-charcoal leading-relaxed">
                      {gift.physicalGiftAddress.address}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handleCopyAddress(
                        `${gift.physicalGiftAddress?.recipient} (${gift.physicalGiftAddress?.phone})\n${gift.physicalGiftAddress?.address}`
                      )
                    }
                    className="w-full py-2 px-4 rounded-xl border border-wedding-gold text-wedding-dark hover:bg-wedding-cream text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5 text-wedding-gold" />
                    <span>Salin Alamat Lengkap</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
