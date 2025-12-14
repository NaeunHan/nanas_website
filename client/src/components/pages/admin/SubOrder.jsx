import React from "react";

import classes from "./SubOrder.module.css";

const SubOrder = ({ detailOrder }) => {
  return (
    <div className={classes.subOrder}>
      <h4 className={classes["subOrder-title"]}>주문 상세 조회</h4>

      <p className={classes["subOrder-content__title"]}>주문번호</p>
      <p className={classes["subOrder-content__data"]}>{detailOrder.idx}</p>

      <p className={classes["subOrder-content__title"]}>상품번호</p>
      <p className={classes["subOrder-content__data"]}>{detailOrder.pId}</p>

      <p className={classes["subOrder-content__title"]}>상품명</p>
      <p className={classes["subOrder-content__data"]}>{detailOrder.ptitle}</p>

      <p className={classes["subOrder-content__title"]}>주문수량</p>
      <p className={classes["subOrder-content__data"]}>
        {detailOrder.oQuantity}
      </p>

      <p className={classes["subOrder-content__title"]}>주문자</p>
      <p className={classes["subOrder-content__data"]}>{detailOrder.oName}</p>

      <p className={classes["subOrder-content__title"]}>배송지</p>
      <p className={classes["subOrder-content__data"]}>
        {detailOrder.oAddr
          ? `${detailOrder.oAddr} [${detailOrder.oZipcode}]  ${detailOrder.oAdditionalAddr}`
          : ""}
      </p>

      <p className={classes["subOrder-content__title"]}>연락처</p>
      <p className={classes["subOrder-content__data"]}>{detailOrder.oPhone}</p>

      <p className={classes["subOrder-content__title"]}>요청사항</p>
      <p className={classes["subOrder-content__data"]}>{detailOrder.oMemo}</p>

      <p className={classes["subOrder-content__title"]}>결제방법</p>
      <p className={classes["subOrder-content__data"]}>{detailOrder.oMethod}</p>
    </div>
  );
};

export default SubOrder;
