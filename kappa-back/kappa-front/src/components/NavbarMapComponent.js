import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import DialogLogin from "./DialogLoginComponent";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/ActionCreators";
import DialogSignUp from "./DialogSignUpComponent";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  marginRightButtonUsername: {
    marginRight: theme.spacing(2),
  },
}));

export default function NavbarMap({ handleToggleSidebar }) {
  const classes = useStyles();

  const dataLogin = useSelector((state) => state.login);

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const [openDialogSignUp, setOpenDialogSignUp] = useState(false);

  const handleClickOpenDialogSignUp = () => {
    setOpenDialogSignUp(true);
  };

  const dispatch = useDispatch();

  const handleClickClose = () => {
    dispatch(logoutUser());
  };

  let buttonLoginOrUsername = (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpenDialog}
        className={classes.marginRightButtonUsername}
      >
        Login
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleClickOpenDialogSignUp}
      >
        Sign Up
      </Button>
    </>
  );

  if (dataLogin.token !== "") {
    buttonLoginOrUsername = (
      <>
        <Typography
          variant="body1"
          component="span"
          className={classes.marginRightButtonUsername}
        >
          Bienvenido {dataLogin.username}
        </Typography>
        <Button variant="outlined" color="primary" onClick={handleClickClose}>
          Log out
        </Button>
      </>
    );
  }

  return (
    <>
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton
            edge="start"
            className={"btn-toggle"}
            color="primary"
            aria-label="menu"
            onClick={() => handleToggleSidebar(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Map
          </Typography>
          {buttonLoginOrUsername}
        </Toolbar>
      </AppBar>
      <DialogLogin openDialog={openDialog} setOpenDialog={setOpenDialog} />
      <DialogSignUp
        openDialog={openDialogSignUp}
        setOpenDialog={setOpenDialogSignUp}
      />
    </>
  );
}
