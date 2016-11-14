import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Link } from 'react-router';
import superagent from 'superagent';
import eventproxy from 'eventproxy';

import Top from './Top';
import Bottom from './Bottom';

class Aylist extends Component {
  constructor(props) {
    super(props);
    this.state = {articledata: {} }
  }
  componentDidMount() {
    var ep = new eventproxy();
    ep.all('clsdone', function(articledata){
      this.setState({articledata: JSON.parse(articledata)[0]});
    }.bind(this));
    superagent
    .get('/article'+this.props.location.search)
    .end(function (err, res) {
      ep.emit('clsdone', res.text);
    }.bind(this));
  }

  /*article data:
  *{
  *  "bzurl":"68",
  *  "bztext":""
  * }
  */

  render() {
    return (
      <div className="container">
        <div className="row">
        <div className="col-xs-12 col-md-12 col-lg-12">

          <Top />

        <div className="bzcontent" dangerouslySetInnerHTML={{__html: this.state.articledata.bztext?this.state.articledata.bztext.replace(/http\:\/\/m.ayskjaj.com/g,''):'' }}></div>

        <Bottom />

        </div>
        </div>
      </div>
    );
  }

}

export default Aylist;
