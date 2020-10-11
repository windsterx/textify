import React, { useState } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { makeStyles } from "@material-ui/core/styles";
import MessageBox from "./MessageBox";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import Recieved from "../Recieved/Recieved";
import Messaging from "../Messaging/Messaging";
import Photos from "../Photos/Photos";

const useStyles = makeStyles((theme) => ({
  SentMsg: {
    float: "right",
  },
  RecMsg: {
    float: "left",
  },
  title: {
    flexGrow: 1,
    color: "#000",
  },
}));
const Message = ({ data, flag }) => {
  return (
    <Card
      style={{
        width: "auto",

        background: flag ? "#f5f5f5" : "#e0e0e0",
        marginTop: "1rem",
      }}
    >
      <CardHeader
        title={
          <p
            style={{
              float: flag ? "right" : "left",
              fontSize: "1rem",
            }}
          >
            {flag ? "You - " + data.from : data.from}{" "}
            <span style={{ fontSize: "0.9rem", color: "#757575" }}>
              {new Date(data.time).toLocaleDateString()}
            </span>
          </p>
        }
      />
      <CardContent>{data.message}</CardContent>
    </Card>
  );
};
const Messages = ({ fromNo }) => {
  const classes = useStyles();
  const messageRef = useFirestore().collection("messages");
  var messages = [];

  const messagesSent = useFirestoreCollectionData(
    messageRef.where("from", "==", fromNo)
  );
  const messagesRecieved = useFirestoreCollectionData(
    messageRef.where("to", "==", fromNo)
  );
  messages = messagesSent.map((message) => message);
  messages = messagesRecieved.map((message) => message);
  messages = [...messagesSent, ...messagesRecieved];

  return (
    <div>
      <h5 style={{ textAlign: "center" }}>{fromNo}</h5>
      <MessageBox fromNumber={fromNo} messageRef={messageRef} />
      <Messaging
        items={[
          {
            label: "Messages",
            component: <Recieved fromNo={fromNo} messageRef={messageRef} />,
          },
          {
            label: "Photos",
            component: <Photos images={messages} fromNo={fromNo} />,
          },
        ]}
      />
    </div>
  );
};
export default Messages;
