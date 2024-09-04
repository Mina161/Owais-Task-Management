const { getDoc, setDoc, addDoc, collection, serverTimestamp, doc, updateDoc, deleteDoc } = require("firebase/firestore");
const { firestore } = require("../config/firebase");

function getDocumentReference(document, id) {
  const docRef = doc(firestore, document, id);
  return docRef;
}

async function getDocumentWithId(document, id) {
  const docRef = getDocumentReference(document, id);
  const docSnap = await getDoc(docRef);
  return {id: docSnap.id, ...docSnap.data(), exists: docSnap.exists()};
}

async function createDocumentWithId(document, data, id) {
  const newDoc = await setDoc(doc(firestore, document, id), {
    ...data,
    updatedAt: serverTimestamp(),
    createdAt: serverTimestamp()
  });
  return newDoc;
}

async function createDocument(document, data) {
  const newDoc = await addDoc(collection(firestore, document), {
    ...data,
    updatedAt: serverTimestamp(),
    createdAt: serverTimestamp()
  });
  return newDoc;
}

async function updateDocument(document, data, id) {
  const docRef = getDocumentReference(document, id);
  return await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp()
  });
}

async function deleteDocument(document, id) {
  const docRef = getDocumentReference(document, id);
  return await deleteDoc(docRef);
}

module.exports = { getDocumentWithId, createDocument, createDocumentWithId, getDocumentReference, updateDocument, deleteDocument };
