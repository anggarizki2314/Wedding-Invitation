import { weddingConfig } from '../config/wedding'
import { WishItem } from '../config/types'

export interface RSVPPayload {
  name: string
  attendance: 'Hadir' | 'Tidak Hadir' | 'Belum Pasti'
  guestCount: number
  message: string
  createdAt?: string
}

const LOCAL_STORAGE_KEY = 'wedding_wishes_storage'

export class RSVPService {
  /**
   * Retrieves wishes either from a live backend (Google Sheets / Webhook) or local fallback
   */
  static async getWishes(): Promise<{ wishes: WishItem[]; source: 'live' | 'local' }> {
    const { rsvp, presetWishes } = weddingConfig

    // 1. Google Sheets Provider
    if (rsvp.provider === 'google-sheets' && rsvp.googleSheetsEndpoint) {
      try {
        const response = await fetch(rsvp.googleSheetsEndpoint, {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
        })

        if (response.ok) {
          const liveData: WishItem[] = await response.json()
          if (Array.isArray(liveData)) {
            return { wishes: liveData, source: 'live' }
          }
        }
      } catch (err) {
        console.warn('Live RSVP backend unreachable, using local fallback:', err)
      }
    }

    // 2. Custom Webhook Provider
    if (rsvp.provider === 'webhook' && rsvp.webhookUrl) {
      try {
        const response = await fetch(rsvp.webhookUrl, {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
        })

        if (response.ok) {
          const liveData: WishItem[] = await response.json()
          if (Array.isArray(liveData)) {
            return { wishes: liveData, source: 'live' }
          }
        }
      } catch (err) {
        console.warn('Webhook backend unreachable, using local fallback:', err)
      }
    }

    // 3. Local Fallback (LocalStorage + Preset Wishes)
    return {
      wishes: this.getLocalWishes(presetWishes),
      source: 'local',
    }
  }

  /**
   * Submits a new RSVP & Wish to configured backend
   */
  static async submitRSVP(payload: RSVPPayload): Promise<{ success: boolean; message: string }> {
    const { rsvp } = weddingConfig
    const newWish: WishItem = {
      id: `wish-${Date.now()}`,
      name: payload.name,
      attendance: payload.attendance,
      message: payload.message,
      time: 'Baru saja',
    }

    // 1. Google Sheets (Google Apps Script Web App)
    if (rsvp.provider === 'google-sheets' && rsvp.googleSheetsEndpoint) {
      try {
        await fetch(rsvp.googleSheetsEndpoint, {
          method: 'POST',
          mode: 'no-cors', // Standard for Google Apps Script Web Apps
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...payload,
            timestamp: new Date().toISOString(),
          }),
        })

        return {
          success: true,
          message: 'Konfirmasi RSVP berhasil terkirim ke Google Sheets!',
        }
      } catch (err) {
        console.warn('Failed to post to Google Sheets, saved locally:', err)
        this.saveLocalWish(newWish)
        return {
          success: true,
          message: 'Konfirmasi tersimpan secara lokal di browser Anda.',
        }
      }
    }

    // 2. Custom Webhook Endpoint
    if (rsvp.provider === 'webhook' && rsvp.webhookUrl) {
      try {
        const res = await fetch(rsvp.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        if (res.ok) {
          return {
            success: true,
            message: 'Konfirmasi RSVP berhasil dikirim ke server!',
          }
        }
      } catch (err) {
        console.warn('Failed to post to webhook, fallback to local storage:', err)
      }
    }

    // 3. Fallback Local Storage
    this.saveLocalWish(newWish)
    return {
      success: true,
      message: 'Konfirmasi tersimpan di browser Anda.',
    }
  }

  /**
   * Helper: Get stored wishes from browser LocalStorage
   */
  private static getLocalWishes(presets: WishItem[]): WishItem[] {
    if (typeof window === 'undefined') return presets

    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (stored) {
        const parsed: WishItem[] = JSON.parse(stored)
        return [...parsed, ...presets]
      }
    } catch (e) {
      console.warn('Failed to parse local wishes storage', e)
    }

    return presets
  }

  /**
   * Helper: Save wish to browser LocalStorage
   */
  private static saveLocalWish(wish: WishItem): void {
    if (typeof window === 'undefined') return

    try {
      const existing = this.getLocalWishes([])
      const updated = [wish, ...existing]
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
    } catch (e) {
      console.warn('Failed to save wish to local storage', e)
    }
  }

  /**
   * Helper: Clear local wishes cache
   */
  static clearLocalCache(): void {
    if (typeof window === 'undefined') return
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY)
    } catch (e) {
      console.warn('Failed to clear local wishes storage', e)
    }
  }
}
