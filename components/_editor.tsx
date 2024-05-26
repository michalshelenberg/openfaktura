import PDFDocument from "@/components/pdf-document";
import PDFPreview from "@/components/pdf-preview";
import { Search } from "@mui/icons-material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
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
import { PDFDownloadLink } from "@react-pdf/renderer";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/cs";
import { Dispatch, SetStateAction, useState } from "react";
import SwipeableViews from "react-swipeable-views";

async function getData(ico: string) {
  const res = await fetch(
    `https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/${ico}`
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export interface Form {
  type: string;
  number: string;
  issueDate: Dayjs | null;
  dueDate: Dayjs | null;
  paymentMethod: string;
  bankAccountNumber: string;
  billFrom: {
    name: string;
    ico: string;
    dic: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  billTo: {
    name: string;
    ico: string;
    dic: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  items: Array<{ name: string; price: string; ammount: string; total: string }>;
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
    body: ({
      form,
      setForm,
    }: {
      form: Form;
      setForm: Dispatch<SetStateAction<Form>>;
    }) => (
      <>
        <div className="flex flex-row gap-2">
          <TextField
            required
            label="IČO"
            value={form.billFrom.ico}
            onChange={(event) =>
              setForm({
                ...form,
                billFrom: { ...form.billFrom, ico: event.target.value },
              })
            }
            variant="standard"
            className="flex-1"
          />
          <div className="flex items-center justify-center">
            <IconButton
              size={"large"}
              onClick={async () => {
                const data = await getData(form.billFrom.ico);

                const street = data.sidlo.nazevUlice ?? data.sidlo.nazevObce;
                const unitNo = `${data.sidlo.cisloDomovni}${
                  data.sidlo.cisloOrientacni
                    ? "/" + data.sidlo.cisloOrientacni
                    : ""
                }`;

                setForm({
                  ...form,
                  billFrom: {
                    ...form.billFrom,
                    name: data.obchodniJmeno,
                    ico: data.ico,
                    dic: data.dic,
                    street: `${street} ${unitNo}`,
                    city: data.sidlo.nazevObce,
                    postalCode: data.sidlo.psc,
                    country: data.sidlo.nazevStatu,
                  },
                });
              }}
            >
              <Search />
            </IconButton>
          </div>
        </div>
        <TextField
          required
          label="Název"
          variant="standard"
          value={form.billFrom.name}
          onChange={(event) =>
            setForm({
              ...form,
              billFrom: { ...form.billFrom, name: event.target.value },
            })
          }
        />
        <TextField
          required
          label="DIČ"
          variant="standard"
          value={form.billFrom.dic}
          onChange={(event) =>
            setForm({
              ...form,
              billFrom: { ...form.billFrom, dic: event.target.value },
            })
          }
        />
        <TextField
          required
          label="Ulice"
          variant="standard"
          value={form.billFrom.street}
          onChange={(event) =>
            setForm({
              ...form,
              billFrom: { ...form.billFrom, street: event.target.value },
            })
          }
        />
        <TextField
          required
          label="Město"
          variant="standard"
          value={form.billFrom.city}
          onChange={(event) =>
            setForm({
              ...form,
              billFrom: { ...form.billFrom, city: event.target.value },
            })
          }
        />
        <TextField
          required
          label="PSČ"
          variant="standard"
          value={form.billFrom.postalCode}
          onChange={(event) =>
            setForm({
              ...form,
              billFrom: { ...form.billFrom, postalCode: event.target.value },
            })
          }
        />
        <TextField
          required
          label="Země"
          variant="standard"
          value={form.billFrom.country}
          onChange={(event) =>
            setForm({
              ...form,
              billFrom: { ...form.billFrom, country: event.target.value },
            })
          }
        />
      </>
    ),
  },
  {
    label: "Odběratel",
    body: ({
      form,
      setForm,
    }: {
      form: Form;
      setForm: Dispatch<SetStateAction<Form>>;
    }) => (
      <>
        <div className="flex flex-row gap-2">
          <TextField
            required
            label="IČO"
            value={form.billTo.ico}
            onChange={(event) =>
              setForm({
                ...form,
                billTo: { ...form.billTo, ico: event.target.value },
              })
            }
            variant="standard"
            className="flex-1"
          />
          <div className="flex items-center justify-center">
            <IconButton
              size={"large"}
              onClick={async () => {
                const data = await getData(form.billTo.ico);

                const street = data.sidlo.nazevUlice ?? data.sidlo.nazevObce;
                const unitNo = `${data.sidlo.cisloDomovni}${
                  data.sidlo.cisloOrientacni
                    ? "/" + data.sidlo.cisloOrientacni
                    : ""
                }`;

                setForm({
                  ...form,
                  billTo: {
                    ...form.billTo,
                    name: data.obchodniJmeno,
                    ico: data.ico,
                    dic: data.dic,
                    street: `${street} ${unitNo}`,
                    city: data.sidlo.nazevObce,
                    postalCode: data.sidlo.psc,
                    country: data.sidlo.nazevStatu,
                  },
                });
              }}
            >
              <Search />
            </IconButton>
          </div>
        </div>
        <TextField
          required
          label="Název"
          variant="standard"
          value={form.billTo.name}
          onChange={(event) =>
            setForm({
              ...form,
              billTo: { ...form.billTo, name: event.target.value },
            })
          }
        />
        <TextField
          required
          label="DIČ"
          variant="standard"
          value={form.billTo.dic}
          onChange={(event) =>
            setForm({
              ...form,
              billTo: { ...form.billTo, dic: event.target.value },
            })
          }
        />
        <TextField
          required
          label="Ulice"
          variant="standard"
          value={form.billTo.street}
          onChange={(event) =>
            setForm({
              ...form,
              billTo: { ...form.billTo, street: event.target.value },
            })
          }
        />
        <TextField
          required
          label="Město"
          variant="standard"
          value={form.billTo.city}
          onChange={(event) =>
            setForm({
              ...form,
              billTo: { ...form.billTo, city: event.target.value },
            })
          }
        />
        <TextField
          required
          label="PSČ"
          variant="standard"
          value={form.billTo.postalCode}
          onChange={(event) =>
            setForm({
              ...form,
              billTo: { ...form.billTo, postalCode: event.target.value },
            })
          }
        />
        <TextField
          required
          label="Země"
          variant="standard"
          value={form.billTo.country}
          onChange={(event) =>
            setForm({
              ...form,
              billTo: { ...form.billTo, country: event.target.value },
            })
          }
        />
      </>
    ),
  },
  {
    label: "Položky faktury",
    body: ({
      form,
      setForm,
    }: {
      form: Form;
      setForm: Dispatch<SetStateAction<Form>>;
    }) => {
      const defaultValues = { name: "", ammount: "", price: "", total: "---" };
      const [newItem, setNewItem] = useState(defaultValues);

      return (
        <>
          {form.items.map((item) => (
            <div className="grid grid-cols-4 gap-2 col-span-2">
              <TextField
                required
                label="Název"
                variant="standard"
                value={item.name}
                onChange={(event) =>
                  setForm({
                    ...form,
                    billTo: { ...form.billTo, country: event.target.value },
                  })
                }
                className="col-span-2"
              />
              <TextField
                required
                label="Množství"
                variant="standard"
                value={item.ammount}
                onChange={(event) =>
                  setForm({
                    ...form,
                    billTo: { ...form.billTo, country: event.target.value },
                  })
                }
              />
              <TextField
                required
                label="Cena"
                variant="standard"
                value={item.price}
                onChange={(event) =>
                  setForm({
                    ...form,
                    billTo: { ...form.billTo, country: event.target.value },
                  })
                }
              />
            </div>
          ))}
          <div className="grid grid-cols-4 gap-2 col-span-2">
            <TextField
              required
              label="Název"
              variant="standard"
              value={newItem.name}
              onChange={(event) =>
                setNewItem({ ...newItem, name: event.target.value })
              }
              className="col-span-2"
            />
            <TextField
              required
              label="Množství"
              variant="standard"
              value={newItem.ammount}
              onChange={(event) =>
                setNewItem({ ...newItem, ammount: event.target.value })
              }
            />
            <TextField
              required
              label="Cena"
              // type="number"
              variant="standard"
              value={newItem.price}
              onChange={(event) =>
                setNewItem({ ...newItem, price: event.target.value })
              }
            />
          </div>
          <Button
            variant="contained"
            onClick={() => {
              setForm({
                ...form,
                items: [
                  ...form.items,
                  { ...newItem, total: newItem.ammount * newItem.price },
                ],
              });
              setNewItem(defaultValues);
            }}
          >
            Uložit
          </Button>
        </>
      );
    },
  },
  {
    label: "Stáhnout",
    body: ({
      form,
      setForm,
    }: {
      form: Form;
      setForm: Dispatch<SetStateAction<Form>>;
    }) => (
      <>
        <PDFDownloadLink document={<PDFDocument form={form} />}>
          <Button>Stáhnout</Button>
        </PDFDownloadLink>
      </>
    ),
  },
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
    billFrom: {
      name: "",
      ico: "",
      dic: "",
      street: "",
      city: "",
      postalCode: "",
      country: "",
    },
    billTo: {
      name: "",
      ico: "",
      dic: "",
      street: "",
      city: "",
      postalCode: "",
      country: "",
    },
    items: [],
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
        {/* TODO: REMOVE DEBUG */}
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
