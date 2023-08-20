import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import {
  studyGroupBannerUpload,
  studyGroupCreate,
} from "../../../_actions/study/study_actions";

function StudyCreate() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [studyGroupName, setStudyGroupName] = useState("");
  const [disclosureCheck, setDisclosureCheck] = useState("private");

  const [imagePrivewSrc, setImagePrivewSrc] = useState("");
  const [imageInfoFile, setImageInfoFile] = useState("");

  const onStudyGroupNameChange = (event) => {
    setStudyGroupName(event.target.value);
  };

  const handlerImagePrivew = (event) => {
    const file = event.target.files[0];

    setImageInfoFile(event.target.files[0]);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrivewSrc(reader.result);
    };
  };

  const onDisclosureCheckHandler = (event) => {
    setDisclosureCheck(event.target.value);
  };

  const onStudyCreatedSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      bannerImageFile: imageInfoFile,
    };

    dispatch(studyGroupBannerUpload(body)).then((res) => {
      if (res.payload.BannerUpdateSuccess) {
        let body = {
          bannerPath: res.payload.url,
          title: studyGroupName,
          category: params.category,
          disclosure: disclosureCheck,
        };

        dispatch(studyGroupCreate(body)).then((res) => {
          if (res.payload.studyGroupCreate) {
            alert("스터디를 생성하셨습니다!! ");
            navigation("/");
          } else {
            alert(res.payload.message);
          }
        });
      }
    });
  };

  return (
    <form onSubmit={onStudyCreatedSubmitHandler}>
      {/* 상단 */}
      <div>
        <span>스터디 이름</span>
        <input
          type="text"
          value={studyGroupName}
          onChange={onStudyGroupNameChange}
        />
      </div>

      {/* 중간 */}
      <div>
        {/* 스터디 이름 선택 */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <img
            src={imagePrivewSrc ? imagePrivewSrc : null}
            style={{
              width: "300px",
              height: "300px",
              border: "1px solid black",
            }}
            alt="스터디 배너 사진"
          />
          <span>스터디 이름과 사진은 개설 후에도 변경할 수 있어요</span>
        </div>

        {/* 스터디 배너 선택 */}
        <div>
          <div>
            <div>
              <span>커버 선택</span>
            </div>
            <div></div>
          </div>
          <div>
            <div>
              <input
                type="file"
                accept="image/*"
                id="addPhoto"
                onChange={handlerImagePrivew}
              />
              <label htmlFor="addPhoto">사진 추가</label>
            </div>
          </div>
          <div></div>
        </div>
      </div>

      {/* 스터디 공개 여부 */}
      <div>
        <div>
          <input
            type="radio"
            name="Disclosure"
            value="private"
            onChange={onDisclosureCheckHandler}
            defaultChecked
          />
          <span>비공개 스터디</span>
        </div>
        <div>
          <input
            type="radio"
            name="Disclosure"
            value="public"
            onChange={onDisclosureCheckHandler}
          />
          <span>스터디명 공개 스터디</span>
        </div>
        <div>
          <input
            type="radio"
            name="Disclosure"
            value="partial disclosure"
            onChange={onDisclosureCheckHandler}
          />
          <span>공개 스터디</span>
        </div>
      </div>

      {/* 생성 또는 취소 */}
      <div>
        <Link to={"/study-create"}>취소</Link>
        <button>확인</button>
      </div>
    </form>
  );
}

export default StudyCreate;
