import React from 'react';
import {Route} from 'react-router';
import {ConnectedRouter} from 'react-router-redux';
import routes from 'routes';
import {Switch} from 'react-router-dom';

const RouteWithSubRoutes = route => (
  <Route
    exact={true}
    path={route.path}
    render={props => <route.component {...props} routes={route.routes} />}
  />
);

export default ({history}) => (
  <ConnectedRouter history={history}>
    <Switch>
      {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
    </Switch>
  </ConnectedRouter>
);