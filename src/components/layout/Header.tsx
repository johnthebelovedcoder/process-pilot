'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  Bell, 
  Search, 
  User, 
  Settings, 
  LogOut, 
  HelpCircle,
  Shield,
  CreditCard,
  ChevronDown,
  X,
  AlertCircle,
  Info,
  CheckCircle,
  FileText,
  Users,
  TrendingUp,
  Database,
  Zap,
  Terminal,
  GitBranch,
  Activity
} from 'lucide-react'
import { useRouter } from 'next/navigation'

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: 'success',
    title: 'Deployment Successful',
    message: 'Your application has been deployed to production',
    time: '5 min ago',
    read: false,
    icon: CheckCircle
  },
  {
    id: 2,
    type: 'warning',
    title: 'High Memory Usage',
    message: 'Server memory usage is above 85%',
    time: '1 hour ago',
    read: false,
    icon: AlertCircle
  },
  {
    id: 3,
    type: 'info',
    title: 'New Integration Available',
    message: 'Stripe payment integration is now available',
    time: '2 hours ago',
    read: true,
    icon: Info
  },
  {
    id: 4,
    type: 'success',
    title: 'Backup Completed',
    message: 'Database backup completed successfully',
    time: '1 day ago',
    read: true,
    icon: Database
  }
]

// Search suggestions
const searchSuggestions = [
  { type: 'page', name: 'Dashboard Overview', path: '/dashboard', icon: Activity },
  { type: 'page', name: 'Analytics', path: '/dashboard/analytics', icon: TrendingUp },
  { type: 'page', name: 'Users', path: '/dashboard/users', icon: Users },
  { type: 'page', name: 'Integrations', path: '/dashboard/integrations', icon: Zap },
  { type: 'page', name: 'Settings', path: '/dashboard/settings', icon: Settings },
  { type: 'action', name: 'Deploy Application', action: 'deploy', icon: GitBranch },
  { type: 'action', name: 'View Logs', action: 'logs', icon: Terminal },
  { type: 'action', name: 'Run Backup', action: 'backup', icon: Database },
  { type: 'help', name: 'API Documentation', path: '/docs/api', icon: FileText },
  { type: 'help', name: 'Getting Started Guide', path: '/docs/start', icon: HelpCircle }
]

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [notifications, setNotifications] = useState(mockNotifications)
  const [filteredSuggestions, setFilteredSuggestions] = useState(searchSuggestions)
  
  const notificationRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false)
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Filter search suggestions
  useEffect(() => {
    if (searchQuery) {
      const filtered = searchSuggestions.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredSuggestions(filtered)
    } else {
      setFilteredSuggestions(searchSuggestions)
    }
  }, [searchQuery])

  const handleNotificationClick = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    )
  }

  const clearNotifications = () => {
    setNotifications([])
    setShowNotifications(false)
  }

  const handleSearchSelect = (item: any) => {
    if (item.type === 'page' || item.type === 'help') {
      router.push(item.path)
    } else if (item.type === 'action') {
      // Handle actions
      console.log('Action:', item.action)
    }
    setSearchQuery('')
    setShowSearch(false)
  }

  const handleSignOut = () => {
    // In a real app, this would handle authentication
    router.push('/login')
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex items-center gap-4 flex-1 max-w-xl" ref={searchRef}>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Search pages, actions, or help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSearch(true)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
            
            {/* Search Dropdown */}
            {showSearch && (
              <div className="absolute top-full mt-2 w-full bg-card rounded-lg shadow-lg border border-border z-50 max-h-96 overflow-y-auto">
                {filteredSuggestions.length > 0 ? (
                  <div className="py-2">
                    {searchQuery && (
                      <div className="px-4 py-2 text-sm text-muted-foreground">
                        Search results for "{searchQuery}"
                      </div>
                    )}
                    {filteredSuggestions.map((item, index) => {
                      const Icon = item.icon
                      return (
                        <button
                          key={index}
                          onClick={() => handleSearchSelect(item)}
                          className="w-full px-4 py-3 hover:bg-accent flex items-center gap-3 transition-colors"
                        >
                          <div className={`p-2 rounded-md ${
                            item.type === 'page' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' :
                            item.type === 'action' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30' :
                            'bg-gray-100 text-gray-600 dark:bg-gray-900/30'
                          }`}>
                            <Icon size={16} />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground capitalize">{item.type}</p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    <Search size={40} className="mx-auto mb-3 opacity-20" />
                    <p className="text-sm">No results found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-accent rounded-md transition-colors"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            
            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-96 bg-card rounded-lg shadow-lg border border-border z-50">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Notifications</h3>
                    <div className="flex items-center gap-2">
                      {unreadCount > 0 && (
                        <button 
                          onClick={markAllAsRead}
                          className="text-sm text-primary hover:underline"
                        >
                          Mark all as read
                        </button>
                      )}
                      <button 
                        onClick={clearNotifications}
                        className="p-1 hover:bg-accent rounded"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => {
                      const Icon = notification.icon
                      return (
                        <div
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification.id)}
                          className={`p-4 border-b border-border cursor-pointer hover:bg-accent/50 transition-colors ${
                            !notification.read ? 'bg-primary/5' : ''
                          }`}
                        >
                          <div className="flex gap-3">
                            <div className={`p-2 rounded-md ${
                              notification.type === 'success' ? 'bg-green-100 text-green-600 dark:bg-green-900/30' :
                              notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30' :
                              'bg-blue-100 text-blue-600 dark:bg-blue-900/30'
                            }`}>
                              <Icon size={16} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-medium text-sm">{notification.title}</p>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {notification.message}
                                  </p>
                                </div>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-primary rounded-full mt-1" />
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-2">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="p-8 text-center text-muted-foreground">
                      <Bell size={40} className="mx-auto mb-3 opacity-20" />
                      <p className="text-sm">No notifications</p>
                    </div>
                  )}
                </div>
                
                {notifications.length > 0 && (
                  <div className="p-3 border-t border-border">
                    <button className="w-full text-sm text-primary hover:underline">
                      View all notifications
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button 
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 p-2 hover:bg-accent rounded-md transition-colors"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User size={16} className="text-primary-foreground" />
              </div>
              <span className="hidden md:block">John Doe</span>
              <ChevronDown size={16} className="hidden md:block text-muted-foreground" />
            </button>
            
            {/* Profile Dropdown Menu */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-64 bg-card rounded-lg shadow-lg border border-border z-50">
                <div className="p-4 border-b border-border">
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-muted-foreground">john.doe@company.com</p>
                </div>
                
                <div className="p-2">
                  <a
                    href="/dashboard/settings"
                    className="flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-md transition-colors"
                  >
                    <User size={16} />
                    <span className="text-sm">Profile & Settings</span>
                  </a>
                  <a
                    href="/dashboard/billing"
                    className="flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-md transition-colors"
                  >
                    <CreditCard size={16} />
                    <span className="text-sm">Billing</span>
                  </a>
                  <a
                    href="/dashboard/security"
                    className="flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-md transition-colors"
                  >
                    <Shield size={16} />
                    <span className="text-sm">Security</span>
                  </a>
                  <a
                    href="/help"
                    className="flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-md transition-colors"
                  >
                    <HelpCircle size={16} />
                    <span className="text-sm">Help & Support</span>
                  </a>
                </div>
                
                <div className="p-2 border-t border-border">
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-md transition-colors w-full text-red-600"
                  >
                    <LogOut size={16} />
                    <span className="text-sm">Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}