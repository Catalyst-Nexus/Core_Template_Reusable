import {
  HiOutlineUsers,
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
  HiOutlineUserCircle,
  HiOutlineBan,
} from "react-icons/hi";
import { FiUserCheck, FiUserX, FiChevronDown } from "react-icons/fi";
import "./UserActivationList.css";

export interface ActivationUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  joinDate: string;
  lastLogin: string;
}

interface UserActivationListProps {
  users: ActivationUser[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedUsers: number[];
  onSelectUser: (id: number) => void;
  onSelectAll: () => void;
  onToggleStatus: (id: number) => void;
  onEdit: (user: ActivationUser) => void;
  onDelete: (id: number) => void;
  onBulkActivate: () => void;
  onBulkDeactivate: () => void;
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const UserActivationList = ({
  users,
  searchTerm,
  onSearchChange,
  selectedUsers,
  onSelectUser,
  onSelectAll,
  onToggleStatus,
  onEdit,
  onDelete,
  onBulkActivate,
  onBulkDeactivate,
}: UserActivationListProps) => {
  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="ual-card">
      <div className="ual-toolbar">
        <div className="ual-search-group">
          <div className="ual-search-bar">
            <HiOutlineSearch className="ual-search-icon" />
            <input
              className="ual-search-input"
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <button className="ual-filter-btn">
            <HiOutlineFilter />
            Filter
            <FiChevronDown />
          </button>
        </div>

        {selectedUsers.length > 0 && (
          <div className="ual-bulk-actions">
            <span className="ual-bulk-count">
              {selectedUsers.length} selected
            </span>
            <button
              className="ual-btn ual-btn-activate"
              onClick={onBulkActivate}
            >
              <HiOutlineCheckCircle />
              Activate
            </button>
            <button
              className="ual-btn ual-btn-deactivate"
              onClick={onBulkDeactivate}
            >
              <HiOutlineBan />
              Deactivate
            </button>
          </div>
        )}
      </div>

      <div className="ual-table-wrap">
        <table className="ual-table">
          <thead>
            <tr>
              <th className="ual-th-check">
                <input
                  type="checkbox"
                  checked={
                    selectedUsers.length === filtered.length &&
                    filtered.length > 0
                  }
                  onChange={onSelectAll}
                />
              </th>
              <th>
                <div className="ual-th-content">
                  <HiOutlineUserCircle />
                  User
                </div>
              </th>
              <th>
                <div className="ual-th-content">
                  <HiOutlineShieldCheck />
                  Role
                </div>
              </th>
              <th>Status</th>
              <th>
                <div className="ual-th-content">
                  <HiOutlineCalendar />
                  Join Date
                </div>
              </th>
              <th>
                <div className="ual-th-content">
                  <HiOutlineClock />
                  Last Login
                </div>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="ual-empty-cell">
                  <div className="ual-empty-state">
                    <div className="ual-empty-icon">
                      <HiOutlineUsers />
                    </div>
                    <h3>No users found</h3>
                    <p>Get started by adding your first user</p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((user) => (
                <tr
                  key={user.id}
                  className={`ual-tr ${selectedUsers.includes(user.id) ? "ual-tr-selected" : ""}`}
                >
                  <td className="ual-th-check">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => onSelectUser(user.id)}
                    />
                  </td>
                  <td>
                    <div className="ual-user-info">
                      <div className={`ual-avatar ual-avatar-${user.status}`}>
                        {getInitials(user.name)}
                      </div>
                      <div className="ual-user-details">
                        <span className="ual-user-name">{user.name}</span>
                        <span className="ual-user-email">
                          <HiOutlineMail className="ual-email-icon" />
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="ual-role-badge">{user.role}</span>
                  </td>
                  <td>
                    <div
                      className={`ual-status-badge ual-status-${user.status}`}
                    >
                      {user.status === "active" ? (
                        <HiOutlineCheckCircle />
                      ) : (
                        <HiOutlineXCircle />
                      )}
                      <span>{user.status}</span>
                    </div>
                  </td>
                  <td>
                    <span className="ual-date-text">{user.joinDate}</span>
                  </td>
                  <td>
                    <span className="ual-date-text">{user.lastLogin}</span>
                  </td>
                  <td>
                    <div className="ual-actions">
                      <button
                        className={`ual-action-btn ${user.status === "active" ? "ual-btn-deact" : "ual-btn-act"}`}
                        onClick={() => onToggleStatus(user.id)}
                        title={
                          user.status === "active" ? "Deactivate" : "Activate"
                        }
                      >
                        {user.status === "active" ? (
                          <FiUserX />
                        ) : (
                          <FiUserCheck />
                        )}
                      </button>
                      <button
                        className="ual-action-btn ual-btn-edit"
                        onClick={() => onEdit(user)}
                        title="Edit"
                      >
                        <HiOutlinePencil />
                      </button>
                      <button
                        className="ual-action-btn ual-btn-delete"
                        onClick={() => onDelete(user.id)}
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
  );
};

export default UserActivationList;
