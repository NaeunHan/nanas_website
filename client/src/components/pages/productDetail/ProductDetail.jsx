import React from "react";

import { HiOutlineExclamationCircle } from "react-icons/hi";
import { TbZoomQuestion } from "react-icons/tb";

import classes from "./ProductDetail.module.css";
const ProductDetail = ({ productData }) => {
  return (
    <div className={classes.productDetail}>
      <img
        src={productData.image}
        alt={productData.title}
        className={classes["productDetail-product__img"]}
      />

      <div className={classes["productDetail-product-info1"]}>
        <p>
          <HiOutlineExclamationCircle
            className={classes["productDetail-product-info1__icon"]}
          />
        </p>
        <span
          className={classes["productDetail-product-info1__changeInfo__title"]}
        >
          디자인 변경 안내
        </span>

        <p
          className={
            classes["productDetail-product-info1__changeInfo__content"]
          }
        >
          상품에 대한 고객님들의 리뷰들을 참고하여
          <br />
          <span
            className={
              classes[
                "productDetail-product-info1__changeInfo__content__strong"
              ]
            }
          >
            상품의 디자인이 보다 실용적으로 변경
          </span>
          되었음을
          <br /> 안내드립니다.
        </p>

        <p
          className={
            classes["productDetail-product-info1__changeInfo__content"]
          }
        >
          보다 좋아진{" "}
          <span
            className={
              classes[
                "productDetail-product-info1__changeInfo__content__strong"
              ]
            }
          >
            공간 효율로 인해
          </span>
          <br />
          사용이 편리해요!
        </p>

        <img
          src={productData.image}
          alt={productData.title}
          className={
            classes["productDetail-product-info1__changeInfo__content__img"]
          }
        />
      </div>
      <p
        className={
          classes[
            "productDetail-product-info1__changeInfo__content__assistance"
          ]
        }
      >
        *이전 상품이 사용이 어렵다는 고객님들의 의견이 있어
        <br />
        더욱 튼튼하고 견고하며 사용이 보다 편리하게 디자인이 변경 되었습니다.
        <br />
        주문시 위 이미지의 상품으로 발송되는점 참고 부탁드립니다.
      </p>

      <img
        src={productData.image}
        alt={productData.title}
        className={classes["productDetail-product__img"]}
      />

      <p className={classes["productDetail-product-info2__title"]}>
        <TbZoomQuestion
          className={classes["productDetail-product-info2__icon"]}
        />
        꼭 알아야할 상품 정보
      </p>

      <table className={classes["productDetail-product-info2__table"]}>
        <tbody>
          <tr>
            <th>재질</th>
            <td>PP, 폴리프로필렌, 나일론 외</td>
          </tr>
          <tr>
            <th>사이즈</th>
            <td></td>
          </tr>
          <tr>
            <th>제조원</th>
            <td>중국</td>
          </tr>
          <tr>
            <th>제조국</th>
            <td>중국</td>
          </tr>
        </tbody>
      </table>
      <p className={classes["productDetail-product-info2__assistance"]}>
        *재는 위치에 따라 사이즈가 상이할 수 있습니다.
      </p>

      <img
        src={productData.image}
        alt={productData.title}
        className={classes["productDetail-product__img"]}
      />
    </div>
  );
};

export default ProductDetail;
