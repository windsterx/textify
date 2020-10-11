import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "#000",
  },
}));

export default function Header({ setOpen }) {
  const classes = useStyles();
  return (
    <AppBar position="static" style={{ background: "#757575" }}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          <strong>Textify</strong> Because Text Messaging Rocks
        </Typography>
        <Button
          onClick={() => {
            setOpen(true);
          }}
          color="inherit"
        >
          Change Number
        </Button>
      </Toolbar>
    </AppBar>
  );
}
