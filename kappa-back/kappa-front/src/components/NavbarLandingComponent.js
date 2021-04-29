import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import DialogSignUp from "./DialogSignUpComponent";
import { NavLink } from "react-router-dom";

export default function NavbarLanding() {
  const [openDialogSignUp, setOpenDialogSignUp] = useState(false);

  const handleClickOpenDialogSignUp = () => {
    setOpenDialogSignUp(true);
  };

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
            <a className="nav-link" href="/home/#ldFirstSec">
              Home
            </a>
            <a className="nav-link" href="/home/#ldFourthSec">
              Product
            </a>
            <NavDropdown title="More options" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/home/#ldSixthSec">
                More info
              </NavDropdown.Item>
              <NavDropdown.Item href="/home/#ldSeventhSec">
                About us
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/disclaimer">Disclaimer</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <NavLink to="/map" className="Landing-navbar-navlink-map">
              <Button variant="primary" className="Landing-navbar-buttonMap">
                Map
              </Button>
            </NavLink>
            <Button
              variant="light"
              className="Landing-navbar-buttonSignUp"
              onClick={handleClickOpenDialogSignUp}
            >
              Sign Up
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <DialogSignUp
        openDialog={openDialogSignUp}
        setOpenDialog={setOpenDialogSignUp}
      />
    </header>
  );
}
