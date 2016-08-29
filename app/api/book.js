'use strict';
import express from 'express';
import _ from 'lodash';
import {User} from '../mongodb/schema';
import xiyouRent from '../services/xiyou/rent';
import xiyouLogin from '../services/xiyou/login';
const router = express.Router();
router.post('/', function (req, res, next) {
  const userId = getUserIdFromInfo(req);
  User.findOne({userId: userId}, function (err, user) {
    const password = user.password;
    xiyouLogin({userId, password}, function (err, hasLogin, detail) {
      if (err) return next(err);
      if (hasLogin) {
        return res.status(401).send('用户名或密码有误，登录失败');
      }
      xiyouRent(detail, function (err, information, detail) {
        if (err) return next(err);
        return res.status(201).json({borrowlist: information, detail: detail});
      });
    });
  });
});
function getUserIdFromInfo(req) {
  const info = req.cookies['info'];
  const separatorIndex = _.lastIndexOf(info, ':');
  return info.substring(0, separatorIndex);
}
export default router;
