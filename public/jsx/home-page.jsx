import React from 'react';
import {Link} from 'react-router'
require('../css/home-page-style.css');
class Navigation extends React.Component {
  render() {
    return (
      <div className="homePage">
        <div>
          <nav className="navbar navbar-default" role="navigation">
            <div>
              <ul className="nav navbar-nav">
                <li><Link to="/homePage">首页</Link></li>
                <li><Link to="/bookPage">图书记录</Link></li>
                <li><Link to="/bookPage">图书帮寄</Link></li>
                <li><Link to="/deliveryPage">快递帮寄</Link></li>
                <li><Link to="/personalInfoPage">个人信息</Link></li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}
class CaroudelFigure extends React.Component {
  render() {
    return (
      <div className="home " id="homes">
        <div id="myCarousel" className="carousel slide " data-ride="carousel" data-interval="2000">
          <ol className="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
            <li data-target="#myCarousel" data-slide-to="3"></li>
          </ol>
          <div className="carousel-inner">
            <div className="item active">
              <img src="../img/Carousel1.jpg" className="img-rounded"/>
            </div>
            <div className="item">
              <img src="../img/Carousel2.jpg" className="img-rounded"/>
            </div>
            <div className="item">
              <img src="../img/Carousel3.jpg" className="img-rounded"/>
            </div>
            <div className="item">
              <img src="../img/Carousel4.jpg" className="img-rounded"/>
            </div>
          </div>
          <a className="carousel-control left" href="#myCarousel"
             data-slide="prev">&lsaquo;</a>
          <a className="carousel-control right" href="#myCarousel"
             data-slide="next">&rsaquo;</a>
        </div>

      </div>
    )
  }
}
class Describe extends React.Component {
  render() {
    return <div className="col-lg-12 col-md-12 col-sm-12">
      <br/>
      <br/>
      <h2>为什么选择我们的网站获取资讯</h2>
      <h3>校园Runner的来源</h3>
      <p>我们是一群在校大学生，开始步入大学时，唯一的感叹就是“大学真的好大啊”.然而每当我们取快递时，每次相当于在校园兜了一圈，
        当时的感触就是能不能有人帮我取一下快递啊，尤其是大夏天，取一次快递就像洗了一次澡一样啊。还有周围好多同学因为图书馆借书超期而
        被罚款并且抱怨自己为什么会忘记呢，少则十几，多则几十，除了土豪不心疼钱，谁不心疼钱啊。为此我们共同商量了制作一个校园Runner的网站，
        为大学生提供一个更加方便的平台</p>
      <h3>专为大学生提供服务</h3>
      <p>如果你还为在大学校园取快递而路途遥远而愁眉不展，那就请来我们校园Runner网站溜达溜达吧，说不定会使你笑口常开；
        如果你还为担心借阅图书馆的图书超期而被罚款交钱而提心吊胆，那就请来我们校园Runner网站登陆一下，让我们为你解除烦恼；
        我们是一个专为校园的大学生提供了方便的平台，为大学生提供更多的快捷方式，学生可以挂载自己的取快递消息，寻求他人帮助，
        并且可以查询图书记录，最重要的的是我们会在你图书即将到期时及时通知你，预防图书超期的现象</p>
      <h3>请相信我们</h3>
      <p>我们是采用实名制，登陆网站的人都是大学生，因为我们是一个专为大学生服务的平台，而且必须是学生教务系统登陆时的学号和密码，
        并第一次进入本网站的学生要补全个人信息。当你让他人帮取快递并且已经收到快递，我们需要你确认收货，向我们提交表单。
        倘若没有收到快递，请你尽快联系我们的客服人员，我们将竭尽全力帮你找回您的物品。我们将保证不会泄露您的任何隐私，
        一切都是为了您的方便和快捷，现在就来我们的平台看一看吧</p>
    </div>
  }
}
class HomePage extends React.Component {
  render() {
    return <div className="page">
      <Navigation/>
      <CaroudelFigure/>
      <Describe/>
    </div>
  }
}
export default HomePage;
