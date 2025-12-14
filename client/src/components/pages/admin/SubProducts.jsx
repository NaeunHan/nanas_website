import axios from "axios";
import React, { useState } from "react";

import classes from "./SubProducts.module.css";
const SubProducts = ({ detailProduct, onDetailProduct, setReset }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const stringCheck = /[a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
  const numCheck = /[0-9]/g;

  const handleUpdate = async () => {
    setIsValid(
      stringCheck.exec(detailProduct.title) &&
        numCheck.exec(detailProduct.price) &&
        numCheck.exec(detailProduct.pDiscount) &&
        detailProduct.mallname.length !== 0
    );
    if (!isValid) {
      return;
    } else {
      setIsUpdate(false);

      await axios
        .post("http://localhost:5000/admin/api/product/update", {
          productId: +detailProduct.productId,
          title: detailProduct.title,
          price: +detailProduct.price,
          mallname: detailProduct.mallname,
          pDiscount: +detailProduct.pDiscount,
        })
        .then(setReset((prev) => !prev));
    }
  };

  return (
    <div className={classes.subOrder}>
      <h4 className={classes["subOrder-title"]}>상품 상세 조회</h4>

      <p className={classes["subOrder-content__title"]}>판매처</p>
      {!isUpdate ? (
        <p className={classes["subOrder-content__data"]}>
          {detailProduct.mallname}
        </p>
      ) : (
        <input
          className={classes["subOrder-content__input"]}
          type="text"
          value={detailProduct.mallname}
          onChange={(e) =>
            onDetailProduct((prev) => {
              return { ...prev, mallname: e.target.value };
            })
          }
        />
      )}

      <p className={classes["subOrder-content__title"]}>상품번호</p>

      <p className={classes["subOrder-content__data"]}>
        {detailProduct.productId}
      </p>

      <p className={classes["subOrder-content__title"]}>상품 이미지</p>
      <div className={classes["subOrder-content__data__img"]}>
        <img src={detailProduct.image} alt={detailProduct.title} />
      </div>

      <p className={classes["subOrder-content__title"]}>상품명</p>
      {!isUpdate ? (
        <p className={classes["subOrder-content__data"]}>
          {detailProduct.title}
        </p>
      ) : (
        <input
          className={classes["subOrder-content__input"]}
          type="text"
          value={detailProduct.title}
          onChange={(e) =>
            onDetailProduct((prev) => {
              return { ...prev, title: e.target.value };
            })
          }
        />
      )}

      <p className={classes["subOrder-content__title"]}>상품 가격</p>
      {!isUpdate ? (
        <p className={classes["subOrder-content__data"]}>
          {detailProduct.price}
        </p>
      ) : (
        <input
          className={classes["subOrder-content__input"]}
          type="text"
          value={detailProduct.price}
          onChange={(e) =>
            onDetailProduct((prev) => {
              return { ...prev, price: e.target.value };
            })
          }
        />
      )}

      <p className={classes["subOrder-content__title"]}>상품 할인률</p>
      {!isUpdate ? (
        <p className={classes["subOrder-content__data"]}>
          {detailProduct.pDiscount}
        </p>
      ) : (
        <input
          className={classes["subOrder-content__input"]}
          type="text"
          value={detailProduct.pDiscount}
          onChange={(e) =>
            onDetailProduct((prev) => {
              return { ...prev, pDiscount: e.target.value };
            })
          }
        />
      )}

      <p className={classes["subOrder-content__title"]}>판매량</p>
      <p className={classes["subOrder-content__data"]}>
        {detailProduct.pSellCount}
      </p>

      <p className={classes["subOrder-content__title"]}>리뷰수</p>
      <p className={classes["subOrder-content__data"]}>
        {detailProduct.pReviewCount}
      </p>

      {!isValid && (
        <p className={classes["subOrder-content__err"]}>
          빈값을 저장할 수 없으며, 상품가격과 상품 할인률에 문자를 입력할 수
          없습니다.
        </p>
      )}

      <div className={classes["subOrder-content__update"]}>
        {!isUpdate ? (
          <button onClick={() => setIsUpdate(true)}>수정</button>
        ) : (
          <button onClick={handleUpdate}>저장</button>
        )}
      </div>
    </div>
  );
};

export default SubProducts;
