import { Link, Route, Routes } from "react-router-dom";
import Followers from "./Followers";
import UserPosts from "./UserPosts";
import Following from "./Following";
import { useState } from "react";
import AddPost from "../PostCard/AddPost";
import ProfileHeader from "./PofileHeader";
import SavedPosts from "./SavedPosts";





function Profile() {
  const [showFollowing, setShowFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showAddPost, setShowAddPost] = useState(false);

  return (
    <>
      <ProfileHeader 
        setShowAddPost={setShowAddPost}
        setShowFollowers={setShowFollowers}
        setShowFollowing={setShowFollowing}
        />
      <div className="relative min-h-screen">
        {showFollowers && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex items-center justify-center">
            <Followers setShowFollowers={setShowFollowers}/>
          </div>
        )}
        {showFollowing && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex items-center justify-center">
            <Following setShowFollowing={setShowFollowing}/>
          </div>
        )}
        {showAddPost && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex items-center justify-center">
            <AddPost />
          </div>
        )}
        <ul className="flex items-center justify-around md:justify-center space-x-12 uppercase tracking-widest font-semibold text-xs text-gray-600 border-t">
          <li className="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700">
            <div className="inline-block p-3" href="#">
              <i className="fas fa-th-large text-xl md:text-xs"></i>
              <Link to="/profile" className="hidden md:inline">
                Post
              </Link>
            </div>
          </li>
          <li className="md:border-t md:border-gray-700">
            <div className="inline-block p-3" href="#">
              <i className="far fa-square text-xl md:text-xs"></i>
              <Link to="/profile/saved" className="hidden md:inline">
                Saved
              </Link>
            </div>
          </li>
        </ul>
        <Routes>
          <Route path="/" element={<UserPosts />} />
          <Route path="/saved" element={<SavedPosts />} />
        </Routes>
      </div>
    </>
  );
}

export default Profile;
