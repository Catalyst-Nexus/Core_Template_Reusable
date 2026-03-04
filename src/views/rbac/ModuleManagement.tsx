import { useState } from 'react'
import { ModuleList, ModuleDialog } from '@/components/rbac'
import { PageHeader, StatsRow, StatCard, ActionsBar, PrimaryButton } from '@/components/ui'
import { Blocks, Plus } from 'lucide-react'

interface Module {
  id: string
  description: string
  status: 'active' | 'inactive'
  createdAt: string
}

const ModuleManagement = () => {
  const [modules] = useState<Module[]>([])
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [description, setDescription] = useState('')

  const handleCreate = () => {
    // TODO: wire up to API
    setDescription('')
    setShowModal(false)
  }

  const total = modules.length
  const active = modules.filter((m) => m.status === 'active').length
  const inactive = modules.filter((m) => m.status === 'inactive').length

  return (
    <div className="space-y-6">
      <PageHeader
        title="Module Management"
        subtitle="Manage modules in your role-based access control system"
        icon={<Blocks className="w-6 h-6" />}
      />

      <StatsRow>
        <StatCard label="Total Modules" value={total} />
        <StatCard label="Active Status" value={active} color="success" />
        <StatCard label="Inactive Status" value={inactive} color="warning" />
      </StatsRow>

      <ActionsBar>
        <PrimaryButton onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4" />
          Add Module
        </PrimaryButton>
      </ActionsBar>

      <ModuleList
        modules={modules}
        search={search}
        onSearchChange={setSearch}
        onEdit={(m) => console.log('Edit', m)}
        onDelete={(id) => console.log('Delete', id)}
      />

      <ModuleDialog
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreate}
        description={description}
        onDescriptionChange={setDescription}
      />
    </div>
  )
}

export default ModuleManagement
