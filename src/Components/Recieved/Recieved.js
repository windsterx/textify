import { Card, CardHeader, Grid, CardContent } from "@material-ui/core";
import React, { useState } from "react";
import { useFirestoreCollectionData } from "reactfire";
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
              {flag ? "Sent" : "Recieved"}
              {" on " +
                new Date(data.time).toLocaleDateString() +
                " at " +
                new Date(data.time).toLocaleTimeString()}
            </span>
          </p>
        }
      />
      <CardContent>{data.message}</CardContent>
    </Card>
  );
};
export default function Recieved({ fromNo, messageRef }) {
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
  //   const [messages, setMessages] = useState([]);
  //   const getData = (data) => {
  //     setMessages([...data]);
  //   };
  //   fetch(process.env.REACT_APP_FIREBASE_CLOUD_FUNCTIONS + "/getMessages", {
  //     method: "GET",
  //     // headers: { "Content-Type": "application/json" },
  //   })
  //     .then((res) => {
  //       res.text().then((d) => {
  //         var b = JSON.parse(d);
  //         var msgs = b.data;
  //         var recvd = msgs.filter((msg) => {
  //           return msg.to === fromNo || msg.from === fromNo;
  //         });
  //         // getData(recvd);
  //         setMessages([...recvd]);
  //         // console.log(messages);
  //       });
  //       // console.log();
  //     })
  //     .catch((err) => console.log(err));
  return (
    <>
      <h4>Messages</h4>
      <ul style={{ listStyle: "none" }}>
        <Grid container>
          {messages.length > 0
            ? messages.map((message, i) => (
                <Grid item md={12} sm={12} key={i}>
                  <li
                    style={
                      message.from === fromNo
                        ? { float: "right", maxWidth: "90%", width: "90%" }
                        : { float: "left", maxWidth: "90%", width: "90%" }
                    }
                  >
                    <Message
                      data={message}
                      flag={message.from === fromNo ? true : false}
                    />
                  </li>
                </Grid>
              ))
            : "No messages"}
        </Grid>
      </ul>
    </>
  );
}
