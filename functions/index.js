const functions = require("firebase-functions");
const admin = require("firebase-admin");
var serviceAccount = require("./serviceAccount.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://textify-29b68.firebaseio.com",
});
const getMessages = require("./src/getMessages");

exports.getMessages = getMessages.getMessages;
