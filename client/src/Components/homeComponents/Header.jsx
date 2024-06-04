import { useState } from "react";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="sm:fixed sm:top-0 sm:left-0 sm:right-0 bg-gray-800 text-white p-4 flex flex-wrap justify-between items-center" onMouseLeave={() => setIsDropdownOpen(false)} >
      <div className="text-xl font-bold">SyntaxScribe</div>
      <nav className="w-full sm:w-auto mt-4 sm:mt-0">
        <ul className="flex flex-col sm:flex-row sm:space-x-4">
          <li className="mt-2 sm:mt-0"><a href="/" className="hover:underline">Home</a></li>
          <li className="mt-2 sm:mt-0"><a href="/about" className="hover:underline">About</a></li>
          <li className="mt-2 sm:mt-0 relative" >
            <button
              onClick={toggleDropdown}
              onMouseEnter={() => setIsDropdownOpen(true)}
              className="hover:underline focus:outline-none"
            >
              Categories
            </button>
            {isDropdownOpen && (
              <ul
                onMouseLeave={() => setIsDropdownOpen(false)} 
                className="absolute bg-gray-800 text-white mt-2 py-2 w-40 rounded shadow-lg">
                <li className="px-4 py-2 hover:bg-gray-600"><a href="/categories/javascript">JavaScript</a></li>
                <li className="px-4 py-2 hover:bg-gray-600"><a href="/categories/python">Python</a></li>
                <li className="px-4 py-2 hover:bg-gray-600"><a href="/categories/web-development">Web Development</a></li>
              </ul>
            )}
          </li>
          <li className="mt-2 sm:mt-0"><a href="/login" className="hover:underline">Login</a></li>
          <li className="mt-2 sm:mt-0"><a href="/signup" className="hover:underline">Sign Up</a></li>
        </ul>
      </nav>
      <div className="w-full sm:w-auto mt-4 sm:mt-0">
        <input type="text" placeholder="Search for solutions..." className="w-full sm:w-auto p-2 rounded"/>
      </div>
    </header>
  );
};

export default Header;
