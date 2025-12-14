import React, { useEffect, useState } from "react";

import ProductCategoryList from "./ProductCategoryList";
import Banner from "../home/Banner";
import InfiniteScroll from "react-infinite-scroll-component";
import classes from "./ProductsCategory.module.css";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const ProductsCategory = () => {
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState("");
  const [category2, setCategory2] = useState([]);
  const [products, setProducts] = useState([]);
  const [offsetNum, setOffsetNum] = useState(0); //처음 시작을 몇 개 보여줄지
  const [startNum, setStartNum] = useState(20);
  const [hasMore, setHasmore] = useState(true);
  const [tmpNum, setTmpNum] = useState(0);
  const type = searchParams.get("type");

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          "http://localhost:5000/product/api/get/products/category?type=" + type
        )
        .then((response) => {
          setCategory(response.data.category);
          setCategory2(response.data.category2);
        });
    };
    fetchData();
  }, [type]);
  useEffect(() => {
    const fetchData2 = async () => {
      await axios
        .get(
          "http://localhost:5000/product/api/get/products/category/fetchData?startNum=" +
            startNum +
            "&offsetNum=" +
            offsetNum +
            "&type=" +
            type
        )
        .then((response) => {
          setProducts([...products, ...response.data.products]); //기존 자료 + 불러온 자료
          setTmpNum(response.data.startNum);
          setOffsetNum(response.data.offsetNum);
          setHasmore(response.data.moreData);
        });
    };
    fetchData2();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startNum]);
  const fetchData3 = () => {
    setStartNum(tmpNum);
  };
  // /api/get/products/category/fetchdata 추가데이터 받아오기
  return (
    <div className={classes.productsCategory}>
      {/* 좌측 카테고리 정렬 (상단 카테고리 중분류 + 소분류, 하단 대분류) */}
      <div className={classes["productsCategory-left"]} onClick={() => {}}>
        <h4>{category}</h4>
        {category2.map((it, idx) => (
          <ProductCategoryList
            title={it.category2}
            type={type}
            setProducts={setProducts}
            key={idx}
          />
        ))}
      </div>

      {/* 우측 상품 */}
      <div className={classes["productsCategory-right"]}>
        <h4>{category}</h4>
        <InfiniteScroll
          dataLength={products.length}
          next={fetchData3}
          hasMore={hasMore}
          endMessage={
            <div>
              <h1>더 이상 상품이 없습니다</h1>
            </div>
          }
          loading={<h1>Loading...</h1>}
          initialScrollY
        >
          <Banner
            className={classes["productsCategory-banner"]}
            products={products}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ProductsCategory;
