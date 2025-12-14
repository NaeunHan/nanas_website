import React, { useEffect, useState } from "react";

import classes from "./ProductsBest.module.css";
import SearchItem from "../search/SearchItem";

import bestlogo from "../../../assets/icons/best.png";

import ProductsBestTen from "./ProductsBestThree";
import InfiniteScroll from "react-infinite-scroll-component";

const ProductsBest = ({ bestProduct, hasMore, onStateNum }) => {
  const [time, setTime] = useState();

  useEffect(() => {
    const time = new Date();
    setTime(time.toLocaleString("ko-kr"));
  }, []);

  return (
    <div className={classes.productsBest}>
      <div className={classes["productsBest-titleWrap"]}>
        <h3 className={classes["productsBest-title"]}>
          <img src={bestlogo} alt="bestProduct" /> NANAS 베스트 3 상품
        </h3>
        <span className={classes["productsBest-time"]}>
          {time} 기준 BEST 100
        </span>
      </div>

      <section className={classes["productsBest-threeContent"]}>
        {bestProduct.slice(0, 3).map((it, idx) => (
          <ProductsBestTen key={idx} data={it} />
        ))}
      </section>

      <div className={classes["productsBest-titleWrap"]}>
        <h3 className={classes["productsBest-title"]}>
          <img src={bestlogo} alt="bestProduct" /> NANAS 베스트 상품
        </h3>
        <span className={classes["productsBest-time"]}>
          {time} 기준 BEST 100
        </span>
      </div>

      <InfiniteScroll
        dataLength={bestProduct.length} // 한번에 렌더링 시킬 데이터 개수
        next={onStateNum} // 스크롤이 바닥에 위치하면 다음 데이터를 불러오는 함수 전달
        hasMore={hasMore} // 렌더링할 데이터가 더 있는지 없는지 체크
      >
        <section className={classes["productsBest-content"]}>
          {bestProduct.map((it, idx) => (
            <SearchItem data={it} key={idx} />
          ))}
        </section>
      </InfiniteScroll>
    </div>
  );
};

export default ProductsBest;
