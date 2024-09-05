const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyDZt2jQlWW5ZWt-bUpJYHzAM45qqf8_5I0",
  authDomain: "mk-todo-list-owais.firebaseapp.com",
  projectId: "mk-todo-list-owais",
  storageBucket: "mk-todo-list-owais.appspot.com",
  messagingSenderId: "750020160908",
  appId: "1:750020160908:web:9cd295cc374d21f56a3aa9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

module.exports = { auth }