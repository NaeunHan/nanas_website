const express = require("express");
require("dotenv").config();
const db = require("../db/db");
const router = express.Router();
const jwt = require("jsonwebtoken");
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

router.get("/api/getbasket", (req, res) => {
  const token = req.cookies.accessToken;

  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err) => {
    const token = req.cookies.refreshToken;
    const data = jwt.verify(token, process.env.REFRESH_SECRET_KEY);

    let sql1 = "SELECT COUNT(uId) FROM shoppingbasket WHERE uId = ?;";
    let sql2 = "SELECT * FROM board WHERE uId=?;";

    db.query(sql1 + sql2, [data.id, data.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.send({
        count: result[0],
        result,
      });
    });
  });
});

router.get("/api/login/getuser", (req, res) => {
  const token = req.cookies.accessToken;

  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err) => {
    const token = req.cookies.refreshToken;
    const data = jwt.verify(token, process.env.REFRESH_SECRET_KEY);

    let sql = "SELECT * from users WHERE uId = ?;";
    db.query(sql, data.id, (err, user) => {
      if (err) {
        throw err;
      }

      res.send(user[0]);
    });
  });
});

router.get("/api/orderlist", (req, res) => {
  const token = req.cookies.accessToken;

  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err) => {
    const token = req.cookies.refreshToken;
    const data = jwt.verify(token, process.env.REFRESH_SECRET_KEY);

    let sql = "SELECT * from users WHERE uId = ?;";
    db.query(sql, data.id, (err, user) => {
      if (err) {
        throw err;
      }

      let ordertable =
        "SELECT * FROM ordertable INNER JOIN products ON ordertable.pId = products.productId WHERE uId = ? ORDER BY idx DESC;";

      db.query(ordertable, [user[0].uId], (err, result) => {
        if (err) {
          throw err;
        }
        res.send({
          status: 200,
          result,
        });
      });
    });
  });
});

router.post("/api/updateuser", (req, res) => {
  const {
    idx,
    enteredName: uName,
    enteredPasswd: uPasswd,
    enteredPhone: uPhone,
    enteredEmail: uEmail,
    enteredBirth: uBirth,
    enteredZipcode: uZipcode,
    enteredAddress: uAddress,
    enteredAdditionalAddress: uAdditionalAddr,
  } = req.body;

  let sql =
    "update users set uName=?, uPasswd=?, uEmail=?, uPhone=?, uZipcode=?,uAddress=?,uBirth=?,uAdditionalAddr =? where idx = ?;";

  bcrypt.hash(uPasswd, saltRounds, (err, hash_passwd) => {
    db.query(
      sql,
      [
        uName,
        hash_passwd,
        uEmail,
        uPhone,
        uZipcode,
        uAddress,
        uBirth,
        uAdditionalAddr,
        idx,
      ],
      (err) => {
        if (err) {
          throw err;
        }
        res.send({
          status: 200,
          message: "회원수정 완료",
        });
      }
    );
  });
});

router.post("/api/checkingpw", (req, res) => {
  const inputPw = req.body.checkInputPw;
  const dataPw = req.body.user.uPasswd;

  let sql = "SELECT * FROM users WHERE uId = ?";

  db.query(sql, [req.body.user.uId], (err, user) => {
    if (user[0] === undefined) {
      res.send({
        status: 404,
        message: "해당 아이디 정보가 없습니다.",
      });
    } else {
      bcrypt.compare(inputPw, dataPw, (err, result) => {
        if (result) {
          res.send({
            status: 200,
            message: "회원정보 인증 성공!",
            searchPw: dataPw,
          });
        } else {
          res.send({
            status: 400,
            message: "비밀번호를 확인해주세요.",
          });
        }
      });
    }
  });
});

router.post("/api/deleteuser", (req, res) => {
  const id = req.body.user.uId;
  let sql = "UPDATE users SET uAuth = ? WHERE uId = ?;";
  db.query(sql, [0, id], (err) => {
    if (err) {
      throw err;
    }
    res.send({
      status: 200,
      message: "탈퇴가 정상적으로 완료 되었습니다.",
    });
  });
});

router.post("/api/adddeliver", (req, res) => {
  const { uId, uName, uPhone, uZipcode, uAddress, uAdditionalAddr, uMemo } =
    req.body;

  let sql = "INSERT INTO deliveryaddr VALUES(NULL,?,?,?,?,?,?,?);";
  db.query(
    sql,
    [uId, uName, uZipcode, uAddress, uAdditionalAddr, uPhone, uMemo],
    (err) => {
      if (err) {
        throw err;
      }
      res.send({
        status: 200,
        message: "신규 주소 등록완료",
      });
    }
  );
});

router.get("/api/addlist", (req, res) => {
  const token = req.cookies.accessToken;

  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err) => {
    const token = req.cookies.refreshToken;
    const data = jwt.verify(token, process.env.REFRESH_SECRET_KEY);

    let sql = "SELECT * from users WHERE uId = ?;";
    db.query(sql, data.id, (err, user) => {
      if (err) {
        throw err;
      }

      let addrSql =
        "SELECT * FROM deliveryaddr where uId = ?  ORDER BY idx desc;";
      db.query(addrSql, [user[0].uId], (err, user) => {
        if (err) {
          throw err;
        } else {
          res.send({ status: 200, user });
        }
      });
    });
  });
});

router.get("/api/defaultadd", (req, res) => {
  const token = req.cookies.accessToken;

  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err) => {
    const token = req.cookies.refreshToken;
    const data = jwt.verify(token, process.env.REFRESH_SECRET_KEY);

    let sql = "SELECT * from users WHERE uId = ?;";
    db.query(sql, data.id, (err, user) => {
      if (err) {
        throw err;
      }

      let addrSql = "SELECT * FROM defaultaddress where uId = ?;";
      db.query(addrSql, [user[0].uId], (err, result) => {
        if (err) {
          throw err;
        } else {
          res.send({ status: 200, result: result[0] });
        }
      });
    });
  });
});

router.post("/api/addrdelete", (req, res) => {
  const idx = req.body.addUser.idx;

  let sql = "DELETE FROM deliveryaddr WHERE idx = ?;";
  db.query(sql, [idx], (err) => {
    if (err) {
      throw err;
    }
    res.send({
      status: 200,
      message: "삭제 완료",
    });
  });
});

router.post("/api/addrupdate", (req, res) => {
  const uIdx = parseInt(req.body.uIdx);
  const { dName, dZipcode, dAddr, dAdditionalAddr, dPhone, dMemo } = req.body;

  let sql =
    "UPDATE deliveryaddr SET dName= ?,dZipcode =? ,dAddr =?,dAdditionalAddr=?,dPhone=?,dMemo=? WHERE idx =?;";
  db.query(
    sql,
    [dName, dZipcode, dAddr, dAdditionalAddr, dPhone, dMemo, uIdx],
    (err) => {
      if (err) {
        throw err;
      }
      res.send({ status: 200, message: "수정 완료" });
    }
  );
});

router.post("/api/choiceaddr", (req, res) => {
  const uId = req.body.addUser.uId;
  const uName = req.body.addUser.dName;
  const dZipcode = req.body.addUser.dZipcode;
  const dAddr = req.body.addUser.dAddr;
  const dAdditionalAddr = req.body.addUser.dAdditionalAddr;
  const dPhone = req.body.addUser.dPhone;
  const dMemo = req.body.addUser.dMemo;
  let sql =
    "UPDATE defaultaddress SET dName= ? ,dZipcode=?,dAddr=?,dAdditionalAddr=?,dPhone=?,dMemo=? WHERE uId =?;";

  db.query(
    sql,
    [uName, dZipcode, dAddr, dAdditionalAddr, dPhone, dMemo, uId],
    (err) => {
      if (err) {
        throw err;
      }
      res.send({ status: 200, message: "배송지 선택 완료" });
    }
  );
});

router.get("/api/boardlist", (req, res) => {
  const token = req.cookies.accessToken;

  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err) => {
    const token = req.cookies.refreshToken;
    const data = jwt.verify(token, process.env.REFRESH_SECRET_KEY);

    let sql = "SELECT * from users WHERE uId = ?;";
    db.query(sql, data.id, (err, user) => {
      if (err) {
        throw err;
      }
      const uId = user[0].uId;

      let addrSql = "SELECT * FROM board where uId = ?  ORDER BY bId desc;";
      db.query(addrSql, [uId], (err, data) => {
        if (err) {
          throw err;
        } else {
          res.send({ status: 200, data });
        }
      });
    });
  });
});

router.post("/api/write", (req, res) => {
  const { uId, pId, bTitle, bBoardtype, bContent } = req.body;
  let sql = "INSERT INTO board VALUES (NULL,?,?,?,?,?,NOW())";

  db.query(sql, [uId, pId, bBoardtype, bTitle, bContent], (err) => {
    if (err) {
      throw err;
    }
    res.send({
      status: 200,
      message: "작성 완료",
    });
  });
});

router.get("/api/pointlist", (req, res) => {
  const token = req.cookies.accessToken;

  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err) => {
    const token = req.cookies.refreshToken;
    const data = jwt.verify(token, process.env.REFRESH_SECRET_KEY);

    let sql = "SELECT * from users WHERE uId = ?;";
    db.query(sql, data.id, (err, user) => {
      if (err) {
        throw err;
      }
      const uId = user[0].uId;

      let addrSql =
        "SELECT * FROM ordertable where uId = ?  ORDER BY idx desc;";
      db.query(addrSql, [uId], (err, data) => {
        if (err) {
          throw err;
        } else {
          res.send({ status: 200, data });
        }
      });
    });
  });
});

router.post("/api/searchpoint", (req, res) => {
  const uId = req.body.uId;
  const start = req.body.startDate;
  const end = req.body.endDate;
  //SELECT * FROM ordertable WHERE uId = 'qwe123123@' AND oDate BETWEEN date_sub('2022-11-18',INTERVAL 1 Day) AND '2022-11-21';
  let sql =
    "SELECT * FROM ordertable WHERE uId = ? AND oDate BETWEEN date_sub(?,INTERVAL 1 Day) AND ?";
  db.query(sql, [uId, start, end], (err, result) => {
    if (err) {
      throw err;
    }
    res.send({
      result,
    });
  });
});

module.exports = router;
