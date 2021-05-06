import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import DisclaimerComponent from "./DisclaimerComponent";

import Landing from "./LandingComponent";
import Layout from "./LayoutComponent";

function Main({ language, setLanguage }) {
  return (
    <>
      <Switch>
        <Route path="/home">
          <Landing language={language} setLanguage={setLanguage} />
        </Route>
        <Route exact path="/disclaimer">
          <DisclaimerComponent />
        </Route>
        <Route exact path="/map">
          <Layout language={language} setLanguage={setLanguage} />
        </Route>
        <Redirect to="/home" />
      </Switch>
    </>
  );
}

export default Main;
