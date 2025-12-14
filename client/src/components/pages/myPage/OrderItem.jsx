import React from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authCheck } from "../../../util/authCheck";

import classes from "./OrderItem.module.css";
const OrderItem = ({ orderList }) => {
  const navigate = useNavigate();
  useEffect(() => {
    authCheck();
  }, []);

  return (
    <React.Fragment>
      <div className={classes.OrderItem}>
        <div className={classes["orderitem-wrap-title"]}>
          <div>
            <h2>{orderList.oDate}</h2>
          </div>
          <div>
            <button
              onClick={() =>
                navigate("/mypage/orderdetail", { state: { orderList } })
              }
            >
              주문 상세
            </button>
          </div>
        </div>

        <div className={classes["orderitem-wrap-items"]}>
          <div className={classes["orderitem-wrap-left"]}>
            <div className={classes["orderitem-item-title"]}>
              <span>
                {`${orderList.category1} > ${orderList.category2} > ${orderList.category3}`}
              </span>
            </div>
            <div className={classes["orderitem-item-content"]}>
              <div className={classes["orderitem-item-img"]}>
                <img src={orderList.image} alt={orderList.title} />
              </div>

              <div className={classes["orderitem-item-porfile"]}>
                <div className={classes["orderitem-porfile-title"]}>
                  <button
                    onClick={() => navigate(`/products/${orderList.pId}`)}
                  >
                    <h4>{orderList.title}</h4>
                  </button>
                </div>
                <div className={classes["orderitem-porfile-content"]}>
                  <h5>
                    상품가격
                    <span>{orderList.price.toLocaleString("ko-kr")}원</span>
                  </h5>
                  <h5>
                    구매수량 <span>{orderList.oQuantity}</span>
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className={classes["orderitem-wrap-right"]}>
            <button
              onClick={() =>
                navigate("/mypage/reviewwrite", {
                  state: { orderList },
                })
              }
            >
              리뷰쓰기
            </button>
            <button
              onClick={() =>
                navigate("/mypage/cancel-return-exchange-write", {
                  state: { orderList },
                })
              }
            >
              교환 / 반품 신청
            </button>
            <button onClick={() => navigate(`/products/${orderList.pId}`)}>
              재구매
            </button>
            <button
              onClick={() =>
                navigate("/mypage/mypageinquiry", { state: { orderList } })
              }
            >
              판매자문의
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrderItem;
