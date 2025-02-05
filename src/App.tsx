import { AppShell, Burger, Group, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCoinMoneroFilled } from '@tabler/icons-react';
import { RouterProvider } from 'react-router-dom';
import classes from './App.module.css';
import { NAVBAR_ITEMS } from './constants/navbar';
import router from './router';

const App = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <IconCoinMoneroFilled size={30} />
            <Group ml="xl" gap={0} visibleFrom="sm">
              {NAVBAR_ITEMS.map((item) => (
                <UnstyledButton
                  component="a"
                  className={classes.control}
                  href={item.href}
                >
                  {item.title}
                </UnstyledButton>
              ))}
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        {NAVBAR_ITEMS.map((item) => (
          <UnstyledButton
            component="a"
            className={classes.control}
            href={item.href}
          >
            {item.title}
          </UnstyledButton>
        ))}
      </AppShell.Navbar>

      <AppShell.Main>
        <RouterProvider router={router} />
      </AppShell.Main>
    </AppShell>
  );
};

export default App;
