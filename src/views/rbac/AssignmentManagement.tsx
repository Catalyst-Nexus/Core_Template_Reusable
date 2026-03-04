import { useState } from 'react'
import { AssignmentList, AssignmentDialog } from '@/components/rbac'
import { PageHeader, StatsRow, StatCard, ActionsBar, PrimaryButton } from '@/components/ui'
import { ClipboardList, Plus } from 'lucide-react'

interface Assignment {
  id: string
  description: string
  status: 'active' | 'inactive'
  createdAt: string
}

const AssignmentManagement = () => {
  const [assignments] = useState<Assignment[]>([])
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [description, setDescription] = useState('')

  const handleCreate = () => {
    // TODO: wire up to API
    setDescription('')
    setShowModal(false)
  }

  const total = assignments.length
  const active = assignments.filter((a) => a.status === 'active').length
  const inactive = assignments.filter((a) => a.status === 'inactive').length

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assignment Management"
        subtitle="Manage assignments in your role-based access control system"
        icon={<ClipboardList className="w-6 h-6" />}
      />

      <StatsRow>
        <StatCard label="Total Assignments" value={total} />
        <StatCard label="Active Status" value={active} color="success" />
        <StatCard label="Inactive Status" value={inactive} color="warning" />
      </StatsRow>

      <ActionsBar>
        <PrimaryButton onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4" />
          Add Assignment
        </PrimaryButton>
      </ActionsBar>

      <AssignmentList
        assignments={assignments}
        search={search}
        onSearchChange={setSearch}
        onEdit={(a) => console.log('Edit', a)}
        onDelete={(id) => console.log('Delete', id)}
      />

      <AssignmentDialog
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreate}
        description={description}
        onDescriptionChange={setDescription}
      />
    </div>
  )
}

export default AssignmentManagement
