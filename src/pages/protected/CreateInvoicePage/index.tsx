import {
  ActionIcon,
  Button,
  Container,
  Group,
  NumberInput,
  Paper,
  Stack,
  Table,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';

import {
  IconDeviceFloppy,
  IconDownload,
  IconEye,
  IconTrash,
} from '@tabler/icons-react';
import { formatCurrency } from '../../../utils/currency';
import FormStatus from './components/FormStatus';
import PreviewInvoice from './components/PreviewInvoice';
import useCreateInvoicePageViewModel from './viewModel';

const CreateInvoicePage = () => {
  const { form, onAddLineItem, onDeleteLineItem, formStatus, onSaveInvoice } =
    useCreateInvoicePageViewModel();

  const rows = form.getValues().items.map((element, index) => {
    return (
      <Table.Tr>
        <Table.Td>
          <Text>{index + 1}</Text>
        </Table.Td>

        <Table.Td>
          <TextInput
            placeholder="Description"
            key={form.key(`items.${index}.description`)}
            {...form.getInputProps(`items.${index}.description`)}
          />
        </Table.Td>
        <Table.Td>
          <NumberInput
            placeholder="Quantity"
            inputMode="numeric"
            min={1}
            allowNegative={false}
            key={form.key(`items.${index}.quantity`)}
            {...form.getInputProps(`items.${index}.quantity`)}
          />
        </Table.Td>
        <Table.Td>
          <NumberInput
            placeholder="Unit Price"
            inputMode="numeric"
            decimalScale={2}
            allowNegative={false}
            hideControls
            key={form.key(`items.${index}.unit_price`)}
            {...form.getInputProps(`items.${index}.unit_price`)}
          />
        </Table.Td>

        <Table.Td>
          <Text>{formatCurrency(element.quantity * element.unit_price)}</Text>
        </Table.Td>

        <Table.Td>
          <ActionIcon color="red" onClick={() => onDeleteLineItem(index)}>
            <IconTrash size={16} />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    );
  });
  return (
    <Container px={0}>
      <form onSubmit={form.onSubmit(onSaveInvoice)}>
        <Stack justify="center">
          <FormStatus status={formStatus} />
          <Textarea
            label="Description"
            description="Description of the inoice. Not shown on the invoice."
            withAsterisk
            placeholder="e.g. Ah hock - Woodlands"
            {...form.getInputProps('description')}
          />

          <Group>
            <TextInput
              label="Client Company Name"
              description="Name of the client's company"
              placeholder="e.g. ABC Pte Ltd"
              withAsterisk
              {...form.getInputProps('client_company_name')}
              flex={1}
            />

            <TextInput
              label="Person in charge"
              description="Name of the person in charge at the client's company"
              placeholder="e.g. John Doe"
              withAsterisk
              {...form.getInputProps('client_person_in_charge')}
              flex={1}
            />
          </Group>

          <Group>
            <TextInput
              label="Address"
              description="Client's company address"
              placeholder="e.g. 123 Main Street, Singapore 123456"
              withAsterisk
              {...form.getInputProps('address')}
              flex={1}
            />

            <NumberInput
              label="Phone Number"
              description="Client's company phone number"
              placeholder="e.g. 12345678"
              withAsterisk
              inputMode="tel"
              allowNegative={false}
              hideControls
              {...form.getInputProps('phone_number')}
              flex={1}
            />
          </Group>

          <TextInput
            label="Invoice Serial Number"
            description="Input description"
            placeholder="Input placeholder"
            {...form.getInputProps('invoice_sn')}
            flex={1}
            disabled
            withAsterisk
          />

          <DateInput
            description="Input description"
            valueFormat="DD/MM/YYYY"
            label="Invoice Raised Date"
            placeholder="Date input"
            withAsterisk
            {...form.getInputProps('raised_date')}
          />

          <Table.ScrollContainer minWidth={700}>
            <Paper withBorder>
              <Table highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Item</Table.Th>
                    <Table.Th>Description</Table.Th>
                    <Table.Th>Quantity</Table.Th>
                    <Table.Th>Unit Price</Table.Th>
                    <Table.Th>Amount</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
            </Paper>
          </Table.ScrollContainer>

          <Button variant="default" onClick={onAddLineItem}>
            Add Line Item
          </Button>
          <Textarea
            label="Comment"
            description="Add any comments or special instructions here."
            placeholder="e.g., Please deliver before 5 PM"
            {...form.getInputProps('comment')}
          />

          <Group>
            <Button
              leftSection={<IconDeviceFloppy size={20} />}
              fullWidth
              size="lg"
              type="submit"
            >
              Save
            </Button>
            <Button leftSection={<IconDownload size={14} />} variant="default">
              Download invoice pdf
            </Button>

            <Button variant="default" leftSection={<IconEye size={14} />}>
              Preview invoice pdf
            </Button>
            {/* <Button leftSection={<IconTrash size={14} />} color="red">
            Delete Invoice
          </Button> */}
          </Group>

          <PreviewInvoice />
        </Stack>
      </form>
    </Container>
  );
};

export default CreateInvoicePage;
