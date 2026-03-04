import { useState } from "react";
import {
  HiOutlineUsers,
  HiOutlineUserAdd,
  HiOutlineRefresh,
} from "react-icons/hi";
import { FiUserCheck, FiUserX } from "react-icons/fi";
import UserActivationList, {
  type ActivationUser,
} from "../../components/rbac/UserActivationList";
import UserActivationDialog from "../../components/rbac/UserActivationDialog";
import "./UserActivation.css";

// ─── Magic UI: ShineBorder ───────────────────────
const ShineBorder = ({
  shineColor = ["#22c55e", "#16a34a"],
  borderWidth = 1,
  duration = 10,
}: {
  shineColor?: string | string[];
  borderWidth?: number;
  duration?: number;
}) => (
  <span
    className="uav-shine-border"
    style={{
      ["--border-width" as string]: `${borderWidth}px`,
      ["--duration" as string]: `${duration}s`,
      backgroundImage: `radial-gradient(transparent, transparent, ${
        Array.isArray(shineColor) ? shineColor.join(",") : shineColor
      }, transparent, transparent)`,
    }}
  />
);
// ─────────────────────────────────────────────────

const UserActivation = () => {
  const [users, setUsers] = useState<ActivationUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<ActivationUser | null>(null);

  const activeUsers = users.filter((u) => u.status === "active").length;
  const inactiveUsers = users.filter((u) => u.status === "inactive").length;

  const handleToggleStatus = (id: number) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "inactive" : "active" }
          : u,
      ),
    );
  };

  const handleSelectUser = (id: number) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id],
    );
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSelectAll = () => {
    if (selectedUsers.length === filtered.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filtered.map((u) => u.id));
    }
  };

  const handleBulkActivate = () => {
    setUsers(
      users.map((u) =>
        selectedUsers.includes(u.id) ? { ...u, status: "active" } : u,
      ),
    );
    setSelectedUsers([]);
  };

  const handleBulkDeactivate = () => {
    setUsers(
      users.map((u) =>
        selectedUsers.includes(u.id) ? { ...u, status: "inactive" } : u,
      ),
    );
    setSelectedUsers([]);
  };

  const handleEdit = (user: ActivationUser) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="uav-page">
      {/* Page Header */}
      <div className="uav-page-header">
        <div>
          <h1 className="uav-page-title">User Activation Management</h1>
          <p className="uav-page-subtitle">
            Activate, deactivate, and manage user accounts
          </p>
        </div>
        <div className="uav-header-actions">
          <button className="uav-icon-btn" title="Refresh">
            <HiOutlineRefresh />
          </button>
          <button className="uav-add-btn" onClick={() => setShowAddModal(true)}>
            <HiOutlineUserAdd />
            Add New User
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="uav-stats-row">
        <div className="uav-stat-card">
          <ShineBorder />
          <div className="uav-stat-icon">
            <HiOutlineUsers />
          </div>
          <div className="uav-stat-content">
            <span className="uav-stat-value">{users.length}</span>
            <span className="uav-stat-label">Total Users</span>
          </div>
        </div>
        <div className="uav-stat-card">
          <ShineBorder shineColor={["#22c55e", "#4ade80"]} />
          <div className="uav-stat-icon uav-icon-active">
            <FiUserCheck />
          </div>
          <div className="uav-stat-content">
            <span className="uav-stat-value uav-val-green">{activeUsers}</span>
            <span className="uav-stat-label">Active Users</span>
          </div>
          <span className="uav-stat-pct uav-pct-green">
            {users.length > 0
              ? Math.round((activeUsers / users.length) * 100)
              : 0}
            %
          </span>
        </div>
        <div className="uav-stat-card">
          <ShineBorder shineColor={["#f97316", "#fb923c"]} />
          <div className="uav-stat-icon uav-icon-inactive">
            <FiUserX />
          </div>
          <div className="uav-stat-content">
            <span className="uav-stat-value uav-val-orange">
              {inactiveUsers}
            </span>
            <span className="uav-stat-label">Inactive Users</span>
          </div>
          <span className="uav-stat-pct uav-pct-orange">
            {users.length > 0
              ? Math.round((inactiveUsers / users.length) * 100)
              : 0}
            %
          </span>
        </div>
      </div>

      {/* List Component */}
      <UserActivationList
        users={users}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedUsers={selectedUsers}
        onSelectUser={handleSelectUser}
        onSelectAll={handleSelectAll}
        onToggleStatus={handleToggleStatus}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onBulkActivate={handleBulkActivate}
        onBulkDeactivate={handleBulkDeactivate}
      />

      {/* Add Dialog */}
      <UserActivationDialog
        mode="add"
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
      />

      {/* Edit Dialog */}
      <UserActivationDialog
        mode="edit"
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        editingUser={editingUser}
      />
    </div>
  );
};

export default UserActivation;
