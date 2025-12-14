import React, { useState, useEffect } from "react";
import axios from "axios";
import MyPageListForm from "./MyPageListForm";
import MyPageListTitle from "./MyPageListTitle";
import MyPageNullMsg from "./MyPageNullMsg";

import classes from "./MyPointCheck.module.css";

import { getUser } from "../../../util/getUser";
import { authCheck } from "../../../util/authCheck";
import Pagination from "react-js-pagination";

const MyPointCheck = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [startDate, setStartDate] = useState("1");
  const [endDate, setEndDate] = useState("1");

  const [pointList, setPointList] = useState([]);
  const [searchPoint, setSearchPoint] = useState([]);

  const [user, setUser] = useState({});

  const [currentPage, setCurrntPage] = useState(1); // 현재페이지
  const [indexOfLastQnA, setIndexOfLastQnA] = useState(0);
  const [indexOfFirstQnA, setIndexOfFirstQnA] = useState(0);
  const [perPage, setPerPage] = useState(5);

  const mile = parseInt(user.uMile);
  const pointCheck = true;

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:5000/mypage/api/pointlist", {
          withCredentials: true,
        })
        .then((response) => {
          setPointList(response.data.data);
        });
    };
    fetchData();
    authCheck();
    getUser(setUser);
    setIndexOfLastQnA(currentPage * perPage);
    setIndexOfFirstQnA(indexOfLastQnA - perPage);
  }, [currentPage, indexOfFirstQnA, indexOfLastQnA, perPage]);

  const searchDate = async (e) => {
    const uId = pointList[0].uId;
    let startReplace = parseInt(startDate.replace(/-/g, ""));
    let endReplace = parseInt(endDate.replace(/-/g, ""));
    e.preventDefault();

    if (startReplace === 1 || endReplace === 1) {
      alert("날짜를 선택해 주세요");
    } else if (startReplace > endReplace) {
      alert("시작일이 종료일 보다 뒤에 있습니다.");
    } else {
      setShowSearch(true);
      await axios
        .post("http://localhost:5000/mypage/api/searchpoint", {
          startDate,
          endDate,
          uId,
        })
        .then((response) => {
          setSearchPoint(response.data.result);
        });
    }
  };

  return (
    <React.Fragment>
      <div className={classes.MyPointCheck}>
        <MyPageListTitle text={"포인트 내역 확인"} />
        <div className={classes["check-content-wrap"]}>
          <div className={classes["check-content-item"]}>
            <div>나의 포인트</div>
            <div>
              <span>{mile === "NaN" ? 0 : mile.toLocaleString("ko-kr")}</span>원
            </div>
          </div>
          <div className={classes["check-content-item"]}>
            <div>나의 쿠폰</div>
            <div>
              <span>12</span>장
            </div>
          </div>
        </div>
        <div className={classes["point-check-date"]}>
          <MyPageListTitle text={"적립 및 사용내역 보기"} />
          <form onSubmit={searchDate}>
            <div className={classes["check-wrap-date"]}>
              <div className={classes["check-date-item"]}>
                <div>
                  <input
                    type="date"
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <span className={classes["check-date-item__span"]}>~</span>

                <div>
                  <input
                    type="date"
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>

                <button
                  className={classes["check-date-button"]}
                  type="submit"
                  disabled={pointList.length === 0}
                >
                  검색
                </button>
              </div>

              <div className={classes["select-wrap"]}>
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
                  <option value="5">5개씩 보기</option>
                  <option value="10">10개씩 보기</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        {showSearch === false && (
          <>
            {pointList.length === 0 && (
              <MyPageNullMsg
                className={classes["pointcheck-content-null"]}
                text={"적립 내역이 없습니다."}
              />
            )}
            {pointList
              .slice(indexOfFirstQnA, indexOfLastQnA)
              .map((item, key) => {
                return (
                  <MyPageListForm
                    props={item}
                    title={"내역"}
                    key={key}
                    pointCheck={pointCheck}
                  />
                );
              })}
            {pointList.length !== 0 && (
              <div>
                <Pagination
                  activePage={currentPage} // 현재 페이지
                  itemsCountPerPage={perPage} // 한페이지당 보여줄 아이템 갯수
                  totalItemsCount={pointList.length} // 총 아이템 갯수
                  pageRangeDisplayed={5} // 페이지네이터 내에서 보여줄 페이지 범위
                  prevPageText={"<"}
                  nextPageText={">"}
                  onChange={setCurrntPage} // 페이지가 바뀔때 핸들링해주는 함수
                />
              </div>
            )}
          </>
        )}

        {showSearch === true && (
          <>
            {searchPoint.length === 0 && (
              <MyPageNullMsg
                className={classes["pointcheck-content-null"]}
                text={"검색 내역이 없습니다."}
              />
            )}
          </>
        )}
        {searchPoint.slice(indexOfFirstQnA, indexOfLastQnA).map((item, key) => {
          return (
            <MyPageListForm
              props={item}
              title={"내역"}
              key={key}
              pointCheck={pointCheck}
            />
          );
        })}
        {searchPoint.length !== 0 && (
          <div>
            <Pagination
              activePage={currentPage} // 현재 페이지
              itemsCountPerPage={perPage} // 한페이지당 보여줄 아이템 갯수
              totalItemsCount={searchPoint.length} // 총 아이템 갯수
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

export default MyPointCheck;
