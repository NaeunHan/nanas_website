import React, { useEffect } from "react";
import { useState } from "react";
import Pagination from "react-js-pagination";
import { authCheck } from "../../../util/authCheck";
import { getBoard } from "../../../util/getBoard";
import { getUser } from "../../../util/getUser";
import MyPageListForm from "./MyPageListForm";
import MyPageListTitle from "./MyPageListTitle";
import MyPageNullMsg from "./MyPageNullMsg";

import classes from "./ReviewList.module.css";
const ReviewList = () => {
  const [boardData, setBoarData] = useState([]);
  const [user, setUser] = useState({});

  const [currentPage, setCurrntPage] = useState(1); // 현재페이지
  const [indexOfLastQnA, setIndexOfLastQnA] = useState(0);
  const [indexOfFirstQnA, setIndexOfFirstQnA] = useState(0);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    authCheck();
    getUser(setUser);
    getBoard(setBoarData);
    setIndexOfLastQnA(currentPage * perPage);
    setIndexOfFirstQnA(indexOfLastQnA - perPage);
  }, [currentPage, indexOfFirstQnA, indexOfLastQnA, perPage]);

  const getInfo = boardData.filter((it) => it.bBoardtype === "리뷰");
  return (
    <React.Fragment>
      <div className={classes.ReviewList}>
        <div className={classes["reviewList-title"]}>
          <MyPageListTitle text={"리뷰"} />

          <select
            className={classes["select-wrap"]}
            value={perPage}
            onChange={({ target: { value } }) => setPerPage(Number(value))}
          >
            <option value="1">1개씩 보기</option>
            <option value="3">3개씩 보기</option>
            <option value="5">5개씩 보기</option>
            <option value="10">10개씩 보기</option>
          </select>
        </div>

        <div className={classes["review-list-wrap-table"]}>
          {getInfo.length === 0 && (
            <MyPageNullMsg
              className={classes["review-content-null"]}
              text={"작성한 리뷰가 없어요."}
            />
          )}
          {getInfo.slice(indexOfFirstQnA, indexOfLastQnA).map((item, key) => {
            return <MyPageListForm key={key} props={item} title={"상품명"} />;
          })}
        </div>

        {getInfo.length != 0 && (
          <div>
            <Pagination
              activePage={currentPage} // 현재 페이지
              itemsCountPerPage={perPage} // 한페이지당 보여줄 아이템 갯수
              totalItemsCount={getInfo.length} // 총 아이템 갯수
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

export default ReviewList;
