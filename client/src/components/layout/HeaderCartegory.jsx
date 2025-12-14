import React from "react";
import { Link } from "react-router-dom";

import classes from "./HeaderCartegory.module.css";

const HeaderCartegory = ({ setIsShowncategory }) => {
  return (
    <React.Fragment>
      <div
        className={classes["headerCartegory-backdrop"]}
        onClick={() => setIsShowncategory(false)}
      ></div>

      <div className={classes["headerCartegory-slide"]}>
        <h3>카테고리</h3>

        <div className={classes["nav-category"]}>
          <Link to={"/productsBest"} onClick={() => setIsShowncategory(false)}>
            베스트 상품
          </Link>

          <a
            href={"/categories?type=life"}
            onClick={() => setIsShowncategory(false)}
          >
            생활/건강
          </a>
          <a
            href={"/categories?type=digital"}
            onClick={() => setIsShowncategory(false)}
          >
            디지털/가전
          </a>
          <a
            href={"/categories?type=fashionaccessories"}
            onClick={() => setIsShowncategory(false)}
          >
            패션잡화
          </a>
          <a
            href={"/categories?type=furniture"}
            onClick={() => setIsShowncategory(false)}
          >
            가구/인테리어
          </a>
          <a
            href={"/categories?type=maternity"}
            onClick={() => setIsShowncategory(false)}
          >
            출산/육아
          </a>
          <a
            href={"/categories?type=fashionclothes"}
            onClick={() => setIsShowncategory(false)}
          >
            패션의류
          </a>
          <a
            href={"/categories?type=foods"}
            onClick={() => setIsShowncategory(false)}
          >
            식품
          </a>
          <a
            href={"/categories?type=sportsleisure"}
            onClick={() => setIsShowncategory(false)}
          >
            스포츠/레저
          </a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HeaderCartegory;
