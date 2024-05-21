"use client";

import { Form } from "@/components/editor";
import PDFDocument from "@/components/pdf-document";
import { PDFViewer } from "@react-pdf/renderer";

export default function PDFPreview({ form }: { form: Form }) {
  return (
    <PDFViewer
      style={{ height: "100%", width: "100%" }}
      showToolbar={false}
      className="hidden flex-1 md:block"
    >
      <PDFDocument form={form} />
    </PDFViewer>
  );
}
