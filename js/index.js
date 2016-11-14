import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import superagent from 'superagent';
import eventproxy from 'eventproxy';
import Aybz from './components/Aybz';
import Cls from './components/Cls';
import Aylist from './components/Aylist';
import Search from './components/Search';
import Aedit from './components/Aedit';
import  './Reset.less';
import  './Aybz.less';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Aybz}>
      <IndexRoute component={Aybz}/>
    </Route>
    <Route path="/cls" component={Cls}/>
    <Route path="/aylist" component={Aylist}/>
    <Route path="/search" component={Search}/>
    <Route path="/aeidit" component={Aedit}/>
  </Router>
),document.getElementById("aybzApp"));
