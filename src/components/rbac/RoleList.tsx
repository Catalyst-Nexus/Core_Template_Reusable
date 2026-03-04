import { DataTable, StatusBadge, IconButton } from '@/components/ui'
import { Pencil, Trash2 } from 'lucide-react'

interface Role {
  id: string
  description: string
  status: 'active' | 'inactive'
  createdAt: string
}

interface RoleListProps {
  roles: Role[]
  search: string
  onSearchChange: (value: string) => void
  onEdit: (role: Role) => void
  onDelete: (id: string) => void
}

const RoleList = ({ roles, search, onSearchChange, onEdit, onDelete }: RoleListProps) => {
  const filteredRoles = roles.filter(
    (role) =>
      role.id.toLowerCase().includes(search.toLowerCase()) ||
      role.description.toLowerCase().includes(search.toLowerCase())
  )

  const columns = [
    { key: 'id', header: 'Role ID', render: (role: Role) => role.id },
    { key: 'description', header: 'Description', render: (role: Role) => role.description },
    {
      key: 'status',
      header: 'Status',
      render: (role: Role) => (
        <StatusBadge status={role.status === 'active' ? 'success' : 'warning'}>
          {role.status}
        </StatusBadge>
      ),
    },
    { key: 'createdAt', header: 'Created At', render: (role: Role) => role.createdAt },
    {
      key: 'actions',
      header: 'Actions',
      render: (role: Role) => (
        <div className="flex items-center gap-2">
          <IconButton onClick={() => onEdit(role)} title="Edit">
            <Pencil className="w-4 h-4" />
          </IconButton>
          <IconButton onClick={() => onDelete(role.id)} title="Delete" variant="danger">
            <Trash2 className="w-4 h-4" />
          </IconButton>
        </div>
      ),
    },
  ]

  return (
    <DataTable
      data={filteredRoles}
      columns={columns}
      keyField="id"
      searchPlaceholder="Search roles..."
      searchValue={search}
      onSearchChange={onSearchChange}
      emptyMessage="No roles found"
    />
  )
}

export default RoleList
