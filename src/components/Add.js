import React from "react";
// import firebase from "firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const Add = () => {
  const [value, setValue] = React.useState("");
  const db = firebase.firestore();
  const getValue = (event) => {
    setValue(event.target.value);
  };

  const addValue = () => {
    db.collection("values")
      .doc()
      .set({
        value: value,
      })
      .then(() => {
        console.log("Value successfully written!");
      })
      .catch((error) => {
        console.error("Error writing Value: ", error);
      });
  };

  return (
    <div>
      <input onBlur={getValue} type='text' />
      <button type='button' onClick={addValue}>
        Add
      </button>
    </div>
  );
};

export default Add;