// server/index.js (로컬 실행용)
const app = require("./app");
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log("server running:", PORT));
