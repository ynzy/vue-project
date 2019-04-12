// @login $ register
const express = require('express');
const router = express.Router();  //实例化router
const bcrypt = require('bcryptjs'); //加密
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar'); //引入头像
const keys = require('../../config/keys');  //使用secret
//引入User
const User = require('../../models/User');

// @route  GET api/users/test
// @desc   返回的请求的json数据
// @access public
router.get('/test', (req, res) => {
    res.json({ msg: 'login works' });
});

// @route  POST api/users/register
// @desc   返回的请求的json数据
// @access public
router.post("/register", (req,res) => {
    // console.log(req.body)
    //查询数据库中是否拥有邮箱
    User.findOne({ email: req.body.email }).then((user) => {
        if(user) {
            return res.status(400).json({email:'邮箱已被注测!'});
        }else {
            const avatar = gravatar.url(req.body.email,
                {s: '200', r: 'pg', d: 'mm'});

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            });
            //执行密码加密操作
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;

                  newUser.password = hash;

                  newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
              });
        }
     })
})

// @route  POST api/users/login
// @desc   返回token jwt passport
// @access public
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // 查询数据库
    User.findOne({ email }).then(user => {
      if (!user) {
        return res.status(404).json('用户不存在!');
      }
      // 密码匹配
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const rule = {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            identity: user.identity
          };

        //jwt.sign("规则"，”加密名字“，”过期时间“，”箭头函数“)
          jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          });
        //   res.json({msg:"success"});
        } else {
          return res.status(400).json('密码错误!');
        }
      });
    });
  });

module.exports = router;