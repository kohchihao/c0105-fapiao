import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { zodResolver } from 'mantine-form-zod-resolver';
import supabase from '../../../../utils/supabase';
import { loginSchema } from '../utils';
import useAutoNavigateToProtectedHome from './useAutoNavigateToProtectedHome';

const useHomePageViewModel = () => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(loginSchema),
  });

  const onSubmit = async (values: { email: string; password: string }) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (error) {
      notifications.show({
        color: 'red',
        title: 'Login Error',
        message: error.message,
      });
    }
  };

  useAutoNavigateToProtectedHome();

  return {
    form,
    onSubmit,
  };
};

export default useHomePageViewModel;
