import {
  Document,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
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
    //paddingRight: 8,
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
});

const PreviewInvoice = () => {
  return (
    <PDFViewer style={{ height: '100vh', width: '100%' }}>
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
                ABCDEFD-0001
              </Text>
            </View>

            <View style={[styles.row, styles.marginBottom4]}>
              <Text style={[styles.smallText, styles.flex1]}>Date issued</Text>
              <Text style={[styles.smallText, styles.flex1]}>12/09/2025</Text>
            </View>
          </View>

          <View style={styles.smallContainer}>
            <View style={[styles.row, styles.marginBottom4]}>
              <Text style={[styles.smallBoldText, styles.flex1]}>Bill to</Text>
            </View>

            <View style={[styles.row, styles.marginBottom4]}>
              <Text style={[styles.smallText, styles.flex1]}>Mr Tan</Text>
            </View>

            <View style={[styles.row, styles.marginBottom4]}>
              <Text style={[styles.smallText, styles.flex1]}>
                AbCDEDFEFE Ptd Ltd.
              </Text>
            </View>

            <View style={[styles.row, styles.marginBottom4]}>
              <Text style={[styles.smallText, styles.flex1]}>
                1 Fusionopolis Place #17-10 Galaxis Singapore, 138522 Singapore
              </Text>
            </View>
          </View>

          <View style={styles.tableHeaderContainer}>
            <Text style={styles.descriptionHeaderText}>Description</Text>
            <Text style={styles.quantityHeaderText}>Qty</Text>
            <Text style={styles.unitPriceHeaderText}>Unit Price</Text>
            <Text style={styles.amountHeaderText}>Amount</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.descriptionCellText}>Consulting</Text>
            <Text style={styles.genericCellText}>2</Text>
            <Text style={styles.genericCellText}>$100</Text>
            <Text style={styles.amountCellText}>$200</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.descriptionCellText}>Service A</Text>
            <Text style={styles.genericCellText}>1</Text>
            <Text style={styles.genericCellText}>$150</Text>
            <Text style={styles.amountCellText}>$150</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.descriptionCellText}>Service B</Text>
            <Text style={styles.genericCellText}>3</Text>
            <Text style={styles.genericCellText}>$200</Text>
            <Text style={styles.amountCellText}>$600</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.descriptionCellText}>Service C</Text>
            <Text style={styles.genericCellText}>5</Text>
            <Text style={styles.genericCellText}>$50</Text>
            <Text style={styles.amountCellText}>$250</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.descriptionCellText}>Service D</Text>
            <Text style={styles.genericCellText}>2</Text>
            <Text style={styles.genericCellText}>$300</Text>
            <Text style={styles.amountCellText}>$600</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.descriptionCellText}>Service E</Text>
            <Text style={styles.genericCellText}>4</Text>
            <Text style={styles.genericCellText}>$75</Text>
            <Text style={styles.amountCellText}>$300</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.descriptionCellText}>Service F</Text>
            <Text style={styles.genericCellText}>6</Text>
            <Text style={styles.genericCellText}>$80</Text>
            <Text style={styles.amountCellText}>$480</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.descriptionCellText}>Service G</Text>
            <Text style={styles.genericCellText}>7</Text>
            <Text style={styles.genericCellText}>$90</Text>
            <Text style={styles.amountCellText}>$630</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.descriptionCellText}>Service H</Text>
            <Text style={styles.genericCellText}>8</Text>
            <Text style={styles.genericCellText}>$110</Text>
            <Text style={styles.amountCellText}>$880</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.descriptionCellText}>Service I</Text>
            <Text style={styles.genericCellText}>9</Text>
            <Text style={styles.genericCellText}>$120</Text>
            <Text style={styles.amountCellText}>$1080</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.descriptionCellText}>Service J</Text>
            <Text style={styles.genericCellText}>10</Text>
            <Text style={styles.genericCellText}>$130</Text>
            <Text style={styles.amountCellText}>$1300</Text>
          </View>
          <View style={styles.totalContainer}>
            <View style={styles.totalContentContainer}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={{ ...styles.totalText, fontFamily: undefined }}>
                $1000
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PreviewInvoice;
