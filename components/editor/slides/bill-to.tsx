import { Form } from "@/components/editor";
import CustomAutocomplete from "@/components/editor/custom-autocomplete";
import { TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import { Dispatch, SetStateAction } from "react";

export const billTo = {
  label: "3. Odběratel",
  body: ({
    form,
    setForm,
  }: {
    form: Form;
    setForm: Dispatch<SetStateAction<Form>>;
  }) => {
    const handleTextFieldChange = (event: any) => {
      const billTo = {
        ...form.billTo,
        [event.target.name]: event.target.value,
      };

      setForm({ ...form, billTo: billTo });
    };

    return (
      <div className="flex flex-col divide-y">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <Alert severity="info">
            <ul>
              <li>Vyhledávejte podle názvu podniku</li>
              <li>Vložte IČ a formulář se automaticky vyplní</li>
            </ul>
          </Alert>
          <CustomAutocomplete
            isFor="billTo"
            inputValue={form.billTo.label}
            form={form}
            setForm={setForm}
          />
          <TextField
            label="ICO"
            variant="filled"
            name="ico"
            value={form.billTo.ico}
            onChange={handleTextFieldChange}
          />
          {/* <IconButton size={"large"} onClick={() => {}}>
                <Search />
              </IconButton> */}
          <TextField
            label="DIČ"
            variant="filled"
            name="dic"
            value={form.billTo.dic}
            onChange={handleTextFieldChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <TextField
            label="Ulice"
            variant="filled"
            name="addrLine1"
            value={form.billTo.addrLine1}
            onChange={handleTextFieldChange}
          />
          <TextField
            label="Město"
            variant="filled"
            name="addrLine2"
            value={form.billTo.addrLine2}
            onChange={handleTextFieldChange}
          />
          <TextField
            label="PSČ"
            variant="filled"
            name="postalCode"
            value={form.billTo.postalCode}
            onChange={handleTextFieldChange}
          />
          <TextField
            label="Země"
            variant="filled"
            name="country"
            value={form.billTo.country}
            onChange={handleTextFieldChange}
          />
        </div>
      </div>
    );
  },
};
