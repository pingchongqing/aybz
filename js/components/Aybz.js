import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Link } from 'react-router';
import superagent from 'superagent';
import eventproxy from 'eventproxy';
import Top from './Top';
import Bottom from './Bottom';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');



class Aybz extends Component {
  constructor(props) {
    super(props);
    this.state = {clsdata: [] }
  }
  componentDidMount() {
    var ep = new eventproxy();
    ep.all('clsdone', function(clsdata){
      this.setState({clsdata: JSON.parse(clsdata)});
    }.bind(this));
    superagent
    .get('/bzcls')
    .end(function (err, res) {
      //console.log(res);
      ep.emit('clsdone', res.text);
    });
  }

  render() {
    var items = this.state.clsdata.map(function(cls){
      return(
        <li key={cls._id} className="list-group-item">
          <Link  to={{ pathname: '/cls', query:{name:cls.path} }}>
            <img src={cls.icon} />
            <h3>{cls.clsname}</h3>
          </Link>
        </li>
        );
      }.bind(this));

    return (
      <div className="container">
        <div className="row">
        <div className="col-xs-12">

            <Top />
            <div className="mar-top40">
              <ul className="clsul">
              <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                {items}
              </ReactCSSTransitionGroup>
              </ul>
            </div>
            <Bottom />




          </div>
        </div>
      </div>
    );
  }

}

export default Aybz;
