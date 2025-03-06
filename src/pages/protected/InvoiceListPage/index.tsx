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
import BackButton from '../../../components/BackButton';
import FullPageLoader from '../../../components/FullPageLoader';
import ServerError from '../../../components/ServerError';
import useInvoiceListPageViewModel from './viewModel';

const InvoiceListPage = () => {
  const {
    invoices,
    isLoading,
    isError,
    onCreateInvoice,
    onClickInvoice,
    onBackClick,
  } = useInvoiceListPageViewModel();

  const rows = invoices.map((element) => (
    <Table.Tr key={element.id} onClick={() => onClickInvoice(element.id)}>
      <Table.Td>{element.invoice_sn}</Table.Td>
      <Table.Td>{element.description}</Table.Td>
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
        <div>
          <BackButton onClick={onBackClick} />
        </div>
        <Title order={1}>Invoices</Title>
        <Text c="dimmed">A list of invoices belonging to the project.</Text>
        <div>
          <Button onClick={onCreateInvoice}>Create invoice</Button>
        </div>
        <Table.ScrollContainer minWidth={500}>
          <Paper withBorder>
            <Table highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Invoice Serial No.</Table.Th>
                  <Table.Th>Description</Table.Th>
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

export default InvoiceListPage;
