const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");

const app = express();

app.set("port", process.env.PORT || 8000);

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require("./routes"));

app.get("/api/hello", (req, res) => {
  res.send("hello");
});

app.listen(app.get("port"), () => {
  console.log(`Example app listening on port ${app.get("port")}`);
});
