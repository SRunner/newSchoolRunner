import request from 'superagent';
function login ({userId,password},callback) {
  request.get('https://api.xiyoumobile.com/xiyoulibv2/user/login')
    .send({username: userId, password: password})
    .end((err, response) => {
      if(err) return callback(err);
      var detail= response.body.Detail;
      const loginSuccessfully =  detail === 'ACCOUNT_ERROR';
      callback(null, loginSuccessfully,detail);
    })
}
export default login;
