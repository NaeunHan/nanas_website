// import
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fs = require("fs");
const app = express();
const cookieParser = require("cookie-parser");
const admin = require("./router/admin");
const mypage = require("./router/mypage");
const product = require("./router/product");
const order = require("./router/order");
const login = require("./router/login");
const regist = require("./router/regist");
const search = require("./router/search");

// ✅ CORS 설정
app.use(
  cors({
    origin: "http://localhost:3000", // 프론트 주소
    credentials: true,               // 쿠키/세션 쓸 거면 필수
  })
);


// middleware
app.use(cookieParser());
app.use(express.json());
app.use("/mypage", mypage);
app.use("/admin", admin);
app.use("/product", product);
app.use("/regist", regist);
app.use("/order", order);
app.use("/login", login);
app.use("/search", search);
app.use(express.urlencoded({ extended: false }));
app.use(express.static("uploads"));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
// url

//네이버 api 받아와서 db에 넣은 흔적
/*
let data = [];

let client_id = "wuWicrMH0NCEgX2yYL1s";
let client_secret = "NqTst4k3ME";

app.get("/search/shop", (req, res) => {
  let api_url =
    "https://openapi.naver.com/v1/search/shop.json?query=" +
    encodeURI(req.query.query) +
    "&display=50&start=1001";
  var options = {
    url: api_url,
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
    },
  };
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
      let resres = JSON.parse(body);
      data = resres.items;
      let sql = "INSERT INTO products VALUES(null, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
      for (let i = 0; i < data.length; i++) {
        db.query(
          sql,
          [
            data[i]["productId"],
            data[i]["title"],
            data[i]["image"],
            data[i]["lprice"],
            data[i]["mallName"],
            data[i]["category1"],
            data[i]["category2"],
            data[i]["category3"],
            data[i]["category4"],
          ],
          (err) => {
            if (err) throw err;
          }
        );
      }
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});




*/
// listen
app.listen(process.env.PORT, () => {
  let folder = "uploads";
  if (!fs.existsSync(folder)) {
    fs.mkdir(folder, (err) => {
      if (err) throw err;
      console.log("CREATE FOLDER COMPLETE");
    });
  }
  console.log("SERVER IS RUNNING... PORT = " + process.env.PORT);
});
