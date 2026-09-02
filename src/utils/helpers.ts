import { weddingConfig } from '../config/wedding'

/**
 * Extracts the personalized guest name from the browser URL parameters
 * Handles: ?to=..., ?u=..., ?nama=..., ?guest=...
 */
export function getGuestNameFromUrl(): string {
  if (typeof window === 'undefined') return 'Tamu Undangan'

  try {
    const searchParams = new URLSearchParams(window.location.search)
    const rawGuest =
      searchParams.get('to') ||
      searchParams.get('u') ||
      searchParams.get('nama') ||
      searchParams.get('guest') ||
      searchParams.get('p')

    if (rawGuest && rawGuest.trim().length > 0) {
      return decodeURIComponent(rawGuest.trim().replace(/\+/g, ' '))
    }
  } catch (e) {
    console.warn('Failed to parse guest URL query params', e)
  }

  return 'Tamu Undangan'
}

/**
 * Generates a full personalized guest invitation URL
 */
export function generateGuestUrl(guestName: string, customBaseUrl?: string): string {
  const base =
    customBaseUrl ||
    weddingConfig.meta.baseUrl ||
    (typeof window !== 'undefined' ? window.location.origin : 'https://wedding-invitation-dssssssss.vercel.app')

  const encodedName = encodeURIComponent(guestName.trim()).replace(/%20/g, '+')
  return `${base}/?to=${encodedName}`
}

/**
 * Generates an aesthetic WhatsApp broadcast invitation message complete with Venue and Google Maps link
 */
export function generateWhatsAppBroadcastMessage(
  guestName: string,
  guestUrl: string
): string {
  const groom = weddingConfig.couple.groom.name
  const bride = weddingConfig.couple.bride.name
  const date = weddingConfig.wedding.date
  const venue = weddingConfig.wedding.akad.venue
  const mapsUrl = weddingConfig.wedding.akad.mapsUrl

  return (
    `Kepada Yth.\n` +
    `Bapak/Ibu/Saudara/i: *${guestName}*\n\n` +
    `Tanpa mengurangi rasa hormat, perkenankan kami mengundang Anda untuk hadir dan memberikan doa restu pada hari bahagia pernikahan kami:\n\n` +
    `*${groom} & ${bride}*\n\n` +
    `*Waktu:* ${date}\n` +
    `*Lokasi:* ${venue}\n` +
    `*Petunjuk Arah (Maps):* ${mapsUrl}\n\n` +
    `Untuk melihat detail seluruh rangkaian acara, reservasi kehadiran & ucapan doa, silakan buka tautan undangan resmi berikut:\n` +
    `${guestUrl}\n\n` +
    `Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.\n\n` +
    `Terima kasih.\n` +
    `Salam hangat,\n` +
    `*${groom} & ${bride}*`
  )
}

/**
 * Copies text to clipboard with fallback for older browsers
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === 'undefined') return false

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      const successful = document.execCommand('copy')
      document.body.removeChild(textArea)
      return successful
    }
  } catch (err) {
    console.error('Failed to copy text: ', err)
    return false
  }
}

/**
 * Creates WhatsApp URL for direct RSVP confirmation
 */
export function createWhatsAppRSVPUrl(
  phoneNumber: string,
  guestName: string,
  attendance: string,
  guestCount: number,
  message: string
): string {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '')
  const text =
    `Halo ${weddingConfig.couple.groom.name} & ${weddingConfig.couple.bride.name}, saya *${guestName}* ingin mengonfirmasi kehadiran di acara pernikahan Anda:\n\n` +
    `• *Kehadiran*: ${attendance}\n` +
    `• *Jumlah Tamu*: ${guestCount} Orang\n` +
    (message ? `• *Ucapan & Doa*: "${message}"\n\n` : '\n') +
    `Terima kasih! Sampai jumpa di hari bahagia.`

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`
}
