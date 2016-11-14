import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Link } from 'react-router';

class Bottom extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-bottom" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <p className="navbar-text text-center">©浙江艾元臻妙健康科技有限公司版权所有 2016</p>
          </div>
        </div>
      </nav>
    )
  }
}

export default Bottom;
