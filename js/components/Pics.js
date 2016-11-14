import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Link } from 'react-router';
import superagent from 'superagent';
import eventproxy from 'eventproxy';
import Top from './Top';
import Bottom from './Bottom';

class Pics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clsdata: []
    }
  }
  componentDidMount() {
    var ep = new eventproxy();
    ep.all('clsdone', function(clsdata){
      this.setState({clsdata: JSON.parse(clsdata)});
    }.bind(this));
    superagent
    .get('/bzcls/all')
    .end(function (err, res) {
      //console.log(res);
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
            this.state.clsdata.map(function(clsb) {
              return (<div>
                {clsb.data.map(function(clsc) {
                  return (<img src={'http://m.ayskjaj.cn'+clsc.imgsrc} />);
                })
              }
              </div>
              )

            })
          }



        </div>
      </div>
    );
  }

}

export default Pics;
