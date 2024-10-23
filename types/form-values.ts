import { Dayjs } from "dayjs";

interface Business {
  name: string;
  ico: string;
  dic?: string;
  street: string;
  city: string;
  psc: string;
  country: string;
}

export interface FormValues {
  invoiceType: "no-tax" | "tax";
  invoiceNumber: string;
  issueDate: Dayjs;
  dueDate: Dayjs;
  paymentMethod: string;
  bankAccountNumber: string;
  billFrom: Business;
  billTo: Business;
  items: Array<{ name: string; ammount: number; price: number }>;
}
