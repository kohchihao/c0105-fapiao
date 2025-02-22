import { useForm, zodResolver } from '@mantine/form';
import { useEffect } from 'react';
import { z } from 'zod';
import usePayment from '../../../../../../hooks/usePayment';
import useSavePayment from '../hooks/useSavePayment';

// Define the schema using zod
const schema = z.object({
  bankName: z.string().min(1, { message: 'Bank Name is required' }),
  bankAccountNumber: z
    .string()
    .min(1, { message: 'Bank Account Number is required' }),
  uen: z.string().min(1, { message: 'UEN is required' }),
});

const usePaymentTabViewModel = () => {
  const save = useSavePayment();
  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      bankName: '',
      bankAccountNumber: '',
      uen: '',
    },
  });
  const { data, isSuccess } = usePayment();

  const onSubmit = async (values: typeof form.values) => {
    const { bankName, bankAccountNumber, uen } = values;
    const bankAccountType = {
      type: 'bank_account',
      details: {
        bank_name: bankName,
        account_number: bankAccountNumber,
      },
    };
    const uenType = {
      type: 'uen',
      details: {
        uen: uen,
      },
    };
    save.mutateAsync(bankAccountType);
    save.mutateAsync(uenType);
  };

  useEffect(() => {
    if (data?.length && isSuccess) {
      const bankAccount = data.find((item) => item.type === 'bank_account');
      const uen = data.find((item) => item.type === 'uen');

      form.setInitialValues({
        bankName: bankAccount?.details.bank_name,
        bankAccountNumber: bankAccount?.details.account_number,
        uen: uen?.details.uen,
      });
      form.setValues({
        bankName: bankAccount?.details.bank_name,
        bankAccountNumber: bankAccount?.details.account_number,
        uen: uen?.details.uen,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess]);

  return {
    form,
    onSubmit,
    save,
  };
};

export default usePaymentTabViewModel;
