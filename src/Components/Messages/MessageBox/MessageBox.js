import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Container,
  Grid,
  TextField,
  ListItem,
  List,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  IconButton,
  DialogTitle,
  Dialog,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import ImageIcon from "@material-ui/icons/Image";

import FileUploadButton from "../../FileUploadButton";
import SnackBar from "../../SnackBar";

const useStyles = makeStyles((theme) => ({
  Main: {
    border: "1px solid #000",
    borderRadius: "10px",
    boxShadow: "1px 1px 10px #bdbdbd",
    background: "#f5f5f5",
  },
  inputControl: {
    marginTop: "10px",
  },
  list: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 300,
  },
  items: {
    marginTop: "10px",
  },
}));

const MessageBox = (props) => {
  const [message, setMessage] = useState({
    from: props.fromNumber,
    to: "",
    message: "",
    images: [],
    time: "",
  });
  const [item, setItem] = useState("");
  const { messageRef } = props;

  const [uploadLoading, setUploadLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snack, setSnack] = useState({ message: "", severity: "" });
  const handleClose = () => {
    setOpen(false);
  };
  const inputRef = useRef();
  const removeTutor = (item) => {
    setMessage({
      ...message,
      images: [...message.images.filter((i) => i !== item)],
    });
  };
  const handleChange = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
  };
  const handleImages = () => {
    setMessage({ ...message, images: [...message.images, ...item] });
    setOpen(false);
  };
  const sendMsg = (data, reset, setSnackOpen, setSnack) => {
    messageRef
      .add(data)
      .then(() => {
        setSnack({
          message: `Message sent to ${data.to}`,
          severity: "success",
        });
        setSnackOpen(true);
        handleReset();
      })
      .catch((err) => {
        setSnack({
          message: err,
          severity: "error",
        });
        setSnackOpen(true);
      });
  };
  const handleReset = () => {
    setMessage({
      from: props.fromNumber,
      to: "",
      message: "",
      images: [],
      time: "",
    });
    setItem("");
  };
  const handleSubmit = () => {
    const data = {
      ...message,
      from: props.fromNumber,
      time: Date.parse(new Date()),
    };
    sendMsg(data, handleReset, setSnackOpen, setSnack);
    console.log(data);
  };
  const classes = useStyles();
  const FileList = (props) => {
    return (
      <>
        <List className={classes.list}>
          {props.urls.map((url, i) => (
            <ListItem key={i}>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={url.fileName.slice(url.fileName.indexOf("-") + 1)}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => props.removeItem(url)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </>
    );
  };
  return (
    <div className={classes.Main}>
      <Grid container style={{ margin: "0 20px" }}>
        <Container style={{ margin: "25px 25px " }}>
          <Grid item md={12} sm={12} lg={12} xs={12}>
            <TextField
              className={classes.inputControl}
              name="to"
              value={message.to}
              onChange={handleChange}
              label="To:"
              placeholder="Phone number or name"
            />
          </Grid>
          <Grid style={{ width: "100%" }} item md={12} sm={12} lg={12} xs={12}>
            <TextField
              className={classes.inputControl}
              name="message"
              value={message.message}
              onChange={handleChange}
              multiline
              fullWidth
              rows={4}
              label="Message:"
            />
          </Grid>
          <Grid style={{ width: "100%" }} item md={12} sm={12} lg={12} xs={12}>
            <Button
              variant="outlined"
              className={classes.inputControl}
              onClick={() => setOpen(true)}
            >
              Attach Images
            </Button>
            <Dialog
              onClose={handleClose}
              aria-labelledby="simple-dialog-title"
              open={open}
            >
              <DialogTitle id="simple-dialog-title">Upload Images</DialogTitle>
              <Grid container style={{ width: "100%", padding: "30px" }}>
                <Grid className={classes.items} item md={12} sm={12} xs={12}>
                  <FileUploadButton
                    setLogoUrl={setItem}
                    logoUrl={item}
                    uploadLoading={uploadLoading}
                    setUploadLoading={setUploadLoading}
                    inputRef={inputRef}
                  />
                  {item !== "" && !uploadLoading ? (
                    <Grid item md={12} sm={12} xs={12}>
                      <Typography>Proccessed</Typography>
                    </Grid>
                  ) : (
                    ""
                  )}
                </Grid>

                <Grid className={classes.items} item md={12} sm={12} xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleImages}
                    disabled={uploadLoading || item === ""}
                  >
                    Upload
                  </Button>
                </Grid>
              </Grid>
            </Dialog>
          </Grid>
          {message.images && message.images.length > 0 ? (
            <Grid className={classes.items} item md={12} sm={12} xs={12}>
              <FileList removeItem={removeTutor} urls={message.images} />
            </Grid>
          ) : (
            ""
          )}
          <Grid item md={12} sm={12} lg={12} xs={12}>
            <Button
              style={{
                marginTop: "15px",
                background: "#757575",
                color: "#fff",
              }}
              onClick={handleSubmit}
            >
              Send Text Message
            </Button>
          </Grid>
        </Container>
      </Grid>
      <SnackBar
        message={snack.message ? snack.message : "Done"}
        severity={snack.severity ? snack.severity : "success"}
        open={snackOpen}
        setOpen={setSnackOpen}
      />
    </div>
  );
};
export default MessageBox;
