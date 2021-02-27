import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export default function LandingFirstSection() {
  return (
    <section className="landing-firstsection" id="ldFirstSec">
      <Container fluid>
        <Row className="landing-firstsection-row row-align-itemvertical">
          <Col className="landing-firstsection-col">
            <div className="landing-firstsection-divText">
              <h1 className="text-color-white landing-firstsection-titleText">
                Find your locations by categories
              </h1>
              <Button
                variant="outline-light"
                className="landing-firstsection-buttonSignUp"
              >
                Sign Up
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
