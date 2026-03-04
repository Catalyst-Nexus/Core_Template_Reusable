import { useState } from 'react'
import './AssignmentManagement.css'

interface Assignment {
  id: number
  title: string
  description: string
  assignedTo: string
  dueDate: string
  status: 'pending' | 'in-progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  progress: number
}

const AssignmentManagement = () => {
  // TODO: Replace with actual data from API
  const [assignments] = useState<Assignment[]>([])
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterPriority, setFilterPriority] = useState<string>('all')

  const filteredAssignments = assignments.filter((assignment) => {
    if (filterStatus !== 'all' && assignment.status !== filterStatus) return false
    if (filterPriority !== 'all' && assignment.priority !== filterPriority) return false
    return true
  })

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'status-pending'
      case 'in-progress':
        return 'status-in-progress'
      case 'completed':
        return 'status-completed'
      default:
        return ''
    }
  }

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'priority-low'
      case 'medium':
        return 'priority-medium'
      case 'high':
        return 'priority-high'
      default:
        return ''
    }
  }

  return (
    <div className="assignment">
      <div className="page-header">
        <h1>Assignment Management</h1>
        <button className="btn-primary">+ New Assignment</button>
      </div>

      <div className="filters">
        <select
          className="filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          aria-label="Filter by status"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select
          className="filter-select"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          aria-label="Filter by priority"
        >
          <option value="all">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {filteredAssignments.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <p className="empty-state-text">No assignments found. Create your first assignment to get started.</p>
        </div>
      ) : (
        <div className="assignments-grid">
          {filteredAssignments.map((assignment) => (
            <div key={assignment.id} className="assignment-card">
              <div className="assignment-header">
                <div>
                  <h3 className="assignment-title">{assignment.title}</h3>
                  <span className={`priority-badge ${getPriorityClass(assignment.priority)}`}>
                    {assignment.priority}
                  </span>
                </div>
                <span className={`assignment-status ${getStatusClass(assignment.status)}`}>
                  {assignment.status}
                </span>
              </div>

              <p className="assignment-description">{assignment.description}</p>

              <div className="assignment-meta">
                <div className="meta-item">
                  <span className="meta-icon">👤</span>
                  <span>{assignment.assignedTo}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">📅</span>
                  <span>Due: {assignment.dueDate}</span>
                </div>
              </div>

              <div>
                <div className="progress-label">
                  Progress: {assignment.progress}%
                </div>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${assignment.progress}%` }}
                  />
                </div>
              </div>

              <div className="assignment-actions">
                <button className="action-button edit">
                  View Details
                </button>
                <button className="action-button">
                  Edit
                </button>
                <button className="action-button delete">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AssignmentManagement
