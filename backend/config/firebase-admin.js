var admin = require("firebase-admin");
const { decryptFile } = require("../controllers/encryptionController");
const { getStorage } = require("firebase-admin/storage");
var serviceAccount = decryptFile()

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'mk-todo-list-owais.appspot.com'
});

const firestore = admin.firestore();
const storage = getStorage();
const bucket = storage.bucket();

module.exports = { firestore, bucket, storage }
