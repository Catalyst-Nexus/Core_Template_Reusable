import { BaseDialog, FormInput } from '@/components/ui/dialog'

interface ModuleDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: () => void
  description: string
  onDescriptionChange: (value: string) => void
  editMode?: boolean
}

const ModuleDialog = ({
  open,
  onClose,
  onSubmit,
  description,
  onDescriptionChange,
  editMode = false,
}: ModuleDialogProps) => {
  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title={editMode ? 'Edit Module' : 'Add New Module'}
      onSubmit={onSubmit}
      submitLabel={editMode ? 'Save Changes' : 'Add Module'}
    >
      <FormInput
        id="module-description"
        label="Module Description"
        placeholder="Enter module description"
        value={description}
        onChange={onDescriptionChange}
        required
      />
    </BaseDialog>
  )
}

export default ModuleDialog
