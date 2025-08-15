import axios, { AxiosInstance, AxiosError } from 'axios'
import { AyrshareConfig, SocialPost, CreatePostRequest, Platform, ApiResponse } from '../types/social'

class AyrshareService {
  private client: AxiosInstance
  private rateLimiter: RateLimiter

  constructor(config: AyrshareConfig) {
    this.client = axios.create({
      baseURL: config.baseUrl,
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    })

    this.rateLimiter = new RateLimiter(60) // 60 requests per minute
    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor for rate limiting
    this.client.interceptors.request.use(async (config) => {
      await this.rateLimiter.throttle()
      return config
    })

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.')
        }
        if (error.response?.status === 401) {
          throw new Error('Invalid API key or authentication failed.')
        }
        if (error.response?.status >= 500) {
          throw new Error('Ayrshare service is temporarily unavailable.')
        }
        throw error
      }
    )
  }

  async createPost(postData: CreatePostRequest): Promise<ApiResponse<SocialPost>> {
    try {
      const payload = {
        post: postData.content,
        platforms: postData.platforms,
        ...(postData.scheduledDate && { scheduleDate: postData.scheduledDate }),
      }

      const response = await this.client.post('/post', payload)
      
      return {
        success: true,
        data: this.transformPost(response.data),
        message: 'Post created successfully'
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create post'
      }
    }
  }

  async getPosts(limit = 20, offset = 0): Promise<ApiResponse<SocialPost[]>> {
    try {
      const response = await this.client.get(`/posts?limit=${limit}&offset=${offset}`)
      
      return {
        success: true,
        data: response.data.posts?.map(this.transformPost) || []
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch posts'
      }
    }
  }

  async getPost(postId: string): Promise<ApiResponse<SocialPost>> {
    try {
      const response = await this.client.get(`/post/${postId}`)
      
      return {
        success: true,
        data: this.transformPost(response.data)
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch post'
      }
    }
  }

  async deletePost(postId: string): Promise<ApiResponse<void>> {
    try {
      await this.client.delete(`/post/${postId}`)
      
      return {
        success: true,
        message: 'Post deleted successfully'
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete post'
      }
    }
  }

  async getAnalytics(postId: string): Promise<ApiResponse<any>> {
    try {
      const response = await this.client.get(`/analytics/post/${postId}`)
      
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch analytics'
      }
    }
  }

  async getConnectedPlatforms(): Promise<ApiResponse<Platform[]>> {
    try {
      const response = await this.client.get('/profiles')
      
      return {
        success: true,
        data: response.data.profiles?.map(this.transformPlatform) || []
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch platforms'
      }
    }
  }

  private transformPost(apiPost: any): SocialPost {
    return {
      id: apiPost.id || apiPost.postId,
      content: apiPost.post || apiPost.content,
      platforms: apiPost.platforms || [],
      status: this.mapStatus(apiPost.status),
      scheduledDate: apiPost.scheduleDate,
      publishedDate: apiPost.publishedDate,
      mediaUrls: apiPost.mediaUrls,
      analytics: apiPost.analytics,
      createdAt: apiPost.createdAt || new Date().toISOString(),
      updatedAt: apiPost.updatedAt || new Date().toISOString(),
    }
  }

  private transformPlatform(apiPlatform: any): Platform {
    return {
      id: apiPlatform.platform,
      name: this.getPlatformName(apiPlatform.platform),
      icon: this.getPlatformIcon(apiPlatform.platform),
      connected: true,
      username: apiPlatform.username,
      followers: apiPlatform.followers,
    }
  }

  private mapStatus(apiStatus: string): 'draft' | 'scheduled' | 'published' | 'failed' {
    const statusMap: Record<string, 'draft' | 'scheduled' | 'published' | 'failed'> = {
      'success': 'published',
      'scheduled': 'scheduled',
      'error': 'failed',
      'pending': 'scheduled',
    }
    return statusMap[apiStatus] || 'draft'
  }

  private getPlatformName(platform: string): string {
    const names: Record<string, string> = {
      'twitter': 'Twitter',
      'linkedin': 'LinkedIn',
      'facebook': 'Facebook',
      'instagram': 'Instagram',
      'youtube': 'YouTube',
      'tiktok': 'TikTok',
      'pinterest': 'Pinterest',
    }
    return names[platform] || platform
  }

  private getPlatformIcon(platform: string): string {
    const icons: Record<string, string> = {
      'twitter': '🐦',
      'linkedin': '💼',
      'facebook': '📘',
      'instagram': '📷',
      'youtube': '📺',
      'tiktok': '🎵',
      'pinterest': '📌',
    }
    return icons[platform] || '🌐'
  }
}

class RateLimiter {
  private requests: number[] = []
  private limit: number

  constructor(requestsPerMinute: number) {
    this.limit = requestsPerMinute
  }

  async throttle(): Promise<void> {
    const now = Date.now()
    this.requests = this.requests.filter(time => now - time < 60000)

    if (this.requests.length >= this.limit) {
      const waitTime = 60000 - (now - this.requests[0])
      await new Promise(resolve => setTimeout(resolve, waitTime))
    }

    this.requests.push(now)
  }
}

// Singleton instance
let ayrshareService: AyrshareService | null = null

export const getAyrshareService = (): AyrshareService => {
  if (!ayrshareService) {
    const config: AyrshareConfig = {
      apiKey: import.meta.env.VITE_AYRSHARE_API_KEY || '',
      baseUrl: import.meta.env.VITE_AYRSHARE_BASE_URL || 'https://app.ayrshare.com/api',
    }
    
    if (!config.apiKey) {
      throw new Error('VITE_AYRSHARE_API_KEY environment variable is required')
    }
    
    ayrshareService = new AyrshareService(config)
  }
  
  return ayrshareService
}

export default AyrshareService