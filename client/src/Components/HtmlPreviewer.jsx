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
    <div className="flex flex-col md:flex-row h-screen bg-darkBlue text-white">
    <div className="w-full h-1/2 md:w-1/2 md:h-auto p-4 border-r border-coral relative">
      <textarea
        ref={textareaRef}
        className="w-full h-full bg-darkerBlue text-black p-4 md:pl-12 border-none resize-none placeholder-coral"
        value={html}
        onChange={handleChange}
        placeholder="Write your HTML code here..."
        style={{ fontFamily: 'monospace', lineHeight: '1.5em' }}
      />
    </div>
    <div
      className="w-full md:w-1/2 p-4 bg-lightGrey text-darkBlue"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  </div>
  );
};

export default HtmlPreviewer;
