import React, { useState } from 'react'
import { Search, Filter, Plus } from 'lucide-react'
import { useSocialPosts, useDeletePost } from '../../hooks/useSocialPosts'
import { PostCard } from './PostCard'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { SocialPost } from '../../types/social'

interface PostsListProps {
  onCreatePost?: () => void
}

export function PostsList({ onCreatePost }: PostsListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  
  const { data: posts = [], isLoading, error, refetch } = useSocialPosts()
  const deletePostMutation = useDeletePost()

  const handleDeletePost = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePostMutation.mutateAsync(postId)
      } catch (error) {
        console.error('Failed to delete post:', error)
      }
    }
  }

  const handleViewAnalytics = (postId: string) => {
    // TODO: Implement analytics modal or navigation
    console.log('View analytics for post:', postId)
  }

  const filteredPosts = posts.filter((post: SocialPost) => {
    const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <p className="text-lg font-medium">Failed to load posts</p>
          <p className="text-sm">{error.message}</p>
        </div>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Social Media Posts</h1>
          <p className="text-gray-600">Manage your social media content across all platforms</p>
        </div>
        {onCreatePost && (
          <Button onClick={onCreatePost}>
            <Plus className="w-4 h-4 mr-2" />
            Create Post
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="sm:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Posts</option>
            <option value="published">Published</option>
            <option value="scheduled">Scheduled</option>
            <option value="draft">Drafts</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Posts Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="h-6 bg-gray-200 rounded w-20"></div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            {posts.length === 0 ? (
              <>
                <p className="text-lg font-medium">No posts yet</p>
                <p className="text-sm">Create your first social media post to get started</p>
              </>
            ) : (
              <>
                <p className="text-lg font-medium">No posts match your filters</p>
                <p className="text-sm">Try adjusting your search or filter criteria</p>
              </>
            )}
          </div>
          {posts.length === 0 && onCreatePost && (
            <Button onClick={onCreatePost}>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Post
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post: SocialPost) => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={handleDeletePost}
              onViewAnalytics={handleViewAnalytics}
            />
          ))}
        </div>
      )}

      {/* Load More */}
      {filteredPosts.length > 0 && filteredPosts.length % 20 === 0 && (
        <div className="text-center pt-6">
          <Button variant="outline">Load More Posts</Button>
        </div>
      )}
    </div>
  )
}