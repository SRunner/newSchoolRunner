import React from 'react';
import Logo from './logo.jsx';
require('../css/logo.css');
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


  handle(event) {
    event.preventDefault();
    request.post('/api/sessions')
      .send({
        userId: this.state.userId,
        password: this.state.password
      })
      .end((err, res) => {
        if (err) return console.error(err);
        if (res.ok) {
          if (res.statusCode == 400) {
            console.log(res.text.massaage);
            location.href = '/#/login-page';
          }
          if (res.statusCode == 201 && res.text.newUser === true) {
            console.log(res.text.massaage);
            location.href = '/#personalInfoPage';
          }
          if (res.statusCode == 201 && res.text.newUser === false) {
            console.log(res.text.massaage);
            location.href = '/#/homePage';
          }
          if (res.statusCode == 401) {
            console.log(res.text.massaage);
            location.href = '/#/login-page';
          }
        }
      })
  }

  render() {
    return <div className="container">
      <form className=" col-md-5 col-md-offset-7 form-horizontal login" onSubmit={this.handle.bind(this)}>
        <p className="login_title">校园Runner</p>
        <div className="form-group">
          <label htmlFor="userId" className="col-md-2 control-label distance">学号</label>
          <div className="col-md-10">
            <input type="text" value={this.state.userId} className="form-control distance" id="userId" placeholder="Student ID"
                   onChange={this.changeUserId.bind(this)}/>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password" className="col-md-2 control-label distance">密码</label>
          <div className="col-md-10">
            <input type="password" value={this.state.password} className="form-control distance" id="password"
                   placeholder="Password"
                   onChange={this.changePassword.bind(this)}/>
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

  changeUserId(event) {
    this.setState({
      userId: event.target.value
    })
  }

  changePassword(event) {
    this.setState({
      password: event.target.value
    })
  }

}

class LoginPage extends React.Component {
  render() {
    return (
      <div className="loginPage">
        <Logo/>
        <Login />
        <Footer/>
      </div>
    )
  }
}
export default LoginPage;
