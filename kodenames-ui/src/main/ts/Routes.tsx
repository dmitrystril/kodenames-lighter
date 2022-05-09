import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Pages } from './constants/Pages';
import { GameContainer } from './pages/Game';
import Rules from './pages/Rules';

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={Pages.RULES} component={Rules} />
        <Route path="/" component={GameContainer} />
      </Switch>
    </BrowserRouter>
  );
};
