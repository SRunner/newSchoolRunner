import React from 'react';
require('../css/header.css');

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <img className="banana" src="../img/logo-banana.png"/>
        <img className="runner" src="../img/runner.png"/>
      </div>
    );
  }
}

export default Header;


