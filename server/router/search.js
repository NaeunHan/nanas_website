const express = require("express");
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

router.post("/api/getData", (req, res) => {
  const searchValue = req.query.keyword;
  const keyWord = `%${searchValue}%`;

  let sql =
    "SELECT * FROM products WHERE title LIKE ? OR mallname LIKE ? OR category1 LIKE ? OR category2 LIKE ? OR category3 LIKE ? OR category4 LIKE ? OR category3 LIKE ? OR category3 LIKE ?;";

  db.query(
    sql,
    [keyWord, keyWord, keyWord, keyWord, keyWord, keyWord, keyWord, keyWord],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

module.exports = router;
