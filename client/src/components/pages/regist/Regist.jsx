import React from "react";

import SectionUserInfoInput from "./RegistUserInfoInput";

import kakao from "../../../assets/icons/kakaoLogin.png";
import naver from "../../../assets/icons/naverLogin.png";
import google from "../../../assets/icons/googleLogin.png";
import apple from "../../../assets/icons/appleLogin.png";

import classes from "./Regist.module.css";

const Regist = () => {
  return (
    <>
      <header className={classes["regist-header"]}>
        <h2>회원가입</h2>
      </header>

      <section className={classes["regist-simple"]}>
        <h3>간편하게 회원가입하기</h3>

        <div className={classes["regist-simple-items"]}>
          <div>
            <img src={kakao} alt="kakao 간편가입" />
          </div>
          <div>
            <img src={naver} alt="naver 간편가입" />
          </div>
          <div>
            <img src={google} alt="google 간편가입" />
          </div>
          <div>
            <img src={apple} alt="apple 간편가입" />
          </div>
        </div>
      </section>

      <SectionUserInfoInput />
    </>
  );
};

export default Regist;
