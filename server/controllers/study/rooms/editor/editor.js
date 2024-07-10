const express = require("express");
const router = express.Router();

const multer = require("multer");
const puppeteer = require("puppeteer");
const htmlToDocx = require("html-to-docx");

const path = require("path");

const fs = require("fs");

try {
  fs.readdirSync("uploads/studyDocImage");
} catch (error) {
  console.log("uploads/studyDocImage 폴더가 없습니다. 폴더를 생성합니다.");
  fs.mkdirSync("uploads/studyDocImage");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/studyDocImage");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // 파일의 확장자
    const basename = path.basename(file.originalname, ext); // 확장자를 제외한 파일의 기본 이름

    const encodedName = encodeURIComponent(basename);

    cb(null, `${encodedName}${Date.now()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post("/img", upload.single("docImage"), async (req, res) => {
  return res.json({
    url: req.file.path,
    fileName: req.file.filename,
  });
});

const printPDF = async (html) => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setContent(html);
  await page.emulateMediaType("screen");
  const pdf = await page.pdf({
    format: "A4",
    margin: {
      top: "1in",
      right: "1in",
      bottom: "1in",
      left: "1in",
    },
  });

  await browser.close();
  return pdf;
};

router.post("/convert/pdf", async (req, res) => {
  const { html } = req.body;

  const pdf = await printPDF(html);

  // PDF를 클라이언트에게 전송
  res.set({ "Content-Type": "application/pdf", "Content-Length": pdf.length });
  res.send(pdf);
});

router.post("/convert/docx", async (req, res) => {
  const { html } = req.body;

  const buffer = await htmlToDocx(html);

  res.writeHead(200, {
    "Content-Type":
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "Content-Disposition": "attachment; filename=download.docx",
    "Content-Length": buffer.length,
  });
  res.end(buffer);
});

module.exports = router;
