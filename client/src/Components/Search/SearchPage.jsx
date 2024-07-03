import { useSelector } from "react-redux";
import SearchedPost from "./SearchedPosts";
import { useState } from "react";

function SearchPage() {
  const userQuery = useSelector((state) => state.query.userQueries);
  const searchdePosts = useSelector((state) => state.combined.resultposts);

  const [sortByLikes, setSortByLikes] = useState("");
  const [sortByDate, setSortByDate] = useState("");

  const handleLikesSortChange = (e) => {
    setSortByLikes(e.target.value);
  };

  const handleDateSortChange = (e) => {
    setSortByDate(e.target.value);
  };

  const getFilteredPosts = () => {
    let sortedPosts = [...searchdePosts];

    if (sortByLikes === "likesAsc") {
      sortedPosts.sort((a, b) => a.likes - b.likes);
    } else if (sortByLikes === "likesDesc") {
      sortedPosts.sort((a, b) => b.likes - a.likes);
    }

    if (sortByDate === "newest") {
      sortedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortByDate === "oldest") {
      sortedPosts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    return sortedPosts;
  };

  const filteredPosts = getFilteredPosts();

  return (
    <div className="px-4 md:px-6 min-h-screen bg-darkBlue text-white">
      <div className="flex flex-col justify-center items-center">
        <p className="text-2xl text-coral mb-6">
          Your search results for "<b>{userQuery}</b>"
        </p>
        <div className="flex flex-wrap mb-2 md:justify-center md:space-x-3">
          <select
            className="px-4 py-2 mb-2 md:mb-0 w-full md:w-auto bg-slate-800 text-white rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-coral focus:border-coral"
            value={sortByLikes}
            onChange={handleLikesSortChange}
          >
            <option value="">Filter by Likes</option>
            <option value="likesAsc">Least Popular</option>
            <option value="likesDesc">Most Popular</option>
          </select>

          <select
            className="px-4 py-2 w-full md:w-auto bg-slate-800 text-white rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-coral focus:border-coral"
            value={sortByDate}
            onChange={handleDateSortChange}
          >
            <option value="">Filter by Date</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
      <div className="flex flex-wrap -mx-px md:-mx-3">
        {filteredPosts.map((post) => (
          <SearchedPost
            key={post._id}
            postId={post._id}
            OnePost={post}
            name="search"
          />
        ))}
      </div>
    </div>
  );
}
export default SearchPage;
