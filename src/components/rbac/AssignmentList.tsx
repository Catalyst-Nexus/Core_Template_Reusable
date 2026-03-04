import { DataTable, StatusBadge, IconButton } from '@/components/ui'
import { Pencil, Trash2 } from 'lucide-react'

interface Assignment {
  id: string
  description: string
  status: 'active' | 'inactive'
  createdAt: string
}

interface AssignmentListProps {
  assignments: Assignment[]
  search: string
  onSearchChange: (value: string) => void
  onEdit: (assignment: Assignment) => void
  onDelete: (id: string) => void
}

const AssignmentList = ({
  assignments,
  search,
  onSearchChange,
  onEdit,
  onDelete,
}: AssignmentListProps) => {
  const filteredAssignments = assignments.filter(
    (assignment) =>
      assignment.id.toLowerCase().includes(search.toLowerCase()) ||
      assignment.description.toLowerCase().includes(search.toLowerCase())
  )

  const columns = [
    { key: 'id', header: 'Assignment ID', render: (assignment: Assignment) => assignment.id },
    {
      key: 'description',
      header: 'Description',
      render: (assignment: Assignment) => assignment.description,
    },
    {
      key: 'status',
      header: 'Status',
      render: (assignment: Assignment) => (
        <StatusBadge status={assignment.status === 'active' ? 'success' : 'warning'}>
          {assignment.status}
        </StatusBadge>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created At',
      render: (assignment: Assignment) => assignment.createdAt,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (assignment: Assignment) => (
        <div className="flex items-center gap-2">
          <IconButton onClick={() => onEdit(assignment)} title="Edit">
            <Pencil className="w-4 h-4" />
          </IconButton>
          <IconButton onClick={() => onDelete(assignment.id)} title="Delete" variant="danger">
            <Trash2 className="w-4 h-4" />
          </IconButton>
        </div>
      ),
    },
  ]

  return (
    <DataTable
      data={filteredAssignments}
      columns={columns}
      keyField="id"
      searchPlaceholder="Search assignments..."
      searchValue={search}
      onSearchChange={onSearchChange}
      emptyMessage="No assignments found"
    />
  )
}

export default AssignmentList
