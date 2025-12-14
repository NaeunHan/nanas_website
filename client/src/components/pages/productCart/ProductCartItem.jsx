import React from "react";

import Card from "../../UI/Card";

import logo from "../../../assets/icons/siba.png";

import classes from "./ProductCartItem.module.css";

const ProductCartItem = React.memo(
  ({ onCheck, isAllChecked, checkedItems, cart }) => {
    return (
      <ul className={classes["productcart-items"]}>
        {!cart.length && (
          <li className={classes["productcart-noneItem"]}>
            <img src={logo} alt="logo" />
            <h3 className={classes["productcart-noneItem-content"]}>
              장바구니에 담긴 상품이 없습니다.
            </h3>
          </li>
        )}

        {cart.length !== 0 &&
          cart.map((data, idx) => (
            <li key={idx} className={classes["productcart-item"]}>
              <input
                type="checkbox"
                className={classes["productcart-item-check"]}
                onChange={(e) => onCheck(e.target.checked, idx + 1)}
                checked={
                  isAllChecked
                    ? "checked"
                    : checkedItems.find((it) => it === idx + 1)
                    ? "checked"
                    : ""
                }
              />
              <h3 className={classes["productcart-item-mallName"]}>
                {data.mallname}
              </h3>

              <div className={classes["productcart-item-info"]}>
                <Card className={classes["productcart-item-info__img"]}>
                  <img src={data.image} alt={data.title} />
                </Card>

                <h4 className={classes["productcart-item-info__title"]}>
                  {data.title}
                </h4>
              </div>
              <div className={classes["productcart-item-price"]}>
                <p className={classes["productcart-item-price__amount"]}>
                  수량 : {data.sQuantity}
                </p>
                <p>가격 : {data.price.toLocaleString("ko-kr")}원</p>
              </div>

              <div className={classes["productcart-item-deliveryFee"]}>
                배송비
                <strong>{data.pDeliveryFee.toLocaleString("ko-kr")}</strong>원
              </div>
            </li>
          ))}
      </ul>
    );
  }
);

export default ProductCartItem;
