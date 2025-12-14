import React from "react";
import classes from "./Home.module.css";
import SearchItem from "../search/SearchItem";

import bestlogo from "../../../assets/icons/best.png";
import lifelogo from "../../../assets/icons/life.png";
import clotheslogo from "../../../assets/icons/clothes.png";
import salelogo from "../../../assets/icons/sale.png";
import { useNavigate } from "react-router-dom";
import SliderBanner from "./SliderBanner";

const Home = ({ data = [], bestProduct = [] }) => {
  const navigate = useNavigate();

  // ✅ 네이버 items 배열이 들어온다고 가정
  const items = Array.isArray(data) ? data : [];
  const bestItems = Array.isArray(bestProduct) && bestProduct.length > 0 ? bestProduct : items;

  return (
    <div>
      <SliderBanner />

      {/* 베스트 섹션 */}
      <section className={classes["home-section"]}>
        <div className={classes["home-section__titleWrap"]}>
          <h3 className={classes["home-section__title"]}>
            <img src={bestlogo} alt="bestProduct" /> NANAS 베스트 상품
          </h3>
          <span
            className={classes["home-section__expansion"]}
            onClick={() => navigate("/productsBest")}
          >
            + 더보기
          </span>
        </div>
        <div className={classes["home-section-product"]}>
          {bestItems.slice(0, 4).map((it, key) => (
            <SearchItem key={key} data={it} />
          ))}
        </div>
      </section>

      {/* 생활필수템 */}
      <section className={classes["home-section"]}>
        <div className={classes["home-section__titleWrap"]}>
          <h3 className={classes["home-section__title"]}>
            <img src={lifelogo} alt="life" /> 생활필수템
          </h3>
          <span className={classes["home-section__expansion"]}>+ 더보기</span>
        </div>
        <div className={classes["home-section-product"]}>
          {items.slice(4, 8).map((it, key) => (
            <SearchItem key={key} data={it} />
          ))}
        </div>
      </section>

      {/* 의류 */}
      <section className={classes["home-section"]}>
        <div className={classes["home-section__titleWrap"]}>
          <h3 className={classes["home-section__title"]}>
            <img src={clotheslogo} alt="clothes" /> 의류 추천
          </h3>
          <span className={classes["home-section__expansion"]}>+ 더보기</span>
        </div>
        <div className={classes["home-section-product"]}>
          {items.slice(8, 12).map((it, key) => (
            <SearchItem key={key} data={it} />
          ))}
        </div>
      </section>

      {/* 특가 (네이버는 할인율 정보 없으니 최저가 느낌으로) */}
      <section className={classes["home-section"]}>
        <div className={classes["home-section__titleWrap"]}>
          <h3 className={classes["home-section__title"]}>
            <img src={salelogo} alt="sale" /> 최저가 모음
          </h3>
          <span className={classes["home-section__expansion"]}>+ 더보기</span>
        </div>
        <div className={classes["home-section-saleProduct"]}>
          {/* 네이버는 lprice가 문자열이라 정렬 후 일부 */}
          {items
            .slice()
            .sort((a, b) => Number(a.lprice ?? 0) - Number(b.lprice ?? 0))
            .slice(0, 8)
            .map((it, key) => (
              <SearchItem key={key} data={it} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
