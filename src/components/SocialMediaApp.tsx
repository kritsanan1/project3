import React, { useState } from 'react'
import { Header } from './layout/Header'
import { Sidebar } from './layout/Sidebar'
import { Dashboard } from './dashboard/Dashboard'
import { PostsList } from './social/PostsList'
import { CreatePostForm } from './social/CreatePostForm'

export function SocialMediaApp() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showCreateForm, setShowCreateForm] = useState(false)

  const renderContent = () => {
    if (showCreateForm) {
      return (
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => setShowCreateForm(false)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Posts
            </button>
          </div>
          <CreatePostForm onSuccess={() => setShowCreateForm(false)} />
        </div>
      )
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'posts':
        return <PostsList onCreatePost={() => setShowCreateForm(true)} />
      case 'analytics':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics</h2>
            <p className="text-gray-600">Analytics dashboard coming soon...</p>
          </div>
        )
      case 'schedule':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Schedule</h2>
            <p className="text-gray-600">Scheduling calendar coming soon...</p>
          </div>
        )
      case 'platforms':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Platforms</h2>
            <p className="text-gray-600">Platform management coming soon...</p>
          </div>
        )
      case 'automation':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Automation</h2>
            <p className="text-gray-600">Automation features coming soon...</p>
          </div>
        )
      case 'settings':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
            <p className="text-gray-600">Settings panel coming soon...</p>
          </div>
        )
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}