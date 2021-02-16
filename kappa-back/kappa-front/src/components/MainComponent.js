import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Map from "./MapComponent";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({});

function Main() {
  return (
    <div>
      <Switch>
        <Route path="/home">
          <h1>Hola</h1>
        </Route>
        <Route exact path="/map">
          <Map />
        </Route>
        <Redirect to="/home" />
      </Switch>
    </div>
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
