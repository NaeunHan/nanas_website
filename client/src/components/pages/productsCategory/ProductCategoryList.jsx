import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HiArrowCircleDown } from "react-icons/hi";

import classes from "./ProductCategoryList.module.css";
import ProductCategoryListDetail from "./ProductCategoryListDetail";

const ProductCategoryList = ({ title, type, setProducts }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isShown, setIsShown] = useState(false);
  const [category3, setCategory3] = useState([]);

  const subtitle = searchParams.get("type2");

  // ✅ URL 변경될 때만 fetch
  useEffect(() => {
    if (!subtitle) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/product/api/get/products/subcategory?type2=${subtitle}`
        );
        setCategory3(res.data.category3);
        setProducts(res.data.products);
      } catch (e) {
        console.error(e);
        setCategory3([]);
        setProducts([]);
      }
    };

    fetchData();
  }, [subtitle, setProducts]);

  const handleSubtitle = () => {
    setIsShown((prev) => !prev);
    navigate(`/categories?type=${type}&type2=${title}`);
  };

  return (
    <ul className={classes["productsCategory-categoryList-wrap"]}>
      <div
        className={classes["productsCategory-categoryList"]}
        onClick={handleSubtitle}
      >
        {title} <HiArrowCircleDown />
      </div>

      {isShown && (
        <div className={classes["productsCategory-categoryList-items"]}>
          {category3.map((it) => (
            <ProductCategoryListDetail
              key={it.category3}
              title={it.category3}
              type={type}
              subtitle={subtitle}
              setProducts={setProducts}
            />
          ))}
        </div>
      )}
    </ul>
  );
};

export default ProductCategoryList;
