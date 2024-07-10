import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Quill from "quill";
import "quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";

import Delta from "quill-delta";

import "./editor.css";
import {
  Stack,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

import { BsThreeDotsVertical, BsFiletypePdf, BsFileText } from "react-icons/bs";
import axios from "axios";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["link", "image", "video", "code-block"],
  ["clean"],
];

function Editor({ socket }) {
  const { id: documentId } = useParams();
  const [quill, setQuill] = useState();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Editor 변경된 내용 업데이트
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };

    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  // Editor 내용 변경 추척
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };

    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  // 기존 작성 document 불러오기
  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit("get-document", documentId);
  }, [socket, quill, documentId]);

  // Editor 저장
  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  // Editor 이미지 처리 핸들러
  useEffect(() => {
    if (socket == null || quill == null) return;

    const EditorImageHandler = () => {
      const input = document.createElement("input");

      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();

      input.addEventListener("change", async () => {
        const file = input.files[0];
        const formData = new FormData();
        formData.append("docImage", file);

        try {
          const result = await axios.post(
            "/api/study/rooms/editor/img",
            formData
          );

          const IMG_URL = `http://localhost:8000/${result.data.url}`;

          const range = quill.getSelection(true);

          quill.updateContents(
            new Delta()
              .retain(range.index)
              .delete(range.length)
              .insert({ image: IMG_URL }),
            "user"
          );
        } catch (error) {
          console.log(error);
        }
      });
    };

    quill.getModule("toolbar").addHandler("image", EditorImageHandler);
  }, [socket, quill]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper === null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    Quill.register("modules/imageResize", ImageResize);

    const qEditor = new Quill(editor, {
      modules: {
        toolbar: {
          container: TOOLBAR_OPTIONS,
        },
        imageResize: {
          parchment: Quill.import("parchment"),
          modules: ["Resize", "DisplaySize"],
        },
      },
      theme: "snow",
    });

    qEditor.disable();
    qEditor.setText("Loading...");

    setQuill(qEditor);
  }, []);

  // PDF 파일로 변환
  const convertToPdfFile = async () => {
    const html = quill.root.innerHTML;
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const images = doc.querySelectorAll("img");

    images.forEach(function (img) {
      img.style.width = "100%";
      img.style.height = "auto";
      img.style.maxWidth = "816px";
    });

    const serializer = new XMLSerializer();
    const updatedHtml = serializer.serializeToString(doc);

    axios({
      url: "/api/study/rooms/editor/convert/pdf",
      method: "POST",
      responseType: "blob", // 서버에서 받아온 데이터를 Blob 객체로 변환
      data: {
        html: updatedHtml,
      },
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.pdf"); // 파일명 지정
      document.body.appendChild(link);
      link.click();
    });
  };

  const convertToWordFile = () => {
    const html = quill.root.innerHTML;

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const images = doc.querySelectorAll("img");

    images.forEach(function (img) {
      img.style.width = "100%";
      img.style.height = "auto";
      img.style.maxWidth = "816px";
    });

    const serializer = new XMLSerializer();
    const updatedHtml = serializer.serializeToString(doc);

    axios({
      url: "/api/study/rooms/editor/convert/docx",
      method: "POST",
      responseType: "blob", // 서버에서 받아온 데이터를 Blob 객체로 변환
      data: {
        html: updatedHtml,
      },
    }).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.docx"); // 파일 이름을 지정합니다.
      document.body.appendChild(link);
      link.click();
    });
  };

  return (
    <Stack sx={{ height: "100%" }}>
      <Box
        p={2}
        sx={{ width: "100%", borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}
      >
        <Stack
          alignItems={"center"}
          direction={"row"}
          justifyContent={"space-between"}
          sx={{ width: "100%", height: "100%" }}
        >
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={0.5}
            sx={{ color: "#0162C4" }}
          >
            <Typography>문서 편집</Typography>
          </Stack>

          <Stack direction={"row"} alignItems={"center"} spacing={1.5}>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={(event) => setAnchorEl(event.currentTarget)}
            >
              <BsThreeDotsVertical size={20} />
            </IconButton>

            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              PaperProps={{ style: { width: "160px" } }}
            >
              <MenuItem onClick={convertToPdfFile}>
                <Stack
                  spacing={1}
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <BsFiletypePdf />
                  <Typography fontSize={14}>PDF 내보내기</Typography>
                </Stack>
              </MenuItem>
              <MenuItem onClick={convertToWordFile}>
                <Stack
                  spacing={1}
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <BsFileText />
                  <Typography fontSize={14}>Word 내보내기</Typography>
                </Stack>
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>
      </Box>

      <div className="container" ref={wrapperRef}></div>
    </Stack>
  );
}

export default Editor;
