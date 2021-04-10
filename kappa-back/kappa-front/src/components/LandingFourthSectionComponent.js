import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export default function LandingFourthSection() {
  return (
    <section className="landing-fourthsection" id="ldFourthSec">
      <Container fluid>
        <Row>
          <Col xl={6} md={12}>
            <div className="landing-fourthsection-divText">
              <h2>Find specific maps</h2>
              <br />
              <p>
                Kappa es una iniciativa de impacto social liderada por un equipo
                multidisciplinar que tiene como objeto brindar al usuario una
                plataforma de georreferenciación basada en tecnologías libres y
                abiertas. En la versión actual Kappa permite la
                georreferenciación de huecos o baches de carretera, centros de
                vacunación (COVID-19) y eventos (conciertos, actos públicos,
                manifestaciones, etc.). Mediante nuestro bot en Telegram,
                nuestros usuarios pueden agregar al mapa cualquiera de estas
                ubicaciones o consultar las que estén cercanas a su ubicación
                actual.
              </p>
              <p>
                Kappa es Software Libre, cualquier interesado puede contribuir
                desde nuestro repositorio en GitHub.
              </p>
            </div>
          </Col>
          <Col xl={6} md={12} className="landing-fourthsection-col">
            <div className="landing-fourthsection-div" />
          </Col>
        </Row>
      </Container>
    </section>
  );
}
