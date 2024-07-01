import React, { useEffect, useRef, useState } from "react";
import chat1 from "../assets/chatbot1.png";
import cross from "../assets/cross.png";

const predefinedQnA = {
  Account: [
    {
      question: "What is this blog about?",
      answer:
        "This blog is dedicated to JavaScript enthusiasts. You can find tutorials, code snippets, and solutions to common problems in JavaScript.",
    },
    {
      question: "How can I register on this blog?",
      answer:
        'To register, click on the "Sign Up" button at the top right corner of the homepage, fill in your details, and submit the form. You will receive a confirmation email to verify your account.',
    },
    {
      question: "How do I edit my profile?",
      answer:
        'Go to your dashboard, click on "Edit Profile," make the necessary changes, and save the updates.',
    },
    {
      question: "How do I report a bug or issue?",
      answer:
        'If you encounter any issues or bugs, please go to the "Contact Us" in footer and fill out the form with the details of the problem. Our team will look into it as soon as possible.',
    },
  ],
  Posts: [
    {
      question: "How do I create a new post?",
      answer:
        'Once registered, go to your dashboard and click on "Create New Post." Fill in the title, description, keywords, and code, then click "Submit."',
    },
    {
      question: "How can I like or save a post?",
      answer:
        'Open the post you want to like or save. You will find the "Like" and "Save" buttons below the post. Click on them to perform the actions.',
    },
    {
      question: "How can I comment on a post?",
      answer:
        'Scroll down to the comments section of the post. Enter your comment in the input box and click "Submit."',
    },
  ],
  Search: [
    {
      question: "How can I search for specific topics or questions?",
      answer:
        "Use the search bar at the top of the homepage. Enter your query or keywords, and the relevant posts will be displayed based on the keywords matched.",
    },
  ],
  Interactions: [
    {
      question: "Can I follow other users?",
      answer:
        'Yes, you can follow other users. Go to their profile and click on the "Follow" button.',
    },
  ],
  "Css Playground": [
    {
      question: "How do I center a div horizontally in CSS?",
      answer:
        `<div class="w-1/2 mx-auto bg-gray-200 p-4">
        <!-- Content here -->
        </div>`,
    },
    {
      question: "How can I create a responsive layout using CSS Grid?",
      answer:
        `<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <!-- Grid items here -->
        </div>`,
    },
  ],
};

function ChatBot() {
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([
    { text: "Hi there! How can I assist you today?", sender: "bot" },
  ]);
  const [showBot, setShowBot] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuestionClick = (question, answer) => {
    setMessages([...messages, { text: question, sender: "user" }]);
    setLoading(true);
    setTimeout(() => {
      setMessages([
        ...messages,
        { text: question, sender: "user" },
        { text: answer, sender: "bot" },
      ]);
      setLoading(false);
    }, 1000);
  };
  return (
    <div className="fixed bottom-0 right-0  md:m-4 md:p-4 m-1 p-1">
      {showBot && (
        <div
          onClick={() => setShowBot(false)}
          className="w-16 h-16 bg-slate-300 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-slate-400 transition-colors duration-300"
        >
          <img src={chat1} className="h-8 w-8" alt="Chat Icon" />
        </div>
      )}
      {!showBot && (
        <div className="fixed bottom-0 right-0 m-4 p-4 sm:w-80 w-60 bg-white rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <div></div>
            <img
              src={cross}
              alt="Close Icon"
              onClick={() => {
                setShowBot(true);
                setMessages([
                  {
                    text: "Hi there! How can I assist you today?",
                    sender: "bot",
                  },
                ]);
                setSelectedCategory(null);
              }}
              className="h-5 cursor-pointer"
            />
          </div>
          <div className="h-56 overflow-y-auto p-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg ${
                  message.sender === "bot"
                    ? "bg-blue-100 text-blue-900 self-start mr-10"
                    : "bg-green-100 text-green-900 self-end text-right ml-10"
                }`}
              >
                {message.text}
              </div>
            ))}
            {loading && (
              <div className="mb-2 p-2 rounded-lg bg-blue-100 text-blue-900 self-start mr-10">
                ....
              </div>
            )}
            <div ref={messagesEndRef}></div>
          </div>
          <div className="p-2 mt-2">
            {selectedCategory ? (
              <>
                <button
                  className="block w-full text-left p-2 mb-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                  onClick={() => setSelectedCategory(null)}
                >
                  Back to Categories
                </button>
                {predefinedQnA[selectedCategory].map((item, index) => (
                  <button
                    key={index}
                    className="block w-full text-left p-2 mb-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                    onClick={() =>
                      handleQuestionClick(item.question, item.answer)
                    }
                  >
                    {item.question}
                  </button>
                ))}
              </>
            ) : (
              <>
                <h3 className="text-sm font-semibold mb-2">
                  Select a Category:
                </h3>
                {Object.keys(predefinedQnA).map((category, index) => (
                  <button
                    key={index}
                    className="block w-full text-left p-2 mb-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;
