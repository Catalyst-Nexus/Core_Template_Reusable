import { BaseDialog, FormInput } from '@/components/ui/dialog'

interface UserDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: () => void
  name: string
  onNameChange: (value: string) => void
  email: string
  onEmailChange: (value: string) => void
  editMode?: boolean
}

const UserDialog = ({
  open,
  onClose,
  onSubmit,
  name,
  onNameChange,
  email,
  onEmailChange,
  editMode = false,
}: UserDialogProps) => {
  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title={editMode ? 'Edit User' : 'Add New User'}
      onSubmit={onSubmit}
      submitLabel={editMode ? 'Save Changes' : 'Add User'}
    >
      <FormInput
        id="user-name"
        label="Full Name"
        placeholder="Enter full name"
        value={name}
        onChange={onNameChange}
        required
      />
      <FormInput
        id="user-email"
        label="Email Address"
        type="email"
        placeholder="Enter email address"
        value={email}
        onChange={onEmailChange}
        required
      />
    </BaseDialog>
  )
}

export default UserDialog
