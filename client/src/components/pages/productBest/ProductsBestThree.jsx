import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiShoppingCart2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { cookieCheck } from "../../../util/authCheck";
import Card from "../../UI/Card";

import classes from "./ProductsBestThree.module.css";

const ProductsBestTen = ({ data }) => {
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
    <Card className={classes.productsBestTen}>
      <Card className={classes["product-img"]}>
        <img src={data.image} alt={data.title} />
      </Card>

      <div className={classes["product-content"]}>
        <p className={classes["product-content-mall"]}>{data.mallname}</p>
        <h3 className={classes["product-content-title"]}>{data.title}</h3>

        <div className={classes["product-content-priceInfo"]}>
          <p className={classes["product-content-price"]}>{data.price}</p>

          <p className={classes["product-content-realPrice"]}>
            {(data.price - (data.price * data.pDiscount) / 100).toLocaleString(
              "ko-kr"
            )}
            원
            <span className={classes["product-content-percent"]}>
              {data.pDiscount}%
            </span>
          </p>

          <p className={classes["product-conten-review"]}>
            <span className={classes["product-conten-review__star"]}>★</span>
            <span>{`상품평 ( ${data.pReviewCount} )`}</span>
            <span className={classes["product-conten-review__split"]}>|</span>

            <span>{`누적 판매량 ( ${data.pSellCount} )`}</span>
            <span className={classes["product-conten-review__cart"]}>
              <RiShoppingCart2Line onClick={handleInsertCart} />
            </span>
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ProductsBestTen;
