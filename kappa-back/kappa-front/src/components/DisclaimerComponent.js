import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import NavbarLanding from "./NavbarLandingComponent";
import LandingFooterComponent from "./LandingFooterComponent";

const useStyles = makeStyles((theme) => ({
  paddingContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const axios = require("axios");
const urlDisclaimer =
  "https://gist.githubusercontent.com/DavidMS73/2a81d86375b6b8ff078fe41d1f58893b/raw/disclaimerKappa.html";

export default function DisclaimerComponent() {
  const [disclaimerData, setDisclaimerData] = useState();

  useEffect(() => {
    axios
      .get(urlDisclaimer)
      .then((response) => {
        setDisclaimerData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  });

  const classes = useStyles();

  return (
    <>
      <NavbarLanding />
      <Toolbar />
      <Container fixed className={classes.paddingContainer}>
        <div dangerouslySetInnerHTML={{ __html: disclaimerData }}></div>
      </Container>

      <LandingFooterComponent />
    </>
  );
}
