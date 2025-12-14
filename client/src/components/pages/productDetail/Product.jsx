import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import ProductQnA from "./ProductQnA";
import ProductReview from "./ProductReview";
import ProductShippingAnnounce from "./ProductShippingAnnounce";
import classes from "./Product.module.css";
import { FaAngleUp, FaAngleDown, FaAngleRight } from "react-icons/fa";
import Card from "../../UI/Card";
import { getUser } from "../../../util/getUser";
import {
  authCheck,
  cookieCheck,
  cookieCheckLogin,
} from "../../../util/authCheck";
import { useSelector } from "react-redux";

const Product = () => {
  const navigate = useNavigate();
  // const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState();
  const [currentData, setCurrentData] = useState({
    productData: [],
    productInquire: [],
  });

  const [currentMenu, setCurrentMenu] = useState("상품 상세");
  const [currentImg, setCurrentImg] = useState();
  const [orderValue, setOrderValue] = useState(1);
  const [order, setOrder] = useState([]);
  const { getIdx } = useParams();

  const { productData, productInquire } = currentData;

  const realPrice =
    (productData.price - productData.price * (productData.pDiscount / 100)) *
    orderValue;

  const isLogin = useSelector((state) => state.isLogin.isLogin);

  const handleInsertCart = async () => {
    if (!isLogin) {
      if (window.confirm("로그인이 필요합니다.")) {
        navigate("/login");
      }
    } else {
      // await axios
      //   .post("http://localhost:5000/order/api/cart/insert", {
      //     sQuantity: orderValue,
      //     uId: user.uId,
      //     productId: productData.productId,
      //   })
      //   .then((response) => {
      //     if (response.data.status === 200) {
      //       if (window.confirm(response.data.message)) {
      //         navigate("/cart");
      //       }
      //     }
      //   });
      alert("asdasd");
    }
  };

  const setPreviewImg = (e) => {
    setCurrentImg(e.target.src);
  };
  const setOrderAmount = (e) => {
    const regex = /^[0-9]+$/;
    if (regex.test(e.target.value)) {
      if (Number.parseInt(e.target.value) > 50) {
        alert("한 번에 주문 가능한 수량은 50개까지입니다");
        setOrderValue(Number.parseInt(1));
      } else {
        setOrderValue(Number.parseInt(e.target.value));
      }
    } else {
      setOrderValue("");
    }
  };
  const setOrderUp = () => {
    if (orderValue < 50) {
      setOrderValue(orderValue + 1);
    } else {
      alert("한 번에 주문 가능한 수량은 50개까지입니다");
      setOrderValue(1);
    }
  };
  const setOrderDown = () => {
    if (orderValue > 1) {
      setOrderValue(orderValue - 1);
    } else {
      setOrderValue(1);
    }
  };
  const sendOrderData = () => {
    if (!isLogin) {
      // cookieCheckLogin(setIsLogin);
      if (window.confirm("로그인이 필요합니다.")) {
        navigate("/login");
      }
    } else {
      navigate("/order", { state: { order } });
    }
  };

  useEffect(() => {
    // cookieCheck(setIsLogin, setUser);

    const fetchData = async () => {
      await axios
        .get("http://localhost:5000/product/api/get/productinfo/" + getIdx)
        .then((response) => {
          const { productData, productInquire } = response.data;

          setCurrentData({
            productData: productData[0],
            productInquire: productInquire,
          });
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    setOrder([
      {
        title: productData.title,
        sQuantity: orderValue,
        price:
          productData.price - productData.price * (productData.pDiscount / 100),
        productId: productData.productId,
        image: productData.image,
        pDeliveryFee: productData.pDeliveryFee,
      },
    ]);
    setCurrentImg(productData.image);
  }, [productData, orderValue]);

  return (
    <React.Fragment>
      <div className={classes["product-path"]}>
        <Link to={"/"}>홈</Link> <FaAngleRight />
        {/* 카테고리 대중소 */}
        <Link>{productData.category1}</Link>
        {
          <>
            {productData.category4 !== "" ? (
              <>
                <FaAngleRight /> <Link>{productData.category2}</Link>
                <FaAngleRight /> <Link>{productData.category3}</Link>
                <FaAngleRight /> <Link>{productData.category4}</Link>
              </>
            ) : (
              <>
                {productData.category3 !== "" ? (
                  <>
                    <FaAngleRight /> <Link>{productData.category2}</Link>
                    <FaAngleRight /> <Link>{productData.category3}</Link>
                  </>
                ) : (
                  <>
                    {productData.category2 !== "" ? (
                      <>
                        <FaAngleRight /> <Link>{productData.category2}</Link>
                      </>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </>
            )}
          </>
        }
      </div>
      <div className={classes["product-content"]}>
        <div className={classes["product-content-img"]}>
          <div className={classes["product-content-img-List"]}>
            <div className={classes["product-content-img-item"]}>
              <img src={productData.image} alt="" onClick={setPreviewImg} />
            </div>
            <div className={classes["product-content-img-item"]}>
              <img src={productData.image} alt="" onClick={setPreviewImg} />
            </div>
            <div className={classes["product-content-img-item"]}>
              <img src={productData.image} alt="" onClick={setPreviewImg} />
            </div>
          </div>
          <Card className={classes["product-content-img-main"]}>
            <img src={currentImg} alt="" />
          </Card>
        </div>
        <div className={classes["product-content-detail"]}>
          <div className={classes["product-content-detail-mall"]}>
            <h4>
              <Link>{productData.mallname}</Link>
            </h4>
            <h2>{productData.title}</h2>
            <p className={classes["product-content-detail__rating"]}>
              상품평점
              <span className={classes["product-content-detail__rating__star"]}>
                ★★★★★
              </span>
            </p>
          </div>
          <div className={classes["product-content-detail-price"]}>
            {/* 할인율 */}
            <h3 className={classes["product-content-detail-price__discount"]}>
              {productData.pDiscount}
              <span
                className={classes["product-content-detail-price__percent"]}
              >
                %
              </span>
            </h3>
            {/*  할인율 적용된 가격 */}
            <h2 className={classes["product-content-detail-price__realPrice"]}>
              {Math.round(realPrice).toLocaleString("ko-kr")}원
            </h2>
            {/* 원가 */}
            <h3 className={classes["product-content-detail-price__price"]}>
              {productData.price}
            </h3>
          </div>
          <p className={classes["product-content-detail__getMile"]}>
            상품 구매시
            <span
              className={classes["product-content-detail__getMile__number"]}
            >
              {Math.ceil(realPrice * 0.03)}
            </span>
            마일리지 적립
          </p>
          <div className={classes["product-content-detail-deliveryInfo"]}>
            <span
              className={classes["product-content-detail-deliveryInfo__title"]}
            >
              배송
            </span>
            <span>상품 정보 참고</span>
          </div>
          <div className={classes["product-content-detail-order"]}>
            <div>
              <input
                type="text"
                className={classes["product-content-detail-order-input"]}
                value={orderValue}
                onChange={setOrderAmount}
              />
              <button
                className={classes["product-content-detail-order-up"]}
                onClick={setOrderUp}
              >
                <FaAngleUp />
              </button>
              <button
                className={classes["product-content-detail-order-down"]}
                onClick={setOrderDown}
              >
                <FaAngleDown />
              </button>
            </div>
            <div>
              <button
                className={classes["product-content-detail-order-btn-addcart"]}
                onClick={handleInsertCart}
              >
                장바구니 담기
              </button>
            </div>
            <div>
              <button
                className={classes["product-content-detail-order-btn-purchase"]}
                onClick={sendOrderData}
              >
                구매하기
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={classes["product-infos"]}>
        <li
          className={currentMenu === "상품 상세" ? classes.click : ""}
          onClick={() => setCurrentMenu("상품 상세")}
        >
          상품 상세
        </li>
        <li
          className={currentMenu === "상품평" ? classes.click : ""}
          onClick={() => setCurrentMenu("상품평")}
        >
          상품평
          <span className={classes["product-infos__amount"]}>{`( ${
            productInquire.filter((it) => it.bBoardtype === "리뷰").length
          } )`}</span>
        </li>
        <li
          className={currentMenu === "문의" ? classes.click : ""}
          onClick={() => setCurrentMenu("문의")}
        >
          문의
          <span className={classes["product-infos__amount"]}>
            {`( ${
              productInquire.filter((it) => it.bBoardtype !== "리뷰").length
            } )`}
          </span>
        </li>

        <li
          className={currentMenu === "상품배송교환" ? classes.click : ""}
          onClick={() => setCurrentMenu("상품배송교환")}
        >
          상품배송교환
        </li>
      </div>
      <div>
        {currentMenu === "상품평" ? (
          <ProductReview productInquire={productInquire} />
        ) : currentMenu === "문의" ? (
          <ProductQnA productInquire={productInquire} />
        ) : currentMenu === "상품배송교환" ? (
          <ProductShippingAnnounce productData={productData} />
        ) : (
          <ProductDetail productData={productData} />
        )}
      </div>
    </React.Fragment>
  );
};

export default Product;
