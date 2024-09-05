var admin = require("firebase-admin");
var serviceAccount = require("../firebaseServiceKey.json");

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();
const storage = admin.storage();

module.exports = { firestore, storage }
