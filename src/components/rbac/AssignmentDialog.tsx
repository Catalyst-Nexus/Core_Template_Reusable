import { BaseDialog, FormInput } from '@/components/ui/dialog'

interface AssignmentDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: () => void
  description: string
  onDescriptionChange: (value: string) => void
  editMode?: boolean
}

const AssignmentDialog = ({
  open,
  onClose,
  onSubmit,
  description,
  onDescriptionChange,
  editMode = false,
}: AssignmentDialogProps) => {
  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title={editMode ? 'Edit Assignment' : 'Add New Assignment'}
      onSubmit={onSubmit}
      submitLabel={editMode ? 'Save Changes' : 'Add Assignment'}
    >
      <FormInput
        id="assignment-description"
        label="Assignment Description"
        placeholder="Enter assignment description"
        value={description}
        onChange={onDescriptionChange}
        required
      />
    </BaseDialog>
  )
}

export default AssignmentDialog
