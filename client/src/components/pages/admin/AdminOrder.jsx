import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";

import classes from "./AdminOrder.module.css";

const AdminOrder = ({ orderList, onDetailOrder }) => {
  const [currentPage, setCurrntPage] = useState(1); // 현재페이지
  const [indexOfLastQnA, setIndexOfLastQnA] = useState(0);
  const [indexOfFirstQnA, setIndexOfFirstQnA] = useState(0);
  const perPage = 10;

  useEffect(() => {
    // pagination --------------------------------------------------------------------
    setIndexOfLastQnA(currentPage * perPage);
    setIndexOfFirstQnA(indexOfLastQnA - perPage);
  }, [orderList, currentPage, indexOfFirstQnA, indexOfLastQnA, perPage]);

  return (
    <div className={classes.adminOrder}>
      <h3 className={classes["adminOrder-title"]}>주문관리</h3>

      <table className={classes["adminOrder-orderList"]}>
        <thead>
          <tr>
            <th>No.</th>
            <th>아이디</th>
            <th>이름</th>
            <th>상품번호</th>
            <th>수량</th>
            {/* <th>주소</th> */}
            <th>연락처</th>
            <th>구매일</th>
            <th>조회</th>
          </tr>
        </thead>
        <tbody>
          {orderList.slice(indexOfFirstQnA, indexOfLastQnA).map((it, idx) => (
            <tr key={idx}>
              <td>{it.idx}</td>
              <td>{it.uId}</td>
              <td>{it.oName}</td>
              <td>{it.pId}</td>
              <td>{it.oQuantity}</td>
              {/* <td>{`${it.addr} [${it.oZipcode}]  ${it.oAdditionalAddr}`}</td> */}
              <td>{it.oPhone}</td>
              <td>{it.oDate}</td>
              <td>
                <button
                  className={classes["adminOrder-orderList-search"]}
                  onClick={() => onDetailOrder(it)}
                >
                  조회
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        activePage={currentPage} // 현재 페이지
        itemsCountPerPage={perPage} // 한페이지당 보여줄 아이템 갯수
        totalItemsCount={orderList.length} // 총 아이템 갯수
        pageRangeDisplayed={5} // 페이지네이터 내에서 보여줄 페이지 범위
        prevPageText={"<"}
        nextPageText={">"}
        onChange={setCurrntPage} // 페이지가 바뀔때 핸들링해주는 함수
      />
    </div>
  );
};

export default AdminOrder;
