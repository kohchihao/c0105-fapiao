import { useDisclosure } from '@mantine/hooks';

const usePreviewInvoiceModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return {
    opened,
    onOpen: open,
    onClose: close,
  };
};

export default usePreviewInvoiceModal;
