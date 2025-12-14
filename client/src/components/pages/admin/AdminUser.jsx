/* eslint-disable */
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Pagination from "react-js-pagination";

import classes from "./AdminUser.module.css";

const User = ({
  userList,
  setReset,
  setDetailUser,
  showDetail,
  setShowDetail,
}) => {
  const [currentPage, setCurrntPage] = useState(1); // 현재페이지
  const [indexOfLastQnA, setIndexOfLastQnA] = useState(0);
  const [indexOfFirstQnA, setIndexOfFirstQnA] = useState(0);
  // const perPage = 10;
  const [perPage, setPerPage] = useState(10);

  const [userView, setUserView] = useState(false);
  useEffect(() => {
    setIndexOfLastQnA(currentPage * perPage);
    setIndexOfFirstQnA(indexOfLastQnA - perPage);
  }, [currentPage, indexOfFirstQnA, indexOfLastQnA, perPage]);

  const userOut = async (uId) => {
    await axios
      .post("http://localhost:5000/admin/api/userOut", { uId })
      .then((response) => {
        alert(response.data);
        setReset((prev) => !prev);
      });
  };

  return (
    <React.Fragment>
      <div className={classes.adminUser}>
        {/* <AdminContentTitle title={"고객관리"} /> */}
        <div className={classes["adminUser-wrap"]}>
          <h3 className={classes["adminUser-title"]}>고객관리</h3>
          <span
            className={classes["adminUser-list"]}
          >{`총 회원 수 : ${userList.length}명`}</span>
        </div>

        <table className={classes["adminUser-userList"]}>
          <thead>
            <tr>
              <td>No.</td>
              <td>아이디</td>
              <td>이름</td>
              <td>이메일</td>
              <td>생년월일</td>
              <td>가입날짜</td>
              <td>권한</td>
              <td>관리</td>
            </tr>
          </thead>
          <tbody>
            {userList.slice(indexOfFirstQnA, indexOfLastQnA).map((it, key) => (
              <tr key={key}>
                <td>{it.idx}</td>
                <td>
                  <button
                    className={classes["user-view"]}
                    onClick={() => (setDetailUser(it), setShowDetail(true))}
                  >
                    {it.uId}
                  </button>
                </td>
                <td>{it.uName}</td>
                <td>{it.uEmail}</td>
                <td>{it.uBirth}</td>
                <td>{it.uRegdate}</td>
                <td>{it.uAuth}</td>
                <td>
                  <button
                    className={classes["adminUser-userList-search"]}
                    onClick={() => userOut(it.uId)}
                  >
                    탈퇴처리
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {userList.length !== 0 && (
          <div>
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={perPage}
              totalItemsCount={userList.length}
              pageRangeDisplayed={5}
              prevPageText={"<"}
              nextPageText={">"}
              onChange={setCurrntPage}
            />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default User;
