// server/app.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const admin = require("./router/admin");
const mypage = require("./router/mypage");
const product = require("./router/product");
const order = require("./router/order");
const login = require("./router/login");
const regist = require("./router/regist");
const search = require("./router/search");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ⚠️ 여기서 origin은 나중에 프론트 배포 주소로 바꿔
app.use(
  cors({
    origin: ["http://localhost:3000"], 
    credentials: true,
  })
);

// 라우터
app.use("/admin", admin);
app.use("/mypage", mypage);
app.use("/product", product);
app.use("/order", order);
app.use("/login", login);
app.use("/regist", regist);
app.use("/search", search);

module.exports = app;
