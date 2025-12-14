import React from "react";
import HomeProduct from "./HomeProduct";

import classes from "./HomeProducts.module.css";
import RecommendTag from "./RecommendTag";

const HomeProducts = (props) => {
  return (
    <section className={`${classes.products} ${props.className}`}>
      <h2>{props.title}</h2>
      <div className={classes["products-wrap"]}>
        {props.data.map((it, key) => {
          return (
            <HomeProduct data={it} key={key}>
              <RecommendTag />
            </HomeProduct>
          );
        })}
      </div>
    </section>
  );
};

export default HomeProducts;
