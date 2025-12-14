import React from "react";
import classes from "./AdminMain.module.css";

const AdminMain = () => {
  return (
    <React.Fragment>
      <div className={classes.AdminMain}>
        <h3 className={classes["adminMain-title"]}>메인</h3>
        <div className={classes["adminMain-top-content"]}>
          <span>
            - 쇼핑몰 관련 전체적인 정보를 요약하여 보여주는 화면입니다.
          </span>
          <span>
            - 현재 처리해야 할 주문건수와 매출, 주문처리, 적립금 현황, 고객 분석
            데이터, 공지사항등을 한 화면에서 확인할 수 있습니다.
          </span>
          <span>
            - 메인 대시보드 내용은 운영자 권한에 따라 표시 여부가 결정됩니다.
          </span>
        </div>

        <div className={classes["adminMain-middle-content"]}>
          <span>
            - 오늘 처리 해야 할 주문상태별 수와 게시물 관리 현황을 보여줍니다.
          </span>
          <span>
            - 각 주문상태의 건수 클릭 시, 해당되는 상세내역을 보여줍니다.
          </span>
          <span>
            - 해당 주문 목록을 볼 수 있는 메뉴로 이동 시, 검색조건 영역에서 기간
            항목을 제외하고 (검색조회 항목 저장)에서 저장한 값이 표시됩니다.
          </span>
          <span>- 주문상태의 집계 기준은 '30일전 ~ 오늘'입니다.</span>
          <span>
            - 게시물 현황 집계 기준은 '금일 00:00 ~ 금일 23:59'입니다.
          </span>
        </div>

        <div className={classes["adminMain-item-wrap"]}>
          <span>
            <h2>쇼핑몰 이름</h2>
          </span>
          <div>
            <span>
              - '설정하기' 버튼 클릭 시, [도메인 설정] 팝업이 열립니다.
            </span>
            <span>
              - [도메인 설정] 팝업에서 대표도메인 변경, 추가 도메인 연결 등
              도메인에 대한 설정이 가능합니다.
            </span>
          </div>
        </div>

        <div className={classes["adminMain-item-wrap"]}>
          <span>
            <h2>고객관리</h2>
          </span>
          <div>
            <span>
              - 고객관리 메뉴의 기본인 회원현황, 최근 가입회원 현황을 확인하고
              링크를 클릭하여 설정, 조회 화면으로 바로 이동할 수 있습니다
            </span>
          </div>
        </div>

        <div className={classes["adminMain-item-wrap"]}>
          <span>
            <h2>주문 관리</h2>
          </span>
          <div>
            <span>
              - 실시간 매출 현황 및 오늘 처리한 주문 상태 정보를 요약 정보로
              한눈에 확인할 수 있습니다.
            </span>
            <span>
              - 총 실 결제금액은 할인 및 부가결제를 제외한 결제수단(무통장입금,
              카드 결제, 실시간 계좌이체, 휴대폰결제 등)으로
            </span>
            <span>고객이 실제 결제한 금액입니다.</span>
            <span>
              - 할인은 상품할인, 제휴할인, 회원등급할인, 쿠폰할인, 배송비할인이
              있으며, 부가결제는 적립금, 예치금, 네이버 포인트가 있습니다.
            </span>
          </div>
        </div>

        <div className={classes["adminMain-item-wrap"]}>
          <span>
            <h2>상품 관리</h2>
          </span>
          <div>
            <span>
              - 상품분류관리, 상품등록, 상품진열, 재고관리등 쇼핑몰 상품관리에
              필요한 기능을 제공합니다.
            </span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminMain;
