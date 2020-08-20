import AppHeader from '../app-header';
import CreateRoom from '../pages/create-room';
import Room from '../pages/room';
import ErrorPage from '../pages/error-page';
import { Route, Switch } from 'react-router-dom';
import React from 'react';
import './app.sass';

const App = () => {

  return (
    <React.Fragment>
      <AppHeader />
      <Switch>
        <Route path="/" component={CreateRoom} exact={true} />
        <Route path="/rooms/:id" component={Room} exact={true} />
        <Route path="*" component={ErrorPage} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
