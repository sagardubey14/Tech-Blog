import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8 text-center">
      <div className="space-x-4">
        <a href="#" className="hover:underline">Privacy Policy</a>
        <a href="#" className="hover:underline">Terms of Service</a>
      </div>
      <div className="mt-4">
        <p>Contact us: contact@example.com</p>
      </div>
      <div className="mt-4">
        <a href="#" className="hover:underline">Twitter</a> | <a href="#" className="hover:underline">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
