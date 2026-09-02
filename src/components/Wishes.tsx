import React, { useState } from 'react'
import { MessageCircleHeart, Check, HelpCircle, XCircle, RefreshCw } from 'lucide-react'
import { weddingConfig } from '../config/wedding'
import { WishItem } from '../config/types'

interface WishesProps {
  wishes: WishItem[]
  dataSource: 'live' | 'local'
  onRefresh?: () => void
}

export const Wishes: React.FC<WishesProps> = ({ wishes, dataSource, onRefresh }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const { features } = weddingConfig
  const itemsPerPage = 5

  if (!features.wishes) return null

  const totalPages = Math.ceil(wishes.length / itemsPerPage)
  const displayedWishes = wishes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <section className="py-20 px-4 bg-wedding-bg relative">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-wedding-card border border-wedding-gold/30 shadow-sm mb-3">
            <MessageCircleHeart className="w-4 h-4 text-wedding-gold" />
            <span className="font-cinzel text-xs tracking-widest text-wedding-dark font-semibold uppercase">
              Buku Tamu &amp; Doa
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-wedding-dark font-normal">
            Doa &amp; Ucapan Hangat
          </h2>
          
          <div className="flex items-center justify-center gap-2 mt-2">
            <p className="text-xs sm:text-sm text-wedding-muted">
              ({wishes.length}) Ucapan dari keluarga dan sahabat tercinta
            </p>
            {dataSource === 'live' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Database
              </span>
            )}
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="p-1 rounded-full text-wedding-muted hover:text-wedding-gold transition-colors cursor-pointer"
                title="Perbarui daftar ucapan"
                aria-label="Perbarui ucapan"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Wishes List Container */}
        <div className="space-y-4">
          {displayedWishes.map((wish) => (
            <div
              key={wish.id}
              className="glass-card p-5 sm:p-6 rounded-2xl border border-wedding-gold/25 shadow-sm hover:border-wedding-gold/50 transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-wedding-dark">
                    {wish.name}
                  </h4>
                  <span className="text-[11px] text-wedding-muted">
                    {wish.time}
                  </span>
                </div>

                <div>
                  {wish.attendance === 'Hadir' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <Check className="w-3 h-3" />
                      <span>Hadir</span>
                    </span>
                  )}
                  {wish.attendance === 'Tidak Hadir' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                      <XCircle className="w-3 h-3" />
                      <span>Tidak Hadir</span>
                    </span>
                  )}
                  {wish.attendance === 'Belum Pasti' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                      <HelpCircle className="w-3 h-3" />
                      <span>Belum Pasti</span>
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-wedding-charcoal leading-relaxed">
                {wish.message}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-1.5 rounded-lg border border-wedding-sand text-xs font-semibold disabled:opacity-40 hover:bg-wedding-cream transition-colors cursor-pointer"
            >
              Sebelumnya
            </button>
            <span className="text-xs text-wedding-muted px-2">
              Halaman {currentPage} dari {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-1.5 rounded-lg border border-wedding-sand text-xs font-semibold disabled:opacity-40 hover:bg-wedding-cream transition-colors cursor-pointer"
            >
              Selanjutnya
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
