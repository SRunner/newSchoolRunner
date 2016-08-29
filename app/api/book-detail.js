'use strict';
import express from 'express';
import _ from 'lodash';
import {User} from '../mongodb/schema';
import xiyouLogin from '../services/xiyou/login';
import xiyouDetail from '../services/xiyou/detail';
const router = express.Router();
router.post('/', function (req, res, next) {
  const barcode = req.body.barcode;
  const userId = getUserIdFromInfo(req);
  User.findOne({userId: userId}, function (err, user) {
    if (err) next(err);
    const password = user.password;
    xiyouLogin({userId, password}, function (err, hasLogin) {
      if (err) next(err);
      if (hasLogin) {
        return res.status(401).send('用户名或密码有误，登录失败');
      }
      xiyouDetail(barcode, function (err, bookdetail) {
        if (err) next(err);
        var departmentbook = _.find(bookdetail.CirculationInfo, book=> {
          if (book.Barcode === barcode) {
            return book.Department;
          }
        });
        if (bookdetail.Summary === '' && bookdetail.DoubanInfo) {
          bookdetail.Summary = bookdetail.DoubanInfo.Summary;
        }
        return res.status(201).json({
          author: bookdetail.Author,
          title: bookdetail.Title,
          publish: bookdetail.Pub,
          rentTimes: bookdetail.RentTimes,
          remainCount: bookdetail.FavTimes,
          summary: bookdetail.Summary,
          department: departmentbook.Department
        });
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
