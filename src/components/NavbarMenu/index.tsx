import { Avatar, Menu } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';

const NavbarMenu = () => {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Avatar radius="xl" />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item
          leftSection={<IconSettings size={14} />}
          href="/app/settings"
          component="a"
        >
          Settings
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default NavbarMenu;
