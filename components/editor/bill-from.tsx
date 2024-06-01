import { Form } from "@/components/editor";
import { getData } from "@/lib/getData";
import { Search } from "@mui/icons-material";
import { TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import "dayjs/locale/cs";
import { Dispatch, SetStateAction, useState } from "react";

export const billFrom = {
  label: "2. Dodavatel",
  body: ({
    form,
    setForm,
  }: {
    form: Form;
    setForm: Dispatch<SetStateAction<Form>>;
  }) => {
    const [options, setOptions] = useState([]);
    const [autocomplete, setAutocomplete] = useState("");

    return (
      <div className="flex flex-col divide-y">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <Alert severity="info">
            <ul>
              <li>Vyhledávejte podle názvu podniku</li>
              <li>Vložte IČ a formulář se automaticky vyplní</li>
            </ul>
          </Alert>
          <Autocomplete
            freeSolo
            options={options}
            renderInput={(params) => (
              <TextField {...params} label="Název" variant="filled" />
            )}
            inputValue={autocomplete}
            onInputChange={(e, value) => {
              setAutocomplete(value);

              setForm({
                ...form,
                billFrom: { ...form.billFrom, label: autocomplete },
              });

              if (value.length > 2) {
                fetch(`/api?label=${autocomplete}`)
                  .then((response) => response.json())
                  .then((data) => setOptions(data));
              }
            }}
            onChange={async (e, value) => {
              const wtf = JSON.stringify(value);
              const wtf2 = JSON.parse(wtf);
              const ico = wtf2.ico;

              const data = await getData(ico);

              setForm({ ...form, billFrom: data });
            }}
          />
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
            value={form.billFrom.dic}
            onChange={(event) =>
              setForm({
                ...form,
                billFrom: { ...form.billFrom, dic: event.target.value },
              })
            }
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
