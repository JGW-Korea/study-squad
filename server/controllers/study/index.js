const express = require("express");
const router = express.Router();

const StudyCreate = require("./create/create.js");
const StudyRoomsEditor = require("./rooms/editor/editor.js");
const StudyInfo = require("./info/info.js");
const StudyInfoUpdate = require("./info/update.js");

const Message = require("./rooms/chat/message.js");

const StudyChat = require("./rooms/chat/chat.js");

const Join = require("./rooms/join/join.js");

const State = require("./state/state.js");

router.use("/create", StudyCreate);
router.use("/rooms/editor", StudyRoomsEditor);
router.use("/rooms/chat", StudyChat);
router.use("/rooms/message", Message);
router.use("/info", StudyInfo);
router.use("/info/update", StudyInfoUpdate);
router.use("/join", Join);
router.use("/state", State);

module.exports = router;
