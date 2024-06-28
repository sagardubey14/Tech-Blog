import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getSavedPosts} from '../../features/posts/userPostSlice'
import Post from "../PostCard/Post";

function SavedPosts() {
  const user = useSelector((state) => state.user.user);
  const usersavedposts = useSelector(state=>state.userposts.savedpost)
  const dispatch = useDispatch()
  useEffect(() => {
    const call = async () => {
      try {
        const res = await axios.get("http://localhost:3001/post/savedposts", {
            params:{savedPosts: user.savedPosts},
        });
        dispatch(getSavedPosts(res.data.PostsSaved))
      } catch (error) {
        console.log(error);
      }
    };
    call();
  }, []);
  return (
    <div>
      <div className="px-px md:px-3  bg-slate-500">
          <div className="flex flex-wrap -mx-px md:-mx-3">
            {usersavedposts.map(
              post=><Post
              key={post._id}
              title={post.title}
              code={post.code}
              keywords={post.keywords}
            />
            )}
          </div>
    </div>
    </div>
  );
}

export default SavedPosts;
