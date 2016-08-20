'use strict';
import express from 'express';
import {User} from '../mongodb/schema';
import _ from 'lodash';
import request from 'superagent';
const router = express.Router();
console.log("----------user.js--------------");
router.post('/', function (req, res, next) {
  console.log("-------user-router----------");
  let userId = req.body.userId;
  let sessionKey = req.body.sessionKey;
  let email = req.body.email;
  let tel = req.body.tel;
  if (_.isEmpty(email) || _.isEmpty(tel)) {
    return res.status(400).send("数据不能为空");
  }
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if(!filter.test(email))
  {
    console.log("邮箱格式不正确");
    return res.status(400).send("邮箱格式不正确");
  }
  let correctTel = tel.length === 11;
  console.log("correctTel :" +correctTel);
  console.log("correctTel: ",+correctTel);
  var reg = new RegExp("^[0-9]*$");
  console.log("reg: "+reg.test(tel));
  if ((reg.test(tel)&&correctTel)==false)
  {
    console.log("电话号码格式不正确");
    return res.status(400).send("电话号码格式不正确");
  }/*
  if (sessionKey == 'ACCOUNT_ERROR') {
    console.log("用户未登录");
    return res.status(403).send("用户未登录");
  }*/
  User.findOne({userId: userId}, function (err, user) {
    if (err) return next(err);
    console.log("User:" +user);
    if (user == null) {
      request.get('http://api.xiyoumobile.com/xiyoulibv2/user/info')
        .send({session: sessionKey})
        .end((err, response) => {
          if (err)  console.log(err);
          let detail = response.body.Detail;
          let name=detail.Name;
          console.log(name);
          if(name==undefined)
          {
            console.log("用户未登录");
            return res.status(403).send("用户未登录");
          }
          let studentInformation = new User({
            name:name,
            userId: userId,
            email: email,
            tel:tel
          });
          studentInformation.save(function (err, student) {
            if (err) return next(err);
            console.log("Student: "+student);
            return res.status(201).send("用户信息已经存入本地数据库");
          });
        })
    }
    else {
      return res.status(409).send("用户信息已经存在");
    }
  });
});
export default router;
