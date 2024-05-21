import { Form } from "@/components/editor";
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

Font.register({
  family: "Inter-Regular",
  fonts: [{ src: "/fonts/Inter-Regular.ttf" }],
});
Font.register({
  family: "Inter-Bold",
  fonts: [{ src: "/fonts/Inter-Bold.ttf" }],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Inter-Regular",
    fontSize: "12px",
    backgroundColor: "#ffffff",
  },
  section: {
    display: "flex",
    flexDirection: "row",
    gap: "32px",
    padding: "32px 32px 32px 32px",
  },
  column: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "32px",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    gap: "32px",
  },
  group: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    width: "100%",
  },
  font_bold: {
    fontFamily: "Inter-Bold",
  },
});

// TODO: Do not forget to remove
const dummy_items = [
  ["Služby za květen", 206, 80, 206 * 80],
  ["Doprava", 206, 80, 206 * 80],
];

// TODO: Add TypeScript
export default function PDFDocument({ form }: { form: Form }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Invoice header */}
        <View
          style={{
            ...styles.section,
            backgroundColor: "black",
            color: "white",
          }}
        >
          <View style={styles.column}></View>
          <View style={styles.column}>
            <Text style={{ fontSize: "20px", ...styles.font_bold }}>
              Faktura
            </Text>
            <View style={styles.group}>
              <Text style={styles.font_bold}>Evidenční číslo:</Text>
              <Text>{form.number}</Text>
            </View>
            <View style={styles.row}>
              <View style={styles.group}>
                <Text style={styles.font_bold}>Datum vystavení:</Text>
                <Text>{form.issueDate?.format("DD.MM.YYYY")}</Text>
              </View>
              <View style={styles.group}>
                <Text style={styles.font_bold}>Datum vystavení:</Text>
                <Text>{form.issueDate?.format("DD.MM.YYYY")}</Text>
              </View>
            </View>
          </View>
        </View>
        {/* Bill from, bill to */}
        <View style={styles.section}>
          <View style={styles.column}>
            <View style={styles.group}>
              <Text style={styles.font_bold}>Dodavatel:</Text>
              <Text>Michal Shelenberg</Text>
              <Text>Všemina 300</Text>
              <Text>Všemina</Text>
              <Text>763 15</Text>
            </View>
            <View style={styles.row}>
              <View style={styles.group}>
                <Text style={styles.font_bold}>IČO</Text>
                <Text>17049059</Text>
              </View>
              <View style={styles.group}>
                <Text style={styles.font_bold}>DIČ</Text>
                <Text>CZ17049059</Text>
              </View>
            </View>
          </View>
          <View style={styles.column}>
            <View style={styles.group}>
              <Text style={styles.font_bold}>Odběratel</Text>
              <Text>Greenpeace Česká republika, z.s.</Text>
              <Text>Prvního pluku 143/12</Text>
              <Text>Praha</Text>
              <Text>18600</Text>
            </View>
          </View>
        </View>
        {/* Items table */}
        <ItemsTable items={dummy_items} />
        {/* Payment information */}
        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.group}>
              <Text style={styles.font_bold}>Forma úhrady:</Text>
              <Text>{form.paymentMethod}</Text>
            </View>
            <View style={styles.group}>
              <Text style={styles.font_bold}>Číslo účtu:</Text>
              <Text>{form.bankAccountNumber}</Text>
            </View>
            <View style={styles.group}>
              {/* <Text style={styles.font_bold}>Variabilní symbol:</Text>
              <Text>2024001</Text> */}
            </View>
            <View style={styles.group}>
              {/* <Text style={styles.font_bold}>Konstantní symbol:</Text>
              <Text>2024001</Text> */}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

function ItemsTable({ items }: any) {
  const headerColumns = ["Název", "Cena", "Množství", "Celkem"];

  return (
    <>
      {/* Header */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "8px",
          padding: "8px 32px 8px 32px",
          backgroundColor: "#f8f8fa",
          textTransform: "uppercase",
          ...styles.font_bold,
        }}
      >
        {["Název", "Cena", "Množství", "Celkem"].map((item) => (
          <Text
            style={
              headerColumns.indexOf(item) === 0
                ? {
                    flexBasis: "50%",
                    flexGrow: 0,
                  }
                : { flex: 1 }
            }
          >
            {item}
          </Text>
        ))}
      </View>
      {/* Items */}
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          // gap: "8px",
          padding: "0px 0px 16px 0px",
        }}
      >
        {items.map((values: any) => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "8px",
              padding: "4px 32px 4px 32px",
              backgroundColor: items.indexOf(values) % 2 > 0 ? "#f8f8fa" : "",
            }}
          >
            {values.map((value: any) => (
              <Text
                style={
                  values.indexOf(value) === 0
                    ? {
                        flexBasis: "50%",
                        flexGrow: 0,
                      }
                    : { flex: 1, textAlign: "right" }
                }
              >
                {value}
              </Text>
            ))}
          </View>
        ))}
      </View>
      {/* Price total */}
      <View
        style={{
          width: "50%",
          marginLeft: "50%",
          padding: "16px 32px 0px 0px",
          borderTop: "1px solid black",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Text style={styles.font_bold}>Celkem k úhradě:</Text>
        <Text style={{ flex: 1, textAlign: "right" }}>20 000 Kč</Text>
      </View>
    </>
  );
}
