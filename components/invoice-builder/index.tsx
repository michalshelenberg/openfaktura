"use client";

import { FormValues } from "@/types/form-values";
import dayjs from "dayjs";
import { Formik } from "formik";
import * as yup from "yup";
import Form from "./form";
import InvoicePreview from "./invoice-preview";

// todo: complete validation schema + helper texts on form inputs
const validationSchema = yup.object({
  invoiceType: yup.string().required(),
  invoiceNumber: yup
    .number()
    .typeError("Číslo faktury musí být číslo")
    .required()
    .positive()
    .integer(),
});

export default function InvoiceBuilder() {
  // todo: generate invoice number from current date
  const initialValues: FormValues = {
    invoiceType: "no-tax",
    invoiceNumber: "2024090001",
    issueDate: dayjs(),
    dueDate: dayjs().add(14, "days"),
    paymentMethod: "bank-transfer",
    bankAccountNumber: "",
    billFrom: {
      name: "",
      ico: "",
      dic: "",
      street: "",
      city: "",
      psc: "",
      country: "",
    },
    billTo: {
      name: "",
      ico: "",
      dic: "",
      street: "",
      city: "",
      psc: "",
      country: "",
    },
    items: [],
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(JSON.stringify(values, null, 2));
      }}
    >
      <div className="flex h-screen w-screen flex-row">
        <Form />
        <InvoicePreview />
      </div>
    </Formik>
  );
}
