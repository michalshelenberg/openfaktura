import { Form } from "@/components/editor";
import CustomAutocomplete from "@/components/editor/custom-autocomplete";
import { Search } from "@mui/icons-material";
import { TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
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
    const handleTextFieldChange = (event: any) => {
      const billFrom = {
        ...form.billFrom,
        [event.target.name]: event.target.value,
      };

      setForm({ ...form, billFrom: billFrom });
    };

    return (
      <div className="divide-y pb-8">
        <div className="flex flex-row items-center justify-start sticky top-0 px-4 bg-blue-700 text-white h-[50px] z-10">
          <p className="font-bold">2. Dodavatel</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <Alert severity="info">
            <ul>
              <li>Vyhledávejte podle názvu podniku</li>
              <li>Vložte IČ a formulář se automaticky vyplní</li>
            </ul>
          </Alert>
          <CustomAutocomplete
            isFor="billFrom"
            inputValue={form.billFrom.label}
            form={form}
            setForm={setForm}
          />
          <div className="flex flex-row gap-4 items-center justify-center">
            <TextField
              label="ICO"
              variant="filled"
              name="ico"
              value={form.billFrom.ico}
              onChange={handleTextFieldChange}
              className="flex-1"
            />
            <IconButton
              size={"large"}
              onClick={async () => {
                const data = await fetch(
                  `https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/${form.billFrom.ico}`
                ).then((res) => res.json());

                let street = data.sidlo.nazevUlice ?? data.sidlo.nazevObce;
                street += " " + data.sidlo.cisloDomovni;
                street += data.sidlo.cisloOrientacni
                  ? "/" + data.sidlo.cisloOrientacni
                  : "";

                const billFrom = {
                  label: data.obchodniJmeno,
                  ico: data.ico,
                  dic: data.dic,
                  street: street,
                  city: data.sidlo.nazevObce,
                  postalCode: data.sidlo.psc,
                  country: data.sidlo.nazevStatu,
                };

                setForm({ ...form, billFrom: billFrom });
              }}
            >
              <Search />
            </IconButton>
          </div>
          <TextField
            label="DIČ"
            variant="filled"
            name="dic"
            value={form.billFrom.dic}
            onChange={handleTextFieldChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <TextField
            label="Ulice"
            variant="filled"
            name="addrLine1"
            value={form.billFrom.street}
            onChange={handleTextFieldChange}
          />
          <TextField
            label="Město"
            variant="filled"
            name="addrLine2"
            value={form.billFrom.city}
            onChange={handleTextFieldChange}
          />
          <TextField
            label="PSČ"
            variant="filled"
            name="postalCode"
            value={form.billFrom.postalCode}
            onChange={handleTextFieldChange}
          />
          <TextField
            label="Země"
            variant="filled"
            name="country"
            value={form.billFrom.country}
            onChange={handleTextFieldChange}
          />
        </div>
      </div>
    );
  },
};
