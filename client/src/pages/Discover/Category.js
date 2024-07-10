import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

function Category({ categorys, filterCategory, setFilterCategory }) {
  const onChange = (event) => {
    const input = event.currentTarget;

    if (input.checked) {
      const state = [...filterCategory, input.value];
      setFilterCategory(state);
    } else {
      const state = filterCategory.filter((value) => value !== input.value);
      setFilterCategory(state);
    }
  };

  return (
    <Box
      sx={{
        height: "calc(300px - 60px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {categorys.map((category, idx) => (
          <Stack direction={"row"} spacing={1} sx={{ width: "100px" }}>
            <input
              type="checkbox"
              value={category}
              onChange={onChange}
              style={{ cursor: "pointer" }}
              id={idx}
            />
            <label
              htmlFor={idx}
              style={{ cursor: "pointer", fontSize: "14px", color: "#333" }}
            >
              {category}
            </label>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

export default Category;
