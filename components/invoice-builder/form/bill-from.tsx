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

export default function BillFrom() {
  const formik = useFormikContext<FormValues>();
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedAutocomplete] = useDebounce(
    formik.values.billFrom.name,
    1000,
  );

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
      formik.setFieldValue("billFrom", value);
    });
  };

  return (
    <Card>
      <CardHeader title="Dodavatel" />
      <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Autocomplete
          freeSolo
          options={options}
          renderInput={(params) => (
            <TextField
              {...params}
              name="billFrom.name"
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
          value={formik.values.billFrom.name}
          onInputChange={formik.handleChange}
          onChange={handleChange}
        />
        <TextField
          name="billFrom.ico"
          label="IČO"
          value={formik.values.billFrom.ico}
          onChange={formik.handleChange}
        />
        <TextField
          name="billFrom.dic"
          label="DIČ"
          value={formik.values.billFrom.dic}
          onChange={formik.handleChange}
        />
        <TextField
          name="billFrom.street"
          label="Ulice"
          value={formik.values.billFrom.street}
          onChange={formik.handleChange}
        />
        <TextField
          name="billFrom.city"
          label="Město"
          value={formik.values.billFrom.city}
          onChange={formik.handleChange}
        />
        <TextField
          name="billFrom.psc"
          label="PSČ"
          value={formik.values.billFrom.psc}
          onChange={formik.handleChange}
        />
        <TextField
          name="billFrom.country"
          label="Země"
          value={formik.values.billFrom.country}
          onChange={formik.handleChange}
        />
      </CardContent>
    </Card>
  );
}
