import { Button, Container, Group, Stack, TextInput } from '@mantine/core';
import useCompanyTabViewModel from './viewModel';

const CompanyTab = () => {
  const { form, onSubmit, save } = useCompanyTabViewModel();
  return (
    <Container py={8} px={0}>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap="lg">
          <TextInput
            label="Company Name"
            description="Your company name"
            placeholder="John Doe"
            required
            withAsterisk
            disabled={save.isPending}
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <TextInput
            label="UEN"
            description="Unique Entity Number"
            placeholder="123456XX"
            required
            withAsterisk
            disabled={save.isPending}
            key={form.key('uen')}
            {...form.getInputProps('uen')}
          />
          <TextInput
            label="Address"
            description="Company Address"
            placeholder="123 Main St"
            required
            withAsterisk
            disabled={save.isPending}
            key={form.key('address')}
            {...form.getInputProps('address')}
          />

          <Group justify="space-between">
            <Button
              color="blue"
              flex={1}
              type="submit"
              loading={save.isPending}
            >
              Save
            </Button>
          </Group>
        </Stack>
      </form>
    </Container>
  );
};

export default CompanyTab;
