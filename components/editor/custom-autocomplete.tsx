import { Form } from "@/components/editor";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { Dispatch, SetStateAction, useState } from "react";

export default function CustomAutocomplete({
  form,
}: {
  form: { formData: Form; setForm: Dispatch<SetStateAction<Form>> };
}) {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState(""); // I would like to use defaultValue instead of inputValue, but Material UI complains that I am not using controlled Autocomplete

  const { formData, setForm } = form;

  const handleChange = async (e: any, value: string | null) => {
    if (!value) return;

    // Returned value is object, but MUI TS specifies it as string... I don't know what to do
    const { ico } = JSON.parse(JSON.stringify(value));

    const data = await fetch(
      `https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/${ico}`
    ).then((res) => res.json());

    const billFrom = {
      label: data.obchodniJmeno,
      ico: data.ico,
      dic: data.dic,
      addrLine1:
        (data.sidlo.nazevUlice ?? data.sidlo.nazevObce) +
        " " +
        data.sidlo.cisloDomovni +
        (data.sidlo.cisloOrientacni && "/" + data.sidlo.cisloOrientacni),
      addrLine2: `${data.sidlo.psc} ${data.sidlo.nazevObce}`,
      postalCode: data.sidlo.psc,
      country: data.sidlo.nazevStatu,
    };

    setForm({ ...formData, billFrom: billFrom });
  };

  const handleInputChange = (e: any, value: string) => {
    setInputValue(value);

    setForm({
      ...formData,
      billFrom: { ...formData.billFrom, label: value },
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
