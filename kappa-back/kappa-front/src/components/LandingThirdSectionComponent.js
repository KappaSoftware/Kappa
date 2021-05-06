import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useIntl } from "react-intl";

export default function LandingThirdSection() {
  const intl = useIntl();
  return (
    <section className="landing-thirdsection" id="ldThirdSec">
      <Container fluid>
        <Row>
          <Col xs={6} md={4} className="landing-thirdsection-col">
            <div className="landing-thirdsection-divText">
              <div className="landing-thirdsection-circle">
                <h2>1 M</h2>
              </div>
              <p className="landing-thirdsection-titleText">
                {intl.formatMessage({ id: "landing_third_section_first" })}
              </p>
            </div>
          </Col>
          <Col xs={6} md={4} className="landing-thirdsection-col">
            <div className="landing-thirdsection-divText">
              <div className="landing-thirdsection-circle">
                <h2>7</h2>
              </div>
              <p className="landing-thirdsection-titleText">
                {intl.formatMessage({ id: "landing_third_section_second" })}
              </p>
            </div>
          </Col>
          <Col xs={6} md={4} className="landing-thirdsection-col">
            <div className="landing-thirdsection-divText">
              <div className="landing-thirdsection-circle">
                <h2>3</h2>
              </div>
              <p className="landing-thirdsection-titleText">
                {intl.formatMessage({ id: "landing_third_section_third" })}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
