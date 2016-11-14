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
      this.setState({
        articledata: JSON.parse(articledata)[0]
      });
      this.refs.txt.value = this.refs.bzc.innerHTML;
    }.bind(this));
    superagent
    .get('/article'+this.props.location.search)
    .end(function (err, res) {
      ep.emit('clsdone', res.text);
    }.bind(this));

  }
  handleSubmit(e) {
    e.preventDefault();
    superagent
    .post('/article')
    .send({
      bzurl: this.state.articledata.bzurl,
      bztext: this.refs.txt.value
    })
    .end(function(err, res) {
      if (err) console.log(err);
      console.log(res.body);
    });
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
        <div className="col-xs-12">
          <Top />
          <div ref="bzc" className="bzcontent"
            dangerouslySetInnerHTML={{__html: this.state.articledata.bztext?this.state.articledata.bztext.replace(/http\:\/\/m.ayskjaj.com/g,''):'' }}
            >
          </div>

          <textarea
          className="txt"
          value={this.state.articledata.bztext}
           >
          </textarea>

          <form onSubmit = {this.handleSubmit.bind(this)}>
          <textarea
          className="txt"
          ref="txt"
           >
          </textarea>
          <button type="submit"
           >提交</button>
          </form>

        <Bottom />
        </div>
        </div>
      </div>
    );
  }

}

export default Aylist;
