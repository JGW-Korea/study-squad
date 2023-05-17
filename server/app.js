const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 4000;

app.get("/", (req, res) => {
  res.send("HWorld!");
});

app.get("/api/hello", (req, res) => {
  res.send("안녕하세요");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
