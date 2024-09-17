"use client";

import { FormValues } from "@/types/form-values";
import { Button } from "@mui/material";
import { useFormikContext } from "formik";
import BasicInformation from "./basic-information";
import BillFrom from "./bill-from";
import Debugger from "./debugger";

export default function Form() {
  const formik = useFormikContext<FormValues>();

  return (
    <div className="bg-gray-100 flex-1 overflow-y-scroll">
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-[800px] w-full mx-auto py-[50px] px-4 space-y-4"
      >
        <BasicInformation />
        <BillFrom />
        <Debugger />
        <Button type="submit" variant="contained">
          Odeslat
        </Button>
      </form>
    </div>
  );
}
