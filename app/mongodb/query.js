const User = require('./user.js');
let userName = "";

exports.login = function (req, res) {
  let name = req.body.name;
  let password = req.body.password;
  User.findOne({name: name}, function (err, user) {
    if (err) res.send(err.message);
    if (user == null) {
      // let f = new User({name:name,password:password});
      // f.save(function (err) {
      //     console.log('save status:', err ? 'failed' : 'success');
      // });
      res.status(500).send('NO INFO');
    } else {
      if (user.password != password) {
        res.status(500).send('passwordError');
      } else {
        userName = name;
        if (user.tel && user.email) {
          res.send('SUCCESS');
        } else {
          res.send('personalInfo');
        }
      }
    }
  });
};

exports.modify = function (req, res, next) {
  let email = req.body.email;
  let tel = req.body.tel;
  User.update({name: userName}, {email: email, tel: tel}, function (err) {
    if (err) {
      return next(err);
    } else {
      res.send("SUCCESS");
    }
  })
};
