const express = require('express');
const app = express();
// 导入配置config
const config = require("./config")

config(app)


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
