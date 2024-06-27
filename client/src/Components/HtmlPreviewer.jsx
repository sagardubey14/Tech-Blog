import React, { useState, useRef } from 'react';

const HtmlPreviewer = () => {
  const [html, setHtml] = useState('<div class="bg-blue-500 text-white p-4">Hello, Tailwind!</div>');
  const textareaRef = useRef(null);

  const handleChange = (event) => {
    const value = event.target.value;
    const cursorPosition = event.target.selectionStart;

    if (value[cursorPosition - 1] === '>' && value[cursorPosition + 1] === undefined) {
      const match = value.substring(0, cursorPosition).match(/<(\w+)([^>]*)>$/);
      if (match) {
        const tagName = match[1];
        const newValue = value.substring(0, cursorPosition) + `</${tagName}>` + value.substring(cursorPosition);
        setHtml(newValue);

        setTimeout(() => {
          textareaRef.current.selectionStart = cursorPosition;
          textareaRef.current.selectionEnd = cursorPosition;
          textareaRef.current.focus();
        }, 0);

        return;
      }
    }

    setHtml(value);
  };
  

  return (
    <div className="flex h-screen bg-gray-900 text-white">
    <div className="w-1/2 p-4 border-r border-gray-700 relative">
      <textarea
        ref={textareaRef}
        className="w-full h-full bg-gray-800 text-white p-4 pl-12 border-none resize-none"
        value={html}
        onChange={handleChange}
        placeholder="Write your HTML code here..."
        style={{ fontFamily: 'monospace', lineHeight: '1.5em' }}
      />
    </div>
    <div
      className="w-1/2 p-4 bg-white text-black"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  </div>
  );
};

export default HtmlPreviewer;
