import PDFPreview from "@/components/pdf-preview";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/cs";
import { Dispatch, SetStateAction, useState } from "react";
import SwipeableViews from "react-swipeable-views";

export interface Form {
  type: string;
  number: string;
  issueDate: Dayjs | null;
  dueDate: Dayjs | null;
  paymentMethod: string;
  bankAccountNumber: string;
}

const images = [
  {
    label: "Základní údaje",
    body: ({
      form,
      setForm,
    }: {
      form: Form;
      setForm: Dispatch<SetStateAction<Form>>;
    }) => (
      <>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Druh faktury</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={form.type}
            label="Druh faktury"
            onChange={(event) =>
              setForm({ ...form, type: event.target.value as string })
            }
          >
            <MenuItem value={"s-dph"}>Faktura s DPH</MenuItem>
            <MenuItem value={"bez-dph"}>
              Faktura bez DPH (nejsem plátce DPH)
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          required
          label="Evidenční číslo"
          value={form.number}
          onChange={(event) => setForm({ ...form, number: event.target.value })}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="cs">
          <DatePicker
            label="Datum vystavení"
            value={form.issueDate}
            onChange={(newValue) => setForm({ ...form, issueDate: newValue })}
            format="DD.MM.YYYY"
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="cs">
          <DatePicker
            label="Datum splatnosti"
            value={form.dueDate}
            onChange={(newValue) => setForm({ ...form, dueDate: newValue })}
            format="DD.MM.YYYY"
          />
        </LocalizationProvider>
        <FormControl fullWidth>
          <InputLabel id="payment-method-select-label">Forma úhrady</InputLabel>
          <Select
            labelId="payment-method-select-label"
            value={form.paymentMethod}
            label="Druh faktury"
            onChange={(event) =>
              setForm({ ...form, paymentMethod: event.target.value as string })
            }
          >
            <MenuItem value={"Hotovost"}>Hotovost</MenuItem>
            <MenuItem value={"Bankovní převod"}>Bankovní převod</MenuItem>
          </Select>
        </FormControl>
        <TextField
          required
          label="Číslo účtu"
          value={form.bankAccountNumber}
          onChange={(event) =>
            setForm({ ...form, bankAccountNumber: event.target.value })
          }
        />
      </>
    ),
  },
  {
    label: "Dodavatel",
    body: () => (
      <>
        <TextField
          required
          id="outlined-required"
          label="IČO"
          defaultValue="Hello World"
        />
        <TextField
          required
          id="outlined-required"
          label="Jméno"
          defaultValue="Hello World"
        />
        <TextField
          required
          id="outlined-required"
          label="DIČ"
          defaultValue="Hello World"
        />
        <TextField
          required
          id="outlined-required"
          label="Ulice"
          defaultValue="Hello World"
        />
        <TextField
          required
          id="outlined-required"
          label="Město"
          defaultValue="Hello World"
        />
        <TextField
          required
          id="outlined-required"
          label="PSČ"
          defaultValue="Hello World"
        />
        <TextField
          required
          id="outlined-required"
          label="Země"
          defaultValue="Hello World"
        />
      </>
    ),
  },
  // {
  //   label: "Odběratel",
  //   body: (
  //     <>
  //       <TextField
  //         required
  //         id="outlined-required"
  //         label="IČO"
  //         defaultValue="Hello World"
  //       />
  //       <TextField
  //         required
  //         id="outlined-required"
  //         label="Jméno"
  //         defaultValue="Hello World"
  //       />
  //       <TextField
  //         required
  //         id="outlined-required"
  //         label="DIČ"
  //         defaultValue="Hello World"
  //       />
  //       <TextField
  //         required
  //         id="outlined-required"
  //         label="Ulice"
  //         defaultValue="Hello World"
  //       />
  //       <TextField
  //         required
  //         id="outlined-required"
  //         label="Město"
  //         defaultValue="Hello World"
  //       />
  //       <TextField
  //         required
  //         id="outlined-required"
  //         label="PSČ"
  //         defaultValue="Hello World"
  //       />
  //       <TextField
  //         required
  //         id="outlined-required"
  //         label="Země"
  //         defaultValue="Hello World"
  //       />
  //     </>
  //   ),
  // },
  // {
  //   label: "Goč, Serbia",
  //   imgPath:
  //     "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  // },
];

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const [form, setForm] = useState<Form>({
    type: "bez-dph",
    number: "",
    issueDate: dayjs("2022-04-17"),
    dueDate: dayjs("2022-04-17"),
    paymentMethod: "Bankovní převod",
    bankAccountNumber: "",
  });

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
            {images[activeStep].label}
          </Typography>
        </Paper>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          className="flex-1"
        >
          {images.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <step.body form={form} setForm={setForm} />
                </div>
              ) : null}
            </div>
          ))}
        </SwipeableViews>
        {/* <p className="max-w-96">{JSON.stringify(form)}</p> */}
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </div>
      <PDFPreview form={form} />
    </div>
  );
}

export default SwipeableTextMobileStepper;
