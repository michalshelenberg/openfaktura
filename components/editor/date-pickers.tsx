import { Form } from "@/components/editor";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export default function DatePickers({
  form,
  setForm,
}: {
  form: Form;
  setForm: Dispatch<SetStateAction<Form>>;
}) {
  const [issueDate, setIssueDate] = useState(dayjs());
  const [dueDate, setDueDate] = useState(issueDate.add(14, "day"));
  const [dueSelect, setDueSelect] = useState(
    JSON.stringify({ value: 14, unit: "day" })
  );
  const dueDateRef = useRef<any>();

  const handleIssueDateChange = (newIssueDate: Dayjs | null) => {
    if (!newIssueDate) return;

    setIssueDate(newIssueDate);
    if (dueSelect !== "custom-date") {
      const dueSelectObject = JSON.parse(dueSelect);
      setDueDate(newIssueDate.add(dueSelectObject.value, dueSelectObject.unit));
    }
  };

  const handleDueDateChange = (newDueDate: Dayjs | null) => {
    if (!newDueDate) return;

    setDueDate(newDueDate);
    setDueSelect("custom-date");
  };

  const handleDueSelectChange = (newSelectValue: string) => {
    setDueSelect(newSelectValue);
    if (newSelectValue === "custom-date") {
      dueDateRef.current.click();
    } else {
      const newSelectValueObj = JSON.parse(newSelectValue);
      setDueDate(
        issueDate.add(newSelectValueObj.value, newSelectValueObj.unit)
      );
    }
  };

  useEffect(() => {
    setForm({ ...form, issueDate: issueDate, dueDate: dueDate });
  }, [issueDate, dueDate]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="cs">
        <MobileDatePicker
          label="Datum vystavení"
          slotProps={{ textField: { variant: "filled" } }}
          format="DD.MM.YYYY"
          value={issueDate}
          onChange={handleIssueDateChange}
          className="swiper-no-swiping"
        />
        <div className="flex flex-row gap-4">
          <FormControl variant="filled" className="flex-1 swiper-no-swiping">
            <InputLabel id="due-select-label">Splatnost</InputLabel>
            <Select
              label="Splatnost"
              labelId="due-select-label"
              value={dueSelect}
              onChange={(event) => handleDueSelectChange(event.target.value)}
            >
              <MenuItem value={JSON.stringify({ value: 14, unit: "day" })}>
                14 dní
              </MenuItem>
              <MenuItem value={JSON.stringify({ value: 30, unit: "day" })}>
                30 dní
              </MenuItem>
              <MenuItem value={"custom-date"}>Vlastní datum</MenuItem>
            </Select>
          </FormControl>
          <MobileDatePicker
            label="Datum splatnosti"
            slotProps={{ textField: { variant: "filled" } }}
            format="DD.MM.YYYY"
            value={dueDate}
            onChange={handleDueDateChange}
            inputRef={dueDateRef}
            className="flex-1 swiper-no-swiping"
          />
        </div>
      </LocalizationProvider>
    </div>
  );
}
