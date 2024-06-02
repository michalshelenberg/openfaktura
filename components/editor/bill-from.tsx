import { Form } from "@/components/editor";
import CustomAutocomplete from "@/components/editor/custom-autocomplete";
import { getData } from "@/lib/getData";
import { Search } from "@mui/icons-material";
import { TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import "dayjs/locale/cs";
import { Dispatch, SetStateAction } from "react";

export const billFrom = {
  label: "2. Dodavatel",
  body: ({
    form,
    setForm,
  }: {
    form: Form;
    setForm: Dispatch<SetStateAction<Form>>;
  }) => {
    return (
      <div className="flex flex-col divide-y">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <Alert severity="info">
            <ul>
              <li>Vyhledávejte podle názvu podniku</li>
              <li>Vložte IČ a formulář se automaticky vyplní</li>
            </ul>
          </Alert>
          <CustomAutocomplete form={{ formData: form, setForm: setForm }} />
          <div className="flex flex-row gap-4">
            <TextField
              fullWidth
              label="IČO"
              variant="filled"
              defaultValue={form.billFrom.ico}
              onChange={(event) =>
                setForm({
                  ...form,
                  billFrom: { ...form.billFrom, ico: event.target.value },
                })
              }
            />
            <div className="flex items-center justify-center">
              <IconButton
                size={"large"}
                onClick={async () => {
                  const wtf = JSON.stringify(form.billFrom.ico);
                  const wtf2 = JSON.parse(wtf);
                  const ico = wtf2.ico;

                  const data = await getData(ico);

                  setForm({ ...form, billFrom: data });
                }}
              >
                <Search />
              </IconButton>
            </div>
          </div>
          <TextField
            label="DIČ"
            variant="filled"
            name="dic"
            value={form.billFrom.dic}
            // onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <TextField
            label="Ulice"
            variant="filled"
            value={form.billFrom.street}
            onChange={(event) =>
              setForm({
                ...form,
                billFrom: { ...form.billFrom, street: event.target.value },
              })
            }
          />
          <TextField
            label="Město"
            variant="filled"
            value={form.billFrom.city}
            onChange={(event) =>
              setForm({
                ...form,
                billFrom: { ...form.billFrom, city: event.target.value },
              })
            }
          />
          <TextField
            label="PSČ"
            variant="filled"
            value={form.billFrom.postalCode}
            onChange={(event) =>
              setForm({
                ...form,
                billFrom: { ...form.billFrom, postalCode: event.target.value },
              })
            }
          />
          <TextField
            label="Země"
            variant="filled"
            value={form.billFrom.country}
            onChange={(event) =>
              setForm({
                ...form,
                billFrom: { ...form.billFrom, country: event.target.value },
              })
            }
          />
        </div>
      </div>
    );
  },
};
