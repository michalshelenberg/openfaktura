import { FormValues } from "@/types/form-values";
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

Font.register({
  family: "Inter",
  fonts: [
    {
      src: "/fonts/Inter-Regular.ttf",
    },
    {
      src: "/fonts/Inter-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  title: {
    fontSize: "12px",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: "10px",
    fontWeight: "bold",
    color: "#989898",
  },
});

// {/* <Text>{values.invoiceNumber}</Text> */}
export default function Document1({ values }: { values: FormValues }) {
  return (
    <Document>
      <Page
        size="A4"
        style={{ padding: "16px", fontSize: "8px", fontFamily: "Inter" }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            border: "1px dashed #CCCCCC",
          }}
        >
          <InvoiceNumber values={values} />
          <BillFromAndBillTo />
          <PaymentInformation />
          {/* <InvoiceItems /> */}
          <PayTotal />
        </View>
        <View
          style={{ display: "flex", alignItems: "flex-end", marginTop: "16px" }}
        >
          <Text>Vygenerováno pomocí OpenFaktura.eu</Text>
        </View>
      </Page>
    </Document>
  );
}

function InvoiceNumber({ values }: { values: FormValues }) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        alignItems: "flex-end",
        padding: "16px",
        borderBottom: "1px dashed #CCCCCC",
      }}
    >
      <Text style={styles.title}>FAKTURA č. {values.invoiceNumber}</Text>
      <Text style={styles.subtitle}>Evidenční č. {values.invoiceNumber}</Text>
    </View>
  );
}

function BillFromAndBillTo() {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        borderBottom: "1px dashed #CCCCCC",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          flexBasis: "50%",
          flexShrink: 0,
          flexGrow: 0,
          gap: "8px",
          padding: "16px",
          borderRight: "1px dashed #CCCCCC",
        }}
      >
        <Text style={styles.title}>DODAVATEL</Text>
        <Text style={{ fontWeight: "bold" }}>Martin Sap</Text>
        <View style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <Text>Vejvanovského 1611/18, Chodov</Text>
          <Text>14900 Praha</Text>
          <Text>Česká republika</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <View style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
            <Text style={{ fontWeight: "bold" }}>IČO</Text>
            <Text>1234567</Text>
          </View>
          <Text style={{ fontWeight: "bold" }}>Neplátce DPH</Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          flexBasis: "50%",
          flexShrink: 0,
          flexGrow: 0,
          gap: "8px",
          padding: "16px",
        }}
      >
        <Text style={styles.title}>ODBĚRATEL</Text>
        <Text style={{ fontWeight: "bold" }}>Martin Sap</Text>
        <View style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <Text>Vejvanovského 1611/18, Chodov</Text>
          <Text>14900 Praha</Text>
          <Text>Česká republika</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <Text style={{ fontWeight: "bold" }}>IČO</Text>
          <Text style={{ fontWeight: "bold" }}>Neplátce DPH</Text>
        </View>
      </View>
    </View>
  );
}

function PaymentInformation() {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "16px",
        borderBottom: "1px dashed #CCCCCC",
      }}
    >
      <Text style={styles.title}>PLATEBNÍ ÚDAJE</Text>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexBasis: "calc(100% / 3)",
            flexShrink: 0,
            flexGrow: 0,
            gap: "16px",
          }}
        >
          <Text>Forma uhrady</Text>
          <Text style={{ fontWeight: "bold" }}>Převodem</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexBasis: "calc(100% / 3)",
            flexShrink: 0,
            flexGrow: 0,
            gap: "16px",
          }}
        >
          <Text>Číslo účtu</Text>
          <Text style={{ fontWeight: "bold" }}>0105274124/0100</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexBasis: "calc(100% / 3)",
            flexShrink: 0,
            flexGrow: 0,
            gap: "16px",
          }}
        >
          <Text>Datum vystavení</Text>
          <Text style={{ fontWeight: "bold" }}>8.9.2024</Text>
        </View>
      </View>
    </View>
  );
}

function PayTotal() {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "16px",
        justifyContent: "flex-end",
        padding: "16px",
      }}
    >
      <Text style={styles.title}>Celkem k úhradě</Text>
      <Text style={styles.title}>1000,00 Kč</Text>
    </View>
  );
}
