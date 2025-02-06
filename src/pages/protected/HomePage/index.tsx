import { Button } from '@mantine/core';
import supabase from '../../../utils/supabase';

const HomePage = () => {
  return (
    <div>
      <h1> protected Home Page</h1>
      <Button
        onClick={() => {
          supabase.auth.signOut();
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default HomePage;
