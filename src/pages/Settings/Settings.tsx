import { useSettingsStore } from '@/store'
import { cn } from '@/lib/utils'
import {
  Search,
  Palette,
  Sun,
  Moon,
  Sparkles,
  Type,
  AlignJustify,
  Shield,
  LogOut,
  Eye,
  History,
  Info,
  Monitor,
} from 'lucide-react'
import * as Switch from '@radix-ui/react-switch'
import * as Select from '@radix-ui/react-select'

const Settings = () => {
  const {
    darkMode,
    compactMode,
    fontSize,
    tableDensity,
    autoLogout,
    highContrast,
    reducedMotion,
    setDarkMode,
    setCompactMode,
    setFontSize,
    setTableDensity,
    setAutoLogout,
    setHighContrast,
    setReducedMotion,
  } = useSettingsStore()

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  })

  const getBrowserName = () => {
    const userAgent = navigator.userAgent
    if (userAgent.includes('Edg')) return 'Microsoft Edge'
    if (userAgent.includes('Chrome')) return 'Google Chrome'
    if (userAgent.includes('Firefox')) return 'Mozilla Firefox'
    if (userAgent.includes('Safari')) return 'Safari'
    return 'Unknown Browser'
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary">Settings</h1>
        <p className="text-sm text-muted mt-1">Manage your application preferences</p>
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            className="w-full pl-11 pr-4 py-3 border border-border rounded-xl text-sm bg-surface text-foreground placeholder:text-muted focus:outline-none focus:border-primary"
            placeholder="Search settings..."
          />
        </div>

        {/* Appearance Section */}
        <section className="bg-surface border border-border rounded-2xl overflow-hidden">
          <div className="flex items-center gap-3 p-5 border-b border-border">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100 text-purple-600">
              <Palette className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-primary">Appearance</h2>
          </div>

          <div className="divide-y divide-border">
            {/* Dark Mode */}
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-100 text-amber-600">
                  {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Dark Mode</h3>
                  <p className="text-xs text-muted mt-0.5">Switch to dark theme</p>
                </div>
              </div>
              <Switch.Root
                checked={darkMode}
                onCheckedChange={setDarkMode}
                className={cn(
                  'w-11 h-6 rounded-full transition-colors relative',
                  darkMode ? 'bg-success' : 'bg-border'
                )}
              >
                <Switch.Thumb
                  className={cn(
                    'block w-5 h-5 bg-white rounded-full shadow transition-transform',
                    darkMode ? 'translate-x-5.5' : 'translate-x-0.5'
                  )}
                />
              </Switch.Root>
            </div>

            {/* Compact Mode */}
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-pink-100 text-pink-600">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Compact Mode</h3>
                  <p className="text-xs text-muted mt-0.5">Reduce spacing and padding for more content</p>
                </div>
              </div>
              <Switch.Root
                checked={compactMode}
                onCheckedChange={setCompactMode}
                className={cn(
                  'w-11 h-6 rounded-full transition-colors relative',
                  compactMode ? 'bg-success' : 'bg-border'
                )}
              >
                <Switch.Thumb
                  className={cn(
                    'block w-5 h-5 bg-white rounded-full shadow transition-transform',
                    compactMode ? 'translate-x-5.5' : 'translate-x-0.5'
                  )}
                />
              </Switch.Root>
            </div>

            {/* Font Size */}
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-600">
                  <Type className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Font Size</h3>
                  <p className="text-xs text-muted mt-0.5">Adjust text size across the application</p>
                </div>
              </div>
              <Select.Root value={fontSize} onValueChange={(v) => setFontSize(v as 'small' | 'medium' | 'large')}>
                <Select.Trigger className="inline-flex items-center justify-between gap-2 px-4 py-2 min-w-32 border border-border rounded-lg text-sm font-medium bg-background text-foreground hover:bg-border/50 transition-colors">
                  <Select.Value />
                  <Select.Icon />
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="bg-surface border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                    <Select.Viewport className="p-1">
                      <Select.Item value="small" className="px-3 py-2 text-sm text-foreground rounded cursor-pointer hover:bg-background outline-none">
                        <Select.ItemText>Small</Select.ItemText>
                      </Select.Item>
                      <Select.Item value="medium" className="px-3 py-2 text-sm text-foreground rounded cursor-pointer hover:bg-background outline-none">
                        <Select.ItemText>Medium</Select.ItemText>
                      </Select.Item>
                      <Select.Item value="large" className="px-3 py-2 text-sm text-foreground rounded cursor-pointer hover:bg-background outline-none">
                        <Select.ItemText>Large</Select.ItemText>
                      </Select.Item>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>

            {/* Table Density */}
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-100 text-green-600">
                  <AlignJustify className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Table Density</h3>
                  <p className="text-xs text-muted mt-0.5">Control row spacing in tables</p>
                </div>
              </div>
              <Select.Root value={tableDensity} onValueChange={(v) => setTableDensity(v as 'comfortable' | 'standard' | 'compact')}>
                <Select.Trigger className="inline-flex items-center justify-between gap-2 px-4 py-2 min-w-32 border border-border rounded-lg text-sm font-medium bg-background text-foreground hover:bg-border/50 transition-colors">
                  <Select.Value />
                  <Select.Icon />
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="bg-surface border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                    <Select.Viewport className="p-1">
                      <Select.Item value="comfortable" className="px-3 py-2 text-sm text-foreground rounded cursor-pointer hover:bg-background outline-none">
                        <Select.ItemText>Comfortable</Select.ItemText>
                      </Select.Item>
                      <Select.Item value="standard" className="px-3 py-2 text-sm text-foreground rounded cursor-pointer hover:bg-background outline-none">
                        <Select.ItemText>Standard</Select.ItemText>
                      </Select.Item>
                      <Select.Item value="compact" className="px-3 py-2 text-sm text-foreground rounded cursor-pointer hover:bg-background outline-none">
                        <Select.ItemText>Compact</Select.ItemText>
                      </Select.Item>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
          </div>
        </section>

        {/* Session & Security Section */}
        <section className="bg-surface border border-border rounded-2xl overflow-hidden">
          <div className="flex items-center gap-3 p-5 border-b border-border">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-100 text-red-600">
              <Shield className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-primary">Session & Security</h2>
          </div>

          <div className="divide-y divide-border">
            {/* Auto Logout */}
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-100 text-orange-600">
                  <LogOut className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Auto Logout</h3>
                  <p className="text-xs text-muted mt-0.5">Automatically log out after 15 minutes of inactivity</p>
                </div>
              </div>
              <Switch.Root
                checked={autoLogout}
                onCheckedChange={setAutoLogout}
                className={cn(
                  'w-11 h-6 rounded-full transition-colors relative',
                  autoLogout ? 'bg-success' : 'bg-border'
                )}
              >
                <Switch.Thumb
                  className={cn(
                    'block w-5 h-5 bg-white rounded-full shadow transition-transform',
                    autoLogout ? 'translate-x-5.5' : 'translate-x-0.5'
                  )}
                />
              </Switch.Root>
            </div>
          </div>
        </section>

        {/* Accessibility Section */}
        <section className="bg-surface border border-border rounded-2xl overflow-hidden">
          <div className="flex items-center gap-3 p-5 border-b border-border">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600">
              <Eye className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-primary">Accessibility</h2>
          </div>

          <div className="divide-y divide-border">
            {/* High Contrast */}
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-yellow-100 text-yellow-600">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">High Contrast</h3>
                  <p className="text-xs text-muted mt-0.5">Increase color contrast for better visibility</p>
                </div>
              </div>
              <Switch.Root
                checked={highContrast}
                onCheckedChange={setHighContrast}
                className={cn(
                  'w-11 h-6 rounded-full transition-colors relative',
                  highContrast ? 'bg-success' : 'bg-border'
                )}
              >
                <Switch.Thumb
                  className={cn(
                    'block w-5 h-5 bg-white rounded-full shadow transition-transform',
                    highContrast ? 'translate-x-5.5' : 'translate-x-0.5'
                  )}
                />
              </Switch.Root>
            </div>

            {/* Reduced Motion */}
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-100 text-cyan-600">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Reduced Motion</h3>
                  <p className="text-xs text-muted mt-0.5">Minimize animations and transitions</p>
                </div>
              </div>
              <Switch.Root
                checked={reducedMotion}
                onCheckedChange={setReducedMotion}
                className={cn(
                  'w-11 h-6 rounded-full transition-colors relative',
                  reducedMotion ? 'bg-success' : 'bg-border'
                )}
              >
                <Switch.Thumb
                  className={cn(
                    'block w-5 h-5 bg-white rounded-full shadow transition-transform',
                    reducedMotion ? 'translate-x-5.5' : 'translate-x-0.5'
                  )}
                />
              </Switch.Root>
            </div>
          </div>
        </section>

        {/* System Information Section */}
        <section className="bg-surface border border-border rounded-2xl overflow-hidden">
          <div className="flex items-center gap-3 p-5 border-b border-border">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 text-gray-600">
              <Info className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-primary">System Information</h2>
          </div>

          <div className="divide-y divide-border">
            <div className="flex items-center justify-between p-5">
              <span className="text-sm text-muted">Current Theme</span>
              <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                {darkMode ? 'Dark Mode' : 'Light Mode'}
              </span>
            </div>
            <div className="flex items-center justify-between p-5">
              <span className="text-sm text-muted">Application Version</span>
              <span className="text-sm font-medium text-foreground">v2.0.0</span>
            </div>
            <div className="flex items-center justify-between p-5">
              <span className="text-sm text-muted">Last Updated</span>
              <span className="text-sm font-medium text-foreground">{currentDate}</span>
            </div>
            <div className="flex items-center justify-between p-5">
              <span className="text-sm text-muted">Browser</span>
              <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Monitor className="w-4 h-4" />
                {getBrowserName()}
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Settings
