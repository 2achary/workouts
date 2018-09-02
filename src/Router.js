import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./Home";
import App from "./App";
import NotFound from './NotFound';
import EmptyWorkout from "./EmptyWorkout";

const Router = () => (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/test_create" component={App}/>
        <Route path="/empty_workout" component={EmptyWorkout}/>
        <Route component={NotFound}/>
      </Switch>
    </BrowserRouter>
)

export default Router;