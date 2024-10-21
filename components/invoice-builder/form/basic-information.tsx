"use client";

import { FormValues } from "@/types/form-values";
import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useFormikContext } from "formik";
import { useRef } from "react";

export default function BasicInformation() {
  const formik = useFormikContext<FormValues>();
  const dueDateRef = useRef<any | null>(null); // todo: (optional) add ts

  const handleDueDateSelectChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    switch (value) {
      case "14-days":
        formik.setFieldValue(
          "dueDate",
          formik.values.issueDate.add(14, "days"),
          true
        );
        break;
      case "30-days":
        formik.setFieldValue(
          "dueDate",
          formik.values.issueDate.add(30, "days"),
          true
        );
        break;
      case "custom-date":
        console.log(">>> selected custom date");
        dueDateRef.current.click();
        // dueDateRef.current.focus();
        break;
    }
  };

  return (
    <Card>
      <CardHeader title="Základní informace" />
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
        <TextField
          select
          name="invoiceType"
          label="Druh faktury"
          value={formik.values.invoiceType}
          onChange={formik.handleChange}
        >
          <MenuItem value="no-tax">
            Faktura bez DPH (nejsem plátce DPH)
          </MenuItem>
        </TextField>
        <TextField
          name="invoiceNumber"
          label="Číslo faktury"
          value={formik.values.invoiceNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(
            formik.touched.invoiceNumber && formik.errors.invoiceNumber
          )}
          helperText={
            formik.touched.invoiceNumber && formik.errors.invoiceNumber
          }
        />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="cs">
          <DatePicker
            name="issueDate"
            label="Datum vystavení"
            format="DD.MM.YYYY"
            value={formik.values.issueDate}
            onChange={(value) => formik.setFieldValue("issueDate", value, true)}
          />
          <FormControl>
            <InputLabel>Splatnost</InputLabel>
            <Select
              label="Splatnost"
              defaultValue="14-days"
              onChange={handleDueDateSelectChange}
            >
              <MenuItem value="14-days">14 dní</MenuItem>
              <MenuItem value="30-days">30 dní</MenuItem>
              <MenuItem value="custom-date">Vlastní datum</MenuItem>
            </Select>
          </FormControl>
          <DatePicker
            inputRef={dueDateRef}
            name="dueDate"
            label="Datum splatnosti"
            format="DD.MM.YYYY"
            value={formik.values.dueDate}
            onChange={(value) => formik.setFieldValue("dueDate", value, true)}
          />
        </LocalizationProvider>
        <TextField
          select
          name="paymentMethod"
          label="Forma úhrady"
          value={formik.values.paymentMethod}
          onChange={formik.handleChange}
        >
          <MenuItem value="bank-transfer">Bankovní převod</MenuItem>
        </TextField>
        <TextField
          name="bankAccountNumber"
          label="Číslo bankovního účtu"
          value={formik.values.bankAccountNumber}
          onChange={formik.handleChange}
        />
      </CardContent>
    </Card>
  );
}
