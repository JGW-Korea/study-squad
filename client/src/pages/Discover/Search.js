import React from "react";
import styled from "styled-components";

const SearchInput = styled.input`
  width: 280px;
  padding: 8px 15px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  outline: none;
  background-color: #f5f5f7;
  border-radius: 20px;
  font-size: 13px;
`;

function Search({ setSearch }) {
  return (
    <SearchInput
      type="text"
      placeholder="찾고자 하는 스터디 검색"
      onChange={(event) => setSearch(event.target.value)}
    />
  );
}

export default Search;
