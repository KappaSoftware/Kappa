import React, { useState, useRef } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { Button as ButtonReact } from "@material-ui/core";
import DialogSignUp from "./DialogSignUpComponent";
import { NavLink } from "react-router-dom";
import { useIntl } from "react-intl";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";

const options = ["Español", "English"];

const useStyles = makeStyles((theme) => ({
  marginRightButton: {
    marginRight: theme.spacing(2),
  },
  paperOption: {
    zIndex: 500,
  },
}));

export default function NavbarLanding({ language, setLanguage }) {
  const intl = useIntl();

  const classes = useStyles();

  const [openDialogSignUp, setOpenDialogSignUp] = useState(false);

  const handleClickOpenDialogSignUp = () => {
    setOpenDialogSignUp(true);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const [openOptions, setOpenOptions] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(language === "es" ? 0 : 1);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    handleLanguageChange(index === 0 ? "es" : "en");
    setOpenOptions(false);
  };

  const handleToggleOptions = () => {
    setOpenOptions((prevOpen) => !prevOpen);
  };

  const handleCloseOptions = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenOptions(false);
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
              {intl.formatMessage({
                id: "landing_navbar_title_first",
              })}
            </a>
            <a className="nav-link" href="/home/#ldFourthSec">
              {intl.formatMessage({
                id: "landing_navbar_title_second",
              })}
            </a>
            <NavDropdown
              title={intl.formatMessage({
                id: "landing_navbar_title_third",
              })}
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item href="/home/#ldSixthSec">
                {intl.formatMessage({
                  id: "landing_navbar_title_fourth",
                })}
              </NavDropdown.Item>
              <NavDropdown.Item href="/home/#ldSeventhSec">
                {intl.formatMessage({
                  id: "landing_navbar_title_fiveth",
                })}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/disclaimer">
                {intl.formatMessage({
                  id: "landing_navbar_title_sixth",
                })}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <ButtonGroup
              variant="text"
              color="primary"
              ref={anchorRef}
              aria-label="Language"
              className={classes.marginRightButton}
            >
              <ButtonReact>{options[selectedIndex]}</ButtonReact>
              <ButtonReact
                color="primary"
                size="small"
                aria-controls={openOptions ? "Language menu" : undefined}
                aria-expanded={openOptions ? "true" : undefined}
                aria-label="Select merge strategy"
                aria-haspopup="menu"
                onClick={handleToggleOptions}
              >
                <ArrowDropDownIcon />
              </ButtonReact>
            </ButtonGroup>
            <Popper
              open={openOptions}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
              className={classes.paperOption}
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleCloseOptions}>
                      <MenuList id="split-button-menu">
                        {options.map((option, index) => (
                          <MenuItem
                            key={option}
                            selected={index === selectedIndex}
                            onClick={(event) =>
                              handleMenuItemClick(event, index)
                            }
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
            <NavLink to="/map" className="Landing-navbar-navlink-map">
              <Button variant="primary" className="Landing-navbar-buttonMap">
                {intl.formatMessage({
                  id: "landing_navbar_title_seventh",
                })}
              </Button>
            </NavLink>
            <Button
              variant="light"
              className="Landing-navbar-buttonSignUp"
              onClick={handleClickOpenDialogSignUp}
            >
              {intl.formatMessage({
                id: "landing_navbar_title_eight",
              })}
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
