import request from 'superagent';
import logger from 'superagent-logger';
function xiyouDetail(barcode, callback) {
  request.get('http://api.xiyoumobile.com/xiyoulibv2/book/detail/barcode/' + barcode)
    .use(logger)
    .send({barcode: barcode})
    .end((err, response) => {
      if (err)  return callback(err);
      const bookdetail = response.body.Detail;
      callback(null, bookdetail);
    });
}

export default xiyouDetail;
