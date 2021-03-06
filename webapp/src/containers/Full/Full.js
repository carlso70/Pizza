import React, {Component} from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import User from '../../views/User/User';
import NoteTaker from '../../views/NoteTaker/NoteTaker';
import Classes from '../../views/Classes/Classes';

class Full extends Component {
   render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
            <Route path="/user" name="User" component={User}/>
            <Route path="/notes" name="Notes" component={NoteTaker}/>a
            <Route path="/classes" name="classes" component={Classes}/>
            <Redirect from="/" to="/user"/>
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
