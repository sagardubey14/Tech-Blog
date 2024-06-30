import { Link, Route, Routes, useParams } from "react-router-dom";
import Followers from "../ProfileCompo/Followers";
import UserPosts from "../ProfileCompo/UserPosts";
import Following from "../ProfileCompo/Following";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AddPost from "../PostCard/AddPost";
import ProfileHeader from "../ProfileCompo/PofileHeader";
import { setUser } from "../../features/user/otherUserSlice";
import Post from "../PostCard/Post";
import axios from "axios";
import OtherUserPost from "./OtherUserPost";

function OthersProfile() {
  const { user } = useParams();
  const username = user.slice(1)
  const dispatch = useDispatch()
  useEffect(()=>{
    const fetchUser = async ()=>{
      try {
        const response = await axios.get(`http://localhost:3001/search/user`, {
          params: { username: username }
        });
        dispatch(setUser(response.data))
      } catch (error) {
        console.log(error);
      }  
    }
    fetchUser();
  },[])
  const [showFollowing, setShowFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showAddPost, setShowAddPost] = useState(false);

  return (
    <>
      <ProfileHeader
        username={username}
        setShowAddPost={setShowAddPost}
        setShowFollowers={setShowFollowers}
        setShowFollowing={setShowFollowing}
      />
      <div className="relative min-h-screen">
        {showFollowers && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex items-center justify-center">
            <Followers setShowFollowers={setShowFollowers} />
          </div>
        )}
        {showFollowing && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex items-center justify-center">
            <Following setShowFollowing={setShowFollowing} />
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
        </ul>
        <Routes>
          <Route path="/" element={<OtherUserPost username={username}/>} />
        </Routes>
      </div>
    </>
  );
}

export default OthersProfile;
