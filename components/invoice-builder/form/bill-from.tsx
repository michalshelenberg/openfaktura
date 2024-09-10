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
import {CircularProgress} from "@mui/material";
import { useDebounce } from "use-debounce";

export default function BillFrom() {
  const formik = useFormikContext<FormValues>();
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedAutocomplete] = useDebounce(formik.values.billFromName, 1000)

  useEffect(() => {
    if (debouncedAutocomplete.length > 2) {
      try {
        setLoading(true);
        fetch(`/api/label=${debouncedAutocomplete}`)
        .then((response) => response.json())
        .then((data) => {
          setOptions(data);
          setLoading(false);
        });
      } catch(error) {
        console.error(error)
        setLoading(false)
      }
    }
  }, [debouncedAutocomplete])
  
  const handleChange = () => {
   console.log('Change');
  }

  return (
    <Card>
      <CardHeader title="Dodavatel" />
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Autocomplete freeSolo options={options} renderInput={(params) => (
          <TextField {...params} name="billFromName" label="Název" 
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
        value={formik.values.billFromName}
        onInputChange={formik.handleChange}
        onChange={handleChange}
        />
        <TextField label="IČO" />
        <TextField label="DIČ" />
        <TextField label="Ulice" />
        <TextField label="Město" />
        <TextField label="PSČ" />
        <TextField label="Země" />
      </CardContent>
    </Card>
  );
}
