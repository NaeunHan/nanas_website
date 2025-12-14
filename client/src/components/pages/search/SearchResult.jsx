import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import SearchItem from "./SearchItem";

import sibaicon from "../../../assets/icons/siba.png";

import classes from "./SearchResult.module.css";

const SearchResult = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    setSearchData(location.state.result);
  }, [searchParams]);
  return (
    <div className={classes.searchResult}>
      <h4 className={classes["searchResult-title"]}>
        검색결과
        <span className={classes["searchResult-title-amount"]}>
          {searchData.length}
        </span>
        건
      </h4>
      {searchData.length !== 0 && (
        <p
          className={classes["searchResult-searchKeyword"]}
        >{`${searchParams.get("keyword")} 검색결과 입니다.`}</p>
      )}

      {searchData.length === 0 && (
        <div className={classes["searchResult-noneItem"]}>
          <img src={sibaicon} alt="시바 그림" />

          <p className={classes["searchResult-noneItem__content"]}>
            찾으시는 결과가 없네요.
          </p>
        </div>
      )}

      <div className={classes["searchResult-items"]}>
        {searchData.length !== 0 &&
          searchData.map((it, idx) => <SearchItem key={idx} data={it} />)}
      </div>
    </div>
  );
};

export default SearchResult;
