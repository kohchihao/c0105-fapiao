import {
  Document,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import { formatCurrency } from '../../../../../utils/currency';

type Props = {
  invoiceNumber?: string;
  dateIssued?: string;
  billTo?: {
    name?: string;
    company?: string;
    address?: string;
  };
  items?: {
    description?: string;
    quantity?: number;
    unitPrice?: number;
    amount?: number;
  }[];
  total?: number;
  comment?: string;
};

export const PreviewInvoiceDocument = ({
  invoiceNumber,
  dateIssued,
  billTo = { name: 'Name', company: 'Company Name', address: 'Address' },
  items,
  total,
  comment,
}: Props) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.companyHeaderContainer}>
          <Text style={styles.companyNameText}>ABC Company</Text>
          <Text style={styles.companyRegistationNumberText}>
            REG : 123232131E
          </Text>
          <Text style={styles.companyAddressText}>
            Jurong East Street 21, Singapore 609605
          </Text>
        </View>

        <View style={styles.smallContainer}>
          <View style={[styles.row, styles.marginBottom4]}>
            <Text style={[styles.smallBoldText, styles.flex1]}>
              Invoice number
            </Text>
            <Text style={[styles.smallBoldText, styles.flex1]}>
              {invoiceNumber}
            </Text>
          </View>

          <View style={[styles.row, styles.marginBottom4]}>
            <Text style={[styles.smallText, styles.flex1]}>Date issued</Text>
            <Text style={[styles.smallText, styles.flex1]}>{dateIssued}</Text>
          </View>
        </View>

        <View style={styles.smallContainer}>
          <View style={[styles.row, styles.marginBottom4]}>
            <Text style={[styles.smallBoldText, styles.flex1]}>Bill to</Text>
          </View>

          <View style={[styles.row, styles.marginBottom4]}>
            <Text style={[styles.smallText, styles.flex1]}>{billTo?.name}</Text>
          </View>

          <View style={[styles.row, styles.marginBottom4]}>
            <Text style={[styles.smallText, styles.flex1]}>
              {billTo?.company}
            </Text>
          </View>

          <View style={[styles.row, styles.marginBottom4]}>
            <Text style={[styles.smallText, styles.flex1]}>
              {billTo?.address}
            </Text>
          </View>
        </View>

        <View style={styles.tableHeaderContainer}>
          <Text style={styles.descriptionHeaderText}>Description</Text>
          <Text style={styles.quantityHeaderText}>Qty</Text>
          <Text style={styles.unitPriceHeaderText}>Unit Price</Text>
          <Text style={styles.amountHeaderText}>Amount</Text>
        </View>

        {items?.map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.descriptionCellText}>{item?.description}</Text>
            <Text style={styles.genericCellText}>{item?.quantity}</Text>
            <Text style={styles.genericCellText}>
              ${formatCurrency(item?.unitPrice || 0)}
            </Text>
            <Text style={styles.amountCellText}>
              ${formatCurrency(item?.amount || 0)}
            </Text>
          </View>
        ))}

        <View style={styles.totalContainer}>
          <View style={styles.totalContentContainer}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={{ ...styles.totalText, fontFamily: undefined }}>
              ${formatCurrency(total || 0)}
            </Text>
          </View>
        </View>

        {comment ? (
          <View style={styles.commentContainer}>
            <Text style={styles.commentTitle}>Comment</Text>
            <Text style={styles.commentText}>{comment}</Text>
          </View>
        ) : null}
      </Page>
    </Document>
  );
};

const PreviewInvoice = (props: Props) => {
  return (
    <PDFViewer style={styles.viewerContainer} showToolbar={false}>
      <PreviewInvoiceDocument {...props} />
    </PDFViewer>
  );
};

const styles = StyleSheet.create({
  viewerContainer: {
    height: '80vh',
    width: '100%',
  },
  page: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 48,
  },

  companyHeaderContainer: {
    flexDirection: 'column',
  },
  companyNameText: {
    fontSize: 24,
  },
  companyAddressText: {
    fontSize: 12,
  },
  companyRegistationNumberText: {
    fontSize: 12,
  },

  smallContainer: {
    marginTop: 24,
    maxWidth: 190,
  },

  smallBoldText: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
  },
  smallText: {
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
  marginBottom4: {
    marginBottom: 4,
  },
  billToContainer: {
    marginTop: 24,
    backgroundColor: 'lightgray',
  },
  totalContainer: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'flex-end',
  },
  totalContentContainer: {
    width: 190,
    borderTopWidth: 1,
    borderTopColor: 'grey',
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalText: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    padding: 8,
  },
  tableHeaderContainer: {
    flexDirection: 'row',
    marginTop: 16,
    backgroundColor: 'lightgray',
  },
  descriptionHeaderText: {
    flex: 2,
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    padding: 8,
  },
  quantityHeaderText: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    padding: 8,
  },
  unitPriceHeaderText: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    padding: 8,
  },
  amountHeaderText: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    padding: 8,
    textAlign: 'right',
  },
  descriptionCellText: {
    flex: 2,
    fontSize: 12,
    padding: 8,
  },
  genericCellText: {
    flex: 1,
    fontSize: 12,
    padding: 8,
  },
  amountCellText: {
    flex: 1,
    fontSize: 12,
    padding: 8,
    textAlign: 'right',
  },
  commentContainer: {
    marginTop: 24,
    padding: 16,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
  },
  commentTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 8,
  },
  commentText: {
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
});

export default PreviewInvoice;
