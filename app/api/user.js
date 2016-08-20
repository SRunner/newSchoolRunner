'use strict';
import express from 'express';
import {User} from '../mongodb/schema';
import _ from 'lodash';
import xiyouinfo from "../services/xiyou/info"
import Check from '../../public/tool/validate';
const router = express.Router();
router.post('/', function (req, res, next) {
  let userId = req.body.userId;
  let sessionKey = req.body.sessionKey;
  let email = req.body.email;
  let tel = req.body.tel;
  if (_.isEmpty(email) || _.isEmpty(tel)) {
    return res.status(400).send("数据不能为空");
  }
  let correctMail = Check.checkMail(email);
  let correctTel = Check.checkTel(tel);
  if (!(correctMail && correctTel)) {
    console.log("电话号码格式不正确");
    return res.status(400).send("电话号码或邮箱格式不正确");
  }
  User.findOne({userId: userId}, function (err, user) {
    if (err) return next(err);
    if (user != null) {
      return res.status(409).send("用户信息已经存在");
    }
    else {
      xiyouinfo({userId, email, tel, sessionKey}, function (err, statecode) {
        if (err) {
          next(err);
        }
        if (statecode == 403) {
          return res.status(403).send("用户未登录");
        }
        if (statecode == 201) {
          return res.status(201).send("用户信息已经存入本地数据库");
        }
      });
    }
  });
});

export default router;
