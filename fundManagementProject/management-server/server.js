const express = require("express");  //引入express
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express(); //实例化app

// 引入users.js
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');

// DB config
const db = require('./config/keys').mongoURI;
// app.all('*', function (req, res, next) {
//       res.header("Access-Control-Allow-Origin", "*");
//       res.header("Access-Control-Allow-Headers", "X-Requested-With");
//       res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//       res.header("X-Powered-By", ' 3.2.1');
//       res.header("Content-Type", "application/json;charset=utf-8");
//       next();
//   });
app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
      res.send(200);  //让options尝试请求快速结束
  else
      next();
})

// 使用body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to mongodb
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB连接成功。。。'))
  .catch(err => console.log(err));

  // passport 初始化
app.use(passport.initialize());
require('./config/passport')(passport);

// app.get("/",(req,res) => {  //发送一个请求
//     res.send("hello World!")
// })



// 使用routes
app.use('/api/users', users);
app.use('/api/profiles', profiles);

const port = process.env.PORT || 5000;  //指定端口号

app.listen(port, () => {
    console.log(`server running on port ${port}` );
})