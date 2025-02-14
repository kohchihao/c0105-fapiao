import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { INFLATE_CURRENCY } from '../../../../constants';
import { createInvoice } from '../../../../services/invoice';
import { randomUUID } from '../../../../utils/shortId';
import usePreviewInvoiceModal from './usePreviewInvoiceModal';

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
  phone_number: z.number().positive({ message: 'Phone number is required' }),
  invoice_sn: z
    .string()
    .nonempty({ message: 'Invoice serial number is required' }),
  raised_date: z.date({ required_error: 'Raised date is required' }),
  description: z.string().nonempty({ message: 'Description is required' }),
  comment: z.string().optional(),
  items: z.array(itemSchema),
});

const useCreateInvoicePageViewModel = () => {
  const { projectId: paramProjectId } = useParams();

  const projectId = useMemo(() => {
    return isNaN(Number(paramProjectId)) ? 0 : Number(paramProjectId);
  }, [paramProjectId]);

  const previewInvoiceModal = usePreviewInvoiceModal();
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

  const onSaveInvoice = async (values: {
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
    const processedItems = values.items.map((item) => {
      return {
        ...item,
        amount: item.quantity * item.unit_price * INFLATE_CURRENCY,
        unit_price: item.unit_price * INFLATE_CURRENCY,
      };
    });
    console.log(processedItems);
    try {
      await createInvoice({
        client_company_name: values.client_company_name,
        client_person_in_charge: values.client_person_in_charge,
        address: values.address,
        phone_number: `${values.phone_number}`,
        invoice_sn: values.invoice_sn,
        raised_date: values.raised_date,
        description: values.description,
        comment: values.comment,
        items: processedItems,
        project_id: projectId,
      });
    } catch (error) {
      console.error('Error saving invoice:', error);
    }
  };

  return {
    form,
    onAddLineItem,
    onDeleteLineItem,
    formStatus: getFormStatus(),
    onSaveInvoice,
    previewInvoiceModal,
  };
};

export default useCreateInvoicePageViewModel;
