import React, { Suspense, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import InputForm from "./Components/InputForm/InputForm";
import Messages from "./Components/Messages";
import Header from "./Components/Header/Header";
import { CircularProgress, Container } from "@material-ui/core";
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
import { FirebaseAppProvider } from "reactfire";
function App() {
  const [fromNo, setFromNo] = useState("");
  const [number, setNumber] = useState("");
  const [open, setOpen] = useState(fromNo === "" ? true : false);
  const handleClose = () => {
    setOpen(false);
  };
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  };
  return (
    <>
      <FirebaseAppProvider firebaseConfig={firebaseConfig} initPerformance>
        <Suspense fallback={<CircularProgress />}>
          <Header setOpen={setOpen} />
          <Container>
            <Messages fromNo={fromNo} />
            <Dialog aria-labelledby="simple-dialog-title" open={open}>
              <DialogTitle id="simple-dialog-title">Number</DialogTitle>
              <div style={{ padding: "30px" }}>
                <TextField
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  label="Enter Your Number"
                  placeholder="Enter a valid number"
                />
                <Button
                  onClick={() => {
                    setFromNo(number);
                    handleClose();
                  }}
                >
                  Submit
                </Button>
              </div>
            </Dialog>
          </Container>
        </Suspense>
      </FirebaseAppProvider>
    </>
  );
}

export default App;
