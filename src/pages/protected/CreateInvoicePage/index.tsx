import {
  ActionIcon,
  Button,
  Container,
  Group,
  LoadingOverlay,
  Modal,
  NumberInput,
  Paper,
  Stack,
  Table,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';

import { PDFDownloadLink } from '@react-pdf/renderer';
import {
  IconDeviceFloppy,
  IconDownload,
  IconEye,
  IconTrash,
} from '@tabler/icons-react';
import BackButton from '../../../components/BackButton';
import { formatCurrency } from '../../../utils/currency';
import FormStatus from './components/FormStatus';
import PreviewInvoice, {
  PreviewInvoiceDocument,
} from './components/PreviewInvoice';
import useCreateInvoicePageViewModel from './viewModel';

const CreateInvoicePage = () => {
  const {
    form,
    onAddLineItem,
    onDeleteLineItem,
    formStatus,
    onSaveInvoice,
    previewInvoiceModal,
    isOverlayLoadingVisible,
    previewInvoiceProps,
    totalAmount,
    pdfFileName,
    onBackClick,
  } = useCreateInvoicePageViewModel();

  const rows = form.getValues().items.map((element, index) => {
    return (
      <Table.Tr key={index}>
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
          <Text>${formatCurrency(element.quantity * element.unit_price)}</Text>
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
          <div>
            <BackButton title="Back to Project" onClick={onBackClick} />
          </div>
          <FormStatus status={formStatus} />
          <Textarea
            label="Description"
            description="Description of the inoice. Not shown on the invoice."
            withAsterisk
            placeholder="e.g. Ah hock - Woodlands"
            {...form.getInputProps('description')}
          />

          <Textarea
            label="Comment"
            description="Add any comments or special instructions here."
            placeholder="e.g., Please deliver before 5 PM"
            {...form.getInputProps('comment')}
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

            <TextInput
              label="Phone Number"
              description="Client's company phone number"
              placeholder="e.g. 12345678"
              withAsterisk
              inputMode="tel"
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
                <Table.Tbody>
                  {rows}
                  <Table.Tr key="total">
                    <Table.Td></Table.Td>
                    <Table.Td></Table.Td>
                    <Table.Td></Table.Td>
                    <Table.Td></Table.Td>
                    <Table.Td>
                      <Text>Total ${formatCurrency(totalAmount)}</Text>
                    </Table.Td>
                    <Table.Td></Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
            </Paper>
          </Table.ScrollContainer>

          <Button variant="default" onClick={onAddLineItem}>
            Add Line Item
          </Button>

          <Group>
            <TextInput
              label="Conversion Currency"
              description="Currency to convert the total amount to"
              placeholder="e.g. USD, EUR, CNY"
              {...form.getInputProps('conversion_currency')}
              flex={1}
            />

            <NumberInput
              label="Currency Rate"
              description="Exchange rate for conversion"
              placeholder="e.g. 1.35"
              decimalScale={4}
              min={0}
              step={0.01}
              allowNegative={false}
              {...form.getInputProps('conversion_currency_rate')}
              flex={1}
            />
          </Group>

          {form.values.conversion_currency &&
            form.values.conversion_currency_rate > 0 && (
              <Paper withBorder p="md">
                <Group>
                  <Text>Total in {form.values.conversion_currency}:</Text>
                  <Text fw={600}>
                    {form.values.conversion_currency}{' '}
                    {formatCurrency(
                      totalAmount * form.values.conversion_currency_rate
                    )}
                  </Text>
                </Group>
              </Paper>
            )}

          <Group>
            <Button
              leftSection={<IconDeviceFloppy size={20} />}
              fullWidth
              size="lg"
              type="submit"
              disabled={!form.isDirty()}
            >
              Save
            </Button>
            <PDFDownloadLink
              document={<PreviewInvoiceDocument {...previewInvoiceProps} />}
              fileName={pdfFileName}
            >
              <Button
                leftSection={<IconDownload size={14} />}
                variant="default"
              >
                Download invoice pdf
              </Button>
            </PDFDownloadLink>

            <Button
              variant="default"
              leftSection={<IconEye size={14} />}
              onClick={previewInvoiceModal.onOpen}
            >
              Preview invoice pdf
            </Button>
            {/* <Button leftSection={<IconTrash size={14} />} color="red">
            Delete Invoice
          </Button> */}
          </Group>
        </Stack>
      </form>

      <Modal
        opened={previewInvoiceModal.opened}
        onClose={previewInvoiceModal.onClose}
        title="Preview Invoice"
        fullScreen
        radius={0}
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        <PreviewInvoice {...previewInvoiceProps} />
      </Modal>

      <LoadingOverlay
        visible={isOverlayLoadingVisible}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
    </Container>
  );
};

export default CreateInvoicePage;
