import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";

import classes from "./AdminBoard.module.css";

const AdminBoard = ({ boardList, setReset, onDetailBoard }) => {
  const [currentPage, setCurrntPage] = useState(1); // 현재페이지
  const [indexOfLastQnA, setIndexOfLastQnA] = useState(0);
  const [indexOfFirstQnA, setIndexOfFirstQnA] = useState(0);
  const perPage = 10;

  useEffect(() => {
    // pagination --------------------------------------------------------------------
    setIndexOfLastQnA(currentPage * perPage);
    setIndexOfFirstQnA(indexOfLastQnA - perPage);
  }, [currentPage, indexOfFirstQnA, indexOfLastQnA, perPage]);
  const deleteContent = async (bId) => {
    await axios
      .post("http://localhost:5000/admin/api/delete/boardContent", { bId })
      .then((response) => {
        alert(response.data);
        setReset((prev) => !prev);
      });
  };
  return (
    <div className={classes.adminOrder}>
      <h3 className={classes["adminOrder-title"]}>게시판관리</h3>

      <table className={classes["adminOrder-orderList"]}>
        <thead>
          <tr>
            <th>No.</th>
            <th>타입</th>
            <th>작성자</th>
            <th>제목 / 상품명</th>
            <th>내용</th>
            {/* <th>주소</th> */}
            <th>작성일</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {boardList.slice(indexOfFirstQnA, indexOfLastQnA).map((it, bId) => (
            <tr key={bId}>
              <td>{it.bId}</td>
              <td>{it.bBoardtype}</td>
              <td>{it.uId}</td>
              <td>
                <Link to={`/products/` + it.productId}>
                  {it.bTitle.substring(0, 8) + "..."}
                </Link>
              </td>
              <td>{it.bContent.substring(0, 8) + "..."}</td>
              {/* <td>{`${it.addr} [${it.oZipcode}]  ${it.oAdditionalAddr}`}</td> */}
              <td>{it.bWriteDate}</td>
              <td>
                <button
                  className={classes["adminOrder-orderList-search"]}
                  onClick={() => onDetailBoard(it)}
                >
                  조회
                </button>
                <button
                  className={classes["adminOrder-orderList-search"]}
                  onClick={() => deleteContent(it.bId)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        activePage={currentPage} // 현재 페이지
        itemsCountPerPage={perPage} // 한페이지당 보여줄 아이템 갯수
        totalItemsCount={boardList.length} // 총 아이템 갯수
        pageRangeDisplayed={5} // 페이지네이터 내에서 보여줄 페이지 범위
        prevPageText={"<"}
        nextPageText={">"}
        onChange={setCurrntPage} // 페이지가 바뀔때 핸들링해주는 함수
      />
    </div>
  );
};

export default AdminBoard;
