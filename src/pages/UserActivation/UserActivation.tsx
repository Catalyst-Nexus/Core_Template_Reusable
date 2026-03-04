import { useState } from 'react'
import './UserActivation.css'
import {
  HiOutlineUsers,
  HiOutlineUserAdd,
  HiOutlineSearch,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineShieldCheck,
  HiOutlineMail,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineFilter,
  HiOutlineRefresh,
  HiOutlineUserCircle,
  HiOutlineBan,
  HiOutlineLockClosed
} from 'react-icons/hi'
import { FiUserCheck, FiUserX, FiChevronDown } from 'react-icons/fi'

interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  joinDate: string
  lastLogin: string
}

const UserActivation = () => {
  // TODO: Replace with API call to fetch users
  const [users, setUsers] = useState<User[]>([])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [showModal, setShowModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const activeUsers = users.filter((u) => u.status === 'active').length
  const inactiveUsers = users.filter((u) => u.status === 'inactive').length

  const toggleUserStatus = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === 'active' ? 'inactive' : 'active',
            }
          : user
      )
    )
  }

  const handleSelectUser = (id: number) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map((u) => u.id))
    }
  }

  const handleBulkActivate = () => {
    setUsers(
      users.map((user) =>
        selectedUsers.includes(user.id) ? { ...user, status: 'active' } : user
      )
    )
    setSelectedUsers([])
  }

  const handleBulkDeactivate = () => {
    setUsers(
      users.map((user) =>
        selectedUsers.includes(user.id) ? { ...user, status: 'inactive' } : user
      )
    )
    setSelectedUsers([])
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setShowModal(true)
  }

  const handleDeleteUser = (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((u) => u.id !== id))
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }

  return (
    <div className="user-activation">
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">User Activation Management</h1>
          <p className="page-description">
            Activate, deactivate, and manage user accounts
          </p>
        </div>
        <div className="page-header-actions">
          <button className="btn-icon" title="Refresh">
            <HiOutlineRefresh />
          </button>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <HiOutlineUserAdd />
            Add New User
          </button>
        </div>
      </div>

      <div className="stats-summary">
        <div className="stat-box stat-box-total">
          <div className="stat-box-icon">
            <HiOutlineUsers />
          </div>
          <div className="stat-box-content">
            <div className="stat-number">{users.length}</div>
            <div className="stat-label">Total Users</div>
          </div>
        </div>
        <div className="stat-box stat-box-active">
          <div className="stat-box-icon active">
            <FiUserCheck />
          </div>
          <div className="stat-box-content">
            <div className="stat-number">{activeUsers}</div>
            <div className="stat-label">Active Users</div>
          </div>
          <div className="stat-percentage positive">
            {users.length > 0 ? Math.round((activeUsers / users.length) * 100) : 0}%
          </div>
        </div>
        <div className="stat-box stat-box-inactive">
          <div className="stat-box-icon inactive">
            <FiUserX />
          </div>
          <div className="stat-box-content">
            <div className="stat-number">{inactiveUsers}</div>
            <div className="stat-label">Inactive Users</div>
          </div>
          <div className="stat-percentage negative">
            {users.length > 0 ? Math.round((inactiveUsers / users.length) * 100) : 0}%
          </div>
        </div>
      </div>

      <div className="section-card">
        <div className="section-toolbar">
          <div className="search-filter-group">
            <div className="search-bar">
              <HiOutlineSearch className="search-icon" />
              <input
                id="user-search"
                className="search-input"
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search users by name or email"
              />
            </div>
            <button className="btn-filter">
              <HiOutlineFilter />
              Filter
              <FiChevronDown />
            </button>
          </div>
          
          {selectedUsers.length > 0 && (
            <div className="bulk-actions">
              <span className="bulk-count">{selectedUsers.length} selected</span>
              <button className="btn btn-success-outline" onClick={handleBulkActivate}>
                <HiOutlineCheckCircle />
                Activate
              </button>
              <button className="btn btn-danger-outline" onClick={handleBulkDeactivate}>
                <HiOutlineBan />
                Deactivate
              </button>
            </div>
          )}
        </div>

        <div className="users-table-container">
          <table className="table">
            <thead>
              <tr>
                <th className="checkbox-cell">
                  <input
                    type="checkbox"
                    checked={
                      selectedUsers.length === filteredUsers.length &&
                      filteredUsers.length > 0
                    }
                    onChange={handleSelectAll}
                    aria-label="Select all users"
                  />
                </th>
                <th>
                  <div className="th-content">
                    <HiOutlineUserCircle />
                    User
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <HiOutlineShieldCheck />
                    Role
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    Status
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <HiOutlineCalendar />
                    Join Date
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <HiOutlineClock />
                    Last Login
                  </div>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <div className="empty-state">
                      <div className="empty-icon">
                        <HiOutlineUsers />
                      </div>
                      <h3>No users found</h3>
                      <p>Get started by adding your first user</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className={selectedUsers.includes(user.id) ? 'selected' : ''}>
                    <td className="checkbox-cell">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        aria-label={`Select ${user.name}`}
                      />
                    </td>
                    <td>
                      <div className="user-info">
                        <div className={`user-avatar ${user.status}`}>
                          {getInitials(user.name)}
                        </div>
                        <div className="user-details">
                          <span className="user-name">{user.name}</span>
                          <span className="user-email">
                            <HiOutlineMail className="email-icon" />
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="role-badge">{user.role}</span>
                    </td>
                    <td>
                      <div className={`status-badge status-${user.status}`}>
                        {user.status === 'active' ? (
                          <HiOutlineCheckCircle />
                        ) : (
                          <HiOutlineXCircle />
                        )}
                        <span>{user.status}</span>
                      </div>
                    </td>
                    <td>
                      <span className="date-text">{user.joinDate}</span>
                    </td>
                    <td>
                      <span className="date-text">{user.lastLogin}</span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className={`action-btn ${
                            user.status === 'active'
                              ? 'btn-deactivate'
                              : 'btn-activate'
                          }`}
                          onClick={() => toggleUserStatus(user.id)}
                          title={user.status === 'active' ? 'Deactivate' : 'Activate'}
                        >
                          {user.status === 'active' ? <FiUserX /> : <FiUserCheck />}
                        </button>
                        <button
                          className="action-btn btn-edit"
                          onClick={() => handleEditUser(user)}
                          title="Edit"
                        >
                          <HiOutlinePencil />
                        </button>
                        <button
                          className="action-btn btn-delete"
                          onClick={() => handleDeleteUser(user.id)}
                          title="Delete"
                        >
                          <HiOutlineTrash />
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

      {showModal && editingUser && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
            {/* Banner */}
            <div className="modal-banner modal-banner-green">
              <div className="modal-banner-avatar">
                {editingUser.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
              </div>
              <div className="modal-banner-info">
                <h2 className="modal-title">{editingUser.name}</h2>
                <p className="modal-subtitle">{editingUser.email}</p>
              </div>
              <button className="modal-close modal-close-banner" onClick={() => setShowModal(false)}>
                <HiOutlineXCircle />
              </button>
            </div>

            <form className="modal-form">
              <div className="form-section-label">Account Info</div>
              <div className="form-group">
                <label className="form-label" htmlFor="edit-user-name">Full Name</label>
                <div className="input-wrapper">
                  <HiOutlineUserCircle className="input-icon" />
                  <input id="edit-user-name" className="form-input has-icon" type="text" defaultValue={editingUser.name} aria-label="User name" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="edit-user-email">Email Address</label>
                <div className="input-wrapper">
                  <HiOutlineMail className="input-icon" />
                  <input id="edit-user-email" className="form-input has-icon" type="email" defaultValue={editingUser.email} aria-label="User email" />
                </div>
              </div>

              <div className="form-section-label">Permissions</div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="edit-user-role">Role</label>
                  <div className="input-wrapper">
                    <HiOutlineShieldCheck className="input-icon" />
                    <select id="edit-user-role" className="form-input form-select has-icon" defaultValue={editingUser.role} aria-label="Select user role">
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="User">User</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="edit-user-status">Status</label>
                  <div className="input-wrapper">
                    <HiOutlineCheckCircle className="input-icon" />
                    <select id="edit-user-status" className="form-input form-select has-icon" defaultValue={editingUser.status} aria-label="Select user status">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={() => setShowModal(false)}>
                  <HiOutlineCheckCircle />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New User Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
            {/* Banner */}
            <div className="modal-banner modal-banner-green">
              <div className="modal-banner-icon">
                <HiOutlineUserAdd />
              </div>
              <div className="modal-banner-info">
                <h2 className="modal-title">Add New User</h2>
                <p className="modal-subtitle">Create a new user account</p>
              </div>
              <button className="modal-close modal-close-banner" onClick={() => setShowAddModal(false)}>
                <HiOutlineXCircle />
              </button>
            </div>

            <form className="modal-form">
              <div className="form-section-label">Personal Information</div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="new-user-firstname">First Name</label>
                  <div className="input-wrapper">
                    <HiOutlineUserCircle className="input-icon" />
                    <input id="new-user-firstname" className="form-input has-icon" type="text" placeholder="Enter first name" aria-label="First name" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="new-user-lastname">Last Name</label>
                  <div className="input-wrapper">
                    <HiOutlineUserCircle className="input-icon" />
                    <input id="new-user-lastname" className="form-input has-icon" type="text" placeholder="Enter last name" aria-label="Last name" />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="new-user-email">Email Address</label>
                <div className="input-wrapper">
                  <HiOutlineMail className="input-icon" />
                  <input id="new-user-email" className="form-input has-icon" type="email" placeholder="Enter email address" aria-label="User email" />
                </div>
              </div>

              <div className="form-section-label">Account Settings</div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="new-user-role">Role</label>
                  <div className="input-wrapper">
                    <HiOutlineShieldCheck className="input-icon" />
                    <select id="new-user-role" className="form-input form-select has-icon" defaultValue="User" aria-label="Select user role">
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="User">User</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="new-user-status">Status</label>
                  <div className="input-wrapper">
                    <HiOutlineCheckCircle className="input-icon" />
                    <select id="new-user-status" className="form-input form-select has-icon" defaultValue="active" aria-label="Select user status">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="new-user-password">Temporary Password</label>
                <div className="input-wrapper">
                  <HiOutlineLockClosed className="input-icon" />
                  <input id="new-user-password" className="form-input has-icon" type="password" placeholder="Enter temporary password" aria-label="Temporary password" />
                </div>
                <span className="form-hint">User will be prompted to change this on first login</span>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary btn-primary-green" onClick={() => setShowAddModal(false)}>
                  <HiOutlineUserAdd />
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserActivation
