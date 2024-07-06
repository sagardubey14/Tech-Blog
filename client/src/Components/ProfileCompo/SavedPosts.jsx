import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSavedPosts } from "../../features/posts/combinedPostSlice";
import Post from "../PostCard/Post";
import postsLoading from "../../assets/soln-loading.gif";

function SavedPosts() {
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(false);
  const usersavedposts = useSelector((state) => state.combined.savedposts);
  const dispatch = useDispatch();
  useEffect(() => {
    const call = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/post/savedposts`,
          {
            params: { savedPosts: user.savedPosts },
          }
        );
        dispatch(setSavedPosts(res.data.PostsSaved));
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    call();
  }, []);
  return (
    <div>
      <div className="px-px md:px-5  bg-softWhite">
        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <img src={postsLoading} className="bg-softWhite" />
          </div>
        ) : (
          <>
            {usersavedposts.length === 0 ? (
              <div className="flex justify-center items-center min-h-[50vh]">
                <p
                  className="text-3xl font-extrabold leading-none tracking-tight text-black md:text-3xl lg:text-3xl cursor-pointer"
                >
                  There is no Saved Post
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap -mx-px md:-mx-3">
                {usersavedposts.map((post) => (
                  <Post key={post._id} OnePost={post} name="saved" />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SavedPosts;
