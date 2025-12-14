import React from "react";
import { Link } from "react-router-dom";
import Card from "../../UI/Card";
import SearchItem from "../search/SearchItem";

import classes from "./Banner.module.css";

const Banner = ({ products }) => {
  return (
    <div className={classes.banner}>
      {products.map((data, idx) => {
        return <SearchItem data={data} key={idx} />;
      })}
    </div>
  );
};

export default Banner;
