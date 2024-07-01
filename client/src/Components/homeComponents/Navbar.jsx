import { useState } from "react";
import logo from "../../assets/SX.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {setSearchedPosts} from '../../features/posts/combinedPostSlice'
import axios from "axios";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:3001/search/posts", {
        params: { query: searchQuery },
      });
      dispatch(setSearchedPosts(response.data))
      setSearchQuery("");
      navigate("/solution");
    } catch (error) {
      if (error.response.status === 404) {
        navigate("/404");
      } else console.error("Error searching:", error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-darkBlue text-white py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo on the left */}
        <div className="flex items-center">
          <img
            src={logo}
            onClick={() => navigate("/")}
            alt="Logo"
            className="ml-2 h-10"
          />
          <span className="hidden md:block ml-2 font-sans text-3xl font-extrabold text-white">
            {" "}
            SyntaxScribe
          </span>
        </div>

        {/* Navigation links for desktop */}
        <div className="hidden md:flex flex-grow justify-center">
          <Link
            to="/"
            className=" text-white px-3 py-2 hover:text-gold"
          >
            Home
          </Link>
          <Link
            to="/about"
            className=" text-white px-3 py-2 hover:text-gold"
          >
            About
          </Link>
          <Link
            to="/css"
            className=" text-white px-3 py-2 hover:text-gold"
          >
            CSS-Playground
          </Link>
          <Link
            to="/addpost"
            className=" text-white px-3 py-2 hover:text-gold"
          >
            Create-Post
          </Link>
        </div>

        {/* Search bar for mobile */}
        <div className="flex items-center justify-center md:hidden">
          <div className="flex-shrink-0">
            {/* Search bar and icon */}
            <div className="relative">
              <input
                type="text"
                className="block w-full bg-gray-700 border text-white border-gray-600 rounded-md py-1 px-3 text-sm placeholder-gray-400 focus:outline-none focus:bg-gray-900 focus:border-gray-700"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className="absolute right-0 top-0 mt-2 mr-2"
              >
                <svg
                  className="h-4 w-4 text-gray-400 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center">
          {user.username ? (
            <div className="sm:grid sm:grid-cols-2 ">
              <div className="mt-2 sm:mt-0">
              <Link to="/profile" className="text-white py-2 hover:text-gold">
                Profile
              </Link>
              </div>
              <div className="mt-2 sm:mt-0">
              <Link onClick={()=>alert("you are logged out")}  className="text-white py-2 hover:text-gold">
                Logout
              </Link>
              </div>
            </div>
          ) : (
            <div className="sm:grid sm:grid-cols-2 ">
              <div className="mt-2 sm:mt-0">
                <Link to="/login" className="text-white py-2 hover:text-gold">
                  Login
                </Link>
              </div>
              <div className="mt-2 sm:mt-0">
                <Link
                  to="/signup"
                  className="text-white py-2 hover:text-gold"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Menu icon for mobile */}
        <div className="flex md:hidden items-center mr-2">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden mt-2">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block text-white px-3 py-2 border-b-2 border-lightBlue hover:text-gold"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="block text-white px-3 py-2 hover:text-gold"
          >
            About
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            to="/css"
            className="block text-white px-3 py-2 border-y-2 border-lightBlue hover:text-gold"
          >
            CSS-Playground
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            to="/addpost"
            className="block text-white px-3 py-2  hover:text-gold"
          >
            Create-Post
          </Link>
          {user.username ? (
            <div>
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="block text-white px-3 py-2 border-y-2 border-lightBlue hover:text-gold"
            >
              Profile
            </Link>
            <Link onClick={()=>alert("you are logged out")}  className="block text-white px-3 py-2 border-b-2 border-lightBlue hover:text-gold">
                Logout
              </Link>
          </div>
          ) : (
            <div>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block text-white px-3 py-2 border-y-2 border-lightBlue hover:text-gold"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="block text-white px-3 py-2 border-b-2 border-lightBlue hover:text-gold"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
