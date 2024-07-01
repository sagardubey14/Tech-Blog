import { useState } from "react";
import not_liked from "../../assets/not_liked.png";
import liked from "../../assets/liked.png";
import not_marked from "../../assets/not_marked.png";
import marked from "../../assets/marked.png";
import cmnt from "../../assets/cmnt.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { postLikes, removeUserPost } from "../../features/posts/combinedPostSlice";
import {
  addToSavedPosts,
  removeFromSavedPosts,
  addToLikedPosts,
  removeFromLikedPosts,
} from "../../features/user/userSlice";
import CommentSection from "./CommentSection";
import axios from "axios";
import DeleteConfirmation from "./DeleteConfirmation";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

function SelectedPost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const combineState = useSelector(state=>state.combined)
  const selectedPost = useSelector(state=>state.combined.selectedpost)
    // searchdePosts.find((post) => post._id === postId.slice(1)) ||
    // userPosts.find((post) => post._id === postId.slice(1)) ||
    // trendPosts.find((post) => post._id === postId.slice(1));
  
  const [isLiked, setIsLiked] = useState(
    user.likedPosts.includes(selectedPost.post._id)
  );
  const [ismarked, setIsMarked] = useState(
    user.savedPosts.includes(selectedPost.post._id)
  );

  const handleScroll = () => {
    const element = document.getElementById("scrollTarget");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLikes = async () => {
    if(user.username ===''){
      navigate('/login')
      return
    }
    if (isLiked) {
      dispatch(postLikes({ likes: -1, id:selectedPost.post._id, name:selectedPost.name}));
      dispatch(removeFromLikedPosts(selectedPost.post._id));
      setIsLiked(false);

      try {
        const res = await axios.post(
          "http://localhost:3001/post/likes",
          { id: selectedPost.post._id, like: false },
          { withCredentials: true }
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch(postLikes({ likes: 1, id:selectedPost.post._id, name:selectedPost.name}));
      dispatch(addToLikedPosts(selectedPost.post._id));
      setIsLiked(true);
      try {
        const res = await axios.post(
          "http://localhost:3001/post/likes",
          { id: selectedPost.post._id, like: true },
          { withCredentials: true }
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    console.log(combineState);
  };

  const handleConfirmDelete = async () => {
    console.log(`Post ${selectedPost.post._id} deleted`);
    try {
      const res = await axios.post(
        "http://localhost:3001/post/delete",
        { postId: selectedPost.post._id},
        { withCredentials: true }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    dispatch(removeUserPost({id:selectedPost.post._id}))
    setShowDeletePopup(false);
    navigate('/')
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
  };

  const handleMark = async () => {
    if(user.username ===''){
      navigate('/login')
      return
    }
    if (ismarked) {
      dispatch(removeFromSavedPosts(selectedPost.post._id));
      setIsMarked(false);
      try {
        const res = await axios.post(
          "http://localhost:3001/post/save",
          { postId: selectedPost.post._id, remove: true },
          { withCredentials: true }
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch(addToSavedPosts(selectedPost.post._id));
      setIsMarked(true);
      try {
        const res = await axios.post(
          "http://localhost:3001/post/save",
          { postId: selectedPost.post._id, remove: false },
          { withCredentials: true }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      {showDeletePopup && (
        <DeleteConfirmation
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-3xl w-full">
          <div className="grid grid-cols-3">
            <h2 className="text-2xl font-bold mb-4 col-span-2 text-gray-800">
              Here is the selected post
            </h2>
            {user.username === selectedPost.post.usernameCreatedBy ? (
              <div className="col-span-1 md:flex md:items-center pb-5">
                <button
                  onClick={() =>
                    navigate(`/solution/edit/:${selectedPost.post._id}`)
                  }
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mb-2 md:mb-0  mr-2 ml-auto"
                >
                  Edit
                </button>
                <button
                  onClick={() => setShowDeletePopup(true)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ) : null}
          </div>
          <p className="mb-2 text-gray-800">
            <span className="font-bold">Title:</span> {selectedPost.post.title}
          </p>
          <div className="mb-2">
            <span className="font-bold text-gray-800">Keywords:</span>
            {selectedPost.post.keywords.map((word, index) => (
              <p
                key={index}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                {word}
              </p>
            ))}
          </div>
          <p className="mb-2 text-gray-800">
            <span className="font-bold">Description:</span>{" "}
            {selectedPost.post.description}
          </p>
          <pre className="bg-darkBlue p-4 rounded-lg overflow-auto mb-2">
            <code className="text-sm text-gray-800">
            <SyntaxHighlighter language="javascript" style={vs2015}>
              {selectedPost.post.code}
            </SyntaxHighlighter>
              </code>
          </pre>
          <p className="mb-2 text-gray-800">
            <span className="font-bold">Date:</span>{" "}
            {selectedPost.post.createdAt.slice(0, 10)}
          </p>
          <p className="mb-2 text-gray-800">
            <span className="font-bold">Created By:</span>
            {
              user.username === ''?
              <Link to="/login" className="text-blue-500">
                {" "}
                {selectedPost.post.usernameCreatedBy}
              </Link>:
              <>
              {user.username === selectedPost.post.usernameCreatedBy ? (
                <Link to="/profile" className="text-blue-500">
                  {" "}
                  {selectedPost.post.usernameCreatedBy}
                </Link>
              ) : (
                <Link
                  to={`/profile/other/:${selectedPost.post.usernameCreatedBy}`}
                  className="text-blue-500"
                >
                  {' '+selectedPost.post.usernameCreatedBy}
                </Link>
              )}
              </>
            }
          </p>
          <p className="mb-2 text-gray-800">
            <span className="font-bold">Likes:</span> {selectedPost.post.likes}
          </p>
          <div className="flex items-center">
            <div className="flex items-center">
              <img
                src={isLiked ? liked : not_liked}
                onClick={handleLikes}
                className="w-8 h-8 rounded-full mr-1 cursor-pointer"
                alt="Like Icon"
              />
              <p className="mr-3 text-gray-800">{selectedPost.post.likes}</p>
            </div>
            <div className="flex items-center ml-4">
              <img
                src={cmnt}
                onClick={handleScroll}
                className="w-8 h-8 mr-1 cursor-pointer"
                alt="Comment Icon"
              />
              <p className="mr-3 text-gray-800">
                {selectedPost.post.comments.length}
              </p>
            </div>
            <img
              src={ismarked ? marked : not_marked}
              onClick={handleMark}
              className="w-8 h-8 rounded-full ml-auto cursor-pointer"
              alt="Not Marked Icon"
            />
          </div>
        </div>
      </div>

      <CommentSection post={selectedPost.post} userName={user.username} />
    </div>
  );
}

export default SelectedPost;
