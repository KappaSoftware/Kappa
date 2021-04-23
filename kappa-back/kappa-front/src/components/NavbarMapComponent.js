import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import DialogLogin from "./DialogLoginComponent";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

export default function NavbarMap({ handleToggleSidebar }) {
  const classes = useStyles();

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

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
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickOpenDialog}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <DialogLogin openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </>
  );
}
