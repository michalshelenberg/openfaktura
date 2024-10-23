import { FormValues } from "@/types/form-values";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik, useFormikContext } from "formik";
import { useState } from "react";

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormikContext<FormValues>();

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Přidat položku
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Přidat položku</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{ name: "", ammount: 0, price: 0 }}
            onSubmit={(values) => {
              console.log(JSON.stringify(values, null, 2));
              const newItems = formik.values.items;
              newItems.push(values);
              formik.setFieldValue("items", newItems, true);
            }}
          >
            {(subformik) => (
              <form id="items-form">
                <div className="grid grid-cols-2 gap-x-4 gap-y-6 py-4">
                  <TextField
                    label="Popis"
                    {...subformik.getFieldProps("name")}
                    className="col-span-2"
                  />
                  <TextField
                    label="Počet"
                    {...subformik.getFieldProps("ammount")}
                  />
                  <TextField
                    label="Cena"
                    {...subformik.getFieldProps("price")}
                  />
                </div>
                <Button variant="contained" onClick={subformik.submitForm}>
                  Přidat
                </Button>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}
