import React from 'react';
import {Link} from 'react-router';
require('../css/delivery-book-style.css');

class Delivery extends React.Component {
  render() {
    return (
      <div>
        <div className="all">
          <div className="top common">
            <span className="title">快递帮</span>
          </div>
          <div className="middle common">
            <div className="active">
              <span>王大锤：</span>
              <div>
                下午15：30之前，西区找人帮取快递
              </div>
            </div>
            <div className="active">
              <span>李小孩：</span>
              <div>
                下午15：30，去西区超市二楼取快递，可帮人代取，有需要的同学可以联系我
              </div>
            </div>
            <div className="active">
              <span>我：</span>
              <div>
                下午15：30，去西区超市二楼取快递，可帮人代取，有需要的同学可以联系我
              </div>
            </div>
          </div>

        </div>
        <div className="bottom common">
          <input className="form-control" type="text" placeholder="我要发布"/>
          <button className="btn-link" type="button"><Link to="/deliveryPage">发送</Link></button>
        </div>
      </div>
    )
  }
}
export default Delivery;
