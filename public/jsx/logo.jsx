import React from 'react';
require('../css/logo.css');

class Top extends React.Component {
  render() {
    return (
      <div className="header">
        <img className="banana" src="../img/logo-banana.png"/>
        <img className="runner" src="../img/runner.png"/>
      </div>
    );
  }
}

export default Top;


