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

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

export default function NavbarMap({ handleToggleSidebar }) {
  const classes = useStyles();

  const dataLogin = useSelector((state) => state.login);

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  let buttonLoginOrUsername = (
    <Button variant="outlined" color="primary" onClick={handleClickOpenDialog}>
      Login
    </Button>
  );

  console.log(dataLogin.token);
  console.log(dataLogin);

  if (dataLogin.token !== "") {
    buttonLoginOrUsername = (
      <Typography variant="h6">Bienvenido {dataLogin.username}</Typography>
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
    </>
  );
}
