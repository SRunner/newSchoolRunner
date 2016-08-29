import React from 'react';
import '../css/book-detail.css';
import Header from './header.jsx';
import '../css/header.css';
import Footer from './footer.jsx';
import '../css/footer.css';
import request from 'superagent';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      title: '',
      publish: '',
      rentTimes: '',
      remainCount: '',
      summary: '',
      department: ''
    };
  }

  componentDidMount() {
    let bookurl = this.getBookValue();
    request.get('/api/users/current')
      .end((err, res)=> {
        if (err) {
          if (res.statusCode === 401) {
            alert('Please Login!');
            location.href = '/#/login-page'
          } else {
            return alert(err);
          }
        }
        request.post('/api/users/current/books/book-detail')
          .send({barcode: bookurl})
          .end((err, res) => {
            if (err) {
              if (res.statusCode === 401) {
                alert('Please Login!');
                location.href = '/#/login-page'
              }
              console.log(err);
            }
            if (res.statusCode === 201) {
              this.setState({author: res.body.author});
              this.setState({title: res.body.title});
              this.setState({publish: res.body.publish});
              this.setState({rentTimes: res.body.rentTimes});
              this.setState({remainCount: res.body.remainCount});
              this.setState({summary: res.body.summary});
              this.setState({department: res.body.department});
            }
          });
      });
  }

  getBookValue() {
    let startPos = window.location.toString().indexOf("barcode");
    let endPos = window.location.toString().indexOf("?");
    return window.location.toString().substring(startPos + 7, endPos);
  }

  render() {
    return (
      <div className="container" id="booksContain">
        <div className="detail">
          <h2>图书简介</h2>
        </div>

        <h3 className="detail">基本信息：</h3>
        <div className="detailInfo">
          <h4>书名：{this.state.title}</h4>
          <h4>作者：{this.state.author}</h4>
          <h4>借阅次数：{this.state.rentTimes}</h4>
          <h4>书架还余：{this.state.remainCount}本</h4>
          <h4>图书位置：{this.state.department}</h4>
          <h4>出版社：{this.state.publish}</h4>
        </div>

        <h3 className="detail">该书简介：</h3>
        <div className="detailInfo">
          <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.summary}</h4>
        </div>
      </div>
    );
  }
}

class BookDetail extends React.Component {
  render() {
    return (
      <div className="contain">
        <Header/>
        <div className="body">
          <Detail/>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default BookDetail;
