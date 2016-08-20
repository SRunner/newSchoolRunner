function checkTel(tel) {
  let correctTel = tel.length === 11;
  var reg = new RegExp("^[0-9]*$");
  // if (reg.test(tel) && correctTel) {
  //   return true;
  // } else {
  //   return false;
  // }
  return reg.test(tel) && correctTel;
}
function checkMail(email) {
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  // if (filter.test(email))
  //   return true;
  // else {
  //   return false;
  // }
  return filter.test(email);
}
module.exports = {checkTel, checkMail};
