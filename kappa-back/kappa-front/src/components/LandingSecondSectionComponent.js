import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export default function LandingSecondSection() {
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
            <img src="/assets/images/kappa.png" alt="Kappa" />
          </Col>
          <div className="hidden-xs col-sm-2" />
        </Row>
      </Container>
    </section>
  );
}
