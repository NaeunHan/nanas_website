/* eslint-disable */
import React, { useEffect } from "react";
import { useState } from "react";

import Pagination from "react-js-pagination";
import OrderItem from "./OrderItem";

import { FaSearch, FaTimesCircle } from "react-icons/fa";
import classes from "./OrderList.module.css";
import MyPageListTitle from "./MyPageListTitle";
import MyPageNullMsg from "./MyPageNullMsg";
import { authCheck } from "../../../util/authCheck";
import axios from "axios";

const OrderList = () => {
  // const [user, setUser] = useState();

  const [orderList, setOrderList] = useState([]);

  const [searchState, setSearchState] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const [currentPage, setCurrntPage] = useState(1); // 현재페이지
  const [indexOfLastQnA, setIndexOfLastQnA] = useState(0);
  const [indexOfFirstQnA, setIndexOfFirstQnA] = useState(0);
  // const perPage = 10;
  const [perPage, setPerPage] = useState(5);

  useEffect(() => {
    authCheck();
    // getUser(setUser);
    const fetchData = async () => {
      await axios
        .get("http://localhost:5000/mypage/api/orderlist", {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data.status === 200) {
            setOrderList(response.data.result);
          }
        });
    };
    fetchData();
    setIndexOfLastQnA(currentPage * perPage);
    setIndexOfFirstQnA(indexOfLastQnA - perPage);
  }, [currentPage, indexOfFirstQnA, indexOfLastQnA, perPage]);

  const [searchResult, setSearchResult] = useState([]);

  const searchDb = async (e) => {
    const result = [];
    e.preventDefault();
    if (searchKeyword === "") {
      alert("검색어를 입력해 주세요");
    } else {
      orderList.forEach((it) => {
        if (it.ptitle.toLowerCase().includes(searchKeyword.toLowerCase())) {
          result.push(it);
          setSearchState(true);
        }
      });
    }
    setSearchResult(result);
  };

  return (
    <React.Fragment>
      <div className={classes.OrderList}>
        <form onSubmit={searchDb}>
          <div className={classes["orderlist-wrap-title"]}>
            <MyPageListTitle text={"주문 목록"} />

            <div className={classes["orderlist-wrap-input"]}>
              <div className={classes["orderlist-input"]}>
                <input
                  defaultValue={searchKeyword}
                  placeholder={"주문한 상품을 검색할 수 있어요!"}
                  onChange={(e) =>
                    setSearchKeyword(e.target.value.replace(/(\s*)/g, ""))
                  }
                />
              </div>

              <div className={classes["orderlist-wrap-icon"]}>
                {searchKeyword.length > 0 ? (
                  <button type="button" onClick={() => setSearchKeyword("")}>
                    <FaTimesCircle className={classes["reset-icon"]} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSearchKeyword("")}
                    className={classes["dum-icon"]}
                  >
                    <FaTimesCircle />
                  </button>
                )}
                <button>
                  <FaSearch type="submit" className={classes["search-icon"]} />
                </button>
              </div>

              <select
                className={classes["select-wrap"]}
                // type={Number}
                value={perPage}
                onChange={({ target: { value } }) =>
                  setPerPage(Number(value), setCurrntPage(1))
                }
              >
                <option value="1">1개씩 보기</option>
                <option value="3">3개씩 보기</option>
                <option value="5">5개씩 보기</option>
                <option value="10">10개씩 보기</option>
              </select>
            </div>
          </div>
        </form>

        <div className={classes["orderlist-wrap-list"]}>
          {orderList.length === 0 && searchList.length === 0 && (
            <MyPageNullMsg
              text={"주문내역이 없습니다."}
              className={classes["orderlist-content-null"]}
              orderList={orderList}
            />
          )}
          {searchState === false ? (
            <div>
              {orderList
                .slice(indexOfFirstQnA, indexOfLastQnA)
                .map((item, key) => {
                  return <OrderItem orderList={item} key={key} />;
                })}
              {orderList.length !== 0 && (
                <div>
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
              )}
            </div>
          ) : (
            <div>
              {searchResult
                .slice(indexOfFirstQnA, indexOfLastQnA)
                .map((item, key) => {
                  return <OrderItem orderList={item} key={key} />;
                })}
              {searchResult.length !== 0 && (
                <div>
                  <Pagination
                    activePage={currentPage} // 현재 페이지
                    itemsCountPerPage={perPage} // 한페이지당 보여줄 아이템 갯수
                    totalItemsCount={searchResult.length} // 총 아이템 갯수
                    pageRangeDisplayed={5} // 페이지네이터 내에서 보여줄 페이지 범위
                    prevPageText={"<"}
                    nextPageText={">"}
                    onChange={setCurrntPage} // 페이지가 바뀔때 핸들링해주는 함수
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrderList;
