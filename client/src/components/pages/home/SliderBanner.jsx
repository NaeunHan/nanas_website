import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classes from "./SliderBanner.module.css";

const SliderBanner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
  };

  return (
    <div className={classes.sliderBanner}>
      <Slider {...settings} className={classes["sliderBanner-banner"]}>
        <div className={`${classes["sliderBanner-banner__item1"]}`}>
          <p className={`${classes["sliderBanner-banner__item1__title"]}`}>
            WELCOME
            <br /> NANAS SALE
          </p>
          <p className={`${classes["sliderBanner-banner__item1__sale"]}`}>
            <span className={classes["sliderBanner-banner__item1__count"]}>
              12
            </span>
            %
          </p>
          <p className={classes["sliderBanner-banner__item1__subTitle"]}>
            전상품 세일
          </p>
          <p className={classes["sliderBanner-banner__item1__period"]}>
            2025.12.13 ~
          </p>
        </div>
        <div className={classes["sliderBanner-banner__item2"]}></div>
        <div className={classes["sliderBanner-banner__item3"]}></div>
      </Slider>
    </div>
  );
};

export default SliderBanner;
