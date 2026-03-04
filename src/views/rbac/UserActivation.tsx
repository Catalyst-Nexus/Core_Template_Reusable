import { useState } from 'react'
import { UserActivationList, UserActivationDialog } from '@/components/rbac'
import { PageHeader, StatsRow, StatCard, ActionsBar, PrimaryButton } from '@/components/ui'
import { UserCheck, RefreshCw } from 'lucide-react'

interface PendingUser {
  id: string
  name: string
  email: string
  requestedAt: string
}

const UserActivation = () => {
  const [pendingUsers] = useState<PendingUser[]>([])
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<PendingUser | null>(null)

  const handleActivate = () => {
    // TODO: wire up to API
    setShowModal(false)
    setSelectedUser(null)
  }

  const handleReject = () => {
    // TODO: wire up to API
    setShowModal(false)
    setSelectedUser(null)
  }

  const total = pendingUsers.length

  return (
    <div className="space-y-6">
      <PageHeader
        title="User Activation"
        subtitle="Review and activate pending user registrations"
        icon={<UserCheck className="w-6 h-6" />}
      />

      <StatsRow>
        <StatCard label="Pending Activations" value={total} color="warning" />
      </StatsRow>

      <ActionsBar>
        <PrimaryButton onClick={() => window.location.reload()}>
          <RefreshCw className="w-4 h-4" />
          Refresh List
        </PrimaryButton>
      </ActionsBar>

      <UserActivationList
        users={pendingUsers}
        search={search}
        onSearchChange={setSearch}
        onActivate={(u) => {
          setSelectedUser(u)
          setShowModal(true)
        }}
        onReject={(u) => {
          setSelectedUser(u)
          setShowModal(true)
        }}
      />

      <UserActivationDialog
        open={showModal}
        onClose={() => {
          setShowModal(false)
          setSelectedUser(null)
        }}
        user={selectedUser}
        onActivate={handleActivate}
        onReject={handleReject}
      />
    </div>
  )
}

export default UserActivation
