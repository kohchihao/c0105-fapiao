import supabase from '../utils/supabase';

export const getUserId = async () => {
  const session = await supabase.auth.getSession();
  const user_id = session?.data?.session?.user.id;
  return user_id;
};
