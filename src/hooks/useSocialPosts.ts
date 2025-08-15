import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAyrshareService } from '../services/ayrshare'
import { CreatePostRequest, SocialPost } from '../types/social'

const QUERY_KEYS = {
  posts: ['posts'],
  post: (id: string) => ['post', id],
  platforms: ['platforms'],
  analytics: (id: string) => ['analytics', id],
}

export const useSocialPosts = (limit = 20, offset = 0) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.posts, limit, offset],
    queryFn: async () => {
      const service = getAyrshareService()
      const response = await service.getPosts(limit, offset)
      if (!response.success) {
        throw new Error(response.error)
      }
      return response.data || []
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useSocialPost = (postId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.post(postId),
    queryFn: async () => {
      const service = getAyrshareService()
      const response = await service.getPost(postId)
      if (!response.success) {
        throw new Error(response.error)
      }
      return response.data
    },
    enabled: !!postId,
  })
}

export const useConnectedPlatforms = () => {
  return useQuery({
    queryKey: QUERY_KEYS.platforms,
    queryFn: async () => {
      const service = getAyrshareService()
      const response = await service.getConnectedPlatforms()
      if (!response.success) {
        throw new Error(response.error)
      }
      return response.data || []
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (postData: CreatePostRequest) => {
      const service = getAyrshareService()
      const response = await service.createPost(postData)
      if (!response.success) {
        throw new Error(response.error)
      }
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts })
    },
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (postId: string) => {
      const service = getAyrshareService()
      const response = await service.deletePost(postId)
      if (!response.success) {
        throw new Error(response.error)
      }
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts })
    },
  })
}

export const usePostAnalytics = (postId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.analytics(postId),
    queryFn: async () => {
      const service = getAyrshareService()
      const response = await service.getAnalytics(postId)
      if (!response.success) {
        throw new Error(response.error)
      }
      return response.data
    },
    enabled: !!postId,
    staleTime: 15 * 60 * 1000, // 15 minutes
  })
}