import { Form } from "@/components/editor";
import { CircularProgress, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

// Could be renamed to something like SearchBusinessAutocomplete...
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
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: any, value: string | null) => {
    if (!value) return;

    // Returned value is object, but MUI TS specifies it as string... I don't know what to do
    const { ico } = JSON.parse(JSON.stringify(value));

    const data = await fetch(
      `https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/${ico}`,
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

    // if (value.length > 2) {
    //   fetch(`/api?label=${value}`)
    //     .then((response) => response.json())
    //     .then((data) => setOptions(data));
    // }
  };

  const [debounced] = useDebounce(form[isFor].label, 1000);
  useEffect(() => {
    if (debounced.length > 2) {
      setLoading(true);
      fetch(`/api?label=${debounced}`)
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          setOptions(data);
        });
    }
  }, [debounced]);

  return (
    <Autocomplete
      freeSolo
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Název"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
    />
  );
}
