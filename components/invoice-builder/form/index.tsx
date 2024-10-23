"use client";

import { FormValues } from "@/types/form-values";
import { Button } from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useFormikContext } from "formik";
import Document1 from "../invoice-templates/document-1";
import BasicInformation from "./basic-information";
import BillFrom from "./bill-from";
import BillTo from "./bill-to";
import InvoiceItems from "./invoice-items";

export default function Form() {
  const formik = useFormikContext<FormValues>();

  return (
    <div className="flex-1 overflow-y-scroll px-4 py-[50px] md:max-w-[50%]">
      <form
        onSubmit={formik.handleSubmit}
        className="mx-auto w-full max-w-[800px] space-y-6"
      >
        <BasicInformation />
        <BillFrom />
        <BillTo />
        <InvoiceItems />
        {/* <Debugger /> */}
        <div>
          <PDFDownloadLink document={<Document1 values={formik.values} />}>
            <Button variant="contained">Stáhnout PDF</Button>
          </PDFDownloadLink>
        </div>
      </form>
    </div>
  );
}
