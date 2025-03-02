import {
  Button,
  Container,
  Group,
  Modal,
  Paper,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import dayjs from 'dayjs';
import FullPageLoader from '../../../components/FullPageLoader';
import ServerError from '../../../components/ServerError';
import useHomePageViewModel from './viewModel';

const HomePage = () => {
  const { projects, isError, isLoading, createProjectModal, onProjectClick } =
    useHomePageViewModel();

  const rows = projects.map((element) => (
    <Table.Tr key={element.id} onClick={() => onProjectClick(element.id)}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td style={{ textAlign: 'center' }}>
        {element.total_invoices?.[0].count}
      </Table.Td>
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
        <Title order={1}>Projects</Title>
        <Text c="dimmed">
          A project have many invoices. Create a project now to get started.
        </Text>
        <div>
          <Button onClick={createProjectModal.onOpenCreateProjectModal}>
            Create project
          </Button>
        </div>

        <Table.ScrollContainer minWidth={500}>
          <Paper withBorder>
            <Table highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Project Name</Table.Th>
                  <Table.Th style={{ textAlign: 'center' }}>
                    Total Invoices
                  </Table.Th>
                  <Table.Th>Created At</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Paper>
        </Table.ScrollContainer>
      </Stack>

      <Modal
        opened={createProjectModal.opened}
        onClose={createProjectModal.onClose}
        title="Create Project"
        centered
      >
        {/* Modal content */}
        <form
          onSubmit={createProjectModal.form.onSubmit(
            createProjectModal.onCreate
          )}
        >
          <Stack gap="lg">
            <TextInput
              label="Project Name"
              description="An easily identifiable name for the project"
              placeholder="John Doe"
              required
              withAsterisk
              disabled={createProjectModal.create.isPending}
              key={createProjectModal.form.key('projectName')}
              {...createProjectModal.form.getInputProps('projectName')}
            />

            <Group justify="space-between">
              <Button
                color="blue"
                variant="default"
                flex={1}
                onClick={createProjectModal.onClose}
              >
                Cancel
              </Button>

              <Button
                color="blue"
                flex={1}
                type="submit"
                loading={createProjectModal.create.isPending}
              >
                Create
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Container>
  );
};

export default HomePage;
