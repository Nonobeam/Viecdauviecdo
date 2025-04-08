import React from "react";
import { useNavigate } from "react-router-dom";

const ChatbotButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        width: "4%",
        height: "7%",
        borderRadius: "50%",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        cursor: "pointer",
      }}
      onClick={() => {
        navigate("/");
      }}
    >
      <img
        src="/logo/chat-bot-icon.png"
        alt="Chatbot"
        style={{ width: "120%", height: "100%" }}
      />
    </div>
  );
};

export default ChatbotButton;
