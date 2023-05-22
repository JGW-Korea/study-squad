import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return <Link to={"/register"}>회원가입</Link>;
}

export default Home;
