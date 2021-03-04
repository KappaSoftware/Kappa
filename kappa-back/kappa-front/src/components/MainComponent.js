import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Landing from "./LandingComponent";
import Map from "./MapComponent";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({});

function Main() {
  return (
    <>
      <Switch>
        <Route path="/home">
          <Landing />
        </Route>
        <Route exact path="/map">
          <Map />
        </Route>
        <Redirect to="/home" />
      </Switch>
    </>
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
