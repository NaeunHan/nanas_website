import axios from "axios";
import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import classes from "./ProductCategoryListDetail.module.css";

const ProductCategoryListDetail = ({ title, type, subtitle, setProducts }) => {
  const [searchParams] = useSearchParams();
  const type3 = searchParams.get("type3");

  // ✅ URL의 type3가 바뀔 때만 fetch
  useEffect(() => {
    if (!type3) return;

    const fetchData2 = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/product/api/get/products/subcategory2?type3=${encodeURIComponent(
            type3
          )}`
        );
        setProducts(res.data.result ?? []);
      } catch (e) {
        console.error(e);
        setProducts([]);
      }
    };

    fetchData2();
  }, [type3, setProducts]);

  return (
    <div className={classes["productsCategory-categoryList-items"]}>
      <li>
        {/* ✅ 클릭 시 state 건드리지 말고 URL만 변경 */}
        <Link to={`/categories?type=${type}&type2=${subtitle}&type3=${encodeURIComponent(title)}`}>
          {title}
        </Link>
      </li>
    </div>
  );
};

export default ProductCategoryListDetail;
