import React from "react";
import Card from "../../UI/Card";
import Modal from "../../UI/Modal";

import kakao from "../../../assets/clause/kakao.png";

import classes from "./ModalConfirmation.module.css";

const ModalConfirmation = (props) => {
  return (
    <Modal onClose={props.onClose} className={classes["modalConfirmation"]}>
      <header>본인 확인 인증</header>

      <section className={classes["confirmation-wrap"]}>
        <div className={classes["confirmation-item"]}>
          <Card className={classes["confirmation-img"]}>
            <img src={kakao} alt="카카오 인증" />
          </Card>

          <input type="radio" />
        </div>

        <div className={classes["confirmation-item"]}>
          <Card className={classes["confirmation-img"]}>
            <img src={kakao} alt="카카오 인증" />
          </Card>

          <input type="radio" />
        </div>

        <div className={classes["confirmation-item"]}>
          <Card className={classes["confirmation-img"]}>
            <img src={kakao} alt="카카오 인증" />
          </Card>

          <input type="radio" />
        </div>

        <div className={classes["confirmation-item"]}>
          <Card className={classes["confirmation-img"]}>
            <img src={kakao} alt="카카오 인증" />
          </Card>

          <input type="radio" />
        </div>

        <div className={classes["confirmation-item"]}>
          <Card className={classes["confirmation-img"]}>
            <img src={kakao} alt="카카오 인증" />
          </Card>

          <input type="radio" />
        </div>

        <div className={classes["confirmation-item"]}>
          <Card className={classes["confirmation-img"]}>
            <img src={kakao} alt="카카오 인증" />
          </Card>

          <input type="radio" />
        </div>
      </section>

      <section className={classes["confirmation-userInfo-wrap"]}>
        <div className={classes["confirmation-userInfo"]}>
          <div className={classes["confirmation-userInfo-title"]}>이름</div>
          <div className={classes["confirmation-userInfo-input"]}>
            <input />
          </div>
        </div>

        <div className={classes["confirmation-userInfo"]}>
          <div className={classes["confirmation-userInfo-title"]}>생년월일</div>
          <div className={classes["confirmation-userInfo-input"]}>
            <input />
          </div>
        </div>

        <div className={classes["confirmation-userInfo"]}>
          <div className={classes["confirmation-userInfo-title"]}>전화번호</div>
          <div className={classes["confirmation-userInfo-input"]}>
            <input />
          </div>
        </div>
      </section>

      <section className={classes["confirmation-caluse"]}>
        <h4>서비스 이용에 대한 동의</h4>

        <div className={classes["confirmation-caluse-itemWrap"]}>
          <div className={classes["confirmation-caluse-item"]}>
            <input type="checkbox" />
            <span>제3자정보제공동의(필수)</span>
            <button>자세히보기</button>
          </div>

          <div className={classes["confirmation-caluse-item"]}>
            <input type="checkbox" />
            <span>고유식별정보처리동의(필수)</span>
            <button>자세히보기</button>
          </div>
        </div>
      </section>

      <div className={classes["confirmation-control"]}>
        <button className={classes["confirmation-btn-cancel"]}>취소</button>
        <button className={classes["confirmation-btn-confirm"]}>
          인증하기
        </button>
      </div>
    </Modal>
  );
};

export default ModalConfirmation;
