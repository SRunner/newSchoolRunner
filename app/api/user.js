'use strict';
import express from 'express';
import {User} from '../mongodb/schema';
import _ from 'lodash';
import request from 'superagent';
import xiyouinfo from "../services/xiyou/info"
import Check from '../../public/tool/validate';
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

  let correctMail = Check.checkMail(email);
   console.log("correctMail:" + correctMail);
  let correctTel = Check.checkTel(tel);
  console.log("correctTel:" + correctTel);
  console.log((correctMail&&correctTel));
  if (!(correctMail&&correctTel)) {
    console.log("电话号码格式不正确");
    return res.status(400).send("电话号码或邮箱格式不正确");
  }

  User.findOne({userId: userId}, function (err, user) {
    if (err) return next(err);
    console.log("User:" + user);
    if(user!=null){return res.status(409).send("用户信息已经存在");}
   else {
      xiyouinfo({userId,email,tel,sessionKey},function (err,statecode) {
        console.log("----------xiyouinfo-------------------: "+ statecode);
        if(statecode==0||err)
        { console.log("dsfsfsfss");next(err);}
        if(statecode==403)
        { console.log("yong hu wei deng lu");return res.status(403).send("用户未登录");}
         if(statecode==201)
         {console.log("yong hu cun zai ");return res.status(201).send("用户信息已经存入本地数据库");}
      });
      /*request.get('http://api.xiyoumobile.com/xiyoulibv2/user/info')
        .send({session: sessionKey})
        .end((err, response) => {
          if (err)  console.log(err);
          let detail = response.body.Detail;
          let name = detail.Name;
          console.log(name);
          if (name == undefined) {
            console.log("用户未登录");
            return res.status(403).send("用户未登录");
          }
          let studentInformation = new User({
            name: name,
            userId: userId,
            email: email,
            tel: tel
          });
          studentInformation.save(function (err, student) {
            if (err) return next(err);
            console.log("Student: " + student);
            return res.status(201).send("用户信息已经存入本地数据库");
          });
        })*/
    }
  });
});
export default router;
