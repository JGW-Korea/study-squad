import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";

import { BsArrowDownUp } from "react-icons/bs";

function Sort({ sort, setSort }) {
  const onArrowChange = () => {
    if (sort.order.toLowerCase() === "asc") {
      setSort({ sort: sort.sort, order: "desc" });
    } else {
      setSort({ sort: sort.sort, order: "asc" });
    }
  };

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={1}
      sx={{
        height: "60px",
        p: 1,
      }}
    >
      <Typography fontSize={13} color={"#333"}>
        정렬 :
      </Typography>

      <select
        defaultValue={sort.sort}
        onChange={(event) =>
          setSort({ sort: event.target.value, order: sort.order })
        }
        style={{
          width: "120px",
          height: "30px",
          backgroundColor: "#f5f5f7",
          border: "1px solid rgba(0, 0, 0, 0.05)",
          outline: "none",
          fontSize: "13px",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        <option value={"studyName"}>스터디 이름</option>
        <option value={"createdAt"}>스터디 생성 날짜</option>
        <option value={"studyGroupMember"}>스터디 멤버 수</option>
        <option value={"studyGroupLimitedMember"}>스터디 인원 제한</option>
      </select>

      <Tooltip
        title={
          sort.order.toLowerCase() === "asc" ? "내림차순 변경" : "오름차순 변경"
        }
        placement="bottom"
        arrow
      >
        <button
          style={{
            width: "30px",
            height: "30px",
            border: "1px solid rgba(0, 0, 0, 0.05)",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={onArrowChange}
        >
          <BsArrowDownUp size={12} />
        </button>
      </Tooltip>
    </Stack>
  );
}

export default Sort;
