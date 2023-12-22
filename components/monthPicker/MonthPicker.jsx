import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { months } from "@/utils";

export default function MonthPicker({ month, setMonth }) {
  const handleChange = (event) => {
    setMonth(months.indexOf(event.target.value));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Month</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={months[month]}
          label="Age"
          onChange={handleChange}
        >
          {months.map((month, i) => (
            <MenuItem key={i} id={i} value={months[i]}>{months[i]}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
