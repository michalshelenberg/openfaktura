import { Dayjs } from "dayjs";

// todo: TS go deeper
export interface FormValues {
  invoiceType: "no-tax" | "tax";
  invoiceNumber: string;
  issueDate: Dayjs;
  dueDate: Dayjs;
  paymentMethod: string;
  bankAccountNumber: string;

  billFromName: string;
}
