import { BaseDialog, FormInput } from '@/components/ui/dialog'

interface RoleDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: () => void
  description: string
  onDescriptionChange: (value: string) => void
  editMode?: boolean
}

const RoleDialog = ({
  open,
  onClose,
  onSubmit,
  description,
  onDescriptionChange,
  editMode = false,
}: RoleDialogProps) => {
  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title={editMode ? 'Edit Role' : 'Create New Role'}
      onSubmit={onSubmit}
      submitLabel={editMode ? 'Save Changes' : 'Create Role'}
    >
      <FormInput
        id="role-description"
        label="Role Description"
        placeholder="Enter role description"
        value={description}
        onChange={onDescriptionChange}
        required
      />
    </BaseDialog>
  )
}

export default RoleDialog
