import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiShoppingCart2Line } from "react-icons/ri";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { authCheck, cookieCheck } from "../../../util/authCheck";
import { getUser } from "../../../util/getUser";
import Card from "../../UI/Card";

import classes from "./SaleProduct.module.css";

const SaleProduct = ({ data }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [isLogin, setIsLogin] = useState(false);

  const handleInsertCart = async () => {
    if (isLogin) {
      await axios
        .post("http://localhost:5000/order/api/cart/insert", {
          sQuantity: 1,
          uId: user.uId,
          productId: data.productId,
        })
        .then((response) => {
          if (response.data.status === 200) {
            if (window.confirm(response.data.message)) {
              navigate("/cart");
            }
          }
        });
    } else {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  };

  useEffect(() => {
    cookieCheck(setIsLogin, setUser);
  }, []);
  return (
    <Card className={classes.saleProduct}>
      <Link
        className={classes["product-link"]}
        to={`/products/${data.productId}`}
      >
        <div className={classes["saleProduct-img"]}>
          <img src={data.image} alt={data.title} />
        </div>
      </Link>

      <div className={classes["saleProduct-infoWrap"]}>
        <div className={classes["saleProduct-info"]}>
          <p className={classes["saleProduct-info-price"]}>
            {data.price.toLocaleString("ko-kr")}원
            <span className={classes["saleProduct-info-price__percent"]}>
              {data.pDiscount}%
            </span>
          </p>

          <Link
            className={classes["product-link"]}
            to={`/products/${data.productId}`}
          >
            <p className={classes["saleProduct-info-title"]}>{data.title}</p>
          </Link>
        </div>

        <p className={classes["saleProduct-info-review"]}>
          <span className={classes["saleProduct-info-review__star"]}>★</span>
          <span>{`상품평 ( ${data.pReviewCount} )`}</span>
          <span className={classes["saleProduct-info-review__split"]}>|</span>

          <span>{`누적 판매량 ( ${data.pReviewCount} )`}</span>
          <span className={classes["saleProduct-info-review__cart"]}>
            <RiShoppingCart2Line onClick={handleInsertCart} />
          </span>
        </p>
      </div>
    </Card>
  );
};

export default SaleProduct;
