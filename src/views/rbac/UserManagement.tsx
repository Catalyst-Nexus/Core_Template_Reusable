import { useState } from 'react'
import { UserList, UserDialog } from '@/components/rbac'
import { PageHeader, StatsRow, StatCard, ActionsBar, PrimaryButton, Tabs, PlaceholderCard } from '@/components/ui'
import { Users, Plus } from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  status: 'active' | 'inactive'
  registeredAt: string
}

type TabKey = 'users' | 'assignments' | 'roles' | 'access'

const tabs = [
  { key: 'users', label: 'Users' },
  { key: 'assignments', label: 'User Assignments' },
  { key: 'roles', label: 'User Roles' },
  { key: 'access', label: 'Role Module Access' },
]

const UserManagement = () => {
  const [users] = useState<User[]>([])
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<TabKey>('users')
  const [showModal, setShowModal] = useState(false)
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')

  const handleCreate = () => {
    // TODO: wire up to API
    setFormName('')
    setFormEmail('')
    setShowModal(false)
  }

  const total = users.length
  const active = users.filter((u) => u.status === 'active').length
  const inactive = users.filter((u) => u.status === 'inactive').length

  return (
    <div className="space-y-6">
      <PageHeader
        title="User Management"
        subtitle="Manage users in your role-based access control system"
        icon={<Users className="w-6 h-6" />}
      />

      <StatsRow>
        <StatCard label="Total Users" value={total} />
        <StatCard label="Active Status" value={active} color="success" />
        <StatCard label="Inactive Status" value={inactive} color="warning" />
      </StatsRow>

      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(key) => setActiveTab(key as TabKey)}
      />

      <ActionsBar>
        <PrimaryButton onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4" />
          Add User
        </PrimaryButton>
      </ActionsBar>

      {activeTab === 'users' && (
        <UserList
          users={users}
          search={search}
          onSearchChange={setSearch}
          onEdit={(u) => console.log('Edit', u)}
          onDelete={(id) => console.log('Delete', id)}
        />
      )}

      {activeTab === 'assignments' && (
        <PlaceholderCard>User Assignments content coming soon...</PlaceholderCard>
      )}

      {activeTab === 'roles' && (
        <PlaceholderCard>User Roles content coming soon...</PlaceholderCard>
      )}

      {activeTab === 'access' && (
        <PlaceholderCard>Role Module Access content coming soon...</PlaceholderCard>
      )}

      <UserDialog
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreate}
        name={formName}
        onNameChange={setFormName}
        email={formEmail}
        onEmailChange={setFormEmail}
      />
    </div>
  )
}

export default UserManagement
