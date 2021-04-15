import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

import { NavLink } from "react-router-dom";

export default function NavbarLanding() {
  return (
    <header>
      <Navbar
        collapseOnSelect
        expand="sm"
        bg="gray"
        variant="light"
        fixed="top"
      >
        <Navbar.Brand href="/home">
          <img
            src="/kappaLogo.png"
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <a className="nav-link" href="#ldFirstSec">
              Home
            </a>
            <a className="nav-link" href="#ldFourthSec">
              Product
            </a>
            <NavDropdown title="More options" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#ldSixthSec">More info</NavDropdown.Item>
              <NavDropdown.Item href="#ldSeventhSec">About us</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/disclaimer">Disclaimer</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <NavLink to="/map">
              <Button
                variant="primary mr-4"
                className="Landing-navbar-buttonLogIn"
              >
                Map
              </Button>
            </NavLink>
            <NavLink eventKey={2} to="/signup">
              <Button variant="light" className="Landing-navbar-buttonSignUp">
                Sign Up
              </Button>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
