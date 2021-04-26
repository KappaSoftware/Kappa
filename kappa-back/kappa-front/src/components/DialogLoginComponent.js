import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import { loginUser } from "../redux/ActionCreators";
import { useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  marginButton: {
    marginTop: theme.spacing(4),
  },
  textError: {
    marginTop: theme.spacing(2),
    color: "#d32f2f",
  },
}));

export default function DialogLogin(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [userError, setUserError] = useState("");

  const handleCloseDialog = () => {
    props.setOpenDialog(false);
  };

  const handleSubmitLogin = async (data) => {
    const userData = await dispatch(loginUser(data));
    if (userData.data.success === true) {
      props.setOpenDialog(false);
    } else {
      await setUserError(userData.data.message);
    }
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <Dialog
        open={props.openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <form
            noValidate
            onSubmit={handleSubmit((data) => handleSubmitLogin(data))}
          >
            <Controller
              control={control}
              name="username"
              defaultValue=""
              rules={{ required: "Requerido" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  autoFocus
                  required
                  margin="dense"
                  label="Username"
                  fullWidth
                  error={errors.username ? true : false}
                  helperText={errors.username ? errors.username.message : ""}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              defaultValue=""
              rules={{ required: "Requerido" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  required
                  label="Contraseña"
                  type="password"
                  fullWidth
                  error={errors.password ? true : false}
                  helperText={errors.password ? errors.password.message : ""}
                />
              )}
            />

            <Typography
              variant="body1"
              component="h3"
              className={classes.textError}
            >
              {userError}
            </Typography>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              className={classes.marginButton}
            >
              Ingresar{" "}
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
