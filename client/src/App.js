import React, { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    axios.get("/api/hello").then((res) => console.log(res.data));
  }, []);

  return (
    <div>
      <h2>hello</h2>
    </div>
  );
}

export default App;
