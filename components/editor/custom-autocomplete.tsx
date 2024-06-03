import { Form } from "@/components/editor";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { Dispatch, SetStateAction, useState } from "react";

// Could be renamed to something like SearchBusinessAutocomplete...
// Needs debouncing (info. in MUI docs)
export default function CustomAutocomplete({
  isFor,
  inputValue,
  form,
  setForm,
}: {
  isFor: "billFrom" | "billTo";
  inputValue: string;
  form: Form;
  setForm: Dispatch<SetStateAction<Form>>;
}) {
  const [options, setOptions] = useState([]);

  const handleChange = async (e: any, value: string | null) => {
    if (!value) return;

    // Returned value is object, but MUI TS specifies it as string... I don't know what to do
    const { ico } = JSON.parse(JSON.stringify(value));

    const data = await fetch(
      `https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/${ico}`
    ).then((res) => res.json());

    let street = data.sidlo.nazevUlice ?? data.sidlo.nazevObce;
    street += " " + data.sidlo.cisloDomovni;
    street += data.sidlo.cisloOrientacni
      ? "/" + data.sidlo.cisloOrientacni
      : "";

    const formatData = {
      label: data.obchodniJmeno,
      ico: data.ico,
      dic: data.dic,
      street: street,
      city: data.sidlo.nazevObce,
      postalCode: data.sidlo.psc,
      country: data.sidlo.nazevStatu,
    };

    setForm({ ...form, [isFor]: formatData });
  };

  const handleInputChange = (e: any, value: string) => {
    setForm({
      ...form,
      [isFor]: { ...form[isFor], label: value },
    });

    if (value.length > 2) {
      fetch(`/api?label=${value}`)
        .then((response) => response.json())
        .then((data) => setOptions(data));
    }
  };

  return (
    <Autocomplete
      freeSolo
      options={options}
      renderInput={(params) => (
        <TextField {...params} label="Název" variant="filled" />
      )}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
    />
  );
}
