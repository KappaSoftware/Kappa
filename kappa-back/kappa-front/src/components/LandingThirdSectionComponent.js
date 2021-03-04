import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export default function LandingThirdSection() {
  return (
    <section className="landing-thirdsection" id="ldThirdSec">
      <Container fluid>
        <Row>
          <Col xs={6} md={3} className="landing-thirdsection-col">
            <div className="landing-thirdsection-divText">
              <div className="landing-thirdsection-circle">
                <h2>1 M</h2>
              </div>
              <p className="landing-thirdsection-titleText">Users</p>
            </div>
          </Col>
          <Col xs={6} md={3} className="landing-thirdsection-col">
            <div className="landing-thirdsection-divText">
              <div className="landing-thirdsection-circle">
                <h2>100</h2>
              </div>
              <p className="landing-thirdsection-titleText">Checkers</p>
            </div>
          </Col>
          <Col xs={6} md={3} className="landing-thirdsection-col">
            <div className="landing-thirdsection-divText">
              <div className="landing-thirdsection-circle">
                <h2>7</h2>
              </div>
              <p className="landing-thirdsection-titleText">Map types</p>
            </div>
          </Col>
          <Col xs={6} md={3} className="landing-thirdsection-col">
            <div className="landing-thirdsection-divText">
              <div className="landing-thirdsection-circle">
                <h2>3</h2>
              </div>
              <p className="landing-thirdsection-titleText">Categories</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
