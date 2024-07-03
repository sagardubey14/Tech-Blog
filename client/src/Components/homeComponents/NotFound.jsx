import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function NotFound() {
  const userQuery = useSelector((state) => state.query.userQueries);
  return (
    <div>
      <section className="bg-darkBlue text-white p-5 md:pt-14 text-center">
        <div className="flex flex-col justify-center items-center">
          <p className="text-2xl text-coral mb-6">
            Your search results for "<b>{userQuery}</b>"
          </p>
        </div>
        <div className="bg-slate-800 w-full flex sm:pt-14 sm:pb-14 items-center justify-center">
          <div className="bg-slate-900 border border-gray-600 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
            <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-coral">
              404
            </p>
            <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-slate-300 mt-4">
              Results Not Found
            </p>
            <p className="text-slate-400 mt-4 pb-4 border-b-2 border-slate-600 text-center">
              Sorry, the posts you are looking for could not be found.
            </p>
            <Link
              to="/"
              className="flex items-center space-x-2 bg-coral hover:bg-coralDark text-white px-4 pt-2 pb-2.5 mt-6 rounded transition duration-150"
              title="Return Home"
            >
              <span>Return Home</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
export default NotFound;
