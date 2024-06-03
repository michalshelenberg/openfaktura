"use client";

import { Form } from "@/components/editor";
import PDFDocument from "@/components/pdf-document";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export default function PDFPreview({ form }: { form: Form }) {
  return (
    <div className="hidden flex-1 md:block">
      <PDFViewer style={{ height: "100%", width: "100%" }} showToolbar={false}>
        <PDFDocument form={form} />
      </PDFViewer>
    </div>
  );
}
