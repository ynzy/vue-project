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