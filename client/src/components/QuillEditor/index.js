// import React, { useCallback, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import "./editor.css";

// import Quill from "quill";

// import ImageResize from "quill-image-resize-module-react";

// import "quill/dist/quill.snow.css";

// import { io } from "socket.io-client";

// import htmlDocx from "html-docx-js/dist/html-docx";
// import html2pdf from "html2pdf.js";

// const TOOLBAR_OPTIONS = [
//   [{ header: [1, 2, 3, 4, 5, 6, false] }],
//   [{ list: "ordered" }, { list: "bullet" }],
//   ["bold", "italic", "underline"],
//   [{ color: [] }, { background: [] }],
//   [{ script: "sub" }, { script: "super" }],
//   [{ align: [] }],
//   ["link", "image", "video", "code-block"],
//   ["clean"],
// ];

// function QuillEditor() {
//   const { id: documentId } = useParams();
//   const [socket, setSocket] = useState();
//   const [quill, setQuill] = useState();

//   // socket 연결
//   useEffect(() => {
//     const s = io("http://localhost:8000");
//     setSocket(s);

//     return () => {
//       s.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     if (socket == null || quill == null) return;

//     const handler = (delta) => {
//       quill.updateContents(delta);
//     };

//     socket.on("receive-changes", handler);

//     return () => {
//       socket.off("receive-changes", handler);
//     };
//   }, [socket, quill]);

//   useEffect(() => {
//     if (socket == null || quill == null) return;

//     const handler = (delta, oldDelta, source) => {
//       if (source !== "user") return;
//       socket.emit("send-changes", delta);
//     };

//     quill.on("text-change", handler);

//     return () => {
//       quill.off("text-change", handler);
//     };
//   }, [socket, quill]);

//   // 기존 작성 document 불러오기
//   useEffect(() => {
//     if (socket == null || quill == null) return;

//     socket.once("load-document", (document) => {
//       quill.setContents(document);
//       quill.enable();
//     });

//     socket.emit("get-document", documentId);
//   }, [socket, quill, documentId]);

//   // Editor 저장
//   useEffect(() => {
//     if (socket == null || quill == null) return;

//     const interval = setInterval(() => {
//       socket.emit("save-document", quill.getContents());
//     }, 2000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, [socket, quill]);

//   const wrapperRef = useCallback((wrapper) => {
//     if (wrapper === null) return;

//     wrapper.innerHTML = "";
//     const editor = document.createElement("div");
//     wrapper.append(editor);
//     Quill.register("modules/imageResize", ImageResize);

//     const qEditor = new Quill(editor, {
//       modules: {
//         toolbar: TOOLBAR_OPTIONS,
//         imageResize: {
//           parchment: Quill.import("parchment"),
//           modules: ["Resize", "DisplaySize"],
//         },
//       },
//       theme: "snow",
//     });

//     qEditor.disable();
//     qEditor.setText("Loading...");

//     setQuill(qEditor);
//   }, []);

//   const onPDFClick = () => {
//     const html = quill.root.innerHTML;

//     const parser = new DOMParser();
//     const doc = parser.parseFromString(html, "text/html");

//     const images = doc.querySelectorAll("img");

//     images.forEach(function (img) {
//       img.style.width = "100%";
//       img.style.height = "auto";
//       img.style.maxWidth = "816px";
//     });

//     const serializer = new XMLSerializer();
//     const updatedHtml = serializer.serializeToString(doc);

//     // HTML -> PDF 파일 변환
//     const opt = {
//       margin: 1,
//       filename: "myfile.pdf",
//       image: { type: "jpeg", quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
//     };

//     html2pdf().set(opt).from(updatedHtml).save();
//   };

//   const onClick = async () => {
//     const html = quill.root.innerHTML;

//     const parser = new DOMParser();
//     const doc = parser.parseFromString(html, "text/html");

//     const images = doc.querySelectorAll("img");

//     for (let img of images) {
//       const canvas = document.createElement("canvas");
//       const ctx = canvas.getContext("2d");
//       const imageElement = new Image();
//       imageElement.src = img.src;
//       await new Promise((resolve) => (imageElement.onload = resolve));
//       const maxWidth = 816; // 최대 너비 설정
//       const scaleFactor = maxWidth / imageElement.width; // 스케일 팩터 계산
//       canvas.width = maxWidth;
//       canvas.height = imageElement.height * scaleFactor;
//       ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
//       img.src = canvas.toDataURL(); // 이미지의 src를 새로운 데이터 URL로 설정
//     }

//     const serializer = new XMLSerializer();
//     const updatedHtml = serializer.serializeToString(doc);

//     // HTML -> DOCX 파일 변환
//     const converted = htmlDocx.asBlob(updatedHtml);

//     const url = URL.createObjectURL(converted);

//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "document.docx";
//     link.click();
//   };

//   return (
//     <div>
//       <div>
//         <button onClick={onClick}>docx 저장</button>
//         <button onClick={onPDFClick}>PDF 저장</button>
//       </div>
//       <div className="container" ref={wrapperRef}></div>
//     </div>
//   );
// }

// export default QuillEditor;
