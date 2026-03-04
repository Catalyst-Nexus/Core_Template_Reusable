import {
  HiOutlineUserAdd,
  HiOutlineUserCircle,
  HiOutlineMail,
  HiOutlineShieldCheck,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineLockClosed,
} from "react-icons/hi";
import type { ActivationUser } from "./UserActivationList";
import "./UserActivationDialog.css";

interface UserActivationDialogProps {
  mode: "add" | "edit";
  open: boolean;
  onClose: () => void;
  editingUser?: ActivationUser | null;
}

const UserActivationDialog = ({
  mode,
  open,
  onClose,
  editingUser,
}: UserActivationDialogProps) => {
  if (!open) return null;

  const isEdit = mode === "edit" && editingUser;

  return (
    <div className="uad-overlay" onClick={onClose}>
      <div className="uad-modal" onClick={(e) => e.stopPropagation()}>
        {/* Banner */}
        <div className="uad-banner">
          <div className="uad-banner-avatar">
            {isEdit ? (
              editingUser.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)
            ) : (
              <HiOutlineUserAdd />
            )}
          </div>
          <div className="uad-banner-info">
            <h2 className="uad-banner-title">
              {isEdit ? editingUser.name : "Add New User"}
            </h2>
            <p className="uad-banner-subtitle">
              {isEdit ? editingUser.email : "Create a new user account"}
            </p>
          </div>
          <button className="uad-close-btn" onClick={onClose}>
            <HiOutlineXCircle />
          </button>
        </div>

        <form className="uad-form">
          {isEdit ? (
            <>
              <p className="uad-section-label">Account Info</p>
              <div className="uad-form-group">
                <label className="uad-label">Full Name</label>
                <div className="uad-input-wrap">
                  <HiOutlineUserCircle className="uad-input-icon" />
                  <input
                    className="uad-input"
                    type="text"
                    defaultValue={editingUser.name}
                  />
                </div>
              </div>
              <div className="uad-form-group">
                <label className="uad-label">Email Address</label>
                <div className="uad-input-wrap">
                  <HiOutlineMail className="uad-input-icon" />
                  <input
                    className="uad-input"
                    type="email"
                    defaultValue={editingUser.email}
                  />
                </div>
              </div>
              <p className="uad-section-label">Permissions</p>
              <div className="uad-form-row">
                <div className="uad-form-group">
                  <label className="uad-label">Role</label>
                  <div className="uad-input-wrap">
                    <HiOutlineShieldCheck className="uad-input-icon" />
                    <select
                      className="uad-input"
                      defaultValue={editingUser.role}
                    >
                      <option>Admin</option>
                      <option>Manager</option>
                      <option>User</option>
                    </select>
                  </div>
                </div>
                <div className="uad-form-group">
                  <label className="uad-label">Status</label>
                  <div className="uad-input-wrap">
                    <HiOutlineCheckCircle className="uad-input-icon" />
                    <select
                      className="uad-input"
                      defaultValue={editingUser.status}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="uad-section-label">Personal Information</p>
              <div className="uad-form-row">
                <div className="uad-form-group">
                  <label className="uad-label">First Name</label>
                  <div className="uad-input-wrap">
                    <HiOutlineUserCircle className="uad-input-icon" />
                    <input
                      className="uad-input"
                      type="text"
                      placeholder="Enter first name"
                    />
                  </div>
                </div>
                <div className="uad-form-group">
                  <label className="uad-label">Last Name</label>
                  <div className="uad-input-wrap">
                    <HiOutlineUserCircle className="uad-input-icon" />
                    <input
                      className="uad-input"
                      type="text"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
              </div>
              <div className="uad-form-group">
                <label className="uad-label">Email Address</label>
                <div className="uad-input-wrap">
                  <HiOutlineMail className="uad-input-icon" />
                  <input
                    className="uad-input"
                    type="email"
                    placeholder="Enter email address"
                  />
                </div>
              </div>
              <p className="uad-section-label">Account Settings</p>
              <div className="uad-form-row">
                <div className="uad-form-group">
                  <label className="uad-label">Role</label>
                  <div className="uad-input-wrap">
                    <HiOutlineShieldCheck className="uad-input-icon" />
                    <select className="uad-input" defaultValue="User">
                      <option>Admin</option>
                      <option>Manager</option>
                      <option>User</option>
                    </select>
                  </div>
                </div>
                <div className="uad-form-group">
                  <label className="uad-label">Status</label>
                  <div className="uad-input-wrap">
                    <HiOutlineCheckCircle className="uad-input-icon" />
                    <select className="uad-input" defaultValue="active">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="uad-form-group">
                <label className="uad-label">Temporary Password</label>
                <div className="uad-input-wrap">
                  <HiOutlineLockClosed className="uad-input-icon" />
                  <input
                    className="uad-input"
                    type="password"
                    placeholder="Enter temporary password"
                  />
                </div>
                <span className="uad-hint">
                  User will be prompted to change this on first login
                </span>
              </div>
            </>
          )}

          <div className="uad-footer">
            <button
              type="button"
              className="uad-btn uad-btn-cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="uad-btn uad-btn-submit"
              onClick={onClose}
            >
              {isEdit ? (
                <>
                  <HiOutlineCheckCircle />
                  Save Changes
                </>
              ) : (
                <>
                  <HiOutlineUserAdd />
                  Create User
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserActivationDialog;
