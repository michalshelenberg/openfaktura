"use client";

import {
  Autocomplete,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import { useState } from "react";

export default function BillFrom() {
  const [options, setOptions] = useState([]);

  const handleAutocompleteChange = async () => {};

  return (
    <Card>
      <CardHeader title="Dodavatel" />
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Autocomplete freeSolo></Autocomplete>
        {/* <TextField label="Dodavatel" /> */}
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
