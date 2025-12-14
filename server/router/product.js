const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();
const db = require("../db/db");
const router = express.Router();
const cookieParser = require("cookie-parser");
const cors = require("cors");

router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(
  cors({
    origin: true,
    credentials: true,
  })
);

/**
 * 공통: 프론트 type → 실제 카테고리명 매핑
 */
const categoryMap = {
  life: "생활/건강",
  digital: "디지털/가전",
  fashionaccessories: "패션잡화",
  furniture: "가구/인테리어",
  maternity: "출산/육아",
  fashionclothes: "패션의류",
  foods: "식품",
  sportsleisure: "스포츠/레저",
};

/**
 * ✅ 홈 / 베스트 상품
 */
router.get("/api/get/products", (req, res) => {
  const startNum = Number(req.query.startNum) || 0;
  const limit = 20;

  const sqlAll = `
    SELECT
      pId AS productId,
      pName AS title,
      pPrice AS price,
      pImg AS image,
      pSellCount,
      0 AS pDiscount,
      0 AS pReviewCount,
      2500 AS pDeliveryFee,
      pCategory AS mallname
    FROM products;
  `;

  const sqlBest = `
    SELECT
      pId AS productId,
      pName AS title,
      pPrice AS price,
      pImg AS image,
      pSellCount,
      0 AS pDiscount,
      0 AS pReviewCount,
      2500 AS pDeliveryFee,
      pCategory AS mallname
    FROM products
    ORDER BY pSellCount DESC
    LIMIT ?, ?;
  `;

  db.query(sqlAll + sqlBest, [startNum, limit], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({
      result,
      startNum: result[1].length ? startNum + limit : startNum,
      moreData: result[1].length === limit,
    });
  });
});

/**
 * ✅ 상품 상세
 */
router.get("/api/get/productinfo/:getIdx", (req, res) => {
  const { getIdx } = req.params;

  const sql = `
    SELECT
      pId AS productId,
      pName AS title,
      pPrice AS price,
      pImg AS image,
      pSellCount,
      pStock,
      pDesc,
      0 AS pDiscount,
      0 AS pReviewCount,
      2500 AS pDeliveryFee,
      pCategory AS mallname
    FROM products
    WHERE pId = ?;
  `;

  db.query(sql, [getIdx], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({
      productData: result[0],
      productInquire: [],
    });
  });
});

/**
 * ✅ 카테고리 진입 (첫 페이지)
 */
router.get("/api/get/products/category", (req, res) => {
  const type = req.query.type;
  const category = categoryMap[type];

  if (!category) {
    return res.status(400).json({ error: "invalid category type" });
  }

  const sql = `
    SELECT
      pId AS productId,
      pName AS title,
      pPrice AS price,
      pImg AS image,
      pSellCount,
      0 AS pDiscount,
      0 AS pReviewCount,
      2500 AS pDeliveryFee,
      pCategory AS mallname
    FROM products
    WHERE pCategory = ?
    ORDER BY pId DESC
    LIMIT 0, 20;
  `;

  db.query(sql, [category], (err, products) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({
      category,
      category2: [], // 중분류 없음 → 빈 배열
      products,
    });
  });
});

/**
 * ✅ 카테고리 무한스크롤
 */
router.get("/api/get/products/category/fetchData", (req, res) => {
  const type = req.query.type;
  const category = categoryMap[type];
  const startNum = Number(req.query.startNum) || 0;
  const offsetNum = Number(req.query.offsetNum) || 20;

  if (!category) {
    return res.status(400).json({ error: "invalid category type" });
  }

  const sql = `
    SELECT
      pId AS productId,
      pName AS title,
      pPrice AS price,
      pImg AS image,
      pSellCount,
      0 AS pDiscount,
      0 AS pReviewCount,
      2500 AS pDeliveryFee,
      pCategory AS mallname
    FROM products
    WHERE pCategory = ?
    ORDER BY pId DESC
    LIMIT ?, ?;
  `;

  db.query(sql, [category, startNum, offsetNum], (err, products) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({
      products,
      startNum: products.length ? startNum + offsetNum : startNum,
      offsetNum,
      moreData: products.length === offsetNum,
    });
  });
});

/**
 * ✅ 중분류 / 소분류 (DB에 없으므로 안전 처리)
 */
router.get("/api/get/products/subcategory", (req, res) => {
  res.json({ category3: [], products: [] });
});

router.get("/api/get/products/subcategory2", (req, res) => {
  res.json({ result: [] });
});

module.exports = router;
