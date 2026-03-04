import { useState, useEffect, useCallback } from 'react'
import { PageHeader, StatsRow, StatCard, ActionsBar, PrimaryButton } from '@/components/ui'
import { Shield, RefreshCw, Save, Check, X } from 'lucide-react'
import {
  fetchRoles,
  getRolePermissions,
  saveAllRolePermissions,
  fetchModules,
  type Role,
  type RolePermission,
  type Module,
} from '@/services/rbacService'

interface ModulePermissions {
  module_id: string
  can_select: boolean
  can_insert: boolean
  can_update: boolean
  can_delete: boolean
}

const RolePermissionManagement = () => {
  const [roles, setRoles] = useState<Role[]>([])
  const [modules, setModules] = useState<Module[]>([])
  const [selectedRoleId, setSelectedRoleId] = useState('')
  const [modulePermissions, setModulePermissions] = useState<ModulePermissions[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const initModulePermissions = useCallback((mods: Module[], existingPerms: RolePermission[]) => {
    const permsMap = new Map(existingPerms.map(p => [p.module_id, p]))
    return mods.map(mod => {
      const existing = permsMap.get(mod.id)
      return {
        module_id: mod.id,
        can_select: existing?.can_select ?? false,
        can_insert: existing?.can_insert ?? false,
        can_update: existing?.can_update ?? false,
        can_delete: existing?.can_delete ?? false,
      }
    })
  }, [])

  const loadData = useCallback(async () => {
    setIsLoading(true)
    setError('')
    const [r, m] = await Promise.all([fetchRoles(), fetchModules()])
    setRoles(r)
    setModules(m)
    setModulePermissions(initModulePermissions(m, []))
    setIsLoading(false)
  }, [initModulePermissions])

  const loadRolePermissions = useCallback(async (roleId: string, mods: Module[]) => {
    try {
      const rp = await getRolePermissions(roleId)
      setModulePermissions(initModulePermissions(mods, rp))
    } catch {
      setModulePermissions(initModulePermissions(mods, []))
    }
  }, [initModulePermissions])

  useEffect(() => { loadData() }, [loadData])

  useEffect(() => {
    if (selectedRoleId && modules.length > 0) {
      loadRolePermissions(selectedRoleId, modules)
    } else {
      setModulePermissions(initModulePermissions(modules, []))
    }
  }, [selectedRoleId, modules, initModulePermissions, loadRolePermissions])

  const handleToggle = (moduleId: string, action: 'can_select' | 'can_insert' | 'can_update' | 'can_delete') => {
    setModulePermissions(prev =>
      prev.map(mp =>
        mp.module_id === moduleId ? { ...mp, [action]: !mp[action] } : mp
      )
    )
  }

  const handleToggleAll = (moduleId: string, enable: boolean) => {
    setModulePermissions(prev =>
      prev.map(mp =>
        mp.module_id === moduleId
          ? { ...mp, can_select: enable, can_insert: enable, can_update: enable, can_delete: enable }
          : mp
      )
    )
  }

  const handleSave = async () => {
    if (!selectedRoleId) { setError('Please select a role first'); return }
    setIsSaving(true); setError(''); setSuccess('')
    try {
      const result = await saveAllRolePermissions(selectedRoleId, modulePermissions)
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

  const selectedRole = roles.find((r) => r.id === selectedRoleId)

  const totalPermissions = modulePermissions.reduce(
    (acc, mp) => acc + (mp.can_select ? 1 : 0) + (mp.can_insert ? 1 : 0) + (mp.can_update ? 1 : 0) + (mp.can_delete ? 1 : 0),
    0
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="Role Permissions"
        subtitle="Assign CRUD permissions per module for each role"
        icon={<Shield className="w-6 h-6" />}
      />

      <StatsRow>
        <StatCard label="Total Roles" value={roles.length} />
        <StatCard label="Total Modules" value={modules.length} />
        <StatCard
          label="Active Permissions"
          value={totalPermissions}
          color={totalPermissions > 0 ? 'success' : 'warning'}
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

        {/* Permission matrix by module */}
        <div className="lg:col-span-3 space-y-4">
          {isLoading ? (
            <div className="bg-surface border border-border rounded-2xl p-8 text-center text-muted">
              Loading modules...
            </div>
          ) : modules.length === 0 ? (
            <div className="bg-surface border border-border rounded-2xl p-8 text-center text-muted">
              No modules found. Create some in the Modules page first.
            </div>
          ) : (
            <div className="bg-surface border border-border rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-background/50">
                    <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Module</th>
                    <th className="text-center px-3 py-3 text-sm font-semibold text-foreground w-20">Select</th>
                    <th className="text-center px-3 py-3 text-sm font-semibold text-foreground w-20">Insert</th>
                    <th className="text-center px-3 py-3 text-sm font-semibold text-foreground w-20">Update</th>
                    <th className="text-center px-3 py-3 text-sm font-semibold text-foreground w-20">Delete</th>
                    <th className="text-center px-3 py-3 text-sm font-semibold text-foreground w-24">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {modulePermissions.map((mp) => {
                    const allEnabled = mp.can_select && mp.can_insert && mp.can_update && mp.can_delete
                    const anyEnabled = mp.can_select || mp.can_insert || mp.can_update || mp.can_delete
                    return (
                      <tr key={mp.module_id} className="border-b border-border last:border-0 hover:bg-background/30">
                        <td className="px-4 py-3">
                          <span className="text-sm font-medium text-foreground">
                            {getModuleName(mp.module_id)}
                          </span>
                        </td>
                        <td className="text-center px-3 py-3">
                          <input
                            type="checkbox"
                            checked={mp.can_select}
                            onChange={() => handleToggle(mp.module_id, 'can_select')}
                            disabled={!selectedRoleId || isLoading}
                            className="w-4 h-4 rounded border-border text-success"
                          />
                        </td>
                        <td className="text-center px-3 py-3">
                          <input
                            type="checkbox"
                            checked={mp.can_insert}
                            onChange={() => handleToggle(mp.module_id, 'can_insert')}
                            disabled={!selectedRoleId || isLoading}
                            className="w-4 h-4 rounded border-border text-success"
                          />
                        </td>
                        <td className="text-center px-3 py-3">
                          <input
                            type="checkbox"
                            checked={mp.can_update}
                            onChange={() => handleToggle(mp.module_id, 'can_update')}
                            disabled={!selectedRoleId || isLoading}
                            className="w-4 h-4 rounded border-border text-success"
                          />
                        </td>
                        <td className="text-center px-3 py-3">
                          <input
                            type="checkbox"
                            checked={mp.can_delete}
                            onChange={() => handleToggle(mp.module_id, 'can_delete')}
                            disabled={!selectedRoleId || isLoading}
                            className="w-4 h-4 rounded border-border text-success"
                          />
                        </td>
                        <td className="text-center px-3 py-3">
                          <div className="flex justify-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleToggleAll(mp.module_id, true)}
                              disabled={!selectedRoleId || isLoading || allEnabled}
                              className="p-1.5 rounded hover:bg-success/10 text-success disabled:opacity-30 disabled:cursor-not-allowed"
                              title="Enable all"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleToggleAll(mp.module_id, false)}
                              disabled={!selectedRoleId || isLoading || !anyEnabled}
                              className="p-1.5 rounded hover:bg-danger/10 text-danger disabled:opacity-30 disabled:cursor-not-allowed"
                              title="Disable all"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
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
