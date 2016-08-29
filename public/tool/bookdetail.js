function studentrent(borrowlist, readerType) {
  var rent = 0;//借书数
  var all;//可借书数
  var ctime;//可借书时长
  var outnum = 0;//超时书数
  switch (readerType) {
  case '本科生':
    all = 15;
    ctime = 30;
    break;
  case '研究生':
    all = 20;
    ctime = 45;
    break;
  case '老师':
    all = 30;
    ctime = 60;
    break;
  default :
    all = 15;
    ctime = 30;
  }
  if (borrowlist === 'NO_RECORD' || borrowlist === null || borrowlist === '' || borrowlist === undefined) {
    rent = 0;
  }
  else {

    rent = borrowlist.length;
    var Dates = borrowlist;
    var oDate = new Date();
    for (let i = 0; i < rent; i++) {
      var d1 = new Date(Date.parse(Dates[i].Date));
      if (oDate > d1) {
        outnum++;
      }
    }
  }
  const borrowedInfo = {borrowedCount: rent, remainedCount: all - rent, allCount: all, outCount: outnum};
  return borrowedInfo;
}
export default studentrent;
