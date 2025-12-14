import React, { useState } from "react";
import { Link } from "react-router-dom";

import Card from "../../UI/Card";

import classes from "./HomeProduct.module.css";

const HomeProduct = (props) => {
  // SQL에서 할인율 컬럼에 랜덤난수 0~40 부여하고 여기 구문 수정하기
  return (
    <Link
      className={classes["product-link"]}
      to={`/products/${props.data.productId}`}
    >
      <Card className={`${classes.product} ${props.className}`}>
        {props.children}
        <Card className={classes["product-img"]}>
          <img src={props.data.image} alt="" />
        </Card>
        <div className={classes["product-content"]}>
          <h3 className={classes["product-content-title"]}>
            {props.data.title.substring(0, 13)}
          </h3>
          <div className={classes["product-content-priceInfo"]}>
            <span className={classes["product-content-discount"]}>
              {props.data.pDiscount}%
            </span>
            <div className={classes["product-content-priceWrap"]}>
              <span className={classes["product-content-price"]}>
                {/* 할인된 가격 */}
                {(
                  props.data.price -
                  props.data.price * (props.data.pDiscount / 100)
                ).toLocaleString("ko-kr")}
                원
              </span>
              <span className={classes["product-content-costPrice"]}>
                {props.data.price}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default HomeProduct;
