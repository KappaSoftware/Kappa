import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export default function LandingSecondSection() {
  return (
    <section className="landing-secondsection" id="ldSecondSec">
      <Container fluid>
        <Row>
          <Col className="landing-firstsection-col">
            <div className="landing-secondsection-divText">
              <h1 className="landing-secondsection-titleText">
                Find your locations by categories
              </h1>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
