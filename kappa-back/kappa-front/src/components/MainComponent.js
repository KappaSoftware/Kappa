import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Landing from "./LandingComponent";
import Layout from "./LayoutComponent";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({});

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
