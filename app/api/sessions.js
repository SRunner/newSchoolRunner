'use strict';
import express from 'express';
import _ from 'lodash';
import {User} from '../mongodb/schema';
import xiyoulogin from "../services/xiyou/login"
const router = express.Router();
router.post('/', function (req, res, next) {
  const userId = req.body.userId;
  const password = req.body.password;
  if (_.isEmpty(userId) || _.isEmpty(password)) {
    return res.status(400).send("数据不能为空");
  }
  xiyoulogin({userId, password}, function (err, haslogin,detail) {
    if (haslogin ) {
      return res.status(401).send("用户名或密码有误，登录失败");
    }
    User.findOne({userId: userId}, function (err, user) {
      if (err) return next(err);
      if (user == null) {
        return res.status(201).json({message: "SUCCESS", newUser: true,detail:detail,userId:userId});
        /*window.location.href = "main.html?detail=" + detail;*/
      }
      return res.status(201).json({message: "SUCCESS", newUser: false,detail:detail,userId:userId});
    });
  });
});

export default router;
