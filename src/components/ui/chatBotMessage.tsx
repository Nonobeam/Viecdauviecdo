import React, { FC, useContext, useState } from 'react';
import DarkModeContext from '../../hooks/DarkModeContext';

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatBotMessageProps {
  onExit: () => void;
}

const ChatBotMessage: FC<ChatBotMessageProps> = ({ onExit }) => {
  const { isDarkMode } = useContext(DarkModeContext);
  
  // Define dark/light mode style variables
  const containerBackground = isDarkMode ? '#2c2c2c' : '#fff';
  const headerBackground = isDarkMode ? '#444' : '#007bff';
  const headerTextColor = '#fff';
  const chatBodyBackground = isDarkMode ? '#1e1e1e' : '#f1f1f1';
  const userBubbleBackground = isDarkMode ? '#0b93f6' : '#0084ff';
  const userBubbleTextColor = '#fff';
  const botBubbleBackground = isDarkMode ? '#3a3a3a' : '#e4e6eb';
  const botBubbleTextColor = isDarkMode ? '#fff' : '#000';
  const footerBackground = containerBackground;
  const inputTextColor = isDarkMode ? '#fff' : '#000';
  const inputBackground = isDarkMode ? '#333' : '#fff';

  // Messages are stored as objects with text and sender type
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Welcome to the chat!', isUser: false },
  ]);
  const [message, setMessage] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      setMessages((prev) => [...prev, { text: message.trim(), isUser: true }]);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        width: '320px',
        height: '420px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        overflow: 'hidden',
        backgroundColor: containerBackground,
        fontFamily: 'Arial, sans-serif',
        zIndex: 1000,
      }}
    >
      {/* HEADER */}
      <div
        style={{
          backgroundColor: headerBackground,
          color: headerTextColor,
          padding: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '10px 10px 0 0',
        }}
      >
        <span style={{ fontWeight: 600 }}>ChatBot</span>
        <button
          onClick={onExit}
          style={{
            background: 'transparent',
            border: 'none',
            color: headerTextColor,
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          X
        </button>
      </div>

      {/* CHAT BODY */}
      <div
        style={{
          flex: 1,
          padding: '10px',
          overflowY: 'auto',
          backgroundColor: chatBodyBackground,
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: msg.isUser ? 'flex-end' : 'flex-start',
              marginBottom: '8px',
            }}
          >
            <div
              style={{
                maxWidth: '60%',
                padding: '8px 12px',
                borderRadius: '16px',
                backgroundColor: msg.isUser ? userBubbleBackground : botBubbleBackground,
                color: msg.isUser ? userBubbleTextColor : botBubbleTextColor,
                textAlign: msg.isUser ? 'right' : 'left',
                fontSize: '14px',
                lineHeight: '1.4',
                whiteSpace: 'pre-wrap',
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER: INPUT */}
      <div
        style={{
          display: 'flex',
          borderTop: isDarkMode ? '1px solid #555' : '1px solid #ccc',
          backgroundColor: footerBackground,
          padding: '8px',
        }}
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            padding: '8px',
            border: 'none',
            outline: 'none',
            fontSize: '14px',
            color: inputTextColor,
            backgroundColor: inputBackground,
          }}
        />
        <button
          onClick={handleSendMessage}
          style={{
            backgroundColor: headerBackground,
            color: headerTextColor,
            border: 'none',
            padding: '8px 16px',
            marginLeft: '8px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBotMessage;
