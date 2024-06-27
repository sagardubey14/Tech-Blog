import React, { useState } from 'react';

const HtmlPreviewer = () => {
  const [html, setHtml] = useState('');

  const handleChange = (event) => {
    setHtml(event.target.value);
  };

  return (
    <div className="flex h-screen">
      <textarea
        className="w-1/2 p-4 border-r border-gray-300"
        value={html}
        onChange={handleChange}
        placeholder="Write your HTML code here..."
      />
      <div
        className="w-1/2 p-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default HtmlPreviewer;
