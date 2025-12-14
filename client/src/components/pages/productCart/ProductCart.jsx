import React, { useState } from "react";
import classes from "./ProductCart.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUser } from "../../../util/getUser";
import { useEffect } from "react";
import { authCheck } from "../../../util/authCheck";
import ProductCartItem from "./ProductCartItem";
const ProductCart = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState({
    productPrice: 0,
    deliveryFee: 0,
  });
  const [checkedItems, setCheckedItems] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

  // 선택삭제 클릭
  const handleDelete = async () => {
    setCheckedItems([]);
    const cartIdx = [];
    let newCart = [...cart];

    checkedItems.forEach((it) => {
      cartIdx.push(cart[it - 1].idx);
    });

    checkedItems.forEach((it) => {
      newCart.splice(it - 1, 1, 0);
    });

    setCart(newCart.filter((it) => it !== 0));
    setTotalPrice({
      productPrice: 0,
      deliveryFee: 0,
    });

    await axios.post("http://localhost:5000/order/api/cart/delete", {
      cartIdx,
    });
  };

  // 결제 버튼 클릭
  const handlePayment = () => {
    // 상품 전체 선택시
    if (checkedItems.length === 0) {
      alert("상품을 선택해주세요");
    } else if (checkedItems.length === cart.length) {
      navigate("/order", { state: { order: cart } });
    } else {
      const orderData = checkedItems.map((it) => cart[it - 1]);

      navigate("/order", { state: { order: orderData } });
    }
  };

  // 상품 체크
  const handleCheck = (checked, id) => {
    let price = 0;

    let delivery = 0;

    if (checked) {
      if (id === "allChecked") {
        setIsAllChecked(true);
        setCheckedItems([]);

        cart.forEach((it, idx) => {
          price += it.price * +it.sQuantity;

          delivery += it.pDeliveryFee;

          setTotalPrice({ productPrice: price, deliveryFee: delivery });

          setCheckedItems((prev) => {
            return [...prev, idx + 1];
          });
        });

        return;
      }
      setCheckedItems([...checkedItems, id]);

      price = cart[id - 1].price * cart[id - 1].sQuantity;

      setTotalPrice({
        deliveryFee: totalPrice.deliveryFee + cart[id - 1].pDeliveryFee,
        productPrice: totalPrice.productPrice + price,
      });
    } else {
      setIsAllChecked(false);
      if (id === "allChecked") {
        setCheckedItems([]);

        setTotalPrice({ productPrice: 0, deliveryFee: 0 });
        return;
      }

      setCheckedItems(checkedItems.filter((it) => it !== id));

      price = cart[id - 1].price * cart[id - 1].sQuantity;

      setTotalPrice({
        deliveryFee: totalPrice.deliveryFee - cart[id - 1].pDeliveryFee,
        productPrice: totalPrice.productPrice - price,
      });
    }
  };

  useEffect(() => {
    //권한체크 겸 토큰갱신
    authCheck();
    getUser(setUser);
    // 사용자 장바구니 정보 가져오기
    const fetchCartData = async () => {
      await axios
        .get("http://localhost:5000/order/api/get/cartData", {
          withCredentials: true,
        })
        .then((response) => {
          response.data.forEach((it) => {
            it.price = it.price - Math.ceil((it.price * it.pDiscount) / 100);
          });

          setCart(response.data);
        });
    };

    fetchCartData();
  }, []);

  return (
    <div className={classes["productcart-wrapper"]}>
      <div className={classes["productcart-cart"]}>
        <div className={classes["productcart-cart-handler"]}>
          <div className={classes["productcart-cart-handler__allcheck"]}>
            <input
              id="allCheck"
              type="checkbox"
              checked={isAllChecked}
              onChange={(e) => handleCheck(e.target.checked, "allChecked")}
            />
            <label htmlFor="allCheck">전체 선택</label>
          </div>

          <button
            className={classes["productcart-cart-handler__delete"]}
            onClick={handleDelete}
          >
            선택 삭제
          </button>
        </div>

        <ProductCartItem
          onCheck={handleCheck}
          isAllChecked={isAllChecked}
          checkedItems={checkedItems}
          cart={cart}
        />
      </div>

      <div className={classes["productcart-order"]}>
        <div className={classes["productcart-order-point"]}>
          <h3>적립혜택</h3>
          <p>적립 혜택이 없습니다.</p>
        </div>
        <div className={classes["productcart-order-purchase"]}>
          <h3>결제 예정금액</h3>
          <div className={classes["productcart-order-purchase-product"]}>
            <h4>상품금액</h4>
            <p>
              <strong>{totalPrice.productPrice.toLocaleString("ko-kr")}</strong>
              원
            </p>
          </div>
          <div className={classes["productcart-order-purchase-discount"]}>
            <h4>총 배송비</h4>
            <p>
              <strong>{totalPrice.deliveryFee.toLocaleString("ko-kr")}</strong>
              원
            </p>
          </div>
          <div className={classes["productcart-order-purchase-total"]}>
            <h4 className={classes["productcart-order-purchase-total__title"]}>
              결제금액
            </h4>
            <span
              className={classes["productcart-order-purchase-total__price"]}
            >
              {(
                totalPrice.productPrice + totalPrice.deliveryFee
              ).toLocaleString("ko-kr")}
              원
            </span>
          </div>
          <div className={classes["productcart-order-purchase-btn"]}>
            <input type={"button"} value="주문하기" onClick={handlePayment} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
