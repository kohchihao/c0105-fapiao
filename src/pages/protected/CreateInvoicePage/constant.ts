import { z } from 'zod';

export const itemSchema = z.object({
  description: z.string().nonempty({ message: 'Description is required' }),
  quantity: z
    .number()
    .positive({ message: 'Quantity must be a positive number' }),
  unit_price: z
    .number()
    .positive({ message: 'Unit price must be a positive number' }),
});

export const invoiceSchema = z.object({
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
  conversion_currency: z.string().optional(),
  conversion_currency_rate: z.number().optional(),
});

export const FORM_INITIAL_VALUES = {
  client_company_name: '',
  client_person_in_charge: '',
  address: '',
  phone_number: '',
  invoice_sn: '',
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
  conversion_currency: '',
  conversion_currency_rate: 0,
};
