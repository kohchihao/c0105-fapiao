import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { pdf } from '@react-pdf/renderer';
import dayjs from 'dayjs';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { INFLATE_CURRENCY } from '../../../../constants';
import useAppNavigation from '../../../../hooks/useAppNavigation';
import useCompany from '../../../../hooks/useCompany';
import usePayment from '../../../../hooks/usePayment';
import { PreviewInvoiceDocument } from '../components/PreviewInvoice';
import { FORM_INITIAL_VALUES, invoiceSchema } from '../constant';
import useInvoice from '../hooks/useInvoice';
import useNextInvoiceSn from '../hooks/useNextInvoiceSn';
import useSaveInvoice from '../hooks/useSaveInvoice';
import usePreviewInvoiceModal from './usePreviewInvoiceModal';

const useCreateInvoicePageViewModel = () => {
  const { navigateEditInvoicePage, refreshPage, navigateInvoiceListPage } =
    useAppNavigation();
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

  const { data: nextInvoiceSnData } = useNextInvoiceSn({
    projectId,
    invoiceId,
  });

  const {
    data: invoiceData,
    isLoading: isInvoiceLoading,
    isSuccess,
  } = useInvoice({
    invoiceId,
  });

  const { data: companyData } = useCompany();
  const { data: paymentData } = usePayment();

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

  useEffect(() => {
    if (nextInvoiceSnData) {
      form.setInitialValues({
        ...FORM_INITIAL_VALUES,
        invoice_sn: nextInvoiceSnData,
      });
      form.setFieldValue('invoice_sn', nextInvoiceSnData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextInvoiceSnData]);

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
      navigateEditInvoicePage({
        projectId: String(params.project_id),
        invoiceId: String(params.invoice_id),
        options: { replace: true },
      });
      refreshPage();
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
    conversion_currency: string;
    conversion_currency_rate: number;
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
      conversion_currency: values.conversion_currency,
      conversion_currency_rate: values.conversion_currency_rate,
    });
  };

  const totalAmount = form.values.items.reduce(
    (acc, item) => acc + item.quantity * item.unit_price,
    0
  );

  const paymentOptions = useMemo(() => {
    const options = [];
    const bankAccount = paymentData?.find(
      (item) => item.type === 'bank_account'
    );
    const uen = paymentData?.find((item) => item.type === 'uen');
    if (bankAccount) {
      options.push({
        method: 'Bank Account',
        details: `${bankAccount.details.bank_name} - ${bankAccount.details.account_number}`,
      });
    }

    if (uen) {
      options.push({
        method: 'PayNow',
        details: `${uen.details.uen}`,
      });
    }
    return options;
  }, [paymentData]);

  const previewInvoiceProps = useMemo(() => {
    return {
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
      total: totalAmount,
      comment: form.values.comment,
      company: {
        name: companyData?.name,
        address: companyData?.address,
        uen: companyData?.uen,
      },
      paymentOptions,
      currency: {
        symbol: form.values.conversion_currency,
        rate: form.values.conversion_currency_rate,
      },
    };
  }, [
    companyData?.address,
    companyData?.name,
    companyData?.uen,
    form.values.address,
    form.values.client_company_name,
    form.values.client_person_in_charge,
    form.values.comment,
    form.values.conversion_currency,
    form.values.conversion_currency_rate,
    form.values.invoice_sn,
    form.values.items,
    form.values.raised_date,
    paymentOptions,
    totalAmount,
  ]);

  const onBackClick = () => {
    navigateInvoiceListPage({
      projectId: String(projectId),
    });
  };

  const onDownload = async () => {
    const pdfFileName = `invoice-${form.values.invoice_sn}-${dayjs(
      form.values.raised_date
    ).format('DD/MM/YYYY')}.pdf`;
    let url = '';
    try {
      const blob = await pdf(
        <PreviewInvoiceDocument {...previewInvoiceProps} />
      ).toBlob();
      url = URL.createObjectURL(blob);

      const response = await fetch(url);
      const blobData = await response.blob();
      const blobUrl = window.URL.createObjectURL(blobData);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = pdfFileName;
      link.click();
    } catch (error) {
      console.error('Error in download process:', error);
    } finally {
      if (url) URL.revokeObjectURL(url);
    }
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
    totalAmount,
    onBackClick,
    onDownload,
  };
};

export default useCreateInvoicePageViewModel;
