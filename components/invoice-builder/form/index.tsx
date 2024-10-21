"use client";

import { FormValues } from "@/types/form-values";
import { Button } from "@mui/material";
import { useFormikContext } from "formik";
import BasicInformation from "./basic-information";
import BillFrom from "./bill-from";
import Debugger from "./debugger";
import BillTo from "./bill-to";
import InvoiceItems from "./invoice-items";

export default function Form() {
  const formik = useFormikContext<FormValues>();

  return (
    <div className="flex-grow-0 flex-shrink-0 basis-1/2 overflow-y-scroll">
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-[800px] w-full mx-auto py-[50px] px-4 space-y-4"
      >
        <BasicInformation />
        <BillFrom />
        <BillTo />
        <InvoiceItems />
        <Debugger />
        <Button type="submit" variant="contained">
          Stahnout PDF
        </Button>
      </form>
    </div>
  );
}
