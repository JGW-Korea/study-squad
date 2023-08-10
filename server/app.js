const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");

const cors = require("cors");

const session = require("express-session");
const FileStore = require("session-file-store")(session);

const app = express();
dotenv.config();

app.use(cookieParser("secretCode"));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

app.set("port", process.env.PORT || 8000);

let corsOptions = {
  origin: "http://localhost:3000/",
  credentials: true,
};

app.use(cors(corsOptions));

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    name: "session ID",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new FileStore(),
    cookie: {
      maxAge: 24 * 60 * 60 * 10000,
      httpOnly: false,
      secure: false,
    },
  })
);

app.use(require("./routes"));

app.get("/api/cookie", (req, res) => {
  res.cookie("testCookie", "cookieValue");
  res.status(200).json("cookie provides");
});

app.use("/", (req, res, next) => {
  try {
    if (req.session.views) {
      req.session.views++;
    } else {
      req.session.views = 1;
    }
    console.log("sessino info: ", req.session);
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.get("/api/session", (req, res) => {
  const data = req.session;
  res.json({
    data: data,
  });
});

app.use("/uploads", express.static("uploads"));

app.listen(app.get("port"), () => {
  console.log(`Example app listening on port ${app.get("port")}`);
});
