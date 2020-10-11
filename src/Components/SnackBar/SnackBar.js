import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const SnackBar = ({ message, severity, open, setOpen }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Snackbar
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <Alert severity={severity} onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};
export default SnackBar;
