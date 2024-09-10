import { FormValues } from "@/types/form-values";
import {
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import { useFormikContext } from "formik";
import { useState } from "react";

export default function Debugger() {
  const formik = useFormikContext<FormValues>();
  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label="Debugger"
        />
      </FormGroup>

      {checked && (
        <Card>
          <CardHeader title="Debugger" />
          <CardContent>
            <pre>{JSON.stringify(formik.values, null, 4)}</pre>
          </CardContent>
        </Card>
      )}
    </>
  );
}
