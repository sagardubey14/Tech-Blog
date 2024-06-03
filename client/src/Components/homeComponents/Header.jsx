import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">SyntaxScribe</div>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="#" className="hover:underline">Home</a></li>
          <li><a href="#" className="hover:underline">About</a></li>
          <li><a href="#" className="hover:underline">Categories</a></li>
          <li><a href="#" className="hover:underline">Login/Sign Up</a></li>
        </ul>
      </nav>
      <div>
        <input type="text" placeholder="Search for solutions..." className="p-2 rounded"/>
      </div>
    </header>
  );
};

export default Header;
