import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./DetailModal.module.css";

const DetailModal = ({ props, onClose }) => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <div className={classes.DetailModal} onClick={onClose}></div>
      <div className={classes["modal-container"]}>
        <div>
          <div className={classes["modal-item"]}>
            <h2>문의 내용 상세보기</h2>
          </div>
          <div className={classes["modal-item"]}>
            <label>문의 상품</label>
            <div>{props.bTitle}</div>
          </div>
          <div className={classes["modal-item"]}>
            <label>문의 유형</label>
            <div>{props.bBoardtype}</div>
          </div>
          <div className={classes["modal-item"]}>
            <label>문의 날짜</label>
            <div>{props.bWriteDate}</div>
          </div>

          <div className={classes["modal-item"]}>
            <label>문의 내용</label>
            <p>{props.bContent}</p>
          </div>
        </div>
        <div className={classes["modal-wrap-button"]}>
          <div>
            <button onClick={() => navigate("/mypage")}>주문 내역</button>
          </div>
          <div>
            <button onClick={onClose}>닫기</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DetailModal;
