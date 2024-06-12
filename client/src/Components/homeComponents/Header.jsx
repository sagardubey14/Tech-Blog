import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from '../../assets/Logo.png'

const Header = () => {
  const user = useSelector(state=>state.user.user)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

  useEffect(() => {
    if (window.innerWidth > 768) {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 10;
      setIsHeaderVisible(isVisible);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }
  }, [prevScrollPos]);


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className={`sm:fixed sm:top-0 sm:left-0 sm:right-0 bg-black text-white p-4 flex flex-wrap justify-between items-center ${ isHeaderVisible ? '' : 'sm:-translate-y-full' }`} onMouseLeave={() => setIsDropdownOpen(false)} >
      {/* <div className="text-xl font-bold">SyntaxScribe</div> */}
      <img src={logo} className="sm:h-10" alt="Channel Icon"/>
      <nav className="w-full sm:w-auto mt-4 sm:mt-0">
        <ul className="flex flex-col sm:flex-row sm:space-x-4">
          <li className="mt-2 sm:mt-2"><Link to="/" className="hover:underline">Home</Link></li>
          <li className="mt-2 sm:mt-2"><Link to="/about" className="hover:underline">About</Link></li>
          <li className="mt-2 sm:mt-2 relative" >
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
                <li className="px-4 py-2 hover:bg-gray-600"><Link to="/categories/javascript">JavaScript</Link></li>
                <li className="px-4 py-2 hover:bg-gray-600"><Link to="/categories/python">Python</Link></li>
                <li className="px-4 py-2 hover:bg-gray-600"><Link to="/categories/web-development">Web Development</Link></li>
              </ul>
            )}
          </li>
            <input type="text" placeholder="Search for solutions..." className="w-full sm:w-auto p-2 hidden sm:block sm:mt-0 mt-2 rounded"/>
        </ul>
      </nav>
      <div className="w-full sm:w-auto sm:mt-0">
      {
            
            user.username?
            <>
            <div className="mt-2 sm:mt-0 sm:mr-4"><Link to="/profile" className="hover:underline">Profile</Link></div>
            </>:
            <div className="sm:grid sm:grid-cols-2 ">
            <div className="mt-2 sm:mt-0"><Link to="/login" className="hover:underline">Login</Link></div>
            <div className="mt-2 sm:mt-0"><Link to="/signup" className="hover:underline">Sign Up</Link></div>
            </div>
          }
      </div>
    </header>
  );
};

export default Header;
