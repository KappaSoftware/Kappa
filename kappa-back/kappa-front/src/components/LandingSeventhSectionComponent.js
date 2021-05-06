import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useIntl } from "react-intl";

export default function LandingSeventhSection() {
  const intl = useIntl();
  return (
    <section className="landing-seventhsection" id="ldSeventhSec">
      <Container fluid>
        <Row className="landing-seventhsection-row">
          <h2 className="landing-seventhsection-text">
            {intl.formatMessage({
              id: "landing_seventh_section_title",
            })}
          </h2>
        </Row>
        <hr className="landing-seventhsection-hr" />
        <Row className="landing-seventhsection-row2">
          <Col xs={6} md={4} className="landing-seventhsection-col">
            <div className="image--landing-seventhsection">
              <div className="image--landing-David" />
            </div>
            <p className="">Germán</p>
          </Col>
          <Col xs={6} md={4} className="landing-seventhsection-col">
            <div className="image--landing-seventhsection">
              <div className="image--landing-Piratax" />
            </div>
            <p className="">Fausto</p>
          </Col>
          <Col xs={6} md={4} className="landing-seventhsection-col">
            <div className="image--landing-seventhsection">
              <div className="image--landing-Paola" />
            </div>
            <p className="">Paola</p>
          </Col>
          <Col xs={6} md={4} className="landing-seventhsection-col">
            <div className="image--landing-seventhsection">
              <div className="image--landing-Octaviotron" />
            </div>
            <p className="">Octavio</p>
          </Col>
          <Col xs={6} md={4} className="landing-seventhsection-col">
            <div className="image--landing-seventhsection">
              <div className="image--landing-Char" />
            </div>
            <p className="">Char</p>
          </Col>
          <Col xs={6} md={4} className="landing-seventhsection-col">
            <div className="image--landing-seventhsection">
              <div className="image--landing-Jorge" />
            </div>
            <p className="">Jorge</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
