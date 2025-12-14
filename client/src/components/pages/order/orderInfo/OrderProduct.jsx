import React from "react";
import { Link } from "react-router-dom";
import { deliveryDate } from "../../../../util/deliveryDate";
import Card from "../../../UI/Card";

import classes from "./OrderProduct.module.css";

const OrderProduct = ({ orderData }) => {
  return (
    <div className={classes["orderProduct"]}>
      {orderData.map((data, key) => {
        return (
          <div key={key}>
            <h4>
              배송 {orderData.length}건 중 {key + 1}
            </h4>

            <div className={classes["orderProduct-info"]} key={key}>
              <p className={classes["orderProduct-info__deliveryDate"]}>
                지금 결제시
                <span
                  className={classes["orderProduct-info__deliveryDate__date"]}
                >
                  {deliveryDate}
                </span>
                까지 도착 보장
              </p>

              <div className={classes["orderProduct-info__content"]}>
                <Card className={classes["orderProduct-info__content__img"]}>
                  <img src={data.image} alt={data.title} />
                </Card>

                <div className={classes["orderProduct-info-content__info"]}>
                  <Link to={"/products/" + data.productId}>
                    <p>상품명 : {data.title}</p>
                  </Link>
                  <p>구매수량 : {data.sQuantity}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderProduct;
