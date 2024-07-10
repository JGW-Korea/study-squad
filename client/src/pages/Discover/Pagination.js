import { Stack } from "@mui/material";
import React from "react";

import styled from "styled-components";

const StyledBtn = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  background-color: ${(props) =>
    props.activate ? "rgb(27, 117, 210)" : "#fff"};
  color: ${(props) => (props.activate ? "#fff" : "rgba(0, 0, 0, 0.54)")};
  cursor: pointer;
  font-size: 15px;
  margin: 0 10px;
`;

function Pagination({ page, total, limit, setPage }) {
  const totalPages = Math.ceil(total / limit);

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ height: "60px", p: 2 }}
    >
      {totalPages > 0 &&
        [...Array(totalPages)].map((_, idx) => (
          <StyledBtn
            onClick={() => setPage(idx + 1)}
            activate={page === idx + 1}
          >
            {idx + 1}
          </StyledBtn>
        ))}
    </Stack>
  );
}

export default Pagination;
