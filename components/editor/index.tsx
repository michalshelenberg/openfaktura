"use client";

import { basicData } from "@/components/editor/slides/basic-information";
import { billFrom } from "@/components/editor/slides/bill-from";
import { billTo } from "@/components/editor/slides/bill-to";
import { invoiceItems } from "@/components/editor/slides/invoice-items";
import PDFPreview from "@/components/pdf-preview";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/cs";
import { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDebounce } from "use-debounce";

export interface InvoiceBusiness {
  label: string;
  ico: string;
  dic: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Form {
  type: string;
  number: string;
  issueDate: Dayjs | null;
  dueDate: Dayjs | null;
  paymentMethod: string;
  bankAccountNumber: string | null;
  billFrom: InvoiceBusiness;
  billTo: InvoiceBusiness;
  items: Array<{ name: string; price: string; ammount: string; total: string }>;
}

const steps = [basicData, billFrom, billTo, invoiceItems];

export default function Editor() {
  const [form, setForm] = useState<Form>({
    type: "bez-dph",
    number: `${dayjs().format("YYYYMM")}0001`,
    issueDate: dayjs(),
    dueDate: dayjs().add(14, "day"),
    paymentMethod: "Bankovní převod",
    bankAccountNumber: null,
    billFrom: {
      label: "",
      ico: "",
      dic: "",
      street: "",
      city: "",
      postalCode: "",
      country: "",
    },
    billTo: {
      label: "",
      ico: "",
      dic: "",
      street: "",
      city: "",
      postalCode: "",
      country: "",
    },
    items: [],
  });

  const [debouncedForm] = useDebounce(form, 1000);

  return (
    <div className="flex flex-row flex-1">
      <Swiper
        pagination={true}
        modules={[Pagination]}
        className="flex-1 flex flex-col select-none"
      >
        {steps.map((step) => (
          <SwiperSlide key={step.label}>
            <step.body form={form} setForm={setForm} key={step.label} />
          </SwiperSlide>
        ))}
      </Swiper>
      <PDFPreview form={debouncedForm} />
    </div>
  );
}
