import supabase from '../utils/supabase';
import { getUserId } from './utils';

export type SaveCompanyParams = {
  name: string;
  address: string;
  uen: string;
};

export const getCompany = async () => {
  const user_id = await getUserId();

  if (!user_id) {
    throw new Error('User id not found');
  }

  const { data, error } = await supabase
    .from('company')
    .select('id, name, address, uen')
    .eq('user_id', user_id)
    .single();

  if (error) {
    console.error('Error getting company:', error);
    throw new Error(error.message);
  }

  return data;
};

export const saveCompany = async (companyParams: SaveCompanyParams) => {
  const user_id = await getUserId();

  if (!user_id) {
    throw new Error('User id not found');
  }

  const { error, data } = await supabase
    .from('company')
    .upsert(
      {
        name: companyParams.name,
        address: companyParams.address,
        uen: companyParams.uen,
        user_id,
      },
      { onConflict: 'user_id' }
    )
    .select()
    .single();

  if (error) {
    console.error('Error saving company:', error);
    throw new Error(error.message);
  }

  return data;
};
