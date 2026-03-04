import { useState } from 'react'
import { RoleList, RoleDialog } from '@/components/rbac'
import { PageHeader, StatsRow, StatCard, ActionsBar, PrimaryButton } from '@/components/ui'
import { Shield, Plus } from 'lucide-react'

interface Role {
  id: string
  description: string
  status: 'active' | 'inactive'
  createdAt: string
}

const RoleManagement = () => {
  const [roles] = useState<Role[]>([])
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [description, setDescription] = useState('')

  const handleCreate = () => {
    // TODO: wire up to API
    setDescription('')
    setShowModal(false)
  }

  const total = roles.length
  const active = roles.filter((r) => r.status === 'active').length
  const inactive = roles.filter((r) => r.status === 'inactive').length

  return (
    <div className="space-y-6">
      <PageHeader
        title="Role Management"
        subtitle="Manage roles in your role-based access control system"
        icon={<Shield className="w-6 h-6" />}
      />

      <StatsRow>
        <StatCard label="Total Roles" value={total} />
        <StatCard label="Active Status" value={active} color="success" />
        <StatCard label="Inactive Status" value={inactive} color="warning" />
      </StatsRow>

      <ActionsBar>
        <PrimaryButton onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4" />
          Create Role
        </PrimaryButton>
      </ActionsBar>

      <RoleList
        roles={roles}
        search={search}
        onSearchChange={setSearch}
        onEdit={(r) => console.log('Edit', r)}
        onDelete={(id) => console.log('Delete', id)}
      />

      <RoleDialog
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreate}
        description={description}
        onDescriptionChange={setDescription}
      />
    </div>
  )
}

export default RoleManagement
