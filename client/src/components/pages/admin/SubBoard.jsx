import React from "react";

import classes from "./SubBoard.module.css";

const SubBoard = ({ detailBoard }) => {
  return (
    <div className={classes.subOrder}>
      <h4 className={classes["subOrder-title"]}>게시판 상세 조회</h4>

      <p className={classes["subOrder-content__title"]}>글번호</p>
      <p className={classes["subOrder-content__data"]}>{detailBoard.bId}</p>

      <p className={classes["subOrder-content__title"]}>타입</p>
      <p className={classes["subOrder-content__data"]}>
        {detailBoard.bBoardtype}
      </p>

      <p className={classes["subOrder-content__title"]}>작성자</p>
      <p className={classes["subOrder-content__data"]}>{detailBoard.uId}</p>

      <p className={classes["subOrder-content__title"]}>제목/상품명</p>
      <p className={classes["subOrder-content__data"]}>{detailBoard.bTitle}</p>

      <p className={classes["subOrder-content__title"]}>내용</p>
      <p className={classes["subOrder-content__data"]}>
        {detailBoard.bContent}
      </p>

      <p className={classes["subOrder-content__title"]}>작성일</p>
      <p className={classes["subOrder-content__data"]}>
        {detailBoard.bWriteDate}
      </p>
    </div>
  );
};

export default SubBoard;
