import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import useCreateProject from '../hooks/useCreateProject';

const schema = z.object({
  projectName: z
    .string()
    .min(2, 'Project name must have at least 2 characters'),
});

const useCreateProjectModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      projectName: '',
    },
    validate: zodResolver(schema),
  });

  const resetForm = () => {
    form.reset();
  };

  const create = useCreateProject({ closeModal: close, resetForm });

  const onOpenCreateProjectModal = () => {
    open();
  };

  const onCreate = (values: { projectName: string }) => {
    create.mutate({
      name: values.projectName,
    });
  };

  return {
    form,
    opened,
    onClose: close,
    onCreate,
    onOpenCreateProjectModal,
    create,
  };
};

export default useCreateProjectModal;
