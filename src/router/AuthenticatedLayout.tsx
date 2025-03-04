import { AppShell, Burger, Group, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCoinMoneroFilled } from '@tabler/icons-react';
import { Navigate, Outlet } from 'react-router-dom';
import NavbarMenu from '../components/NavbarMenu';
import { ROUTES } from '../constants';
import { NAVBAR_ITEMS } from '../constants/navbar';
import { useSession } from '../context/SessionContext';
import classes from './AuthenticatedLayout.module.css';

const AuthenticatedLayout = () => {
  const { session } = useSession();
  const [opened, { toggle }] = useDisclosure();

  if (!session) {
    // or you can redirect to a different page and show a message
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

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
              <NavbarMenu />
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
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default AuthenticatedLayout;
