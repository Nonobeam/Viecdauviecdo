import React from "react";

interface ChatbotButtonProps {
  onOpen: () => void;
}

const ChatbotButton: React.FC<ChatbotButtonProps> = ({ onOpen }) => {
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
      onClick={onOpen}
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
