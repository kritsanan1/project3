import React from 'react'
import { Home, FileText, BarChart3, Calendar, Settings, Users, Zap } from 'lucide-react'
import { cn } from '../../lib/utils'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: Home },
  { id: 'posts', name: 'Posts', icon: FileText },
  { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  { id: 'schedule', name: 'Schedule', icon: Calendar },
  { id: 'platforms', name: 'Platforms', icon: Users },
  { id: 'automation', name: 'Automation', icon: Zap },
  { id: 'settings', name: 'Settings', icon: Settings },
]

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-6">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  'w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Quick Stats */}
      <div className="p-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Stats</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Posts Today</span>
            <span className="text-sm font-medium text-gray-900">12</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Scheduled</span>
            <span className="text-sm font-medium text-gray-900">8</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Engagement</span>
            <span className="text-sm font-medium text-green-600">+12%</span>
          </div>
        </div>
      </div>
    </div>
  )
}