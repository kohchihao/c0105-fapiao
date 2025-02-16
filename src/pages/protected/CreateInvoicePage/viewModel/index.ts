import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import dayjs from 'dayjs';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { INFLATE_CURRENCY } from '../../../../constants';
import { FORM_INITIAL_VALUES, invoiceSchema } from '../constant';
import useInvoice from './useInvoice';
import usePreviewInvoiceModal from './usePreviewInvoiceModal';
import useSaveInvoice from './useSaveInvoice';

const useCreateInvoicePageViewModel = () => {
  const navigate = useNavigate();
  const { projectId: paramProjectId, invoiceId: paramInvoiceId } = useParams();
  const [isOverlayLoadingVisible, { open: showLoading, close: hideLoading }] =
    useDisclosure(false);

  const projectId = useMemo(() => {
    return isNaN(Number(paramProjectId)) ? 0 : Number(paramProjectId);
  }, [paramProjectId]);

  const invoiceId = useMemo(() => {
    return isNaN(Number(paramInvoiceId)) ? 0 : Number(paramInvoiceId);
  }, [paramInvoiceId]);

  const previewInvoiceModal = usePreviewInvoiceModal();

  const {
    data: invoiceData,
    isLoading: isInvoiceLoading,
    isSuccess,
  } = useInvoice({
    invoiceId,
  });

  /**
   * useEffect hook to handle the visibility of the loading overlay based on the invoice loading state.
   * When the invoice is loading, the loading overlay is shown. Once the loading is complete, the overlay is hidden.
   *
   */
  useEffect(() => {
    if (isInvoiceLoading) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [isInvoiceLoading, showLoading, hideLoading]);

  const form = useForm({
    validate: zodResolver(invoiceSchema),
    initialValues: FORM_INITIAL_VALUES,
  });

  /**
   * Initialise the form with the invoice data when the invoice data is available and the request is successful.
   * We don't put `form` as part of dependency array because it is not stable and will cause infinite loop.
   */
  useEffect(() => {
    if (invoiceData?.id && isSuccess) {
      form.setInitialValues(invoiceData);
      form.setValues(invoiceData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceData?.id, isSuccess]);

  const saveInvoice = useSaveInvoice({
    invoiceId,
    onSuccessNavigate: (params) => {
      navigate(
        `/app/project/${params.project_id}/invoice/${params.invoice_id}/edit`,
        { replace: true }
      );
      navigate(0);
    },
    hideLoading,
  });

  const onAddLineItem = () => {
    form.insertListItem('items', {
      description: '',
      quantity: 1,
      unit_price: 1,
    });
  };

  const onDeleteLineItem = (index: number) => {
    form.removeListItem('items', index);
  };

  const getFormStatus = (): 'dirty' | 'saved' | 'draft' => {
    if (form.isDirty()) {
      return 'dirty';
    }

    if (invoiceData?.id) {
      return 'saved';
    }

    return 'draft';
  };

  const onSaveInvoice = async (values: {
    client_company_name: string;
    client_person_in_charge: string;
    address: string;
    phone_number: string;
    invoice_sn: string;
    raised_date: Date;
    description: string;
    comment: string;
    items: {
      description: string;
      quantity: number;
      unit_price: number;
    }[];
  }) => {
    showLoading();
    const processedItems = values.items.map((item) => {
      return {
        ...item,
        amount: item.quantity * item.unit_price * INFLATE_CURRENCY,
        unit_price: item.unit_price * INFLATE_CURRENCY,
      };
    });

    saveInvoice.mutate({
      client_company_name: values.client_company_name,
      client_person_in_charge: values.client_person_in_charge,
      address: values.address,
      phone_number: `${values.phone_number}`,
      invoice_sn: values.invoice_sn,
      raised_date: values.raised_date,
      description: values.description,
      comment: values.comment,
      items: processedItems,
      project_id: projectId,
      invoice_id: invoiceId,
    });
  };

  const previewInvoiceProps = {
    invoiceNumber: form.values.invoice_sn,
    dateIssued: dayjs(form.values.raised_date).format('DD/MM/YYYY'),
    billTo: {
      name: form.values.client_person_in_charge,
      company: form.values.client_company_name,
      address: form.values.address,
    },
    items: form.values.items.map((item) => ({
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unit_price,
      amount: item.quantity * item.unit_price,
    })),
    total: form.values.items.reduce(
      (acc, item) => acc + item.quantity * item.unit_price,
      0
    ),
  };

  return {
    form,
    onAddLineItem,
    onDeleteLineItem,
    formStatus: getFormStatus(),
    onSaveInvoice,
    previewInvoiceModal,
    isOverlayLoadingVisible,
    previewInvoiceProps,
  };
};

export default useCreateInvoicePageViewModel;
