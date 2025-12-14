import React from "react";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <h4>NANI HOMEPAGE</h4>
      <p className={classes["footer-customCenter"]}>고객센터</p>
      <p className={classes["footer-nums"]}>1600-1600</p>

      <p className={classes["footer-noCall"]}>
        09:00 ~ 18:00 (주말, 공휴일은 전화상담 불가능)
      </p>
      <div className={classes["footer-nav"]}>
        <span>브랜드 스토리</span>
        <span>회사소개</span>
        <span>채용정보</span>
        <span>이용약관</span>
        <span className={classes["footer-nav__info"]}>개인정보처리방침</span>
        <span>공지사항</span>
        <span>고객센터</span>
        <span>고객의 소리</span>
        <span>전문가등록</span>
        <span>사업자 구매회원</span>
        <span>제휴/광고 문의</span>
        <span>입점신청 문의</span>
        <span>안전거래센터</span>
        <span>상품광고 소개</span>
      </div>
      <p className={classes["footer-mallInfo"]}>
        상호명: NANASGLOBAL 이메일:(고객문의)email@email.com (제휴문의)email@email
        <span className={classes["footer-leader"]}>CEO</span>
        사업자등록번호:123-12-12345 통신판매업신고번호 제2024-서울-0123호
        <span>사업자정보확인</span>
      </p>

      <p className={classes["footer-mallInfo"]}>
        
      </p>
      <p className={classes["footer-copy"]}>
        &copy; 2025. H All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
