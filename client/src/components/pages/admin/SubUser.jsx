import axios from "axios";
import React, { useState } from "react";

import classes from "./SubUser.module.css";

const SubUser = ({ detailUser, showDetail, setShowDetail, setReset }) => {
  const [auth, setAuth] = useState();

  const updateUserHandler = async (e) => {
    e.preventDefault();
    const sendAuth = parseInt(auth);

    if (auth === "no") {
      alert("권한을 선택해 주세요");
    } else if (sendAuth === detailUser.uAuth) {
      alert("권한이 같습니다.");
    } else {
      await axios
        .post("http://localhost:5000/admin/api/updateUser", {
          detailUser,
          sendAuth,
        })
        .then((response) => {
          if (response.data.status === 200) {
            alert(response.data.message);
            setReset((prev) => !prev);
          }
        });
    }
  };

  return (
    <div className={classes.subUser}>
      <h4 className={classes["subOrder-title"]}>회원 상세 조회</h4>

      <p className={classes["subOrder-content__title"]}>회원번호</p>
      <p className={classes["subOrder-content__data"]}>{detailUser.idx}</p>

      <p className={classes["subOrder-content__title"]}>아이디</p>
      <p className={classes["subOrder-content__data"]}>{detailUser.uId}</p>

      <p className={classes["subOrder-content__title"]}>이름</p>
      <p className={classes["subOrder-content__data"]}>{detailUser.uName}</p>

      <p className={classes["subOrder-content__title"]}>생년월일</p>
      <p className={classes["subOrder-content__data"]}>{detailUser.uBirth}</p>

      <p className={classes["subOrder-content__title"]}>전화번호</p>
      <p className={classes["subOrder-content__data"]}>{detailUser.uPhone}</p>

      <p className={classes["subOrder-content__title"]}>이메일</p>
      <p className={classes["subOrder-content__data"]}>{detailUser.uEmail}</p>

      <p className={classes["subOrder-content__title"]}>주소</p>
      <p className={classes["subOrder-content__data"]}>{detailUser.uZipcode}</p>
      <p className={classes["subOrder-content__data"]}>
        {detailUser.uAddress} {detailUser.uAdditionalAddr}
      </p>

      <p className={classes["subOrder-content__title"]}>포인트</p>
      <p className={classes["subOrder-content__data"]}>{detailUser.uMile}</p>

      <p className={classes["subOrder-content__title"]}>권한</p>
      <p className={classes["subOrder-content__data"]}>
        {showDetail && (
          <select
            defaultValue={detailUser.uAuth}
            onChange={(e) => {
              setAuth(e.target.value);
            }}
          >
            <option value="no">권한설정</option>
            <option value="0">탈퇴처리</option>
            <option value="1">일반회원</option>
            <option value="2">관리자</option>
          </select>
        )}
      </p>

      <p className={classes["subOrder-content__title"]}>가입날짜</p>
      <p className={classes["subOrder-content__data"]}>{detailUser.uRegdate}</p>
      {showDetail && (
        <div className={classes["user-view"]}>
          <button onClick={updateUserHandler}>수정</button>
        </div>
      )}
    </div>
  );
};

export default SubUser;
