import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useEffect } from 'react';
import { z } from 'zod';
import useCompany from '../hooks/useCompany';
import useSaveCompany from '../hooks/useSaveCompany';

// Define the schema using zod
const schema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  uen: z.string().min(1, { message: 'UEN is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
});

const useCompanyTabViewModel = () => {
  const save = useSaveCompany();
  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      name: '',
      uen: '',
      address: '',
    },
  });
  const { data, isSuccess } = useCompany();

  const onSubmit = async (values: typeof form.values) => {
    save.mutateAsync(values);
  };

  useEffect(() => {
    if (data?.id && isSuccess) {
      form.setInitialValues(data);
      form.setValues(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.id, isSuccess]);

  return {
    form,
    onSubmit,
    save,
  };
};

export default useCompanyTabViewModel;
