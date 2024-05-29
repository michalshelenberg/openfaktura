"use client";

import { basicInformation } from "@/components/editor/basic-information";
import { billFrom } from "@/components/editor/bill-from";
import PDFPreview from "@/components/pdf-preview";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/cs";
import { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { useDebounce } from "@react-hook/debounce";

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
  bankAccountNumber: string;
  billFrom: InvoiceBusiness;
  billTo: InvoiceBusiness;
  items: Array<{ name: string; price: string; ammount: string; total: string }>;
}

const steps = [basicInformation, billFrom];

export default function Editor() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = steps.length;

  const [form, setForm] = useDebounce<Form>(
    {
      type: "bez-dph",
      number: `${dayjs().format("YYYYMM")}0001`,
      issueDate: dayjs(),
      dueDate: dayjs().add(14, "day"),
      paymentMethod: "Bankovní převod",
      bankAccountNumber: "",
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
    },
    500
  );

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <div className="flex flex-row flex-1">
      <div className="flex-1 flex flex-col select-none">
        <Paper
          square
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            height: 50,
          }}
          className="border-b p-4"
        >
          <Typography sx={{ fontWeight: "bold" }}>
            {steps[activeStep].label}
          </Typography>
        </Paper>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          className="flex-1"
        >
          {steps.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <step.body form={form} setForm={setForm} />
              ) : null}
            </div>
          ))}
        </SwipeableViews>
        <MobileStepper
          steps={maxSteps}
          activeStep={activeStep}
          position="static"
          nextButton={
            <Button onClick={handleNext} disabled={activeStep === maxSteps - 1}>
              Pokračovat
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Zpět
            </Button>
          }
        />
      </div>
      <PDFPreview form={form} />
    </div>
  );
}
