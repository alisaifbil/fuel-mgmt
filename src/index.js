import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import firebase from "firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


firebase.initializeApp({
  apiKey: "AIzaSyA8cOdQzw0zRnkAZDf4_yrs1qqRg5tGOeE",
  authDomain: "fuel-mgmt.firebaseapp.com",
  databaseURL: "https://fuel-mgmt.asia-south1.firebasedatabase.app",
  projectId: "fuel-mgmt",
  storageBucket: "fuel-mgmt.appspot.com",
  messagingSenderId: "426641376351",
  appId: "1:426641376351:web:227698dadb2399ba3007ea"
  });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
