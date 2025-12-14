import React, { useEffect, useState } from "react";
import MyPageListTitle from "./MyPageListTitle";
import MyPageListForm from "./MyPageListForm";

import classes from "./MyPageInquiryList.module.css";
import MyPageNullMsg from "./MyPageNullMsg";
import { authCheck } from "../../../util/authCheck";
import { getBoard } from "../../../util/getBoard";
import Pagination from "react-js-pagination";

const MyPageInquiryList = () => {
  const [boardData, setBoarData] = useState([]);

  const [currentPage, setCurrntPage] = useState(1); // 현재페이지
  const [indexOfLastQnA, setIndexOfLastQnA] = useState(0);
  const [indexOfFirstQnA, setIndexOfFirstQnA] = useState(0);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    authCheck();
    getBoard(setBoarData);
    setIndexOfLastQnA(currentPage * perPage);
    setIndexOfFirstQnA(indexOfLastQnA - perPage);
  }, [currentPage, indexOfFirstQnA, indexOfLastQnA, perPage]);

  const getInfo = boardData.filter(
    (it) =>
      it.bBoardtype === "교환/환불문의" ||
      it.bBoardtype === "배송문의" ||
      it.bBoardtype === "상품문의" ||
      it.bBoardtype === "교환" ||
      it.bBoardtype === "취소" ||
      it.bBoardtype === "반품" ||
      it.bBoardtype === "환불"
  );

  return (
    <React.Fragment>
      <div className={classes.MyPageInquiryList}>
        <div className={classes["inquiryList-title"]}>
          <MyPageListTitle text={"문의내역"} />

          <select
            className={classes["select-wrap"]}
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

        <div className={classes["inquiry-list-wrap-table"]}>
          {getInfo.length === 0 && (
            <MyPageNullMsg
              className={classes["inquirylist-content-null"]}
              text={"문의 내역이 없습니다."}
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

export default MyPageInquiryList;
