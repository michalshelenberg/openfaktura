import { Form } from "@/components/editor";
import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import "dayjs/locale/cs";
import { Dispatch, SetStateAction } from "react";

export const basicInformation = {
  label: "1. Základní údaje",
  body: ({
    form,
    setForm,
  }: {
    form: Form;
    setForm: Dispatch<SetStateAction<Form>>;
  }) => (
    <div className="flex flex-col divide-y">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <FormControl variant="filled">
          <InputLabel id="type-select">Druh faktury</InputLabel>
          <Select
            label="Druh faktury"
            labelId="type-select"
            value={form.type}
            onChange={(event) => setForm({ ...form, type: event.target.value })}
          >
            <MenuItem value={"s-dph"}>Faktura s DPH</MenuItem>
            <MenuItem value={"bez-dph"}>
              Faktura bez DPH (nejsem plátce DPH)
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Číslo faktury"
          variant="filled"
          value={form.number}
          onChange={(event) => setForm({ ...form, number: event.target.value })}
        />
        <TextField
          label="Evidenční číslo"
          variant="filled"
          value={form.number}
          onChange={(event) => setForm({ ...form, number: event.target.value })}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="cs">
          <MobileDatePicker
            label="Datum vystavení"
            slotProps={{ textField: { variant: "filled" } }}
            format="DD.MM.YYYY"
            value={form.issueDate}
            onChange={(newValue) => setForm({ ...form, issueDate: newValue })}
          />
        </LocalizationProvider>
        <div className="flex flex-row gap-4">
          <FormControl variant="filled" className="flex-1">
            <InputLabel id="payment-method-label">Splatnost</InputLabel>
            <Select
              label="Splatnost"
              labelId="payment-method-label"
              value={form.paymentMethod}
              onChange={(event) =>
                setForm({
                  ...form,
                  paymentMethod: event.target.value as string,
                })
              }
            >
              <MenuItem value={"Hotovost"}>14 dní</MenuItem>
              <MenuItem value={"Bankovní převod"}>30 dní</MenuItem>
              <MenuItem value={"Bankovní převod"}>Vlastní datum</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="cs">
            <MobileDatePicker
              label="Datum splatnosti"
              slotProps={{ textField: { variant: "filled" } }}
              format="DD.MM.YYYY"
              value={form.dueDate}
              onChange={(newValue) => setForm({ ...form, dueDate: newValue })}
              className="flex-1"
            />
          </LocalizationProvider>
        </div>
        {/* <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="cs">
          <MobileDatePicker
            label="Datum zd. plnění"
            slotProps={{ textField: { variant: "filled" } }}
            disabled
            format="DD.MM.YYYY"
            value={form.issueDate}
            onChange={(newValue) => setForm({ ...form, issueDate: newValue })}
          />
        </LocalizationProvider> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <FormControl variant="filled">
          <InputLabel id="payment-method-label">Forma úhrady</InputLabel>
          <Select
            // TODO: WOAT
            label="Forma úhrady"
            labelId="payment-method-label"
            value={form.paymentMethod}
            onChange={(event) =>
              setForm({ ...form, paymentMethod: event.target.value as string })
            }
          >
            <MenuItem value={"Hotovost"}>Hotovost</MenuItem>
            <MenuItem value={"Bankovní převod"}>Bankovní převod</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Číslo účtu"
          variant="filled"
          value={form.bankAccountNumber}
          onChange={(event) =>
            setForm({ ...form, bankAccountNumber: event.target.value })
          }
        />
        <TextField
          label="Variabilní symbol"
          variant="filled"
          value={form.bankAccountNumber}
          onChange={(event) =>
            setForm({ ...form, bankAccountNumber: event.target.value })
          }
        />
        <TextField
          label="Konstantní symbol"
          variant="filled"
          value={form.bankAccountNumber}
          onChange={(event) =>
            setForm({ ...form, bankAccountNumber: event.target.value })
          }
        />
      </div>
    </div>
  ),
};
