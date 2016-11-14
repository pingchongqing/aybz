import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import superagent from 'superagent';
import eventproxy from 'eventproxy';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

class Top extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bzname: ''
    }
  }
  handleChange(e) {
    this.setState({
      bzname: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    browserHistory.push('/search?bzname='+this.state.bzname);

  }
  render() {
    return (
        <div className="row">
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
               <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#collapse-aiy" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/">艾元臻妙</a>
            </div>
            <div className="navbar-collapse collapse" id="collapse-aiy" aria-expanded="false" style={{height: '1px'}}>
              <ul className="nav navbar-nav">
                <li ><a href="http://www.aiyuanzhenmiao.com">经脉穴位 <span className="sr-only">(current)</span></a></li>
                <li className="active"><a href="/">病症搜索</a></li>
              </ul>
            </div>
          </div>
        </nav>


        <div className="col-xs-12">
          <img className="center-block" width="300" src="http://www.aiyuanzhenmiao.com/images/aiylogo.jpg" />
        </div>


        <div className="col-xs-12">
        <div className="col-xs-1 col-lg-3"></div>
        <div className="col-xs-10 col-lg-6 aiy-search">
        	<form name="aiy-search-form" id="aiy-search-form" >
        	  <div className="input-group">
        	    <input type="text"
                className="form-control"
                name="bzname"
                id="aiy-search-input"
                onChange={this.handleChange.bind(this)}
                list="aiy-xw" placeholder="输入要搜索的病症 ..." required="required" />
        	    <span className="input-group-btn">
        	      <button
                className="btn btn-default"
                id="aiy-search-button"
                onClick={this.handleSubmit.bind(this)}
                type="button">查询</button>
        	    </span>
        	  </div>
        	</form>
        </div>
        <div className="col-xs-1 col-lg-3"></div>
        </div>

      </div>
    )
  }
}

export default Top;
