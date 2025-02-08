import supabase from '../utils/supabase';
import { getUserId } from './utils';

export type CreateProjectParams = {
  name: string;
};

export const createProject = async (params: CreateProjectParams) => {
  const user_id = await getUserId();

  if (!user_id) {
    throw new Error('User id not found');
  }

  const { error, data } = await supabase
    .from('project')
    .insert({
      name: params.name,
      user_id,
    })
    .select()
    .single<Project>();

  if (error) {
    console.error('error', error);
    throw new Error(error.message);
  }

  console.log('Inserted data:', data);
  return data;
};

export const updateProject = () => {};

type Project = {
  id: number;
  name: string;
  total_revenue?: number;
  total_payment_owed?: number;
  created_at: string;
};

export const getProjects = async () => {
  const user_id = await getUserId();

  if (!user_id) {
    throw new Error('User id not found');
  }

  const { data, error } = await supabase
    .from('project')
    .select('*')
    .eq('user_id', user_id)
    .returns<Project[]>();
  if (error) {
    console.error('error', error);
    throw new Error(error.message);
  }

  console.log('data', data);
  return data;
};
