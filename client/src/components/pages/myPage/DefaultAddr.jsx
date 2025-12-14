import axios from "axios";

import React, { useState, useEffect } from "react";

import classes from "./DefaultAddr.module.css";

const DefaultAddr = ({ choicedefault }) => {
  const [defaultData, setDefaultData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:5000/mypage/api/defaultadd", {
          withCredentials: true,
        })
        .then((response) => {
          setDefaultData(response.data.result);
        });
    };
    fetchData();
  }, [choicedefault]);

  return (
    <React.Fragment>
      <div className={classes["default-wrap"]}>
        <div className={classes["default-item"]}>
          <div>
            <h2>이름</h2>
          </div>
          <span>{defaultData.dName}</span>
        </div>

        <div className={classes["default-item"]}>
          <div>
            <h2>우편번호</h2>
          </div>
          <span>{defaultData.dZipcode}</span>
        </div>

        <div className={classes["default-item"]}>
          <div>
            <h2>주소</h2>
          </div>
          <span>{`${defaultData.dAddr}  ${defaultData.dAdditionalAddr}`}</span>
        </div>

        <div className={classes["default-item"]}>
          <div>
            <h2>전화번호</h2>
          </div>
          <span>{defaultData.dPhone}</span>
        </div>

        <div className={classes["default-item"]}>
          <div>
            <h2>요청사항</h2>
          </div>
          <span>{defaultData.dMemo}</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DefaultAddr;
