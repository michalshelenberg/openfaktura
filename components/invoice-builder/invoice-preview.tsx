"use client";

import { FormValues } from "@/types/form-values";
import { useFormikContext } from "formik";
import dynamic from "next/dynamic";
import { useDebounce } from "use-debounce";
import Document1 from "./invoice-templates/document-1";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);

export default function InvoicePreview() {
  const formik = useFormikContext<FormValues>();
  const [debouncedFormValues] = useDebounce(formik.values, 1000);

  return (
    <div className="hidden flex-shrink-0 flex-grow-0 basis-1/2 lg:block">
      <PDFViewer style={{ height: "100%", width: "100%" }} showToolbar={false}>
        <Document1 values={debouncedFormValues} />
      </PDFViewer>
    </div>
  );
}
