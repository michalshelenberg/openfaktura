"use client";

import { FormValues } from "@/types/form-values";
import { Button } from "@mui/material";
import { useFormikContext } from "formik";
import BasicInformation from "./basic-information";
import BillFrom from "./bill-from";
import BillTo from "./bill-to";
import Debugger from "./debugger";
import InvoiceItems from "./invoice-items";

export default function Form() {
  const formik = useFormikContext<FormValues>();

  return (
    <div className="flex-shrink-0 flex-grow-0 basis-1/2 overflow-y-scroll px-4 py-[50px]">
      <form
        onSubmit={formik.handleSubmit}
        className="mx-auto w-full max-w-[800px] space-y-6"
      >
        <BasicInformation />
        <BillFrom />
        <BillTo />
        <InvoiceItems />
        <Debugger />
        <Button type="submit" variant="contained">
          Stáhnout PDF
        </Button>
      </form>
    </div>
  );
}
