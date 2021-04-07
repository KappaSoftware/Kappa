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
                Lorem Ipsum es simplemente el texto de relleno de las imprentas
                y archivos de texto. Lorem Ipsum ha sido el texto de relleno
                estándar de las industrias desde el año 1500, cuando un impresor
                (N. del T. persona que se dedica a la imprenta) desconocido usó
                una galería de textos y los mezcló de tal manera que logró hacer
                un libro de textos especimen. No sólo sobrevivió 500 años, sino
                que tambien ingresó como texto de relleno en documentos
                electrónicos, quedando esencialmente igual al original. Fue
                popularizado en los 60s con la creación de las hojas "Letraset",
                las cuales contenian pasajes de Lorem Ipsum, y más recientemente
                con software de autoedición, como por ejemplo Aldus PageMaker,
                el cual incluye versiones de Lorem Ipsum.
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
