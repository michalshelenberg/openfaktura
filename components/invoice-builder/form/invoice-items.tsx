import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  TextField,
} from "@mui/material";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { useFormikContext } from "formik";
import { Formik } from "formik";
import { FormValues } from "@/types/form-values";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function InvoiceItems() {
  const formik = useFormikContext<FormValues>();

  return (
    <Card>
      <CardHeader title="Položky faktury" />
      <CardContent>
        <Formik
          initialValues={{ description: "", ammount: 0, price: 0 }}
          onSubmit={(values) => {
            console.log(JSON.stringify(values, null, 2));
            const newItems = formik.values.items;
            newItems.push(values);
            formik.setFieldValue("items", newItems, true);
          }}
        >
          {(subformik) => (
            <form id="items-form">
              <div className="grid grid-cols-4 gap-4">
                <TextField
                  label="Popis"
                  {...subformik.getFieldProps("description")}
                  className="col-span-4 md:col-span-2"
                />
                <TextField
                  label="Počet"
                  {...subformik.getFieldProps("ammount")}
                />
                <TextField label="Cena" {...subformik.getFieldProps("price")} />
              </div>
              <Button variant="outlined" onClick={subformik.submitForm}>
                Přidat položku
              </Button>
            </form>
          )}
        </Formik>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formik.values.items.map(({ item }) => (
                <TableRow
                  key={item.description}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
