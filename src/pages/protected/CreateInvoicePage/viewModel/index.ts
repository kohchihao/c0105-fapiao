import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { randomUUID } from '../../../../utils/shortId';

const itemSchema = z.object({
  description: z.string().nonempty({ message: 'Description is required' }),
  quantity: z
    .number()
    .positive({ message: 'Quantity must be a positive number' }),
  unit_price: z
    .number()
    .positive({ message: 'Unit price must be a positive number' }),
});
const invoiceSchema = z.object({
  client_company_name: z
    .string()
    .nonempty({ message: 'Client company name is required' }),
  client_person_in_charge: z
    .string()
    .nonempty({ message: 'Person in charge is required' }),
  address: z.string().nonempty({ message: 'Address is required' }),
  phone_number: z.string().nonempty({ message: 'Phone number is required' }),
  invoice_sn: z
    .string()
    .nonempty({ message: 'Invoice serial number is required' }),
  raised_date: z.date({ required_error: 'Raised date is required' }),
  description: z.string().nonempty({ message: 'Description is required' }),
  comment: z.string().optional(),
  items: z.array(itemSchema),
});

const useCreateInvoicePageViewModel = () => {
  const form = useForm({
    validate: zodResolver(invoiceSchema),
    initialValues: {
      client_company_name: '',
      client_person_in_charge: '',
      address: '',
      phone_number: '',
      invoice_sn: randomUUID(),
      raised_date: new Date(),
      description: '',
      comment: '',
      items: [
        {
          description: '',
          quantity: 1,
          unit_price: 0,
        },
      ],
    },
  });

  const onAddLineItem = () => {
    form.insertListItem('items', {
      description: '',
      quantity: 1,
      unit_price: 1,
    });
  };

  const onDeleteLineItem = (index: number) => {
    form.removeListItem('items', index);
  };

  const getFormStatus = (): 'dirty' | 'saved' | 'draft' => {
    if (form.isDirty()) {
      return 'dirty';
    }

    // TODO: implement from api response.
    // return 'saved'

    return 'draft';
  };

  const onSaveInvoice = (values: {
    client_company_name: string;
    client_person_in_charge: string;
    address: string;
    phone_number: string;
    invoice_sn: string;
    raised_date: Date;
    description: string;
    comment: string;
    items: {
      description: string;
      quantity: number;
      unit_price: number;
    }[];
  }) => {
    console.log(values);
  };

  return {
    form,
    onAddLineItem,
    onDeleteLineItem,
    formStatus: getFormStatus(),
    onSaveInvoice,
  };
};

export default useCreateInvoicePageViewModel;
