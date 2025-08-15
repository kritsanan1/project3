import React from 'react'
import { Calendar, BarChart3, Trash2, Eye } from 'lucide-react'
import { SocialPost } from '../../types/social'
import { Card, CardContent, CardFooter } from '../ui/Card'
import { Button } from '../ui/Button'
import { formatDate, truncateText } from '../../lib/utils'

interface PostCardProps {
  post: SocialPost
  onDelete?: (postId: string) => void
  onViewAnalytics?: (postId: string) => void
}

export function PostCard({ post, onDelete, onViewAnalytics }: PostCardProps) {
  const getStatusColor = (status: string) => {
    const colors = {
      published: 'bg-green-100 text-green-800',
      scheduled: 'bg-blue-100 text-blue-800',
      draft: 'bg-gray-100 text-gray-800',
      failed: 'bg-red-100 text-red-800',
    }
    return colors[status as keyof typeof colors] || colors.draft
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return '✅'
      case 'scheduled':
        return '⏰'
      case 'failed':
        return '❌'
      default:
        return '📝'
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
              <span className="mr-1">{getStatusIcon(post.status)}</span>
              {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            {post.platforms.map((platform, index) => (
              <span key={index} className="text-lg" title={typeof platform === 'string' ? platform : platform.name}>
                {typeof platform === 'string' ? '🌐' : platform.icon}
              </span>
            ))}
          </div>
        </div>

        <p className="text-gray-900 mb-4 leading-relaxed">
          {truncateText(post.content, 200)}
        </p>

        {post.mediaUrls && post.mediaUrls.length > 0 && (
          <div className="mb-4">
            <div className="flex space-x-2">
              {post.mediaUrls.slice(0, 3).map((url, index) => (
                <div key={index} className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-xs">Media</span>
                </div>
              ))}
              {post.mediaUrls.length > 3 && (
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-xs">+{post.mediaUrls.length - 3}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {post.status === 'scheduled' && post.scheduledDate
              ? `Scheduled: ${formatDate(post.scheduledDate)}`
              : post.publishedDate
              ? `Published: ${formatDate(post.publishedDate)}`
              : `Created: ${formatDate(post.createdAt)}`
            }
          </div>
        </div>

        {post.analytics && (
          <div className="mt-4 grid grid-cols-4 gap-4 pt-4 border-t border-gray-100">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">{post.analytics.likes}</div>
              <div className="text-xs text-gray-500">Likes</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">{post.analytics.comments}</div>
              <div className="text-xs text-gray-500">Comments</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">{post.analytics.shares}</div>
              <div className="text-xs text-gray-500">Shares</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">{post.analytics.impressions}</div>
              <div className="text-xs text-gray-500">Views</div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div className="flex space-x-2">
          {onViewAnalytics && post.status === 'published' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewAnalytics(post.id)}
            >
              <BarChart3 className="w-4 h-4 mr-1" />
              Analytics
            </Button>
          )}
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {/* TODO: Implement view details */}}
          >
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(post.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}