import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Link } from 'react-router';
import superagent from 'superagent';
import eventproxy from 'eventproxy';

import Top from './Top';
import Bottom from './Bottom';


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clsdata: [],
      clsname: ''
    }
  }

  componentWillReceiveProps(np) {
    var ep = new eventproxy();
    ep.all('clsdone', function(clsdata){
      this.setState({clsdata: JSON.parse(clsdata)});
    }.bind(this));
    superagent
    .get('/bzcls/search'+np.location.search)
    .end(function (err, res) {
      //console.log(res);
      ep.emit('clsdone', res.text);
    }.bind(this));
  }

  componentDidMount() {
    var ep = new eventproxy();
    ep.all('clsdone', function(clsdata){
      this.setState({clsdata: JSON.parse(clsdata)});
    }.bind(this));
    superagent
    .get('/bzcls/search'+this.props.location.search)
    .end(function (err, res) {
      //console.log(res);
      ep.emit('clsdone', res.text);
    }.bind(this));
  }

/*cls data:
*"href":"http://m.ayskjaj.cn/health/detail.aspx?id=286",
 "imgsrc":"/UploadImage/Article/20150902103639866.jpg",
 "text":"产后恶露不尽",
 "descrip":"艾灸取穴：中极、关元、气海、血海、三阴交、神阙"

*/
  render() {
    return (
      <div className="container">
        <div className="row">
        <div className="col-xs-12">

          <Top />
            <ul  className="list-group bzclsul">
              <div className="clsname">共查询到{this.state.clsdata.length}记录</div>
                {this.state.clsdata.map(function(tdata){
                return(
                <li key={tdata.text+Date.now()} className="list-group-item" >
                  <Link  to={{
                     pathname:'/aylist',
                     query:{bzurl: /\d+/.exec(tdata.href)},
                     state:{title: tdata.text}
                   }}>
                    <img src={tdata.imgsrc} className="img-rounded" />
                    <div className="clsfont">
                      <h3>{tdata.text.substring(0,18)}</h3>
                      <p >{tdata.descrip.substring(0,18)}</p>
                    </div>
                  </Link>
                </li>
                )
              }) }
            </ul>
        <Bottom />
      </div>
      </div>
    </div>
    )
  }

}

export default Search;
