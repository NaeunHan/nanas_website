import React, { Fragment } from "react";
import MyPageSideLink from "./MyPageSideLink";

import classes from "./MyPageSide.module.css";

const MyPageSide = ({ isShowCategory, setIsShowCategory, className }) => {
  return (
    <React.Fragment>
      {isShowCategory && (
        <div
          className={classes.backDrop}
          onClick={() => setIsShowCategory(false)}
        ></div>
      )}

      <div className={`${classes.MyPageSide} ${className}`}>
        <div className={`${classes["side-item"]} ${classes.noneBorder}`}>
          <h2>MY 쇼핑</h2>
          <div onClick={setIsShowCategory}>
            <MyPageSideLink
              to="/mypage"
              text={"주문목록"}
              first={true}
              onClick={setIsShowCategory}
            />
          </div>
        </div>

        <div className={classes["side-item"]}>
          <h2>MY 혜택</h2>

          <div>
            <MyPageSideLink
              to="mypointcheck"
              text={"포인트확인"}
              onClick={setIsShowCategory}
            />
          </div>
        </div>

        <div className={classes["side-item"]}>
          <h2>MY 활동</h2>
          <div>
            <MyPageSideLink
              to="reviewlist"
              text={"리뷰내역"}
              onClick={setIsShowCategory}
            />
          </div>

          <div>
            <MyPageSideLink
              to="mypageinquirylist"
              text={"문의내역"}
              onClick={setIsShowCategory}
            />
          </div>
          <div>
            <MyPageSideLink
              to="/cart"
              text={"장바구니"}
              onClick={setIsShowCategory}
            />
          </div>
        </div>

        <div className={classes["side-item"]}>
          <h2>MY 정보</h2>
          <div>
            <MyPageSideLink
              to="/updateuser"
              text={"개인정보 확인/수정"}
              onClick={setIsShowCategory}
            />
          </div>
          <div>
            <MyPageSideLink
              to="mypageaddress"
              text={"배송지 관리"}
              onClick={setIsShowCategory}
            />
          </div>
          <div>
            <MyPageSideLink
              to="deleteuser"
              text={"회원탈퇴"}
              onClick={setIsShowCategory}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default MyPageSide;
