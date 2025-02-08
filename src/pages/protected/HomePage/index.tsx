import {
  Button,
  Container,
  Paper,
  Stack,
  Table,
  Text,
  Title,
} from '@mantine/core';
import dayjs from 'dayjs';
import FullPageLoader from '../../../components/FullPageLoader';
import ServerError from '../../../components/ServerError';
import useProjects from './hooks/useProjects';

const HomePage = () => {
  // TODO:
  // 1. create modal to create a customer.
  // 2. shift all the logic into hook.
  const { data: projects = [], isError, isLoading } = useProjects();

  const rows = projects.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.total_revenue}</Table.Td>
      <Table.Td>{element.total_payment_owed}</Table.Td>
      <Table.Td>
        {dayjs(element.created_at).format('DD/MM/YYYY HH:mm')}
      </Table.Td>
    </Table.Tr>
  ));

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (isError) {
    return <ServerError />;
  }

  return (
    <Container px={0}>
      <Stack justify="center">
        <Title order={1}>Customers</Title>
        <Text c="dimmed">
          A customer have many invoices. Create a customer now to get started.
        </Text>
        <div>
          <Button>Create customer</Button>
        </div>

        <Table.ScrollContainer minWidth={500}>
          <Paper withBorder>
            <Table highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Customer Name</Table.Th>
                  <Table.Th>Total Revenue</Table.Th>
                  <Table.Th>Total Payment Owed</Table.Th>
                  <Table.Th>Created At</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Paper>
        </Table.ScrollContainer>
      </Stack>
    </Container>
  );
};

export default HomePage;
