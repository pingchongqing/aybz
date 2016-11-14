import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Link } from 'react-router';
import superagent from 'superagent';
import eventproxy from 'eventproxy';
import Top from './Top';
import Bottom from './Bottom';

class Arts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arts: [],
      title: ''
    }
  }
  componentDidMount() {
    var ep = new eventproxy();
    ep.all('clsdone', function(articledata){
      this.setState({arts: JSON.parse(articledata)});
    }.bind(this));
    superagent
    .get('/article/all')
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

          {
            this.state.arts.map(function(art) {
                return   <div dangerouslySetInnerHTML={ {__html: art.bztext.replace(/\"\/UploadImage/g,'\"http://m.ayskjaj.cn/UploadImage') } }></div>
            })
          }



        </div>
      </div>
    );
  }

}

export default Arts;
