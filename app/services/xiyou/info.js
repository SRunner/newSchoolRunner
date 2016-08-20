import request from 'superagent';
import {User} from '../../mongodb/schema';

function info({userId, email, tel, sessionKey}, callback) {
  request.get('http://api.xiyoumobile.com/xiyoulibv2/user/info')
    .send({session: sessionKey})
    .end((err, response) => {
      if (err)  console.log(err);
      let statecode = 201;
      let detail = response.body.Detail;
      let name = detail.Name;
      console.log(name);
      if (name == undefined) {
        console.log("用户未登录");
        statecode = 403;
        callback(null, statecode);
      }
      else {
        let studentInformation = new User({
          name: name,
          userId: userId,
          email: email,
          tel: tel
        });
        studentInformation.save(function (err, student) {
          if (err) return next(err);
          statecode = 201;
          return statecode;
        });
      }
      callback(null, statecode);
    })
}

export default info;
