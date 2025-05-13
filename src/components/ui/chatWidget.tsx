import React, { useState } from 'react';
import ChatbotButton from './chatbotButton';
import ChatBotMessage from './chatBotMessage';

const ChatWidget: React.FC = () => {
  // State to toggle between chat messages view and button view
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  return (
    <>
      {isChatOpen ? (
        <ChatBotMessage onExit={() => setIsChatOpen(false)} />
      ) : (
        <ChatbotButton onOpen={() => setIsChatOpen(true)} />
      )}
    </>
  );
};

export default ChatWidget;
