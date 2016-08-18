'use strict';
import express from 'express';
import request from 'superagent';
import _ from 'lodash';
import {User} from '../mongodb/schema';

const router = express.Router();

router.post('/', function (req, res, next) {
  const userId = req.body.userId;
  const password = req.body.password;
  if (_.isEmpty(userId) || _.isEmpty(password)) {
    return res.status(400).send("数据不能为空");
  }
  else {
    request.get('https://api.xiyoumobile.com/xiyoulibv2/user/login')
      .send({username: userId, password: password})
      .end((err, response) => {
        if (err) return next(err);
        var detail = response.body.Detail;
        if (detail === 'ACCOUNT_ERROR') {
          return res.status(401).send("用户名或密码有误，登录失败");
        }

        User.findOne({userId: userId}, function (err, user) {
          if (err) return next(err);
          if (user == null) {
            return res.status(201).json({message: "SUCCESS", newUser: true})
          }
          return res.status(201).json({message: "SUCCESS", newUser: false})
        });
      });
  }
});

export default router;
