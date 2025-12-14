import React, { useState, useRef, useEffect } from "react";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import iconGoogle from "../../../assets/icons/googleLogin.png";
import iconNaver from "../../../assets/icons/naverLogin.png";
import iconKakao from "../../../assets/icons/kakaoLogin.png";
import iconApple from "../../../assets/icons/appleLogin.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
const Login = () => {
  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");
  const [showPW, setShowPW] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const pwTab = useRef();

  const onClickShowPW = () => {
    setShowPW(!showPW);
  };
  const onSubmitLogin = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:5000/login/api/login",
        { userID, userPW },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data === "secession") {
          window.location.reload();
          alert("이미 탈퇴한 회원입니다");
        } else if (response.data === "invalid") {
          alert("아이디 혹은 비밀번호를 확인해주세요");
        } else {
          window.alert("로그인 성공!");
          setIsLogin(true);
          window.location.replace("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //useEffect로 비밀번호 보기 숨기기 결정
  useEffect(() => {
    const pwText = () => {
      if (!showPW) {
        pwTab.current.type = "password";
      } else {
        pwTab.current.type = "text";
      }
    };
    pwText();
  }, [showPW]);

  return (
    <React.Fragment>
      <header className={classes["regist-haader"]}>
        <h2>로그인</h2>
      </header>
      <form
        method="post"
        className={classes["form-login"]}
        onSubmit={onSubmitLogin}
      >
        <div className={classes["form-login-wrapper"]}>
          <div className={classes["form-login-input"]}>
            <input
              type={"text"}
              onChange={(e) => setUserID(e.target.value)}
              placeholder={"아이디를 입력해주세요"}
              required
            />
          </div>
          <div className={classes["form-login-pw"]}>
            <input
              type={"password"}
              onChange={(e) => setUserPW(e.target.value)}
              placeholder={"비밀번호를 입력해주세요"}
              ref={pwTab}
              required
            />
            {!showPW ? (
              <FaEyeSlash
                className={classes["form-login-pw-i"]}
                onClick={onClickShowPW}
              />
            ) : (
              <FaEye
                className={classes["form-login-pw-i"]}
                onClick={onClickShowPW}
              />
            )}
          </div>
          <div className={classes["form-login-handler"]}>
            <input
              type={"submit"}
              value={"로그인"}
              className={classes["form-login-submit"]}
            ></input>
          </div>
          <Link className={classes["form-login-non"]}>
            <div>비회원 주문조회</div>
          </Link>

          <div className={classes["form-login-easy"]}>
            <p className={classes["form-login-easy__title"]}>간편 로그인</p>
            <div className={classes["form-login-easy__img"]}>
              <img src={iconGoogle} alt="구글로그인이미지" />
              <img src={iconKakao} alt="카카오로그인이미지" />
              <img src={iconNaver} alt="네이버로그인이미지" />
              <img src={iconApple} alt="애플로그인이미지" />
            </div>
          </div>
          <div className={classes["form-login-links"]}>
            <Link>아이디찾기</Link>
            <Link>비밀번호찾기</Link>
            <Link to={"/regist"}>회원가입</Link>
          </div>

          <div className={classes["form-login-banner"]}>NANAS SALE 30% ~</div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Login;
