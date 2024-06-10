import { Form } from "@/components/editor";
import { Button, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Dispatch, FormEvent, SetStateAction } from "react";

export const invoiceItems = {
  label: "4. Položky faktury",
  body: ({
    form,
    setForm,
  }: {
    form: Form;
    setForm: Dispatch<SetStateAction<Form>>;
  }) => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);

      const items = [
        ...form.items,
        {
          name: formData.get("name") as string,
          ammount: formData.get("ammount") as string,
          price: formData.get("price") as string,
          total: (
            parseInt(formData.get("ammount") as string) *
            parseInt(formData.get("price") as string)
          ).toString(),
        },
      ];

      setForm({ ...form, items: items });

      event.currentTarget.reset();
    };

    return (
      <div className="divide-y">
        <p className="p-4 font-bold">4. Položky faktury</p>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4"
        >
          <TextField
            label="Název"
            variant="filled"
            name="name"
            className="col-span-2"
          />
          <TextField label="Množství" variant="filled" name="ammount" />
          <TextField label="Cena" variant="filled" name="price" />
          <Button variant="contained" type="submit" className="col-span-2">
            Přidat
          </Button>
        </form>
        {form.items.length > 0 && (
          <TableContainer sx={{ p: 2 }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Název položky</TableCell>
                  <TableCell align="right">Množství</TableCell>
                  <TableCell align="right">Cena</TableCell>
                  <TableCell align="right">Celkem</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {form.items.map((item) => (
                  <TableRow
                    key={item.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell align="right">{item.ammount}</TableCell>
                    <TableCell align="right">{item.price}</TableCell>
                    <TableCell align="right">{item.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    );
  },
};
