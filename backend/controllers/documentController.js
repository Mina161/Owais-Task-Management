const { getDoc, setDoc, addDoc, collection, serverTimestamp, doc } = require("firebase/firestore");
const { firestore } = require("../config/firebase");

async function getDocumentWithId(document, id) {
  const docRef = doc(firestore, document, id);
  const docSnap = await getDoc(docRef);
  return {id: docSnap.id, ...docSnap.data()};
}

async function createDocumentWithId(document, data, id) {
  const newDoc = await setDoc(doc(firestore, document, id), {
    ...data,
    createdAt: serverTimestamp()
  });
  return newDoc;
}

async function createDocument(document, data) {
  const newDoc = await addDoc(collection(firestore, document), {
    ...data,
    createdAt: serverTimestamp()
  });
  return newDoc;
}

module.exports = { getDocumentWithId, createDocument, createDocumentWithId };
