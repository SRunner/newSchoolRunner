import React from 'react';
require('../css/footer.css');

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div>
          <a href="http://www.xiyou.edu.cn/" target="_blank">我的校园</a>
          <a href="http://lib.xupt.edu.cn/" target="_blank">图书馆</a>
          <a>快递</a>
          <a>帮助</a>
        </div>
        <div id="divFooter">
          Mail: <a>2891347@163.com</a>
          Copyright&nbsp;©&nbsp;<a>SchoolRunner</a>
        </div>
      </footer>
    )
  }
}

export default Footer;
