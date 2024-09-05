import 'react-native-get-random-values';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, uploadString } from "firebase/storage";
import { v4 as uuid } from 'uuid';

const firebaseConfig = {
  apiKey: "AIzaSyDZt2jQlWW5ZWt-bUpJYHzAM45qqf8_5I0",
  authDomain: "mk-todo-list-owais.firebaseapp.com",
  projectId: "mk-todo-list-owais",
  storageBucket: "mk-todo-list-owais.appspot.com",
  messagingSenderId: "750020160908",
  appId: "1:750020160908:web:9cd295cc374d21f56a3aa9"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

const uploadFile = async (file, location) => {
  const filePrefix = uuid();
  const fixedFilename = file.name.replace(/\s+/g, '_')
  const filename = `${filePrefix}_${fixedFilename}`
  const locationRef = ref(storage, `${location}/${filename}`)
  await uploadBytes(locationRef, file.file, { contentType: file.mimeType })
  const reference = `${location}/${filename}`
  return reference;
}

export { uploadFile }