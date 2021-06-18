import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { makeStyles } from "@material-ui/core/styles";
import YouTubeIcon from "@material-ui/icons/YouTube";

const useStyles = makeStyles((theme) => ({
  backgroundThird: {
    backgroundColor: "#2b5566e6",
    borderRadius: "10px",
    padding: "10px",
    color: "white",
  },

  noMargin: {
    margin: 0,
  },
}));

export default function LandingSecondSection() {
  const classes = useStyles();

  return (
    <section className="landing-secondsection" id="ldSecondSec">
      <Container fluid>
        <Row>
          <div className="hidden-xs col-sm-2" />
          <Col className="landing-secondsection-col">
            <img src="/assets/images/agpl.png" alt="AGPL" />
          </Col>
          <Col className="landing-secondsection-col">
            <img src="/assets/images/cc-by-sa.png" alt="CC-BY-SA" />
          </Col>
          <Col className="landing-secondsection-col">
            <a href="https://youtu.be/vVXgsnkYZPs">
              <div className={classes.backgroundThird}>
                <p className={classes.noMargin}>¡Gran Lanzamiento!</p>
                <YouTubeIcon style={{ fontSize: 40, color: "#FF0000" }} />
                <p className={classes.noMargin}>Click aquí</p>
              </div>
            </a>
          </Col>
          <div className="hidden-xs col-sm-2" />
        </Row>
      </Container>
    </section>
  );
}
