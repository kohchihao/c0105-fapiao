import { Button, Container, Group, Stack, TextInput } from '@mantine/core';
import usePaymentTabViewModel from './viewModel';

const PaymentTab = () => {
  const { form, onSubmit, save } = usePaymentTabViewModel();
  return (
    <Container py={8} px={0}>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap="lg">
          <TextInput
            label="Bank Name"
            description="Your bank name"
            placeholder="Bank of America"
            required
            withAsterisk
            disabled={save.isPending}
            key={form.key('bankName')}
            {...form.getInputProps('bankName')}
          />
          <TextInput
            label="Bank Account Number"
            description="Your bank account number"
            placeholder="123456789"
            required
            withAsterisk
            disabled={save.isPending}
            key={form.key('bankAccountNumber')}
            {...form.getInputProps('bankAccountNumber')}
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

export default PaymentTab;
