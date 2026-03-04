import { DataTable, StatusBadge, IconButton } from '@/components/ui'
import { Pencil, Trash2 } from 'lucide-react'

interface Module {
  id: string
  description: string
  status: 'active' | 'inactive'
  createdAt: string
}

interface ModuleListProps {
  modules: Module[]
  search: string
  onSearchChange: (value: string) => void
  onEdit: (module: Module) => void
  onDelete: (id: string) => void
}

const ModuleList = ({ modules, search, onSearchChange, onEdit, onDelete }: ModuleListProps) => {
  const filteredModules = modules.filter(
    (module) =>
      module.id.toLowerCase().includes(search.toLowerCase()) ||
      module.description.toLowerCase().includes(search.toLowerCase())
  )

  const columns = [
    { key: 'id', header: 'Module ID', render: (module: Module) => module.id },
    { key: 'description', header: 'Description', render: (module: Module) => module.description },
    {
      key: 'status',
      header: 'Status',
      render: (module: Module) => (
        <StatusBadge status={module.status === 'active' ? 'success' : 'warning'}>
          {module.status}
        </StatusBadge>
      ),
    },
    { key: 'createdAt', header: 'Created At', render: (module: Module) => module.createdAt },
    {
      key: 'actions',
      header: 'Actions',
      render: (module: Module) => (
        <div className="flex items-center gap-2">
          <IconButton onClick={() => onEdit(module)} title="Edit">
            <Pencil className="w-4 h-4" />
          </IconButton>
          <IconButton onClick={() => onDelete(module.id)} title="Delete" variant="danger">
            <Trash2 className="w-4 h-4" />
          </IconButton>
        </div>
      ),
    },
  ]

  return (
    <DataTable
      data={filteredModules}
      columns={columns}
      keyField="id"
      searchPlaceholder="Search modules..."
      searchValue={search}
      onSearchChange={onSearchChange}
      emptyMessage="No modules found"
    />
  )
}

export default ModuleList
