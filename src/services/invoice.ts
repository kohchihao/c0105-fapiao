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
