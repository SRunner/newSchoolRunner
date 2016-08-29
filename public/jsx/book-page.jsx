import React from 'react';
require('../css/book-page.css');
import Header from './header.jsx';
require('../css/header.css');
import Footer from './footer.jsx';
require('../css/footer.css');
import {Link} from 'react-router'
import request from 'superagent';
import _ from 'lodash';
import studentrent from '../tool/bookdetail.js'
class Books extends React.Component {
  constructor(prors) {
    super(prors);
    this.state = {
      borrowlist: [],
      detail: '',
      userName: '',
      department: '',
      readerType: ''
    }
  }

  componentDidMount() {
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
        this.setState({userName: res.body.userName});
        this.setState({department: res.body.department});
        this.setState({readerType: res.body.readerType});
        request.post('/api/users/current/books/borrowed')
          .end((err, res) => {
            if (err) {
              if (res.statusCode === 401) {
                alert('Please Login!');
                location.href = '/#/login-page'
              }
              console.log(err);
            }
            if (res.statusCode === 201) {
              this.setState({borrowlist: res.body.borrowlist});
              this.setState({detail: res.body.detail});
            }
          });
      });
  }

  render() {
      const borrowList = _.map(this.state.borrowlist, (index, id) =>
        <div key={id} className="eachBook">
          <Link to={"/book-detail/:barcode"+index.Barcode} className="bookLink" >{index.Title}</Link>
          <button type="button" className="btn btn-default btn-borrow">续 借</button>
          <span className="btn-borrow">到期时间：{index.Date}</span>
        </div>
      );
    const booklist = studentrent(this.state.borrowlist, this.state.readerType);
    return (
      <div className="container" id="booksContain">
        <div className="bookDiv">
          <span className="booksSpan">
            {this.state.department}
          </span>
          <span className="booksSpan">
            {this.state.userName}
          </span>
        </div>
        <div className="bookDiv">
          <p>
          <span className="booksSpan">
            已借图书{booklist.borrowedCount}本&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
            <span className="booksSpan">
            还可借阅{booklist.remainedCount}本
          </span>
          </p>

          <p>
            <span className="booksSpan">
            共可借阅{booklist.allCount}本&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
            <span className="booksSpan">
            到期图书{booklist.outCount}本
          </span>
          </p>
        </div>
        <div id="borrowList">
          <h4 id="borrowTitle">所借图书</h4>
          {borrowList}
        </div>
      </div>
    );
  }
}
class BooksPage extends React.Component {
  render() {
    return (
      <div className="contain">
        <Header/>
        <div className="body">
          <Books/>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default BooksPage;
