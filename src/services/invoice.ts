import supabase from '../utils/supabase';
import { getUserId } from './utils';

// export const createInvoice = async (invoiceData: any) => {
//   const { data, error } = await supabase.from('invoices').insert([invoiceData]);

//   if (error) {
//     console.error('Error creating invoice:', error);
//     throw error;
//   }

//   return data;
// };

type InvoiceParams = {
  client_company_name: string;
  client_person_in_charge: string;
  address: string;
  phone_number: string;
  invoice_sn: string;
  raised_date: Date;
  description: string;
  comment: string;
  project_id: number;
  items: {
    description: string;
    quantity: number;
    unit_price: number;
    amount: number;
  }[];
};

export const createInvoice = async (invoiceParams: InvoiceParams) => {
  // TODO to check if project is valid or not.

  const user_id = await getUserId();

  if (!user_id) {
    throw new Error('User id not found');
  }

  const { error, data } = await supabase
    .from('invoice')
    .insert({
      project_id: invoiceParams.project_id,
      client_company_name: invoiceParams.client_company_name,
      client_person_in_charge: invoiceParams.client_person_in_charge,
      address: invoiceParams.address,
      phone_number: invoiceParams.phone_number,
      invoice_sn: invoiceParams.invoice_sn,
      raised_date: invoiceParams.raised_date,
      description: invoiceParams.description,
      comment: invoiceParams.comment,
      user_id,
    })
    .select()
    .single<Invoice>();

  if (error) {
    console.error('error', error);
    throw new Error(error.message);
  }

  const invoiceId = data?.id;

  const { error: itemError } = await supabase.rpc(
    'delete_and_insert_invoice_items',
    {
      p_invoice_id: invoiceId,
      new_items: invoiceParams.items.map((item) => ({
        ...item,
        user_id,
      })),
    }
  );

  if (itemError) {
    console.error('error', itemError);
    throw new Error(itemError.message);
  }

  const { data: invoiceItemsData, error: invoiceItemsError } = await supabase
    .from('invoice')
    .select(
      `
    id,
    project_id,
    client_company_name,
    client_person_in_charge,
    address,
    phone_number,
    invoice_sn,
    raised_date,
    description,
    comment,
    invoice_item ( invoice_id, description, quantity, unit_price, amount )
  `
    )
    .eq('id', invoiceId)
    .single();

  if (invoiceItemsError) {
    console.error('Error fetching invoice items:', invoiceItemsError);
    throw new Error(invoiceItemsError.message);
  }

  console.log('Inserted data:', invoiceItemsData);

  return invoiceItemsData;
};

type Invoice = {
  id: number;
  client_company_name: string;
  client_person_in_charge: string;
  address: string;
  phone_number: string;
  invoice_sn: string;
  raised_date: Date;
  description: string;
  comment: string;
  project_id: number;
  created_at: Date;
  user_id: string;
};

export const getInvoices = async (params: { projectId: number }) => {
  const { projectId } = params;
  const user_id = await getUserId();

  if (!user_id) {
    throw new Error('User id not found');
  }

  const { data: project, error: projectError } = await supabase
    .from('project')
    .select('*')
    .eq('id', projectId)
    .eq('user_id', user_id)
    .single();

  if (projectError) {
    console.error('Error getting project:', projectError);
    throw new Error(projectError.message);
  }

  if (!project) {
    throw new Error('Project not found');
  }

  const { data, error } = await supabase
    .from('invoice')
    .select('*')
    .eq('user_id', user_id)
    .eq('project_id', projectId)
    .returns<Invoice[]>();

  if (error) {
    console.error('Error getting invoices:', error);
    throw new Error(error.message);
  }

  return data;
};
