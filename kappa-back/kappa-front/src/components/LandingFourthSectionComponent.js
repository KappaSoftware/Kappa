import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useIntl } from "react-intl";
import { FaGithub } from "react-icons/fa";

export default function LandingFourthSection() {
  const intl = useIntl();
  return (
    <section className="landing-fourthsection" id="ldFourthSec">
      <Container fluid>
        <Row>
          <Col xl={6} md={12}>
            <div className="landing-fourthsection-divText">
              <h2>Find specific maps</h2>
              <br />
              <p>
                Kappa es una iniciativa académica de impacto social liderada por
                un equipo multidisciplinar que tiene como objeto brindar al
                usuario una plataforma de georreferenciación basada en
                tecnologías libres y abiertas. En su versión actual, Kappa
                permite la georreferenciación de huecos o baches de carretera,
                centros de vacunación (COVID-19) y eventos (conciertos, actos
                públicos, manifestaciones, etc.). Mediante el bot de Telegram,
                los usuarios pueden agregar al mapa ubicaciones de lugares o
                eventos en las categorías mencionadas.
              </p>
              <p>
                Kappa es Software Libre y cualquier interesado puede contribuir
                desde nuestro repositorio en GitHub.
              </p>
              <div
                className="sidebar-btn-wrapper"
                style={{
                  padding: "20px 24px",
                }}
              >
                <a
                  href="https://github.com/KappaSoftware/Kappa"
                  target="_blank"
                  className="landing-fourthsection-btnGitHub"
                  rel="noopener noreferrer"
                >
                  <FaGithub />
                  <span> {intl.formatMessage({ id: "title" })}</span>
                </a>
              </div>
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
