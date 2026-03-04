import { useState, useEffect } from 'react'
import { PageHeader, StatsRow, StatCard, ActionsBar, PrimaryButton } from '@/components/ui'
import { Shield, RefreshCw, Save } from 'lucide-react'
import {
  fetchRoles,
  fetchPermissions,
  getRolePermissions,
  assignPermissionsToRole,
  fetchModules,
  type Role,
  type Permission,
  type Module,
} from '@/services/rbacService'

const RolePermissionManagement = () => {
  const [roles, setRoles] = useState<Role[]>([])
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [modules, setModules] = useState<Module[]>([])
  const [selectedRoleId, setSelectedRoleId] = useState('')
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => { loadData() }, [])

  useEffect(() => {
    if (selectedRoleId) loadRolePermissions(selectedRoleId)
    else setSelectedPermissions([])
  }, [selectedRoleId])

  const loadData = async () => {
    setIsLoading(true)
    setError('')
    const [r, p, m] = await Promise.all([fetchRoles(), fetchPermissions(), fetchModules()])
    setRoles(r)
    setPermissions(p)
    setModules(m)
    setIsLoading(false)
  }

  const loadRolePermissions = async (roleId: string) => {
    try {
      const rp = await getRolePermissions(roleId)
      setSelectedPermissions(rp.map((p) => p.id))
    } catch {
      setSelectedPermissions([])
    }
  }

  const handleToggle = (permId: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permId) ? prev.filter((id) => id !== permId) : [...prev, permId]
    )
  }

  const handleSave = async () => {
    if (!selectedRoleId) { setError('Please select a role first'); return }
    setIsSaving(true); setError(''); setSuccess('')
    try {
      const result = await assignPermissionsToRole(selectedRoleId, selectedPermissions)
      if (result.success) {
        setSuccess('Permissions updated successfully')
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError(result.error || 'Failed to update permissions')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSaving(false)
    }
  }

  const getModuleName = (moduleId: string) =>
    modules.find((m) => m.id === moduleId)?.module_name ?? '—'

  // Group permissions by module
  const grouped = permissions.reduce<Record<string, Permission[]>>((acc, p) => {
    const key = p.module_id
    if (!acc[key]) acc[key] = []
    acc[key].push(p)
    return acc
  }, {})

  const selectedRole = roles.find((r) => r.id === selectedRoleId)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Role Permissions"
        subtitle="Assign granular permissions to roles"
        icon={<Shield className="w-6 h-6" />}
      />

      <StatsRow>
        <StatCard label="Total Roles" value={roles.length} />
        <StatCard label="Total Permissions" value={permissions.length} />
        <StatCard
          label="Selected Permissions"
          value={selectedPermissions.length}
          color={selectedPermissions.length > 0 ? 'success' : 'warning'}
        />
      </StatsRow>

      <ActionsBar>
        <PrimaryButton onClick={loadData} disabled={isLoading}>
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </PrimaryButton>
      </ActionsBar>

      {error && (
        <div className="px-4 py-3 bg-danger/10 border border-danger/20 rounded-lg text-sm text-danger">{error}</div>
      )}
      {success && (
        <div className="px-4 py-3 bg-success/10 border border-success/20 rounded-lg text-sm text-success">{success}</div>
      )}

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Role selector */}
        <div className="lg:col-span-1">
          <div className="bg-surface border border-border rounded-2xl p-5 space-y-3">
            <h3 className="font-semibold text-foreground">Select Role</h3>
            <select
              className="w-full px-3 py-2.5 border border-border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:border-success"
              value={selectedRoleId}
              onChange={(e) => setSelectedRoleId(e.target.value)}
              disabled={isLoading}
            >
              <option value="">-- Choose a role --</option>
              {roles.map((r) => (
                <option key={r.id} value={r.id}>{r.role_name}</option>
              ))}
            </select>

            {selectedRole && (
              <div className="text-sm space-y-1 pt-3 border-t border-border">
                <p className="text-muted">Selected:</p>
                <p className="font-medium text-foreground">{selectedRole.role_name}</p>
                <p className="text-xs text-muted uppercase">{selectedRole.role_code}</p>
              </div>
            )}
          </div>
        </div>

        {/* Permission list grouped by module */}
        <div className="lg:col-span-3 space-y-4">
          {isLoading ? (
            <div className="bg-surface border border-border rounded-2xl p-8 text-center text-muted">
              Loading permissions...
            </div>
          ) : permissions.length === 0 ? (
            <div className="bg-surface border border-border rounded-2xl p-8 text-center text-muted">
              No permissions found. Create some in the Permissions page first.
            </div>
          ) : (
            Object.entries(grouped).map(([moduleId, perms]) => (
              <div key={moduleId} className="bg-surface border border-border rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                    {getModuleName(moduleId)}
                  </span>
                  <span className="text-xs text-muted">
                    {perms.filter((p) => selectedPermissions.includes(p.id)).length}/{perms.length} selected
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {perms.map((perm) => (
                    <label
                      key={perm.id}
                      className="flex items-start gap-3 p-3 border border-border rounded-lg hover:bg-background/50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedPermissions.includes(perm.id)}
                        onChange={() => handleToggle(perm.id)}
                        disabled={!selectedRoleId || isLoading}
                        className="w-4 h-4 mt-0.5 rounded border-border text-success"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-xs text-foreground">{perm.permission_code}</p>
                        <p className="text-xs text-muted mt-0.5 capitalize">{perm.action_type}</p>
                        {perm.description && (
                          <p className="text-xs text-muted/70 mt-0.5 truncate">{perm.description}</p>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            ))
          )}

          {selectedRoleId && !isLoading && (
            <div className="flex justify-end">
              <PrimaryButton onClick={handleSave} disabled={isSaving}>
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </PrimaryButton>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RolePermissionManagement
