"use client";

import { FormValues } from "@/types/form-values";
import { Button } from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import Document1 from "../invoice-templates/document-1";

export default function DownloadPDFButton() {
  const formik = useFormikContext<FormValues>();
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => setLoaded(true), []);

  if (isLoaded) {
    return (
      <div>
        <PDFDownloadLink document={<Document1 values={formik.values} />}>
          <Button variant="contained">Stáhnout PDF</Button>
        </PDFDownloadLink>
      </div>
    );
  }
}
