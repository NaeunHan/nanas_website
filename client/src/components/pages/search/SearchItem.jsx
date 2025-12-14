import React, { useEffect, useState } from "react";
import Card from "../../UI/Card";
import { RiShoppingCart2Line } from "react-icons/ri";
import classes from "./SearchItem.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { cookieCheck } from "../../../util/authCheck";

const SearchItem = ({ data }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    cookieCheck(setIsLogin, setUser);
  }, []);

  // 🔥 가장 중요: data 없으면 절대 렌더 안 함
  if (!data) return null;

  // ✅ 네이버 오픈 API 기준 필드만 사용
  const productId = data.productId ?? null;

  const title = String(data.title ?? "")
    .replace(/<[^>]*>/g, "")
    .trim();

  const price = Number(
    String(data.lprice ?? "0").replace(/[^0-9]/g, "")
  );

  const mallName = data.mallName ?? "";
  const image = data.image ?? "";

  // 🔥 title이나 price 없으면 렌더 안 함 (화이트스크린 방지)
  if (!title || !price) return null;

  const handleInsertCart = async () => {
    if (!isLogin) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    if (!productId) {
      alert("상품 ID가 없어 장바구니에 담을 수 없습니다.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/order/api/cart/insert", {
        sQuantity: 1,
        uId: user?.uId,
        productId: productId,
      });
      alert("장바구니에 담았습니다.");
    } catch (err) {
      console.error(err);
      alert("장바구니 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={classes.searchItem}>
      <Link className={classes["product-link"]} to={`/products/${productId}`}>
        <Card className={classes["searchItem-img"]}>
          {image ? (
            <img src={image} alt={title} />
          ) : (
            <div style={{ height: 120 }} />
          )}
        </Card>
      </Link>

      <div className={classes["searchItem-info"]}>
        <p className={classes["searchItem-info-mallname"]}>{mallName}</p>

        <Link className={classes["product-link"]} to={`/products/${productId}`}>
          <p className={classes["searchItem-info-title"]}>
            {title.length > 45 ? title.substring(0, 45) + "..." : title}
          </p>
        </Link>

        <p className={classes["searchItem-info-price"]}>
          {price.toLocaleString("ko-kr")}원
        </p>

        <p className={classes["searchItem-info-review"]}>
          <span className={classes["searchItem-info-review__cart"]}>
            <RiShoppingCart2Line onClick={handleInsertCart} />
          </span>
        </p>
      </div>
    </div>
  );
};

export default SearchItem;
