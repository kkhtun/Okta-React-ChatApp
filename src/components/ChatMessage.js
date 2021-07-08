import React from "react";

const ChatMessage = ({ message, userid }) => {
  const { userID, text } = message;
  const messageClass = userid === userID ? "sent" : "received";
  return (
    <div className={`message-container ${messageClass}`}>
      <div className="message">
        <span className="message-sender text-muted">
          {userID.substr(0, userID.indexOf("@"))}
        </span>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
