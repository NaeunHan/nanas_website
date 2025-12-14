import React from "react";

import classes from "./ProductShippingAnnounce.module.css";

const ProductShippingAnnounce = ({ productInquire, productData }) => {
  return (
    <div className={classes.productShippingAnnounce}>
      <section className={classes["productShippingAnnounce-section"]}>
        <h4 className={classes["productShippingAnnounce-title"]}>배송</h4>

        <table className={classes["productShippingAnnounce-table"]}>
          <tbody>
            <tr>
              <th>배송</th>
              <td>일반 택새 상품</td>
            </tr>
            <tr>
              <th>배송비</th>
              <td>2,500원</td>
            </tr>
            <tr>
              <th>도서산간 추가 배송비</th>
              <td>5,000원</td>
            </tr>
            <tr>
              <th>배송불가지역</th>
              <td>배송불가 지역이 없습니다.</td>
            </tr>
            <tr>
              <th>비례 배송비</th>
              <td>주문 상품 수량에 관계없이 배송비 부과</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={classes["productShippingAnnounce-section"]}>
        <h4 className={classes["productShippingAnnounce-title"]}>
          교환 / 환불
        </h4>

        <table className={classes["productShippingAnnounce-table"]}>
          <tbody>
            <tr>
              <th>반품배송비</th>
              <td>2,500원</td>
            </tr>
            <tr>
              <th>교환배송비</th>
              <td>5,000원</td>
            </tr>
            <tr>
              <th>보내실 곳</th>
              <td>[12345] 어딘지 궁금하신가요 NANAS</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={classes["productShippingAnnounce-section"]}>
        <h4 className={classes["productShippingAnnounce-section-info__title"]}>
          반품 / 교환 사유에 따른 요청 가능 기간
        </h4>
        <p className={classes["productShippingAnnounce-section-info__content"]}>
          반품 시 먼저 판매자와 연락하셔서 반품사유, 택배사, 배송비, 반품지 주소
          등을 협의하신 후 반품상품을 발송해 주시기 바랍니다.
        </p>
        <ul className={classes["productShippingAnnounce-section-info__list"]}>
          <li
            className={
              classes["productShippingAnnounce-section-info__list__item"]
            }
          >
            구매자 단순 변심은 상품 수령후 7일 이내
            <span
              className={
                classes[
                  "productShippingAnnounce-section-info__list__item__refer"
                ]
              }
            >
              (구매자 반품배송비 부담)
            </span>
          </li>
          <li
            className={
              classes["productShippingAnnounce-section-info__list__item"]
            }
          >
            표시.광과와 상이, 상푸하자의 경우 상품 수령후 3개월 이내 혹은
            표시/광고와 다른 사실을 안 날로부터 30일 이내.
            <br />둘 중 하나 경과시 반품 / 교환 불가
            <span
              className={
                classes[
                  "productShippingAnnounce-section-info__list__item__refer"
                ]
              }
            >
              (판매자 반품배송비 부담)
            </span>
          </li>
        </ul>
      </section>

      <section className={classes["productShippingAnnounce-section"]}>
        <h4 className={classes["productShippingAnnounce-section-info__title"]}>
          반품 / 교환 불가능 사유
        </h4>
        <p className={classes["productShippingAnnounce-section-info__content"]}>
          아래와 같은 경우 반품 / 교환이 불가능합니다.
        </p>
        <ul className={classes["productShippingAnnounce-section-info__list"]}>
          <li
            className={
              classes["productShippingAnnounce-section-info__list__item"]
            }
          >
            반품요청기간이 지난 경우
          </li>
          <li
            className={
              classes["productShippingAnnounce-section-info__list__item"]
            }
          >
            구매자의 책임 있는 사유로 상품 등이 멸실 또는 훼손된 경우
            <span
              className={
                classes[
                  "productShippingAnnounce-section-info__list__item__refer"
                ]
              }
            >
              (단, 상품의 내용을 확인하기 위하여 포장 등을 훼손한 경우는 제외)
            </span>
          </li>
          <li
            className={
              classes["productShippingAnnounce-section-info__list__item"]
            }
          >
            포장을 개봉하였으나 포장이 훼손되어 상품가치가 현저히 상실된 경우
            <span
              className={
                classes[
                  "productShippingAnnounce-section-info__list__item__refer"
                ]
              }
            >
              (예 : 식품, 화장품)
            </span>
          </li>
          <li
            className={
              classes["productShippingAnnounce-section-info__list__item"]
            }
          >
            구매자의 사용 또는 일부 소비에 의하여 상품의 가치가 현저히 감소한
            경우
            <span
              className={
                classes[
                  "productShippingAnnounce-section-info__list__item__refer"
                ]
              }
            >
              (라벨이 떨어진 의류 또는 태그가 떨어진 명품관 상품인 경우)
            </span>
          </li>
          <li
            className={
              classes["productShippingAnnounce-section-info__list__item"]
            }
          >
            시간의 경과에 의하여 재판매가 곤란할 정도로 상품 등의 가치가 현저히
            감소한 경우
            <span
              className={
                classes[
                  "productShippingAnnounce-section-info__list__item__refer"
                ]
              }
            >
              (예 : 식품, 화장품)
            </span>
          </li>
          <li
            className={
              classes["productShippingAnnounce-section-info__list__item"]
            }
          >
            고객주문 확인 후 상품제작에 들어가는 주문제작상품
          </li>
          <li
            className={
              classes["productShippingAnnounce-section-info__list__item"]
            }
          >
            복제가 가능한 상품 등의 포장을 훼손한 경우
            <span
              className={
                classes[
                  "productShippingAnnounce-section-info__list__item__refer"
                ]
              }
            >
              (CD / DVD / GAME / 도서의 경우 포장 개봉 시)
            </span>
          </li>
        </ul>
      </section>

      <section className={classes["productShippingAnnounce-section"]}>
        <h4 className={classes["productShippingAnnounce-title"]}>
          판매자 정보
        </h4>

        <table className={classes["productShippingAnnounce-table"]}>
          <tbody>
            <tr>
              <th>상호</th>
              <td>{productData.mallname}</td>
            </tr>
            <tr>
              <th>대표자</th>
              <td>신짱구</td>
            </tr>
            <tr>
              <th>사업장소재지</th>
              <td>부산 어딘가 어딘가로 12번길 12 어딘가 3층</td>
            </tr>
            <tr>
              <th>고객센터 전화번호</th>
              <td>02-1234-1234</td>
            </tr>
            <tr>
              <th>E-mail</th>
              <td>email@email.com</td>
            </tr>
            <tr>
              <th>사업자 등록번호</th>
              <td>000-00-00000</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default ProductShippingAnnounce;
