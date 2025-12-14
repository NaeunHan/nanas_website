import React, { useEffect } from "react";
import classes from "./Nav.module.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { cookieCheck, handleLogout } from "../../util/authCheck";
import { GrUserAdmin } from "react-icons/gr";
const Nav = () => {
  const location = useLocation();

  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    cookieCheck(setIsLogin, setUser);
  }, []);

  if (location.pathname === "/admin") {
    return null;
  }
  return (
    <React.Fragment>
      <nav className={classes.nav}>
        <div className={classes["nav-category"]}>
          <Link to={"/productsBest"}>베스트</Link>
          <span> | </span>
          <a href={"/categories?type=life"}>생활/건강</a>
          <a href={"/categories?type=digital"}>디지털/가전</a>
          <a href={"/categories?type=fashionaccessories"}>패션잡화</a>
          <a href={"/categories?type=furniture"}>가구/인테리어</a>
          <a href={"/categories?type=maternity"}>출산/육아</a>
          <a href={"/categories?type=fashionclothes"}>패션의류</a>
          <a href={"/categories?type=foods"}>식품</a>
          <a href={"/categories?type=sportsleisure"}>스포츠/레저</a>
        </div>

        <div>
          {isLogin === false ? (
            <div className={classes["nav-nonLogin"]}>
              <Link to={"/login"}>로그인</Link>
              <Link to={"/regist"}>회원가입</Link>
            </div>
          ) : (
            <div className={classes["nav-Login"]}>
              {user.uAuth === 2 && (
                <span className={classes["nav-Login-admin"]}>
                  <Link to="/admin" state={{ user: user }}>
                    <GrUserAdmin className={classes["nav-Login-admin__icon"]} />
                    관리자
                  </Link>
                </span>
              )}
              <span>
                🐣 <Link to="/mypage">{user.uName}</Link> 님
              </span>
              <span> | </span>
              <span>🌱 {user.uMile}</span>
              <span> | </span>
              <button className={classes["nav-onOff"]} onClick={handleLogout}>
                로그아웃
              </button>
            </div>
          )}
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Nav;
