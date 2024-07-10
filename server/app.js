const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");

const cors = require("cors");

const { addUser, getUser, removeUser, getUserInRoom } = require("./ChatSocket");

const session = require("express-session");
const FileStore = require("session-file-store")(session);

const db = require("./models/index.js");
const { Op } = require("sequelize");

const GroupDocument = db.GroupDocuments;

const app = express();
// const server = http.createServer(app);

dotenv.config({ path: "./config.env" });

app.use(cookieParser("secretCode"));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

app.set("port", process.env.PORT || 8000);

let corsOptions = {
  origin: "*",
  methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
  credentials: true, //
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

const server = app.listen(app.get("port"), () => {
  console.log(`Example app listening on port ${app.get("port")}`);
});

const defaultValue = "";

async function findOrCreateDocument(id) {
  if (id == null) return;

  // DB에 id가 일치하는 문서 내용 가져오기
  const document = await GroupDocument.findOne({
    where: {
      studyId: { [Op.eq]: id },
    },
  });

  // DB에 id가 일치하는 문서가 있으면 값 리턴
  if (document) return document;

  // DB에 id가 일치하는 문서가 없으면, DB에 id 매개변수 방 만들어주기
  return await GroupDocument.create({
    studyId: id,
    data: defaultValue,
  });
}

// socket 연결 및 기능
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // 공동 문서 작업 socket
  socket.on("get-document", async (documentID) => {
    const document = await findOrCreateDocument(documentID);
    socket.join(documentID);
    socket.emit("load-document", document.data);

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentID).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      await GroupDocument.update(
        {
          data: data,
        },
        {
          where: {
            studyId: { [Op.eq]: documentID },
          },
        }
      );
    });
  });

  // 채팅 방 socket
  socket.on("join", ({ user, study }, callback) => {
    const { error, member } = addUser({ id: socket.id, user, study });

    // if (error) return callback(error);

    socket.join(member.study);

    // 방에 누군가 들어올 경우 "name 님이 room에 참가했습니다." 메세지
    // socket.emit("message", {
    //   user: "admin",
    //   text: `${member.user.name}, welcome to the room ${member.study.title}`,
    // });
    // // 채팅방에 있는 모든 사용자에게 누군가가 채팅방에 들어왔다는 것을 알리는 메세지
    // socket.broadcast.to(member.study.id).emit("message", {
    //   user: "admin",
    //   text: `${member.user.name}, has joined!`,
    // });

    io.to(member.study).emit("roomData", {
      room: member.study,
      users: getUserInRoom(member.study),
    });

    callback();
  });

  // 채팅 방 - 메세지 보냈을 경우
  socket.on("sendMessage", (data, callback) => {
    const member = getUser(socket.id);

    io.to(member.study).emit("message", data);

    io.to(member.study).emit("roomData", {
      room: member.study,
      users: getUserInRoom(member.study),
    });

    callback();
  });

  socket.on("leave", () => {
    removeUser(socket.id);
  });

  // 화상전화 연결 socket
  socket.on("calluser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("calluser", { signal: signalData, from, name });
  });

  socket.on("answercall", (data) => {
    io.to(data.to).emit("callaccepted", data.signal);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

// io.on("connection", (socket) => {
//   console.log("Connected to socket.io");

//   // socket.on("setup", (userData) => {
//   //   socket.join(userData.id);
//   //   console.log(socket.rooms);
//   //   socket.emit("connected");
//   // });

//   socket.on("join chat", (room) => {
//     socket.join(room);
//     socket.to(room).emit("Hello");
//   });

//   socket.on("new message", (newMessageRecived) => {
//     var study = newMessageRecived.study;

//     if (!study.studyGroupMember) return console.log("chat users not difined");

//     console.log(socket.rooms);

//     study.studyGroupMember.forEach((user) => {
//       if (user.id === newMessageRecived.sender.id) return;
//       socket.in(user.id).emit("message recieved", newMessageRecived);
//       // io.to(study.studyGroupId).emit("message recieved", newMessageRecived);
//       // socket.broadcast.to(user.id).emit("message recieved", newMessageRecived);
//     });
//   });
// });

// io.on("connection", (socket) => {

//   // 채팅 socket
//
// });
