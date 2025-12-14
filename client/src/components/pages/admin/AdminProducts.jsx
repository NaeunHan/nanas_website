import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Pagination from "react-js-pagination";

import classes from "./AdminProducts.module.css";

const AdminProducts = ({ productList, setReset, onDetailProduct }) => {
  const [currentPage, setCurrntPage] = useState(1); // 현재페이지
  const [indexOfLastQnA, setIndexOfLastQnA] = useState(0);
  const [indexOfFirstQnA, setIndexOfFirstQnA] = useState(0);
  const perPage = 10;

  useEffect(() => {
    // pagination --------------------------------------------------------------------
    setIndexOfLastQnA(currentPage * perPage);
    setIndexOfFirstQnA(indexOfLastQnA - perPage);
  }, [productList, currentPage, indexOfFirstQnA, indexOfLastQnA, perPage]);

  return (
    <div>
      <div className={classes.adminOrder}>
        <h3 className={classes["adminOrder-title"]}>상품관리</h3>

        <table className={classes["adminOrder-orderList"]}>
          <thead>
            <tr>
              <th>상품번호</th>
              <th>상품명</th>
              <th>판패처</th>
              <th>가격</th>
              <th>조회</th>
            </tr>
          </thead>
          <tbody>
            {productList
              .slice(indexOfFirstQnA, indexOfLastQnA)
              .map((it, idx) => (
                <tr key={idx}>
                  <td>{it.productId}</td>
                  <td>{it.title}</td>
                  <td>{it.mallname}</td>
                  <td>{it.price}</td>
                  <td>
                    <button
                      className={classes["adminOrder-orderList-search"]}
                      onClick={() => onDetailProduct(it)}
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
          totalItemsCount={productList.length} // 총 아이템 갯수
          pageRangeDisplayed={5} // 페이지네이터 내에서 보여줄 페이지 범위
          prevPageText={"<"}
          nextPageText={">"}
          onChange={setCurrntPage} // 페이지가 바뀔때 핸들링해주는 함수
        />
      </div>
    </div>
  );
};

export default AdminProducts;
