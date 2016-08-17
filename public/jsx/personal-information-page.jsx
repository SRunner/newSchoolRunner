import React from 'react'
import {Link} from 'react-router';

class InformModule extends React.Component {
  click() {
    let email = $('#email').val();
    let tel = $('#mobilePhone').val();
    $.ajax({
      type: "post",
      url: 'http://localhost:3000/personal',
      data: {email: email, tel: tel},
      success: function (result) {
        location.href = '/#/homePage';
      },
      error: function (result) {
        console.log(result);
      }
    })
  }

  render() {
    return (
      <div className="container" id="outermost">
        <h2>个人信息</h2>
        <div className="form-group">
          <label htmlFor="e-mail">邮箱</label>
          <input type="email" className="form-control" id="email" placeholder="请输入电子邮箱"
                 required="required"/>
        </div>
        <div className="form-group">
          <label htmlFor="mobilePhone">手机号码</label>
          <input type="tel" className="form-control" id="mobilePhone" placeholder="请输入手机号码"
                 pattern="(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$"
                 required="required"/>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-default" onClick={this.click}>提交</button>
          <button type="button" className="btn btn-default">修改</button>
        </div>
      </div>
    )
  }
}

export default InformModule;
