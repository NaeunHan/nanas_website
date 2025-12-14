const express = require("express");
require("dotenv").config();
const db = require("../db/db");
const router = express.Router();
const jwt = require("jsonwebtoken");
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

router.post("/api/addAddr", (req, res) => {
  const { uId, dName, dZipcode, dAddr, dAdditionalAddr, dPhone, dMemo } =
    req.body.addInfoValue;

  let sql1 = "INSERT INTO deliveryaddr VALUES(NULL, ?, ?, ?, ?, ?, ?, ?);";
  let sql2 =
    "UPDATE defaultaddress SET dName = ? , dZipcode = ?, dAddr = ?, dAdditionalAddr = ?, dPhone=?, dMemo=?  WHERE uId = ?;";

  db.query(
    sql1 + sql2,
    [
      uId,
      dName,
      dZipcode,
      dAddr,
      dAdditionalAddr,
      dPhone,
      dMemo,

      dName,
      dZipcode,
      dAddr,
      dAdditionalAddr,
      dPhone,
      dMemo,
      uId,
    ],
    (err) => {
      if (err) throw err;
    }
  );
});

router.get("/api/get/addr", (req, res) => {
  const token = req.cookies.accessToken;
  const data = jwt.verify(token, process.env.ACCESS_SECRET_KEY);

  let sql1 = "SELECT * FROM deliveryaddr WHERE uId = ?;";
  let sql2 = "SELECT * FROM defaultaddress WHERE uId = ?;";

  db.query(sql1 + sql2, [data.id, data.id], (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({
        status: 200,
        deliveryAddr: result[0],
        defaultAddr: result[1],
      });
    }
  });
});

router.post("/api/cart/insert", (req, res) => {
  const { uId, productId, sQuantity } = req.body;
  let sql = "INSERT INTO shoppingbasket VALUES ( NULL, ?, ?, ? );";

  db.query(sql, [uId, productId, sQuantity], (err) => {
    if (err) {
      throw err;
    } else {
      res.send({
        status: 200,
        message: "장바구니에 추가되었습니다. 장바구니로 이동하시겠습니까?",
      });
    }
  });
});

router.post("/api/cart/delete", (req, res) => {
  const { cartIdx } = req.body;

  let sql = "DELETE FROM shoppingbasket WHERE idx = ?;";

  cartIdx.forEach((it) => {
    db.query(sql, it, (err) => {
      if (err) throw err;
    });
  });
});

router.get("/api/get/cartData", (req, res) => {
  const token = req.cookies.accessToken;
  const data = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
  let sql =
    "SELECT * FROM products INNER JOIN shoppingbasket ON products.productId = shoppingbasket.productId where uId = ? ORDER BY idx DESC;";
  db.query(sql, data.id, (err, result) => {
    if (err) throw err;

    res.send(result);
  });
});

router.post("/api/order/Complete", (req, res) => {
  const { orderData, addrData, user, oUseMile, oGetMile, oMethod } = req.body;
  let sql1 =
    "INSERT INTO orderTable VALUES( NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW());";
  let sql2 =
    "UPDATE products SET pSellCount = pSellCount + ? WHERE productId = ?;";

  orderData.forEach((data) => {
    db.query(
      sql1 + sql2,
      [
        user.uId,
        data.productId,
        data.title,
        data.sQuantity,
        addrData.dName,
        addrData.dPhone,
        addrData.dZipcode,
        addrData.dAddr,
        addrData.dAdditionalAddr,
        addrData.dMemo,
        oUseMile,
        oGetMile,
        oMethod,
        data.sQuantity,
        data.productId,
      ],
      (err) => {
        if (err) {
          throw err;
        }
      }
    );
  });

  sql = "UPDATE users SET uMile = uMile-?+? WHERE uid = ?;";
  db.query(sql, [oUseMile, oGetMile, user.uId], (err) => {
    if (err) throw err;
  });
});

module.exports = router;
