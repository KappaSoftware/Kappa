import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

import { NavLink } from "react-router-dom";

export default function NavbarLanding() {
  return (
    <header>
      <Navbar collapseOnSelect expand="sm" bg="gray" variant="light">
        <Navbar.Brand href="#home">
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
            <NavLink className="nav-link" to="/home">
              Home
            </NavLink>
            <NavLink className="nav-link" to="#ldThirdSec">
              Product
            </NavLink>
            <NavLink className="nav-link" to="/map">
              Map
            </NavLink>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <NavLink to="#deets">
              <Button variant="primary" className="Landing-navbar-buttonLogIn">
                Log In
              </Button>
            </NavLink>
            <NavLink eventKey={2} to="#memes">
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
