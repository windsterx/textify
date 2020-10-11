const functions = require("firebase-functions");
const admin = require("firebase-admin");
const db = admin.firestore();
const express = require("express");
const cors = require("cors")({ origin: true });

const app = express();

app.use(cors);
app.get("/", (req, res, next) => {
  // res.send("hii");
  const msgRef = db.collection("messages");
  msgRef
    .get()
    .then((doc) => {
      var data = [];
      doc.forEach((item) => {
        data.push(item.data());
      });
      res.status(200);
      res.send({ data: data, message: "Success" });
      // doc.forEach((item) => {
      //   console.log(item);
      // });
    })
    .catch((err) => {
      res.status(400);
      res.send(err);
    });
});

exports.getMessages = functions.https.onRequest(app);
