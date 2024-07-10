import React from "react";

import { Stack } from "@mui/material";

import SloganImg from "./SloganImg";
import AccountFrom from "./AccountFrom";

function Slogan() {
  return (
    <Stack width={"100%"} height={"100vh"} direction={"row"}>
      <SloganImg />
      <AccountFrom />
    </Stack>
  );
}

export default Slogan;
