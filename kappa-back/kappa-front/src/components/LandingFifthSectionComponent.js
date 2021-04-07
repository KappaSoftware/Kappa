import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export default function LandingFifththSection() {
  return (
    <section className="landing-fifthsection" id="ldFifthSec">
      <Container fluid>
        <Row>
          <Col xs={12} sm={6} className="p-0">
            <div className="landing-fifthsection-div-first"></div>
            <div className="landing-fifthsection-title">
              <h3>Foods</h3>
            </div>
          </Col>
          <Col xs={12} sm={6} className="p-0">
            <div className="landing-fifthsection-div-second"></div>
            <div className="landing-fifthsection-title">
              <h3>Parts</h3>
            </div>
          </Col>
          <Col xs={12} sm={6} className="p-0">
            <div className="landing-fifthsection-div-third"></div>
            <div className="landing-fifthsection-title">
              <h3>Recycling points</h3>
            </div>
          </Col>
          <Col xs={12} sm={6} className="p-0">
            <div className="landing-fifthsection-div-fourth"></div>
            <div className="landing-fifthsection-title">
              <h3>Health</h3>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
