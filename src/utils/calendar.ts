import { EventDetail } from '../config/types'

/**
 * Generates a Google Calendar event creation URL
 */
export function generateGoogleCalendarUrl(
  event: EventDetail,
  coupleNames: string = 'Rizki & Amelia'
): string {
  const title = encodeURIComponent(`${event.title} - ${coupleNames}`)
  const details = encodeURIComponent(
    `Pernikahan ${coupleNames}\n\nAcara: ${event.title} (${event.subtitle})\nWaktu: ${event.time} ${event.timezone}\nLokasi: ${event.venue}\nAlamat: ${event.address}\n\nGoogle Maps: ${event.mapsUrl}`
  )
  const location = encodeURIComponent(`${event.venue}, ${event.address}`)
  
  // dates format: YYYYMMDDTHHMMSSZ/YYYYMMDDTHHMMSSZ
  // Example: 20261212T010000Z/20261212T030000Z (UTC converted or local)
  const dates = `${event.calendarDateStart}/${event.calendarDateEnd}`

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`
}

/**
 * Downloads an iCal (.ics) file for Apple Calendar, Outlook, etc.
 */
export function downloadICalFile(
  event: EventDetail,
  coupleNames: string = 'Rizki & Amelia'
) {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//The Wedding of Rizki & Amelia//ID',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `SUMMARY:${event.title} - ${coupleNames}`,
    `DESCRIPTION:${event.title} (${event.subtitle})\\nLokasi: ${event.venue}\\nAlamat: ${event.address}`,
    `LOCATION:${event.venue}, ${event.address}`,
    `DTSTART:${event.calendarDateStart}`,
    `DTEND:${event.calendarDateEnd}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.setAttribute('download', `Wedding-${event.title.replace(/\s+/g, '-')}.ics`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
