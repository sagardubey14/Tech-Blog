import React, { useState } from 'react';
import chat1 from '../assets/chatbot1.png'

function ChatBot() {
  const [messages, setMessages] = useState([
    { text: 'Hi there! How can I assist you today?', sender: 'bot' }
  ]);

  const predefinedQuestions = [
    'How to Post?',
    'What do i need to create a account?',
  ];

  const [showBot, setShowBot] =useState(true);

  return (
    <div className="fixed bottom-0 right-0  m-4 p-4">
      {showBot &&
      <div onClick={()=>setShowBot(false)} className="w-16 h-16 bg-slate-300 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-slate-400 transition-colors duration-300">
        <img src={chat1} className="h-8 w-8"/>
      </div>}
      {
        !showBot &&
        <div className='w-80 bg-white p-2 '>
        <div className="h-64 overflow-y-auto p-2">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 p-2 rounded-lg ${message.sender === 'bot' ? 'bg-blue-100 text-blue-900' : 'bg-green-100 text-green-900'}`}>
            {message.text}
          </div>
        ))}
      </div>
        </div>
      }
    </div>
  );
}

export default ChatBot;
