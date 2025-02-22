import supabase from '../utils/supabase';
import { getUserId } from './utils';

export type SavePaymentParams = {
  type: string;
  details: unknown;
};

export const getPayment = async () => {
  const user_id = await getUserId();

  if (!user_id) {
    throw new Error('User id not found');
  }

  const { data, error } = await supabase
    .from('payment_option')
    .select('id, type, details')
    .eq('user_id', user_id);

  if (error) {
    console.error('Error getting payment option:', error);
    throw new Error(error.message);
  }

  return data;
};

export const savePayment = async (paymentParams: SavePaymentParams) => {
  const user_id = await getUserId();

  if (!user_id) {
    throw new Error('User id not found');
  }

  await supabase.from('payment_option').delete().eq('user_id', user_id);

  const { error, data } = await supabase
    .from('payment_option')
    .upsert({
      type: paymentParams.type,
      details: paymentParams.details,
      user_id,
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving payment option:', error);
    throw new Error(error.message);
  }

  return data;
};
