const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();
const db = require("../db/db");
const router = express.Router();
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const saltRounds = 10;

router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// id 중복 검사라서 get 사용
router.post("/api/duplication", (req, res) => {
  const { uId } = req.body;
  let sql = "SELECT COUNT(uId) FROM users WHERE uId = ?;";
  db.query(sql, [uId], (err, result) => {
    if (err) {
      throw err;
    } else {
      if (result[0]["COUNT(uId)"]) {
        res.send({ status: 409, message: "이미 존재하는 아이디입니다." });
      } else {
        res.send({ status: 200, message: "사용 가능한 아이디입니다." });
      }
    }
  });
});

router.post("/api/regist", (req, res) => {
  const {
    uId,
    uName,
    uPasswd,
    uEamil,
    uPhone,
    uZipcode,
    uAddress,
    uAdditionalAddr,
    uBirth,
  } = req.body;

  let sql =
    "INSERT INTO users VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ? , 1000, ?, 1, NOW());";

  let addrSql =
    "INSERT INTO deliveryaddr VALUES(NULL, ?, ?, ?, ?, ?, ?, NULL);";
  let addrSql2 = mysql.format(addrSql, [
    uId,
    uName,
    uZipcode,
    uAddress,
    uAdditionalAddr,
    uPhone,
  ]);

  let defaultAddrSql =
    "INSERT INTO defaultaddress VALUES(NULL, ?, ?, ?, ?, ?, ?, '문앞에놔둬주세요');";

  let defaultAddrSql2 = mysql.format(defaultAddrSql, [
    uId,
    uName,
    uZipcode,
    uAddress,
    uAdditionalAddr,
    uPhone,
  ]);

  bcrypt.hash(uPasswd, saltRounds, (err, hash_passwd) => {
    db.query(
      sql + addrSql2 + defaultAddrSql2,
      [
        uId,
        uName,
        hash_passwd,
        uEamil,
        uPhone,
        uZipcode,
        uAddress,
        uAdditionalAddr,
        uBirth,
      ],
      (err) => {
        if (err) {
          throw err;
        } else {
          res.send({ status: 200 });
        }
      }
    );
  });
});

module.exports = router;
