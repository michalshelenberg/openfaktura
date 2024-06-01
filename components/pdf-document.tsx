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

function Placeholder() {
  return (
    <View
      style={{
        width: `${Math.random() * 100}%`,
        height: "12px",
        backgroundColor: "#d4d4d4",
        borderRadius: "4px",
      }}
    />
  );
}

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
              {form.number ? <Text>{form.number}</Text> : <Placeholder />}
            </View>
            <View style={styles.row}>
              <View style={styles.group}>
                <Text style={styles.font_bold}>Datum vystavení:</Text>
                {form.issueDate ? (
                  <Text>{form.issueDate?.format("DD.MM.YYYY")}</Text>
                ) : (
                  <Placeholder />
                )}
              </View>
              <View style={styles.group}>
                <Text style={styles.font_bold}>Datum splatnosti:</Text>
                {form.dueDate ? (
                  <Text>{form.dueDate?.format("DD.MM.YYYY")}</Text>
                ) : (
                  <Placeholder />
                )}
              </View>
            </View>
          </View>
        </View>
        {/* Bill from, bill to */}
        <View style={styles.section}>
          <View style={styles.column}>
            <View style={styles.group}>
              <Text style={styles.font_bold}>Dodavatel:</Text>
              {form.billFrom.label ? (
                <Text>{form.billFrom.label}</Text>
              ) : (
                <Placeholder />
              )}
              {form.billFrom.street ? (
                <Text>{form.billFrom.street}</Text>
              ) : (
                <Placeholder />
              )}
              {form.billFrom.postalCode ? (
                <Text>{`${form.billFrom.postalCode} ${form.billFrom.city}`}</Text>
              ) : (
                <Placeholder />
              )}
              {form.billFrom.country ? (
                <Text>{form.billFrom.country}</Text>
              ) : (
                <Placeholder />
              )}
            </View>
            <View style={styles.row}>
              <View style={styles.group}>
                <Text style={styles.font_bold}>IČO</Text>
                {form.billFrom.ico ? (
                  <Text>{form.billFrom.ico}</Text>
                ) : (
                  <Placeholder />
                )}
              </View>
              {form.billFrom.dic && (
                <View style={styles.group}>
                  <Text style={styles.font_bold}>DIČ</Text>
                  <Text>{form.billFrom.dic}</Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.column}>
            <View style={styles.group}>
              <Text style={styles.font_bold}>Odběratel:</Text>
              {form.billTo.label ? (
                <Text>{form.billTo.label}</Text>
              ) : (
                <Placeholder />
              )}
              {form.billTo.street ? (
                <Text>{form.billTo.street}</Text>
              ) : (
                <Placeholder />
              )}
              {form.billTo.postalCode ? (
                <Text>{`${form.billTo.postalCode} ${form.billTo.city}`}</Text>
              ) : (
                <Placeholder />
              )}
              {form.billTo.country ? (
                <Text>{form.billTo.country}</Text>
              ) : (
                <Placeholder />
              )}
            </View>
            <View style={styles.row}>
              <View style={styles.group}>
                <Text style={styles.font_bold}>IČO</Text>
                {form.billTo.ico ? (
                  <Text>{form.billTo.ico}</Text>
                ) : (
                  <Placeholder />
                )}
              </View>
              {form.billTo.dic && (
                <View style={styles.group}>
                  <Text style={styles.font_bold}>DIČ</Text>
                  <Text>{form.billTo.dic}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
        {/* Items table */}
        <ItemsTable items={form.items} />
        {/* Payment information */}
        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.group}>
              <Text style={styles.font_bold}>Forma úhrady:</Text>
              <Text>{form.paymentMethod}</Text>
            </View>
            <View style={styles.group}>
              <Text style={styles.font_bold}>Číslo účtu:</Text>
              {form.bankAccountNumber ? (
                <Text>{form.bankAccountNumber}</Text>
              ) : (
                <Placeholder />
              )}
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
            key={item}
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
        {items.map((item: any) => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "8px",
              padding: "4px 32px 4px 32px",
              backgroundColor: items.indexOf(item) % 2 > 0 ? "#f8f8fa" : "",
            }}
            key={item.name}
          >
            {/* {values.map((value: any) => (
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
            ))} */}
            <Text
              style={{
                flexBasis: "50%",
                flexGrow: 0,
              }}
            >
              {item.name}
            </Text>
            <Text style={{ flex: 1 }}>{item.ammount}</Text>
            <Text style={{ flex: 1 }}>{item.price}</Text>
            <Text style={{ flex: 1 }}>{item.total}</Text>
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