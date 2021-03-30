import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Landing from "./LandingComponent";
import Layout from "./LayoutComponent";

function Main({ setLocale }) {
  return (
    <>
      <Switch>
        <Route path="/home">
          <Landing />
        </Route>
        <Route exact path="/map">
          <Layout setLocale={setLocale} />
        </Route>
        <Redirect to="/home" />
      </Switch>
    </>
  );
}

export default Main;
