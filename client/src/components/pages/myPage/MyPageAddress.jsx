import React, { useEffect, useState } from "react";
import axios from "axios";
import MyPageAddressAdd from "./MyPageAddressAdd";
import MyPageAddressItem from "./MyPageAddressItem";
import MyPageListTitle from "./MyPageListTitle";
import MyPageNullMsg from "./MyPageNullMsg";

import { getUser } from "../../../util/getUser";
import { authCheck } from "../../../util/authCheck";

import classes from "./MyPageAddress.module.css";

import Pagination from "react-js-pagination";
import DefaultAddr from "./DefaultAddr";
const MyPageAddress = () => {
  const [user, setUser] = useState({}); //유저 정보 받아오는 곳

  const [addUser, setAddUser] = useState([]); // 추가 된 주소 저장
  const [reset, setReset] = useState(false);

  const [addAddress, setAddAddress] = useState(false);

  const [currentPage, setCurrntPage] = useState(1); // 현재페이지
  const [indexOfLastQnA, setIndexOfLastQnA] = useState(0);
  const [indexOfFirstQnA, setIndexOfFirstQnA] = useState(0);
  const [perPage, setPerPage] = useState(3);

  const [choicedefault, setChoiceDefault] = useState(false);

  const [updateState, setUpdateSate] = useState(false);

  const [targetNum, setTargetNum] = useState("");

  useEffect(() => {
    authCheck();
    getUser(setUser);
    const addlist = async () => {
      await axios
        .get(
          "http://localhost:5000/mypage/api/addlist",

          {
            withCredentials: true,
          }
        )
        .then((listRes) => {
          if (listRes.data.status === 200) {
            setAddUser(listRes.data.user);
          }
        });
    };

    addlist();
    setIndexOfLastQnA(currentPage * perPage);
    setIndexOfFirstQnA(indexOfLastQnA - perPage);
  }, [reset, currentPage, indexOfFirstQnA, indexOfLastQnA, perPage]);

  const getNum = (e) => {
    setUpdateSate(true);
    setTargetNum(e.target.name);
  };

  return (
    <React.Fragment>
      <div className={classes.MyPageAddress}>
        {addAddress === false && (
          <>
            <div>
              <MyPageListTitle text={"기본 배송지"} />
            </div>
            <DefaultAddr user={addUser} choicedefault={choicedefault} />
            <div className={classes["default-addr"]}>
              <div>
                <MyPageListTitle text={"배송지 관리"} />
              </div>
              <div className={classes["select-wrap"]}>
                <label>표시할 게시물</label>
                <select
                  // type={Number}
                  value={perPage}
                  onChange={({ target: { value } }) => {
                    setPerPage(Number(value));
                    setCurrntPage(1);
                  }}
                >
                  <option value="1">1개씩 보기</option>
                  <option value="3">3개씩 보기</option>
                </select>
              </div>
            </div>
          </>
        )}

        {addAddress === true ? (
          <MyPageAddressAdd
            user={user}
            addAddress={addAddress}
            setAddAddress={setAddAddress}
            reset={reset}
            setReset={setReset}
          />
        ) : (
          <div>
            {addUser.length === 0 && (
              <MyPageNullMsg
                className={classes["address-content-null"]}
                text={"등록된 주소가 없습니다."}
              />
            )}

            {addUser.slice(indexOfFirstQnA, indexOfLastQnA).map((user, idx) => (
              <div className={classes["addr-wrap-item"]} key={idx}>
                <MyPageAddressItem
                  addUser={user}
                  getNum={getNum}
                  targetNum={targetNum}
                  setTargetNum={setTargetNum}
                  setUpdateSate={setUpdateSate}
                  choicedefault={choicedefault}
                  setChoiceDefault={setChoiceDefault}
                />
              </div>
            ))}
          </div>
        )}
        <div className={classes["address-wrap-content"]}></div>
        <div className={classes["address-wrap-button"]}>
          {addAddress === false && updateState === false ? (
            <button type="button" onClick={() => setAddAddress(true)}>
              추가하기
            </button>
          ) : (
            <></>
          )}
        </div>

        {addUser.length != 0 && (
          <div>
            <Pagination
              activePage={currentPage} // 현재 페이지
              itemsCountPerPage={perPage} // 한페이지당 보여줄 아이템 갯수
              totalItemsCount={addUser.length} // 총 아이템 갯수
              pageRangeDisplayed={5} // 페이지네이터 내에서 보여줄 페이지 범위
              prevPageText={"<"}
              nextPageText={">"}
              onChange={setCurrntPage} // 페이지가 바뀔때 핸들링해주는 함수
            />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default MyPageAddress;
