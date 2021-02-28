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
            <img src="/assets/images/Blog.jpg" alt="Blog" />
          </Col>
          <Col className="landing-secondsection-col">
            <img src="/assets/images/Blog.jpg" alt="Blog" />
          </Col>
          <Col className="landing-secondsection-col">
            <img src="/assets/images/Blog.jpg" alt="Blog" />
          </Col>
          <div className="hidden-xs col-sm-2" />
        </Row>
      </Container>
    </section>
  );
}
