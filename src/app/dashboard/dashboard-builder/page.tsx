'use client'

import { useState } from 'react'
import {
  Plus,
  BarChart3,
  PieChart,
  LineChart,
  TrendingUp,
  Target,
  Activity,
  Users,
  Settings,
  Eye,
  Copy,
  Trash2,
  Edit,
  Grid3X3,
  Layout,
  Monitor,
  Tablet,
  Smartphone,
  Share,
  Play,
  X,
  GripVertical,
  Table as TableIcon,
} from 'lucide-react'

const widgetTypes = [
  {
    id: 'metric',
    name: 'Metric Card',
    icon: Target,
    description: 'Display key performance indicators',
    category: 'KPI',
  },
  {
    id: 'chart-bar',
    name: 'Bar Chart',
    icon: BarChart3,
    description: 'Compare values across categories',
    category: 'Charts',
  },
  {
    id: 'chart-line',
    name: 'Line Chart',
    icon: LineChart,
    description: 'Show trends over time',
    category: 'Charts',
  },
  {
    id: 'chart-pie',
    name: 'Pie Chart',
    icon: PieChart,
    description: 'Show proportions of a whole',
    category: 'Charts',
  },
  {
    id: 'table',
    name: 'Data Table',
    icon: TableIcon,
    description: 'Display detailed data in rows',
    category: 'Data',
  },
  {
    id: 'progress',
    name: 'Progress Bar',
    icon: TrendingUp,
    description: 'Show progress towards goals',
    category: 'KPI',
  },
  {
    id: 'activity',
    name: 'Activity Feed',
    icon: Activity,
    description: 'Recent activities and updates',
    category: 'Data',
  },
  {
    id: 'team',
    name: 'Team Overview',
    icon: Users,
    description: 'Team members and status',
    category: 'Data',
  },
]

const dashboardTemplates = [
  {
    name: 'Executive Overview',
    description: 'High-level KPIs and performance metrics',
    widgets: ['metric', 'chart-line', 'chart-pie', 'progress'],
    layout: '2x2',
  },
  {
    name: 'Process Analytics',
    description: 'Detailed process performance analysis',
    widgets: ['chart-bar', 'table', 'metric', 'activity'],
    layout: '2x2',
  },
  {
    name: 'Team Dashboard',
    description: 'Team performance and collaboration metrics',
    widgets: ['team', 'activity', 'metric', 'progress'],
    layout: '1x3',
  },
  {
    name: 'Financial Overview',
    description: 'Financial metrics and cost analysis',
    widgets: ['metric', 'chart-line', 'chart-bar', 'table'],
    layout: '2x2',
  },
]

const mockDashboards = [
  {
    id: '1',
    name: 'Executive Dashboard',
    description: 'High-level overview for leadership team',
    widgets: 6,
    lastModified: '2 hours ago',
    isPublic: true,
    template: 'Executive Overview',
  },
  {
    id: '2',
    name: 'Operations Dashboard',
    description: 'Daily operations monitoring and KPIs',
    widgets: 8,
    lastModified: '1 day ago',
    isPublic: false,
    template: 'Process Analytics',
  },
  {
    id: '3',
    name: 'Team Performance',
    description: 'Team productivity and collaboration metrics',
    widgets: 5,
    lastModified: '3 days ago',
    isPublic: true,
    template: 'Team Dashboard',
  },
]

interface Widget {
  id: string
  type: string
  name: string
  position: { x: number; y: number }
  size: { width: number; height: number }
  config: Record<string, unknown>
}

interface WidgetType {
  id: string
  name: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  description: string
  category: string
}

interface DashboardTemplate {
  name: string
  description: string
  widgets: string[]
  layout: string
}

export default function DashboardBuilderPage() {
  const [activeTab, setActiveTab] = useState('builder')
  const [showBuilder, setShowBuilder] = useState(false)
  const [viewMode, setViewMode] = useState('desktop')
  const [widgets, setWidgets] = useState<Widget[]>([])
  const [selectedWidget, setSelectedWidget] = useState<Widget | null>(null)
  const [dashboardName, setDashboardName] = useState('')
  const [dashboardDescription, setDashboardDescription] = useState('')

  const addWidget = (widgetType: WidgetType) => {
    const newWidget = {
      id: Date.now().toString(),
      type: widgetType.id,
      name: `New ${widgetType.name}`,
      position: { x: 0, y: 0 },
      size: { width: 2, height: 2 },
      config: {},
    }
    setWidgets([...widgets, newWidget])
  }

  const removeWidget = (widgetId: string) => {
    setWidgets(widgets.filter((w) => w.id !== widgetId))
    if (selectedWidget?.id === widgetId) {
      setSelectedWidget(null)
    }
  }

  const duplicateWidget = (widget: Widget) => {
    const duplicated = {
      ...widget,
      id: Date.now().toString(),
      name: `${widget.name} (Copy)`,
      position: { x: widget.position.x + 1, y: widget.position.y + 1 },
    }
    setWidgets([...widgets, duplicated])
  }

  const handleCreateNew = () => {
    setShowBuilder(true)
    setWidgets([])
    setDashboardName('')
    setDashboardDescription('')
    setSelectedWidget(null)
  }

  const handleUseTemplate = (template: DashboardTemplate) => {
    setShowBuilder(true)
    setDashboardName(template.name)

    // Create widgets based on template
    const templateWidgets = template.widgets.map((widgetTypeId, index) => {
      const widgetType = widgetTypes.find((wt) => wt.id === widgetTypeId)
      return {
        id: `template-${index}`,
        type: widgetTypeId,
        name: widgetType?.name || 'Widget',
        position: { x: index % 2, y: Math.floor(index / 2) },
        size: { width: 2, height: 2 },
        config: {},
      }
    })
    setWidgets(templateWidgets)
  }

  const saveDashboard = () => {
    console.log('Saving dashboard:', {
      name: dashboardName,
      description: dashboardDescription,
      widgets: widgets,
    })
    setShowBuilder(false)
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard Builder</h1>
            <p className="text-muted-foreground">Create custom dashboards tailored to your needs</p>
          </div>
          <button
            onClick={handleCreateNew}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            <Plus size={16} />
            Create Dashboard
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex gap-6 border-b border-border">
          {['builder', 'templates', 'my-dashboards'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors capitalize ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardTemplates.map((template, index) => (
              <div key={index} className="bg-card p-6 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-4">
                  <Layout className="text-primary" size={24} />
                  <span className="text-xs text-muted-foreground">{template.layout}</span>
                </div>

                <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{template.description}</p>

                <div className="mb-4">
                  <p className="text-xs font-medium mb-2">Includes:</p>
                  <div className="flex flex-wrap gap-1">
                    {template.widgets.map((widgetId) => {
                      const widget = widgetTypes.find((w) => w.id === widgetId)
                      return widget ? (
                        <span key={widgetId} className="px-2 py-1 text-xs bg-secondary rounded">
                          {widget.name}
                        </span>
                      ) : null
                    })}
                  </div>
                </div>

                <button
                  onClick={() => handleUseTemplate(template)}
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  Use Template
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* My Dashboards Tab */}
      {activeTab === 'my-dashboards' && (
        <div>
          <div className="space-y-4">
            {mockDashboards.map((dashboard) => (
              <div key={dashboard.id} className="bg-card p-6 rounded-lg border border-border">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{dashboard.name}</h3>
                      {dashboard.isPublic && (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full dark:bg-green-900/30 dark:text-green-400">
                          Public
                        </span>
                      )}
                    </div>

                    <p className="text-muted-foreground mb-4">{dashboard.description}</p>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Widgets</p>
                        <p className="font-medium">{dashboard.widgets}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Template</p>
                        <p className="font-medium">{dashboard.template}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Modified</p>
                        <p className="font-medium">{dashboard.lastModified}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button className="flex items-center gap-1 px-3 py-1 border border-input rounded-md hover:bg-accent text-sm">
                      <Eye size={14} />
                      View
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1 border border-input rounded-md hover:bg-accent text-sm">
                      <Edit size={14} />
                      Edit
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1 border border-input rounded-md hover:bg-accent text-sm">
                      <Copy size={14} />
                      Clone
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1 border border-input rounded-md hover:bg-accent text-sm">
                      <Share size={14} />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dashboard Builder Modal */}
      {showBuilder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg border border-border w-full h-full max-w-none overflow-hidden flex">
            {/* Sidebar */}
            <div className="w-80 border-r border-border flex flex-col">
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Dashboard Builder</h2>
                  <button
                    onClick={() => setShowBuilder(false)}
                    className="p-2 hover:bg-accent rounded-md"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Dashboard name..."
                    value={dashboardName}
                    onChange={(e) => setDashboardName(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                  />
                  <textarea
                    placeholder="Description..."
                    value={dashboardDescription}
                    onChange={(e) => setDashboardDescription(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Widget Library</h3>
                    <div className="space-y-2">
                      {Object.entries(
                        widgetTypes.reduce<Record<string, WidgetType[]>>((acc, widget) => {
                          if (!acc[widget.category]) acc[widget.category] = []
                          acc[widget.category].push(widget)
                          return acc
                        }, {})
                      ).map(([category, categoryWidgets]) => (
                        <div key={category}>
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">
                            {category}
                          </h4>
                          <div className="space-y-1">
                            {(categoryWidgets as WidgetType[]).map((widget) => {
                              const Icon = widget.icon
                              return (
                                <button
                                  key={widget.id}
                                  onClick={() => addWidget(widget)}
                                  className="w-full p-3 border border-border rounded-lg hover:border-primary/50 transition-colors text-left"
                                >
                                  <div className="flex items-center gap-2 mb-1">
                                    <Icon size={16} />
                                    <span className="font-medium text-sm">{widget.name}</span>
                                  </div>
                                  <p className="text-xs text-muted-foreground">
                                    {widget.description}
                                  </p>
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedWidget && (
                    <div>
                      <h3 className="font-semibold mb-3">Widget Settings</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">Widget Name</label>
                          <input
                            type="text"
                            value={selectedWidget.name}
                            onChange={(e) => {
                              const updated = widgets.map((w) =>
                                w.id === selectedWidget.id ? { ...w, name: e.target.value } : w
                              )
                              setWidgets(updated)
                              setSelectedWidget({ ...selectedWidget, name: e.target.value })
                            }}
                            className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Width</label>
                          <select
                            value={selectedWidget.size.width}
                            onChange={(e) => {
                              const updated = widgets.map((w) =>
                                w.id === selectedWidget.id
                                  ? { ...w, size: { ...w.size, width: parseInt(e.target.value) } }
                                  : w
                              )
                              setWidgets(updated)
                              setSelectedWidget({
                                ...selectedWidget,
                                size: { ...selectedWidget.size, width: parseInt(e.target.value) },
                              })
                            }}
                            className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm"
                          >
                            <option value={1}>1 Column</option>
                            <option value={2}>2 Columns</option>
                            <option value={3}>3 Columns</option>
                            <option value={4}>4 Columns</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Height</label>
                          <select
                            value={selectedWidget.size.height}
                            onChange={(e) => {
                              const updated = widgets.map((w) =>
                                w.id === selectedWidget.id
                                  ? { ...w, size: { ...w.size, height: parseInt(e.target.value) } }
                                  : w
                              )
                              setWidgets(updated)
                              setSelectedWidget({
                                ...selectedWidget,
                                size: { ...selectedWidget.size, height: parseInt(e.target.value) },
                              })
                            }}
                            className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm"
                          >
                            <option value={1}>Small</option>
                            <option value={2}>Medium</option>
                            <option value={3}>Large</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowBuilder(false)}
                    className="flex-1 px-3 py-2 border border-input rounded-md hover:bg-accent text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveDashboard}
                    className="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 text-sm"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>

            {/* Main Canvas */}
            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{dashboardName || 'Untitled Dashboard'}</h3>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 px-3 py-1 border border-input rounded-md hover:bg-accent text-sm">
                      <Play size={14} />
                      Preview
                    </button>
                    <div className="flex items-center border border-input rounded-md">
                      <button
                        onClick={() => setViewMode('desktop')}
                        className={`p-2 ${viewMode === 'desktop' ? 'bg-accent' : ''}`}
                      >
                        <Monitor size={16} />
                      </button>
                      <button
                        onClick={() => setViewMode('tablet')}
                        className={`p-2 ${viewMode === 'tablet' ? 'bg-accent' : ''}`}
                      >
                        <Tablet size={16} />
                      </button>
                      <button
                        onClick={() => setViewMode('mobile')}
                        className={`p-2 ${viewMode === 'mobile' ? 'bg-accent' : ''}`}
                      >
                        <Smartphone size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-auto p-6 bg-muted/20">
                {widgets.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <Grid3X3 className="mx-auto text-muted-foreground mb-4" size={48} />
                      <h3 className="text-lg font-semibold mb-2">Start Building Your Dashboard</h3>
                      <p className="text-muted-foreground mb-4">
                        Add widgets from the sidebar to create your custom dashboard
                      </p>
                      <button
                        onClick={() => addWidget(widgetTypes[0])}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                      >
                        Add First Widget
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`grid gap-4 ${
                      viewMode === 'desktop'
                        ? 'grid-cols-4'
                        : viewMode === 'tablet'
                          ? 'grid-cols-2'
                          : 'grid-cols-1'
                    }`}
                  >
                    {widgets.map((widget) => {
                      const widgetType = widgetTypes.find((wt) => wt.id === widget.type)
                      const Icon = widgetType?.icon || Target
                      return (
                        <div
                          key={widget.id}
                          className={`bg-background border rounded-lg cursor-pointer transition-colors ${
                            selectedWidget?.id === widget.id
                              ? 'border-primary'
                              : 'border-border hover:border-primary/50'
                          }`}
                          style={{
                            gridColumn: `span ${Math.min(widget.size.width, viewMode === 'desktop' ? 4 : viewMode === 'tablet' ? 2 : 1)}`,
                            height: `${widget.size.height * 150}px`,
                          }}
                          onClick={() => setSelectedWidget(widget)}
                        >
                          <div className="p-4 border-b border-border">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <GripVertical
                                  size={16}
                                  className="text-muted-foreground cursor-move"
                                />
                                <Icon size={16} />
                                <span className="font-medium">{widget.name}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    duplicateWidget(widget)
                                  }}
                                  className="p-1 hover:bg-accent rounded"
                                >
                                  <Copy size={14} />
                                </button>
                                <button className="p-1 hover:bg-accent rounded">
                                  <Settings size={14} />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    removeWidget(widget.id)
                                  }}
                                  className="p-1 hover:bg-accent rounded text-red-600"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="p-6 h-full flex items-center justify-center text-muted-foreground">
                            <div className="text-center">
                              <Icon size={32} className="mx-auto mb-2" />
                              <p className="text-sm">Configure this {widget.type} widget</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
