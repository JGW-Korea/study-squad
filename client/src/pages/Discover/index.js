import { Stack, Box, Paper, Typography, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";

import axios from "axios";
import Search from "./Search";
import StudyTable from "./StudyTable";
import Pagination from "./Pagination";
import Sort from "./Sort";
import Category from "./Category";

function Discover() {
  const [obj, setObj] = useState({});
  const [sort, setSort] = useState({ sort: "studyName", order: "ASC" });
  const [filterCategory, setFilterCategory] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getAllStudy = async () => {
      try {
        const url = `/api/study/info/search?page=${page}&sort=${sort.sort},${
          sort.order
        }&category=${filterCategory.toString()}&search=${search}`;

        const { data } = await axios.get(url);

        setObj(data);

        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllStudy();
  }, [sort, filterCategory, page, search]);

  return (
    <Stack
      alignItems={"center"}
      sx={{
        width: "100%",
        height: "100vh",
        paddingTop: "50px",
        backgroundColor: "#f5f5f7",
      }}
    >
      <Stack
        direction={"row"}
        spacing={2}
        sx={{ width: "1080px", height: "100%", padding: "16px 0" }}
      >
        {/* Filter */}
        <Paper
          sx={{
            width: "220px",
            height: "300px",
            borderRadius: "0",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Sort sort={sort} setSort={setSort} />

          <Divider />

          <Category
            categorys={obj.category ? obj.category : []}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
          />
        </Paper>

        {/* Study Table */}
        <Box
          sx={{
            width: "calc(100% - 236px)",
            height: "fit-content",
            backgroundColor: "#fff",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
          }}
        >
          {/* Head */}
          <Box
            p={2}
            sx={{
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography fontSize={"16px"} fontWeight={500}>
              스터디 정보
            </Typography>

            <Search setSearch={setSearch} />
          </Box>

          <Divider />

          {/* Content */}
          <Box
            sx={{
              height: "595px",
              display: "flex",
            }}
          >
            <StudyTable studys={obj.study ? obj.study : []} />
          </Box>

          <Divider />

          <Pagination
            page={page}
            total={obj.total ? obj.total : 0}
            limit={obj.limit ? obj.limit : 0}
            setPage={setPage}
          />
        </Box>
      </Stack>
    </Stack>
  );
}

export default Discover;
