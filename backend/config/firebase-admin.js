var admin = require("firebase-admin");
const { decryptFile } = require("../controllers/encryptionController");
var serviceAccount = decryptFile()

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();
const storage = admin.storage();

module.exports = { firestore, storage }
