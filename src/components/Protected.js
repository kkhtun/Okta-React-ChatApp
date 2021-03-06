import React, { useState, useRef } from "react";

import firebase from "../config/firebase-config";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "./ChatMessage";
const firestore = firebase.firestore();

const Protected = () => {
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limitToLast(30);
  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  // Refs
  const dummy = useRef();

  // Getting User Info From Claims
  const idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
  const { email } = idToken.idToken.claims;

  // Functions
  const sendMessage = async (e) => {
    e.preventDefault();
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      userID: email, // Just put email, will figure out ID later, IDK
    });
    setFormValue("");
    scrollToBottom();
  };

  // Scroll to Bottom function (can't still implement onLoad yet IDK)
  const scrollToBottom = () => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <div className="message-list">
        {messages &&
          messages.map((msg) => (
            <ChatMessage message={msg} key={msg.id} userid={email} />
          ))}

        <div ref={dummy}></div>
      </div>
      <div className="form-wrapper">
        <form onSubmit={sendMessage} className="send-message">
          <input
            type="text"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Please say something nice!"
            onFocus={scrollToBottom}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!formValue}
          >
            &#10147;
          </button>
        </form>
      </div>
    </>
  );
};
export default Protected;
