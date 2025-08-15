export interface SocialPost {
  id: string
  content: string
  platforms: Platform[]
  status: PostStatus
  scheduledDate?: string
  publishedDate?: string
  mediaUrls?: string[]
  analytics?: PostAnalytics
  createdAt: string
  updatedAt: string
}

export interface PostAnalytics {
  likes: number
  comments: number
  shares: number
  impressions: number
  reach: number
  engagement_rate: number
}

export interface Platform {
  id: string
  name: string
  icon: string
  connected: boolean
  username?: string
  followers?: number
}

export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed'

export interface CreatePostRequest {
  content: string
  platforms: string[]
  scheduledDate?: string
  mediaFiles?: File[]
}

export interface AyrshareConfig {
  apiKey: string
  baseUrl: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}