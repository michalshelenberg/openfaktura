import { Dayjs } from "dayjs";

// todo: TS go deeper
export interface FormValues {
  invoiceType: string;
  invoiceNumber: string;
  issueDate: Dayjs;
  dueDate: Dayjs;
  paymentMethod: string;
  bankAccountNumber: string;
}