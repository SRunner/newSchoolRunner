import React from 'react';
import Header from './header.jsx';
require('../css/header.css');
import Footer from './footer.jsx';
require('../css/footer.css');
require('../css/login-page.css');
import request from 'superagent';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      password: ""
    }
  }

  _onSubmit(event) {
    event.preventDefault();
    request.post('/api/sessions')
      .send({
        userId: this.state.userId,
        password: this.state.password
      })
      .end((err, res) => {
        if (err) return console.error(err);
          if (res.statusCode === 400) {
            console.log(res.text);
            location.href = '/#/login-page';
          }
          if (res.statusCode === 201 && res.body.newUser === true) {
            console.log(res.body.message);
            console.log(res.body.detail);
            window.location.href='/#/personalInfoPage?session=' +res.body.detail+'&userId='+res.body.userId;
          }
          if (res.statusCode === 201 && res.body.newUser === false) {
            console.log(res.body.detail);
            console.log(res.body.message);
            window.location.href='/#/homePage';
          }
          if (res.statusCode === 401) {
            console.log(res.text);
          }
      })
  }
  onChangeUserId(event) {
    this.setState({
      userId: event.target.value
    })
  }

  onChangePassword(event) {
    this.setState({
      password: event.target.value
    })
  }

  render() {
    return <div className="container">
      <form className=" col-md-5 col-md-offset-5 form-horizontal login" onSubmit={this._onSubmit.bind(this)}>
        <p className="login_title distance">校园Runner</p>
        <div className="form-group">
          <label htmlFor="userId" className="col-md-2 control-label distance">学号</label>
          <div className="col-md-10">
            <input type="text" value={this.state.userId} className="form-control distance" id="userId"
                   placeholder="Student ID"
                   onChange={this.onChangeUserId.bind(this)}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password" className="col-md-2 control-label distance">密码</label>
          <div className="col-md-10">
            <input type="password" value={this.state.password} className="form-control distance" id="password"
                   placeholder="Password"
                   onChange={this.onChangePassword.bind(this)}/>
          </div>
        </div>
        <div className="form-group">
          <div className="button-center">
            <button type="submit" className="btn btn-primary">登录</button>
          </div>
        </div>
      </form>
    </div>
  }
}

class LoginPage extends React.Component {
  render() {
    return (
      <div className="loginPage">
        <Header/>
        <Login />
        <Footer/>
      </div>
    )
  }
}
export default LoginPage;
