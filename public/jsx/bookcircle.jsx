import {Link} from 'react-router';
import React from 'react';
import Header from './header.jsx';
import Footer from  './footer.jsx';
require('../css/header.css');
require('../css/footer.css');
require('../css/bookcircle.css');
import request from 'superagent';
class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userId: '',
      allMessage: [],
      inputMessage: '',
      newMessage: {}
    }
  }

  componentWillMount() {
    request.get('/api/users/current')
      .end((err, res) => {
        if (err) {
          if (res.statusCode === 401) {
            alert('Please Login!');
            location.href = '/#/login-page'
          } else {
            return alert(err);
          }
        }
        this.setState({userName: res.body.userName});
        request.get('/api/messages')
          .end((err, res)=> {
            if (err) {
              if (res.statusCode === 401) {
                alert('Please Login!');
                location.href = '/#/login-page'
              } else {
                return alert(err);
              }
            }
            this.setState({
              allMessage: res.body.reverse()
            });
          })
      });

  }

  _onSend() {
    request.post('/api/messages')
      .send({
        inputMessage: this.state.inputMessage
      })
      .end((err, res)=> {
        if (err) {
          if (res.statusCode === 401) {
            alert('please login!');
            location.href = '/#/login-page';
          } else if (res.statusCode === 400) {
            alert('message can not Empty')
          } else {
            alert(err);
          }
        }
        this.setState({newMessage: res.body});
      })
  }

  _onChangeMessage(event) {
    this.setState({
      inputMessage: event.target.value
    })
  }

  _onClickRefresh() {
    location.reload(true);
  }

  render() {
    const messageList = this.state.allMessage.map((message, index) =>
      <div className="messageList" key={index}>
        <div className="messageContainer common">
          <div>
            <span className="userId">{message.userName}</span>
            <span className="date">{message.date}</span>
            <div className="message">{message.message}</div>
            <button>回复</button>
          </div>
        </div>
      </div>
    );
    return (
      <div className="fullPage">
        <button type="button" className="btn-link button back"><Link to="/home-page">返回</Link></button>
        <button type="button" className="btn-link button refresh" onClick={this._onClickRefresh.bind(this)}>刷新</button>
        <div>
          <div className="bottom common">
            <input className="form-control" type="text" placeholder="我要发布"
                   value={this.state.inputMessage}
                   onChange={this._onChangeMessage.bind(this)}/>
            <button className="btn-link button" type="button" onClick={this._onSend.bind(this)}>发送</button>
          </div>

        </div>
        <div className="messageList">
          <div className="messageContainer common">
            <div>
              <span className="userId">{this.state.newMessage.userName}</span>
              <span className="date">{this.state.newMessage.date}</span>
              <div className="message">{this.state.newMessage.message}</div>
              {/*<button>回复</button>*/}
            </div>
          </div>
        </div>
        {messageList}
      </div>
    )
  }
}

class MessageBoard extends React.Component {

  render() {
    return (
      <div id="circleContain">
        <Header />
        <div id="circleBody">
          <MessageList />
        </div>
        <Footer />
      </div>
    )
  }
}
export default MessageBoard ;
