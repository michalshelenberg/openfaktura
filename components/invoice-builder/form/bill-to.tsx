"use client";

import { FormValues } from "@/types/form-values";
import {
  Autocomplete,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useDebounce } from "use-debounce";
import { FetchAres } from "@/utils/fetch-ares";

export default function BillTo() {
  const formik = useFormikContext<FormValues>();
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedAutocomplete] = useDebounce(formik.values.billTo.name, 1000);

  useEffect(() => {
    if (debouncedAutocomplete.length > 2) {
      try {
        setLoading(true);
        fetch(`/api?label=${debouncedAutocomplete}`)
          .then((response) => response.json())
          .then((data) => {
            setOptions(data);
            setLoading(false);
          });
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  }, [debouncedAutocomplete]);

  const handleChange = (e: any, value: string | null) => {
    const { ico } = JSON.parse(JSON.stringify(value));
    FetchAres(ico).then((value) => {
      console.log(value);
      formik.setFieldValue("billTo", value);
    });
  };

  return (
    <Card>
      <CardHeader title="Odběratel" />
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Autocomplete
          freeSolo
          options={options}
          renderInput={(params) => (
            <TextField
              {...params}
              name="billTo.name"
              label="Název"
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
          value={formik.values.billTo.name}
          onInputChange={formik.handleChange}
          onChange={handleChange}
        />
        <TextField
          name="billTo.ico"
          label="IČO"
          value={formik.values.billTo.ico}
          onChange={formik.handleChange}
        />
        <TextField
          name="billTo.dic"
          label="DIČ"
          value={formik.values.billTo.dic}
          onChange={formik.handleChange}
        />
        <TextField
          name="billTo.street"
          label="Ulice"
          value={formik.values.billTo.street}
          onChange={formik.handleChange}
        />
        <TextField
          name="billTo.city"
          label="Město"
          value={formik.values.billTo.city}
          onChange={formik.handleChange}
        />
        <TextField
          name="billTo.psc"
          label="PSČ"
          value={formik.values.billTo.psc}
          onChange={formik.handleChange}
        />
        <TextField
          name="billTo.country"
          label="Země"
          value={formik.values.billTo.country}
          onChange={formik.handleChange}
        />
      </CardContent>
    </Card>
  );
}
