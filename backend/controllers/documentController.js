const { firestore } = require("../config/firebase-admin");
const { Timestamp } = require("firebase-admin/firestore")

function getDocumentReference(collection, id) {
  const docRef = firestore.collection(collection).doc(id);
  return docRef;
}

async function getDocumentWithId(collection, id) {
  const docRef = getDocumentReference(collection, id);
  const docSnap = await docRef.get();
  return {id: docSnap.id, ...docSnap.data(), exists: docSnap.exists};
}

async function createDocumentWithId(collection, data, id) {
  const newDoc = await firestore.collection(collection).doc(id).set({
    ...data,
    updatedAt: Timestamp.now(),
    createdAt: Timestamp.now()
  })
  return newDoc;
}

async function createDocument(collection, data) {
  const newDoc = await firestore.collection(collection).add({
    ...data,
    updatedAt: Timestamp.now(),
    createdAt: Timestamp.now()
  })
  return newDoc;
}

async function updateDocument(collection, data, id) {
  const docRef = getDocumentReference(collection, id);
  return await docRef.set({
    ...data,
    updatedAt: Timestamp.now()
  });
}

async function deleteDocument(collection, id) {
  const docRef = getDocumentReference(collection, id);
  return await docRef.delete();
}

module.exports = { getDocumentWithId, createDocument, createDocumentWithId, getDocumentReference, updateDocument, deleteDocument };
