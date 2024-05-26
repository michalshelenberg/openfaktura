import { Form } from "@/components/editor";
import { getData } from "@/lib/getData";
import { Search } from "@mui/icons-material";
import { TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import "dayjs/locale/cs";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const billFrom = {
  label: "2. Dodavatel",
  body: ({
    form,
    setForm,
  }: {
    form: Form;
    setForm: Dispatch<SetStateAction<Form>>;
  }) => {
    const [results, setResults] = useState([]);

    useEffect(() => {
      fetch(`/api?search=${form.billFrom.name}`)
        .then((response) => response.json())
        .then((data) => setResults(data));
    }, [form.billFrom.name]);

    return (
      <div className="flex flex-col divide-y">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <Alert severity="info">
            Vyhledávejte podle názvu podniku, <br />
            vložte IČ a formulář se automaticky vyplní
          </Alert>
          <Autocomplete
            disablePortal
            options={results}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Název"
                variant="filled"
                value={form.billFrom.name}
                onChange={(event) =>
                  setForm({
                    ...form,
                    billFrom: { ...form.billFrom, name: event.target.value },
                  })
                }
              />
            )}
          />
          <div className="flex flex-row gap-4">
            <TextField
              label="IČO"
              variant="filled"
              value={form.billFrom.ico}
              onChange={(event) =>
                setForm({
                  ...form,
                  billFrom: { ...form.billFrom, ico: event.target.value },
                })
              }
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
