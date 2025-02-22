import { Container, Stack, Tabs, Title } from '@mantine/core';
import { IconMessageCircle, IconPhoto } from '@tabler/icons-react';
import CompanyTab from './modules/CompanyTab';

const SettingsPage = () => {
  return (
    <Container px={0}>
      <Stack justify="center">
        <Title order={1}>Settings</Title>

        <Tabs defaultValue="company">
          <Tabs.List>
            <Tabs.Tab value="company" leftSection={<IconPhoto size={12} />}>
              Company
            </Tabs.Tab>
            <Tabs.Tab
              value="payment"
              leftSection={<IconMessageCircle size={12} />}
            >
              Payment
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="company">
            <CompanyTab />
          </Tabs.Panel>

          <Tabs.Panel value="payment">Settings tab content</Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
};

export default SettingsPage;
