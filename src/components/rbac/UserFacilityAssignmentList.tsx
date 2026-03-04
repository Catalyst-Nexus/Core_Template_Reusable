import { Edit2, Trash2 } from 'lucide-react'

interface UserFacilityAssignment {
  id: string
  userName: string
  userEmail: string
  facilities: string[]
  assignedAt: string
}

interface UserFacilityAssignmentListProps {
  assignments: UserFacilityAssignment[]
  search: string
  onSearchChange: (value: string) => void
  onEdit: (assignment: UserFacilityAssignment) => void
  onDelete: (id: string) => void
}

const UserFacilityAssignmentList = ({
  assignments,
  search,
  onSearchChange,
  onEdit,
  onDelete,
}: UserFacilityAssignmentListProps) => {
  const filtered = assignments.filter(
    (a) =>
      a.userName.toLowerCase().includes(search.toLowerCase()) ||
      a.userEmail.toLowerCase().includes(search.toLowerCase()) ||
      a.facilities.some((f) => f.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="bg-surface border border-border rounded-2xl p-6">
      {/* Search */}
      <div className="relative w-64 mb-4">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
          <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg text-sm bg-background text-foreground placeholder:text-muted focus:outline-none focus:border-success"
          placeholder="Search users or facilities..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="bg-background text-muted font-semibold text-left px-4 py-3 border-b border-border">
                User Name
              </th>
              <th className="bg-background text-muted font-semibold text-left px-4 py-3 border-b border-border">
                Email
              </th>
              <th className="bg-background text-muted font-semibold text-left px-4 py-3 border-b border-border">
                Facilities
              </th>
              <th className="bg-background text-muted font-semibold text-left px-4 py-3 border-b border-border">
                Assigned At
              </th>
              <th className="bg-background text-muted font-semibold text-left px-4 py-3 border-b border-border">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-muted py-8">
                  No user facility assignments found.
                </td>
              </tr>
            ) : (
              filtered.map((assignment) => (
                <tr key={assignment.id} className="hover:bg-background transition-colors">
                  <td className="px-4 py-3 border-b border-border/50">
                    {assignment.userName}
                  </td>
                  <td className="px-4 py-3 border-b border-border/50">
                    {assignment.userEmail}
                  </td>
                  <td className="px-4 py-3 border-b border-border/50">
                    <div className="flex flex-wrap gap-1">
                      {assignment.facilities.length === 0 ? (
                        <span className="text-muted text-xs">No facilities assigned</span>
                      ) : (
                        assignment.facilities.map((facility, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-success/10 text-success text-xs rounded"
                          >
                            {facility}
                          </span>
                        ))
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 border-b border-border/50">
                    {assignment.assignedAt}
                  </td>
                  <td className="px-4 py-3 border-b border-border/50">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(assignment)}
                        className="text-primary hover:text-success transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(assignment.id)}
                        className="text-muted hover:text-danger transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserFacilityAssignmentList
