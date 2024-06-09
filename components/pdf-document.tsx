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

function Placeholder({ text }: { text: string | undefined }) {
  // For unknown reason this causes double re-render
  // const width = Math.floor(Math.random() * (75 - 50 + 1)) + 50;

  return (
    <>
      {text ? (
        <Text>{text}</Text>
      ) : (
        <View
          style={{
            width: `${100}%`,
            height: "12px",
            backgroundColor: "#d4d4d4",
            borderRadius: "4px",
          }}
        />
      )}
    </>
  );
}

export default function PDFDocument({ form }: { form: any }) {
  const { number, issueDate, dueDate, billFrom, billTo, bankAccountNumber } =
    form;

  console.log(bankAccountNumber);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
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
              <Placeholder text={number} />
            </View>
            <View style={styles.row}>
              <View style={styles.group}>
                <Text style={styles.font_bold}>Datum vystavení:</Text>
                <Placeholder text={issueDate?.format("DD.MM.YYYY")} />
              </View>
              <View style={styles.group}>
                <Text style={styles.font_bold}>Datum splatnosti:</Text>
                <Placeholder text={dueDate?.format("DD.MM.YYYY")} />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          {/* Bill from */}
          <View style={styles.column}>
            <View style={styles.group}>
              <Text style={styles.font_bold}>Dodavatel:</Text>
              <Placeholder text={billFrom?.label} />
              <Placeholder text={billFrom?.street} />
              <Placeholder
                text={
                  billFrom?.postalCode && billFrom?.city
                    ? `${billFrom?.postalCode} ${billFrom?.city}`
                    : ""
                }
              />
              <Placeholder text={billFrom?.country} />
              <Text style={styles.font_bold}>Neplátce DPH</Text>
            </View>
            <View style={styles.row}>
              <View style={styles.group}>
                <Text style={styles.font_bold}>IČO</Text>
                <Placeholder text={billFrom?.ico} />
              </View>
              {billFrom?.dic && (
                <View style={styles.group}>
                  <Text style={styles.font_bold}>DIČ</Text>
                  <Text>{billFrom?.dic}</Text>
                </View>
              )}
            </View>
          </View>
          {/* Bill to */}
          <View style={styles.column}>
            <View style={styles.group}>
              <Text style={styles.font_bold}>Odběratel:</Text>
              <Placeholder text={billTo?.label} />
              <Placeholder text={billTo?.street} />
              <Placeholder
                text={
                  billTo?.postalCode && billTo?.city
                    ? `${billTo?.postalCode} ${billTo?.city}`
                    : ""
                }
              />
              <Placeholder text={billTo?.country} />
              <Text>&nbsp;</Text>
            </View>
            <View style={styles.row}>
              <View style={styles.group}>
                <Text style={styles.font_bold}>IČO</Text>
                <Placeholder text={billTo?.ico} />
              </View>
              {billTo?.dic && (
                <View style={styles.group}>
                  <Text style={styles.font_bold}>DIČ</Text>
                  <Text>{billTo?.dic}</Text>
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
              <Text>{form?.paymentMethod}</Text>
            </View>
            <View style={styles.group}>
              <Text style={styles.font_bold}>Číslo účtu:</Text>
              <Placeholder text={bankAccountNumber} />
            </View>
            <View style={styles.group}></View>
            <View style={styles.group}></View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

function ItemsTable({ items }: any) {
  const formatter = new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
  });

  return (
    <>
      {/* Header */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "8px 32px 8px 32px",
          backgroundColor: "#f8f8fa",
          textTransform: "uppercase",
          ...styles.font_bold,
        }}
      >
        {["Název", "Množství", "Cena", "Celkem"].map((item, index) => (
          <Text
            style={
              index === 0
                ? {
                    flexBasis: "50%",
                    flexGrow: 0,
                  }
                : { flex: 1, textAlign: "right" }
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
            <Text
              style={{
                flexBasis: "50%",
                flexGrow: 0,
              }}
            >
              {item.name}
            </Text>
            <Text style={{ flex: 1, textAlign: "right" }}>{item.ammount}</Text>
            <Text style={{ flex: 1, textAlign: "right" }}>
              {formatter.format(item.price)}
            </Text>
            <Text style={{ flex: 1, textAlign: "right" }}>
              {formatter.format(item.total)}
            </Text>
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
          textAlign: "right",
        }}
      >
        {/* <Text style={styles.font_bold}>Celkem k úhradě:</Text> */}
        <Text style={{ textAlign: "right", ...styles.font_bold }}>
          {formatter.format(
            items.reduce((sum: any, item: any) => sum + parseInt(item.total), 0)
          )}
        </Text>
      </View>
    </>
  );
}
