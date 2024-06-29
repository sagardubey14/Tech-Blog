import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getSavedPosts} from '../../features/posts/userPostSlice'
import {setSavedPosts} from '../../features/posts/combinedPostSlice'
import Post from "../PostCard/Post";

function SavedPosts() {
  const user = useSelector((state) => state.user.user);
  const usersavedposts = useSelector(state=>state.combined.savedposts)
  const dispatch = useDispatch()
  useEffect(() => {
    const call = async () => {
      try {
        const res = await axios.get("http://localhost:3001/post/savedposts", {
            params:{savedPosts: user.savedPosts},
        });
        dispatch(getSavedPosts(res.data.PostsSaved))
        dispatch(setSavedPosts(res.data.PostsSaved))
      } catch (error) {
        console.log(error);
      }
    };
    call();
  }, []);
  return (
    <div>
      <div className="px-px md:px-5  bg-softWhite">
          <div className="flex flex-wrap -mx-px md:-mx-3">
            {usersavedposts.map(
              post=><Post
              key={post._id}
              OnePost={post}
              name='saved'
            />
            )}
          </div>
    </div>
    </div>
  );
}

export default SavedPosts;
