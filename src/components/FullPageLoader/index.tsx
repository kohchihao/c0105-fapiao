import { Center, Loader } from '@mantine/core';

const FullPageLoader = () => {
  return (
    <Center style={{ width: '100vw', height: '100vh' }}>
      <Loader />
    </Center>
  );
};

export default FullPageLoader;
