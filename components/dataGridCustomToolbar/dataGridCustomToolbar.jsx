"use client";
import { Search } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment } from "@mui/material";

import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

import { MonthPicker } from "@/components";

const dataGridCustomToolbar = ({
  searchText,
  setSearchText,
  setSearch,
  month,
  setMonth,
}) => {
  return (
    <GridToolbarContainer>
      <div className="flex justify-between min-w-full">
        <div className="flex justify-between">
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </div>
        <div className="flex flex-row">
          <MonthPicker month={month} setMonth={setMonth} />
          <TextField
            label="Search..."
            sx={{ mb: "0.5rem", width: "15rem" }}
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setSearch(searchText);
                    }}
                  >
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
    </GridToolbarContainer>
  );
};

export default dataGridCustomToolbar;
