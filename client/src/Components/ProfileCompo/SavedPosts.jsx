import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function SavedPosts() {
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    const call = async () => {
      try {
        const res = await axios.get("http://localhost:3001/post/savedposts", {
            params:{savedPosts: user.savedPosts},
        });
      } catch (error) {
        console.log(error);
      }
    };
    call();
  }, []);
  return (
    <div>
      saved posts
    </div>
  );
}

export default SavedPosts;
