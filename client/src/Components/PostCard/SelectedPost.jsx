import { useState } from "react";
import not_liked from "../../assets/not_liked.png";
import liked from "../../assets/liked.png";
import not_marked from "../../assets/not_marked.png";
import marked from "../../assets/marked.png";
import cmnt from "../../assets/cmnt.gif";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { updatePost } from "../../features/posts/postSlice";
import {
  addToSavedPosts,
  removeFromSavedPosts,
  addToLikedPosts,
  removeFromLikedPosts,
} from "../../features/user/userSlice";
import CommentSection from "./CommentSection";
import axios from "axios";

function SelectedPost() {
  const handleScroll = () => {
    const element = document.getElementById("scrollTarget");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const { postId } = useParams();
  const searchdePosts = useSelector((state) => state.posts.posts);
  const user = useSelector((state) => state.user.user);
  const selectedPost = searchdePosts.find(
    (post) => post._id === postId.slice(1)
  );
  const [isLiked, setIsLiked] = useState(
    user.likedPosts.includes(selectedPost._id)
  );
  const [ismarked, setIsMarked] = useState(
    user.savedPosts.includes(selectedPost._id)
  );
  const dispatch = useDispatch();

  const handleLikes = async () => {
    if (isLiked) {
      dispatch(updatePost({ likes: -1, id: selectedPost._id }));
      dispatch(removeFromLikedPosts(selectedPost._id));
      setIsLiked(false);
      try {
        const res = await axios.post(
          "http://localhost:3001/post/likes",
          { id: selectedPost._id, like: false },
          { withCredentials: true }
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch(updatePost({ likes: 1, id: selectedPost._id }));
      dispatch(addToLikedPosts(selectedPost._id));
      setIsLiked(true);
      try {
        const res = await axios.post(
          "http://localhost:3001/post/likes",
          { id: selectedPost._id, like: true },
          { withCredentials: true }
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleMark = async () => {
    if (ismarked) {
      dispatch(removeFromSavedPosts(selectedPost._id));
      setIsMarked(false);
      try {
        const res = await axios.post(
          "http://localhost:3001/post/save",
          { postId: selectedPost._id, remove: true },
          { withCredentials: true }
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch(addToSavedPosts(selectedPost._id));
      setIsMarked(true);
      try {
        const res = await axios.post(
          "http://localhost:3001/post/save",
          { postId: selectedPost._id, remove: false },
          { withCredentials: true }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-3xl w-full">
          <div className="grid grid-cols-3">
            <h2 className="text-2xl font-bold mb-4 col-span-2">
              Here is the selected post
            </h2>
            {user.username === selectedPost.usernameCreatedBy ? (
              <div className="col-span-1 md:flex md:items-center pb-5">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mb-2 md:mb-0  mr-2 ml-auto">
                Edit
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600">
                Delete
              </button>
            </div>
            ) : (
              <></>
            )}
          </div>
          <p className="mb-2">
            <span className="font-bold">Title:</span> {selectedPost.title}
          </p>
          <div className="mb-2">
            <span className="font-bold">Keywords:</span>
            {selectedPost.keywords.map((word, index) => (
              <p
                key={index}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                {word}
              </p>
            ))}
          </div>
          <p className="mb-2">
            <span className="font-bold">Description:</span>{" "}
            {selectedPost.description}
          </p>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto mb-2">
            <code className="text-sm">{selectedPost.code}</code>
          </pre>
          <p className="mb-2">
            <span className="font-bold">Date:</span>{" "}
            {selectedPost.createdAt.slice(0, 10)}
          </p>
          <p className="mb-2">
            <span className="font-bold">Created By:</span>
            {user.username === selectedPost.usernameCreatedBy ? (
              <Link to="/profile"> {selectedPost.usernameCreatedBy}</Link>
            ) : (
              <Link to={`/profile/other/:${selectedPost.usernameCreatedBy}`}>
                {" "}
                {selectedPost.usernameCreatedBy}
              </Link>
            )}
          </p>
          <p className="mb-2">
            <span className="font-bold">Likes:</span> {selectedPost.likes}
          </p>
          <div className="flex items-center">
            <div className="flex items-center">
              <img
                src={isLiked ? liked : not_liked}
                onClick={handleLikes}
                className=" w-8 h-8 rounded-full mr-1"
                alt="Like Icon"
              />
              <p className="mr-3">{selectedPost.likes}</p>
            </div>
            <div className="flex items-center ml-4">
              <img
                src={cmnt}
                onClick={handleScroll}
                className="w-8 h-8 mr-1"
                alt="Comment Icon"
              />
              <p className="mr-3">{selectedPost.comments.length}</p>
            </div>
            <img
              src={ismarked ? marked : not_marked}
              onClick={handleMark}
              className="w-8 h-8 rounded-full ml-auto"
              alt="Not Marked Icon"
            />
          </div>
        </div>
      </div>
      <CommentSection post={selectedPost} userName={user.username} />
    </div>
  );
}

export default SelectedPost;
