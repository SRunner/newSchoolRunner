import React from 'react';
import Header from './header.jsx';
import '../css/header.css';
import Footer from './footer.jsx';
import '../css/footer.css';
import '../css/personal-page.css';
import request from 'superagent';
class Personal extends React.Component {
  constructor(props) {
    super(props);
    let sessionKey = this.getSessionValue();
    let userId = this.getIdValue();
    console.log("sessionKey:  " + sessionKey);
    console.log("userId:  " + userId);
    /*alert(sessionKey);*/
    this.state = {
      userId: userId,
      sessionKey: sessionKey,
      email: "",
      tel: ""
    }
  }

  _onChangeEmail(event) {
    this.setState({
      email: event.target.value
    })
  }

  _onChangeTel(event) {
    this.setState({
      tel: event.target.value
    })
  }

  getIdValue() {
    let startPos = window.location.toString().indexOf("userId=");
    let userId = window.location.toString().substr(startPos + 7, 9);
    return userId;
  }

  getSessionValue() {
    let startPos = window.location.toString().indexOf("=");
    let endPos = window.location.toString().indexOf("&");
    let session = window.location.toString().substring(startPos + 1, endPos);
    alert(session + "--------------");
    return session;
  }

  _onSubmit(event) {
    event.preventDefault();
    request.post('/api/users')
      .send({
        userId: this.state.userId,
        sessionKey: this.state.sessionKey,
        email: this.state.email,
        tel: this.state.tel
      })
      .end((err, res)=> {
        if (err) {
          if (res.statusCode === 400) {
            console.log("400");
            console.log(res.statusCode);
            console.log(res.text);
            location.href = '/#/personalInfoPage';
          }
          if (res.statusCode === 403) {
            alert("您未登录，请先登录!");
            console.log("403");
            console.log(res.statusCode);
            console.log(res.text);
            location.href = '/#/login-page';
          }
          if (res.statusCode === 409) {
            console.log("409");
            console.log(res.statusCode);
            console.log(res.text);
            location.href = '/#/homePage'
          }
        }
        if (res.statusCode === 201) {
          console.log("201");
          console.log(res.statusCode);
          console.log(res.text);
          location.href = '/#/homePage'
        }
      })
  }

  render() {
    return (
      <div className="container" id="personalInfo">
        <form role="form">
          <h2>个人信息</h2>
          <div className="form-group">
            <label htmlFor="inputEmail">电子邮箱</label>
            <input type="email" className="form-control" id="inputEmail" placeholder="邮箱" value={this.state.email}
                   onChange={this._onChangeEmail.bind(this)}/>
          </div>
          <div className="form-group">
            <label htmlFor="inputTel">手机号码</label>
            <input type="tel" className="form-control" id="inputTel" placeholder="手机" value={this.state.tel}
                   onChange={this._onChangeTel.bind(this)}/>
          </div>
        </form>
        <button type="submit" className="btn btn-default" onClick={this._onSubmit.bind(this)}>提交</button>
      </div>
    )
  }
}
class PersonalInfo extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <Personal />
        <Footer/>
      </div>
    )
  }
}

export default PersonalInfo;
