export interface SocialLink {
  platform: 'instagram' | 'whatsapp' | 'twitter' | 'facebook' | 'tiktok'
  username: string
  url: string
}

export interface PersonInfo {
  name: string
  fullName: string
  nickname: string
  parents: string
  childOrder?: string
  photo: string
  social?: SocialLink
}

export interface EventDetail {
  title: string
  subtitle: string
  date: string
  dayName: string
  time: string
  timezone: string
  venue: string
  address: string
  mapsUrl: string
  mapsEmbedUrl?: string
  calendarDateStart: string
  calendarDateEnd: string
}

export interface StoryMilestone {
  year: string
  title: string
  description: string
  image?: string
}

export interface BankAccount {
  bank: string
  accountNumber: string
  accountName: string
}

export interface DigitalGiftConfig {
  title: string
  description: string
  accounts: BankAccount[]
  qris?: {
    enabled: boolean
    image: string
  }
  physicalGiftAddress?: {
    recipient: string
    phone: string
    address: string
  }
}

export interface RSVPConfig {
  provider: 'none' | 'google-sheets' | 'webhook'
  googleSheetsEndpoint?: string
  webhookUrl?: string
  whatsappNumber?: string
  maxGuestsPerRSVP: number
}

export interface QuoteConfig {
  text: string
  source: string
  arabicText?: string
}

export interface LiveStreamConfig {
  platform: string
  url: string
  time: string
}

export interface HealthProtocolItem {
  icon: string
  title: string
  desc: string
}

export interface WishItem {
  id: string
  name: string
  attendance: 'Hadir' | 'Tidak Hadir' | 'Belum Pasti'
  message: string
  time: string
}

export interface FeatureFlags {
  music: boolean
  quote: boolean
  countdown: boolean
  loveStory: boolean
  gallery: boolean
  rsvp: boolean
  wishes: boolean
  gift: boolean
  qris: boolean
  liveStream: boolean
  healthProtocol: boolean
  guestLinkGenerator: boolean
}

export interface WeddingConfig {
  features: FeatureFlags
  meta: {
    title: string
    description: string
    ogImage: string
    hashtag: string
    baseUrl?: string
  }
  couple: {
    groom: PersonInfo
    bride: PersonInfo
  }
  wedding: {
    date: string
    countdownDate: string
    akad: EventDetail
    reception: EventDetail
  }
  quote: QuoteConfig
  story: StoryMilestone[]
  gallery: {
    title: string
    subtitle: string
    images: {
      url: string
      alt: string
      caption?: string
    }[]
  }
  music: {
    src: string
    title: string
    artist: string
    autoplayOnOpen: boolean
  }
  gift: DigitalGiftConfig
  rsvp: RSVPConfig
  liveStream?: LiveStreamConfig
  healthProtocol?: {
    items: HealthProtocolItem[]
  }
  presetWishes: WishItem[]
}
