import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserPosts } from "../../features/posts/combinedPostSlice";
import Post from "../PostCard/Post";
import postsLoading from "../../assets/soln-loading.gif";
import { Link } from "react-router-dom";

function UserPosts() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const userposts = useSelector((state) => state.combined.userposts);
  console.log(userposts);
  useEffect(() => {
    const getPost = async () => {
      if (userposts.length === 0) {
        setLoading(true);
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/post/get`,
            {
              withCredentials: true,
            }
          );
          dispatch(setUserPosts(res.data));
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      }
    };
    getPost();
  }, []);
  return (
    <>
      <div className="px-px md:px-5 md:pb-5 bg-softWhite">
        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <img src={postsLoading} className="bg-softWhite" />
          </div>
        ) : (
          <>
            {userposts.length === 0 ? (
              <div className="flex justify-center items-center min-h-[50vh]">
                <Link
                  to="/addpost"
                  className="text-3xl font-extrabold leading-none tracking-tight text-darkBlue md:text-3xl lg:text-3xl cursor-pointer"
                >
                  Create Your Post
                </Link>
              </div>
            ) : (
              <div className="flex flex-wrap -mx-px md:-mx-3">
                {userposts.map((post) => (
                  <Post key={post._id} OnePost={post} name="user" />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default UserPosts;
