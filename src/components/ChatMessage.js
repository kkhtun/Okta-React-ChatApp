import React, { useState } from "react";

const ChatMessage = ({ message, userid }) => {
  const { userID, text, createdAt } = message;
  const messageClass = userid === userID ? "sent" : "received";

  const [showCreatedAt, setShowCreatedAt] = useState(false);

  const convertToLocalTime = (milliseconds) => {
    let dateObject = new Date(milliseconds);
    return dateObject.toLocaleString();
  };
  return (
    <div className={`message-container ${messageClass}`}>
      <div className="message">
        <span className="message-sender text-muted">
          {userID.substr(0, userID.indexOf("@"))}
        </span>
        <p onClick={() => setShowCreatedAt(!showCreatedAt)}>{text}</p>
        {showCreatedAt && (
          <span className="text-info small">
            {convertToLocalTime(createdAt.seconds * 1000)}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
