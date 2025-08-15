import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Calendar, Image, Send, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader } from '../ui/Card'
import { Button } from '../ui/Button'
import { Textarea } from '../ui/Textarea'
import { Input } from '../ui/Input'
import { useConnectedPlatforms, useCreatePost } from '../../hooks/useSocialPosts'
import { CreatePostRequest } from '../../types/social'

interface FormData {
  content: string
  platforms: string[]
  scheduledDate?: string
}

interface CreatePostFormProps {
  onSuccess?: () => void
}

export function CreatePostForm({ onSuccess }: CreatePostFormProps) {
  const [isScheduled, setIsScheduled] = useState(false)
  const { data: platforms = [], isLoading: platformsLoading } = useConnectedPlatforms()
  const createPostMutation = useCreatePost()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid }
  } = useForm<FormData>({
    defaultValues: {
      content: '',
      platforms: [],
      scheduledDate: ''
    }
  })

  const content = watch('content')
  const selectedPlatforms = watch('platforms')

  const onSubmit = async (data: FormData) => {
    try {
      const postData: CreatePostRequest = {
        content: data.content,
        platforms: data.platforms,
        ...(isScheduled && data.scheduledDate && {
          scheduledDate: new Date(data.scheduledDate).toISOString()
        })
      }

      await createPostMutation.mutateAsync(postData)
      reset()
      setIsScheduled(false)
      onSuccess?.()
    } catch (error) {
      console.error('Failed to create post:', error)
    }
  }

  const getCharacterCount = (text: string, platform: string) => {
    const limits: Record<string, number> = {
      twitter: 280,
      linkedin: 3000,
      facebook: 63206,
      instagram: 2200
    }
    return limits[platform] || 1000
  }

  const getMinCharacterLimit = () => {
    if (selectedPlatforms.length === 0) return 280
    return Math.min(...selectedPlatforms.map(p => getCharacterCount('', p)))
  }

  const characterLimit = getMinCharacterLimit()
  const isOverLimit = content.length > characterLimit

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-900">Create New Post</h2>
        <p className="text-sm text-gray-600">Share content across your connected social media platforms</p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Platform Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Platforms
            </label>
            {platformsLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading platforms...</span>
              </div>
            ) : platforms.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No connected platforms found.</p>
                <p className="text-sm mt-1">Connect your social media accounts to get started.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {platforms.map((platform) => (
                  <label
                    key={platform.id}
                    className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      value={platform.id}
                      {...register('platforms', { required: 'Select at least one platform' })}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-3 w-full">
                      <span className="text-2xl">{platform.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{platform.name}</div>
                        {platform.username && (
                          <div className="text-sm text-gray-500">@{platform.username}</div>
                        )}
                      </div>
                      <div className="w-4 h-4 border-2 border-gray-300 rounded flex items-center justify-center">
                        {selectedPlatforms.includes(platform.id) && (
                          <div className="w-2 h-2 bg-blue-600 rounded"></div>
                        )}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            )}
            {errors.platforms && (
              <p className="mt-1 text-sm text-red-600">{errors.platforms.message}</p>
            )}
          </div>

          {/* Content */}
          <div>
            <Textarea
              label="Post Content"
              placeholder="What's on your mind?"
              rows={6}
              {...register('content', { 
                required: 'Post content is required',
                maxLength: {
                  value: characterLimit,
                  message: `Content exceeds character limit (${characterLimit})`
                }
              })}
              error={errors.content?.message}
            />
            <div className="flex justify-between items-center mt-2">
              <div className="text-sm text-gray-500">
                {selectedPlatforms.length > 0 && (
                  <span>Character limit: {characterLimit}</span>
                )}
              </div>
              <div className={`text-sm ${isOverLimit ? 'text-red-600' : 'text-gray-500'}`}>
                {content.length}/{characterLimit}
              </div>
            </div>
          </div>

          {/* Scheduling */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isScheduled}
                  onChange={(e) => setIsScheduled(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Schedule for later</span>
              </label>
            </div>

            {isScheduled && (
              <Input
                type="datetime-local"
                label="Schedule Date & Time"
                {...register('scheduledDate', {
                  required: isScheduled ? 'Schedule date is required' : false,
                  validate: (value) => {
                    if (!isScheduled || !value) return true
                    const selectedDate = new Date(value)
                    const now = new Date()
                    return selectedDate > now || 'Schedule date must be in the future'
                  }
                })}
                error={errors.scheduledDate?.message}
                min={new Date().toISOString().slice(0, 16)}
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                reset()
                setIsScheduled(false)
              }}
            >
              Clear
            </Button>
            <Button
              type="submit"
              loading={createPostMutation.isPending}
              disabled={!isValid || isOverLimit || selectedPlatforms.length === 0}
            >
              {isScheduled ? (
                <>
                  <Clock className="w-4 h-4 mr-2" />
                  Schedule Post
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Publish Now
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}