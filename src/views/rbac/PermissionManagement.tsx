import { useState, useEffect } from 'react'
import { PageHeader, StatsRow, StatCard, ActionsBar, PrimaryButton } from '@/components/ui'
import { Key, Plus, RefreshCw, Edit2, Trash2 } from 'lucide-react'
import { BaseDialog, FormInput } from '@/components/ui/dialog'
import {
  fetchPermissions,
  fetchModules,
  createPermission,
  updatePermission,
  deletePermission,
  type Permission,
  type Module,
} from '@/services/rbacService'

const ACTION_TYPES = ['create', 'read', 'update', 'delete', 'manage']

const PermissionManagement = () => {
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [modules, setModules] = useState<Module[]>([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  // form state
  const [formModuleId, setFormModuleId] = useState('')
  const [formActionType, setFormActionType] = useState('')
  const [formCode, setFormCode] = useState('')
  const [formDescription, setFormDescription] = useState('')

  useEffect(() => { loadData() }, [])

  const loadData = async () => {
    setIsLoading(true)
    const [perms, mods] = await Promise.all([fetchPermissions(), fetchModules()])
    setPermissions(perms)
    setModules(mods)
    setIsLoading(false)
  }

  const resetForm = () => {
    setFormModuleId('')
    setFormActionType('')
    setFormCode('')
    setFormDescription('')
    setEditingId(null)
  }

  const openCreate = () => { resetForm(); setShowModal(true) }

  const openEdit = (p: Permission) => {
    setEditingId(p.id)
    setFormModuleId(p.module_id)
    setFormActionType(p.action_type)
    setFormCode(p.permission_code)
    setFormDescription(p.description)
    setShowModal(true)
  }

  // Auto-generate permission code from module + action
  const handleActionChange = (action: string) => {
    setFormActionType(action)
    const mod = modules.find((m) => m.id === formModuleId)
    if (mod && action) {
      setFormCode(`${mod.module_name.toLowerCase().replace(/\s+/g, '_')}:${action}`)
    }
  }

  const handleModuleChange = (id: string) => {
    setFormModuleId(id)
    const mod = modules.find((m) => m.id === id)
    if (mod && formActionType) {
      setFormCode(`${mod.module_name.toLowerCase().replace(/\s+/g, '_')}:${formActionType}`)
    }
  }

  const handleSubmit = async () => {
    if (!formModuleId || !formActionType || !formCode.trim()) {
      alert('Please fill in all required fields')
      return
    }

    const payload = {
      module_id: formModuleId,
      action_type: formActionType,
      permission_code: formCode.trim(),
      description: formDescription.trim(),
    }

    const result = editingId
      ? await updatePermission(editingId, payload)
      : await createPermission(payload)

    if (!result.success) { alert(result.error); return }
    setShowModal(false)
    resetForm()
    await loadData()
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this permission?')) return
    const result = await deletePermission(id)
    if (!result.success) { alert(result.error); return }
    setPermissions((p) => p.filter((x) => x.id !== id))
  }

  const filtered = permissions.filter(
    (p) =>
      p.permission_code.toLowerCase().includes(search.toLowerCase()) ||
      p.action_type.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  )

  const getModuleName = (moduleId: string) =>
    modules.find((m) => m.id === moduleId)?.module_name ?? moduleId

  return (
    <div className="space-y-6">
      <PageHeader
        title="Permissions"
        subtitle="Manage granular permissions for modules"
        icon={<Key className="w-6 h-6" />}
      />

      <StatsRow>
        <StatCard label="Total Permissions" value={permissions.length} />
        <StatCard label="Total Modules" value={modules.length} color="success" />
      </StatsRow>

      <ActionsBar>
        <PrimaryButton onClick={loadData} disabled={isLoading}>
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </PrimaryButton>
        <span className="ml-2">
          <PrimaryButton onClick={openCreate}>
            <Plus className="w-4 h-4" />
            Add Permission
          </PrimaryButton>
        </span>
      </ActionsBar>

      {/* Table */}
      <div className="bg-surface border border-border rounded-2xl p-6">
        <div className="relative w-64 mb-4">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
            <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg text-sm bg-background text-foreground placeholder:text-muted focus:outline-none focus:border-success"
            placeholder="Search permissions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                {['Module', 'Action Type', 'Permission Code', 'Description', 'Actions'].map((h) => (
                  <th key={h} className="bg-background text-muted font-semibold text-left px-4 py-3 border-b border-border">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={5} className="text-center text-muted py-8">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="text-center text-muted py-8">No permissions found.</td></tr>
              ) : filtered.map((p) => (
                <tr key={p.id} className="hover:bg-background transition-colors">
                  <td className="px-4 py-3 border-b border-border/50">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                      {getModuleName(p.module_id)}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-b border-border/50">
                    <span className="px-2 py-1 bg-success/10 text-success text-xs rounded capitalize">
                      {p.action_type}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-b border-border/50 font-mono text-xs">{p.permission_code}</td>
                  <td className="px-4 py-3 border-b border-border/50 text-muted">{p.description || '—'}</td>
                  <td className="px-4 py-3 border-b border-border/50">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(p)} className="text-primary hover:text-success transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="text-muted hover:text-danger transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dialog */}
      <BaseDialog
        open={showModal}
        onClose={() => { setShowModal(false); resetForm() }}
        title={editingId ? 'Edit Permission' : 'Add Permission'}
        onSubmit={handleSubmit}
        submitLabel={editingId ? 'Save Changes' : 'Create'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Module *</label>
            <select
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:border-success"
              value={formModuleId}
              onChange={(e) => handleModuleChange(e.target.value)}
            >
              <option value="">Select a module...</option>
              {modules.map((m) => (
                <option key={m.id} value={m.id}>{m.module_name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Action Type *</label>
            <select
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:border-success"
              value={formActionType}
              onChange={(e) => handleActionChange(e.target.value)}
            >
              <option value="">Select action...</option>
              {ACTION_TYPES.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          <FormInput
            id="permission_code"
            label="Permission Code *"
            value={formCode}
            onChange={setFormCode}
            placeholder="e.g. users:read"
            required
          />

          <FormInput
            id="description"
            label="Description"
            value={formDescription}
            onChange={setFormDescription}
            placeholder="Brief description of this permission"
          />
        </div>
      </BaseDialog>
    </div>
  )
}

export default PermissionManagement
