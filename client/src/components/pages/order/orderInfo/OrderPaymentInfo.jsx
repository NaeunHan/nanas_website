import React from "react";
import { paymentMethod } from "../../../../util/payment";
import OrderAccount from "../orderMethod/OrderAccount";
import OrderCard from "../orderMethod/OrderCard";
import OrderCoperateCard from "../orderMethod/OrderCoperateCard";
import OrderNoneBank from "../orderMethod/OrderNoneBank";
import OrderPhone from "../orderMethod/OrderPhone";

import classes from "./OrderPaymentInfo.module.css";

const OrderPaymentInfo = ({
  totalPrice,
  totalDeliveyFee,
  userData,
  orderInfo,
  useMileInput,
  onMileInput,
  onUseMile,
  onOrderMethod,
}) => {
  return (
    <div className={classes["orderPaymentInfo"]}>
      <h4>결제 정보</h4>
      <table className={classes["orderPaymentInfo-table"]}>
        <tbody>
          <tr>
            <td className={classes["orderPaymentInfo-table__col1"]}>
              총 상품 가격
            </td>
            <td className={classes["orderPaymentInfo-table__col2"]}>
              {totalPrice.toLocaleString("ko-kr")}원
            </td>
          </tr>
          <tr>
            <td className={classes["orderPaymentInfo-table__col1"]}>배송비</td>
            <td className={classes["orderPaymentInfo-table__col2"]}>
              {totalDeliveyFee.toLocaleString("ko-kr")}원
            </td>
          </tr>
          <tr>
            <td className={classes["orderPaymentInfo-table__col1"]}>
              마일리지 사용
            </td>
            <td className={classes["orderPaymentInfo-table__mile"]}>
              <div className={classes["orderPaymentInfo-table__useMile"]}>
                <input
                  type="number"
                  value={useMileInput.value}
                  onChange={(e) =>
                    onMileInput((prev) => {
                      return { ...prev, value: e.target.value };
                    })
                  }
                />
                <span>원</span>
                <button
                  className={classes["orderPaymentInfo-table__useMile__btn"]}
                  onClick={() => onUseMile(useMileInput.value)}
                >
                  적용
                </button>
                <span className={classes["orderPaymentInfo-table__totalMile"]}>
                  보유 마일리지 :<span>{userData.uMile}</span>원
                </span>
                {!useMileInput.isValid && (
                  <span
                    className={classes["orderPaymentInfo-table__useMileError"]}
                  >
                    {/* 보유하신 마일리지보다 많은 사용량은 사용하실 수 없습니다. */}
                    {useMileInput.mileMsg}
                  </span>
                )}
              </div>
            </td>
          </tr>
          <tr>
            <td className={classes["orderPaymentInfo-table__col1"]}>
              마일리지 적립
            </td>
            <td className={classes["orderPaymentInfo-table__col2"]}>
              {orderInfo.oGetMile.toLocaleString("ko-kr")}원
            </td>
          </tr>
          <tr>
            <td className={classes["orderPaymentInfo-table__col1"]}>
              총 결제금액
            </td>
            <td className={classes["orderPaymentInfo-table__col2"]}>
              {(
                totalDeliveyFee +
                totalPrice -
                orderInfo.oUseMile
              ).toLocaleString("ko-kr")}
              원
            </td>
          </tr>

          <tr>
            <td className={classes["orderPaymentInfo-table__col1"]}>
              결제 방법
            </td>
            <td className={classes["orderPaymentInfo-table__payment"]}>
              <div
                className={classes["orderPaymentInfo-table__payment__select"]}
              >
                {paymentMethod.map((it, idx) => (
                  <div
                    key={idx}
                    className={
                      classes["orderPaymentInfo-table__payment__select__item"]
                    }
                  >
                    <input
                      type="radio"
                      value={it}
                      onChange={(e) => onOrderMethod(e.target.value)}
                      checked={orderInfo.oMethod === it}
                    />
                    <span>{it}</span>
                  </div>
                ))}
              </div>

              {orderInfo.oMethod === "계좌이체" && <OrderAccount />}
              {orderInfo.oMethod === "신용/체크카드" && <OrderCard />}
              {orderInfo.oMethod === "법인카드" && <OrderCoperateCard />}
              {orderInfo.oMethod === "휴대폰" && <OrderPhone />}
              {orderInfo.oMethod === "무통장입금" && <OrderNoneBank />}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderPaymentInfo;
