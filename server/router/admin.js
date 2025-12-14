require("dotenv").config();
const express = require("express");
const router = express.Router();
const db = require("../db/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(
  cors({
    origin: true,
    credentials: true,
  })
);

router.post("/api/product/update", (req, res) => {
  const { productId, title, price, mallname, pDiscount } = req.body;

  let sql =
    "UPDATE products SET title = ?, price = ?, mallname = ?, pDiscount = ? WHERE productId = ?;";
  db.query(sql, [title, price, mallname, pDiscount, productId], (err) => {
    if (err) throw err;
  });
});

router.get("/api/get/orderList", (req, res) => {
  let sql = "SELECT * FROM ordertable ORDER BY idx DESC;";

  db.query(sql, (err, result) => {
    if (err) throw err;

    res.send(result);
  });
});

router.get("/api/get/productList", (req, res) => {
  let sql = "SELECT * FROM products";

  db.query(sql, (err, result) => {
    if (err) throw err;

    res.send(result);
  });
});

router.get("/api/boardList", (req, res) => {
  let sql = "SELECT * FROM board ORDER BY bId DESC";

  db.query(sql, (err, result) => {
    if (err) throw err;

    res.send(result);
  });
});

router.post("/api/delete/boardContent", (req, res) => {
  const bId = req.body.bId;
  let sql =
    "UPDATE board SET bContent = '관리자에 의해 삭제된 게시물입니다' WHERE bId = ?";
  db.query(sql, [bId], (err) => {
    if (err) throw err;
    res.send("게시물이 삭제되었습니다.");
  });
});

router.get("/api/userlist", (req, res) => {
  let sql = "SELECT * FROM users ORDER BY idx DESC;";

  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send({
      status: 200,
      result,
    });
  });
});

router.post("/api/updateUser", (req, res) => {
  const idx = req.body.detailUser.idx;
  const auth = req.body.sendAuth;
  let sql = "UPDATE users SET uAuth = ? WHERE idx = ?";

  db.query(sql, [auth, idx], (err) => {
    if (err) {
      throw err;
    }
    res.send({
      status: 200,
      message: "권한 변경 완료",
    });
  });
});

router.post("/api/userOut", (req, res) => {
  const uId = req.body.uId;
  let sql = "UPDATE users SET uAuth = 0 WHERE uId = ?";
  db.query(sql, [uId], (err) => {
    if (err) {
      throw err;
    } else {
      res.send("탈퇴 처리 완료");
    }
  });
});

module.exports = router;
