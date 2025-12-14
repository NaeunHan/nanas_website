import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { authCheck } from "../../../util/authCheck";
import MyPageListTitle from "./MyPageListTitle";

import classes from "./OrderDetail.module.css";
const OrderDetail = () => {
  const location = useLocation();
  const [orderData, setOrderData] = useState(location.state.orderList);

  const price = parseInt(orderData.price);
  const usePoint = parseInt(orderData.oUsepoint);
  const totalPrice = price + 2500 - usePoint;
  useEffect(() => {
    authCheck();
  }, []);
  return (
    <React.Fragment>
      <div className={classes.OrderDetail}>
        <div>
          <MyPageListTitle text={"주문 내역 상세"} />
        </div>
        <div className={classes["detail-wrap-top"]}>
          <div className={classes["detail-top-item"]}>
            <label>주문일자</label>
            <span>{orderData.oDate}</span>
          </div>
          <div className={classes["detail-top-item"]}>
            <label>주문번호</label>
            <span>{orderData.idx}</span>
          </div>
        </div>
        <div className={classes["detail-wrap-content"]}>
          <table>
            <thead>
              <tr>
                <td>상품주문번호</td>
                <td>상품정보</td>
                <td>상품금액(수량)</td>
                <td>배송비/판매자</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{orderData.idx}</td>
                <td>{orderData.title}</td>
                <td>
                  <div className={classes["price-td"]}>
                    <span>{orderData.price}</span>
                    <span>({orderData.oQuantity}개)</span>
                  </div>
                </td>
                <td>
                  <div className={classes["seller-td"]}>
                    <span>3000원</span>
                    <span>{orderData.mallname}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={classes["detail-wrap-pay"]}>
          <div className={classes["detail-pay-title"]}>
            <h4>주문/결제 금액 정보</h4>
          </div>
          <div className={classes["detail-pay-content"]}>
            <table>
              <thead>
                <tr>
                  <td>주문금액</td>
                  <td>포인트 혜택</td>
                  <td>최종금액</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div>
                      <span>상품금액</span>
                      <span>{price.toLocaleString("ko-kr")}원</span>
                    </div>
                    <div>
                      <span>배송비</span>
                      <span>2,500원</span>
                    </div>
                  </td>
                  <td>
                    <div>
                      <span>포인트 할인</span>
                      <span>{usePoint.toLocaleString("ko-kr")}</span>
                    </div>
                  </td>
                  <td>
                    <div>
                      <span>주문금액</span>
                      <span>{totalPrice.toLocaleString("ko-kr")}원</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className={classes["detail-wrap-addr"]}>
          <div className={classes["detail-addr-title"]}>
            <h4>배송지 정보</h4>
          </div>
          <div className={classes["detail-addr-content"]}>
            <table>
              <thead>
                <tr>
                  <td>수령인</td>
                  <td>{orderData.oName}</td>
                  <td>주문자정보</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>연락처</td>
                  <td>{orderData.oPhone}</td>
                  <td rowSpan={3}>
                    <div>
                      <span>{orderData.oName}</span>
                      <span>{orderData.oPhone}</span>
                      <span>{orderData.oEmail}</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>배송지</td>
                  <td>{`${orderData.oAddr} / ${orderData.oAdditionalAddr}`}</td>
                </tr>
                <tr>
                  <td>요청사항</td>
                  <td>{orderData.oMemo}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrderDetail;
