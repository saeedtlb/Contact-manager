import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Contacts from './components/contacts/Contacts';
import Header from './components/layout/Header';
import EditContact from './components/contacts/EditContact';
import About from './components/page/About';
import NotFound from './components/page/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './Redux/store';
import { Provider } from 'react-redux';
import AddContact from './components/contacts/AddContact';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Header branding="contact manager" />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Contacts} />
                <Route exact path="/contact/add" component={AddContact} />
                <Route exact path="/contact/edit/:id" component={EditContact} />
                <Route exact path="/about" component={About} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
