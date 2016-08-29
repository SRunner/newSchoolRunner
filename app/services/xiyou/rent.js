import request from 'superagent';
import logger from 'superagent-logger';
function xiyouRent(detail, callback) {
  request.get('http://api.xiyoumobile.com/xiyoulibv2/user/rent')
    .use(logger)
    .send({session: detail})
    .end((err, response) => {
      if (err)  return callback(err);
      const information = response.body.Detail;
      callback(null, information, detail);
    });
}

export default xiyouRent;
