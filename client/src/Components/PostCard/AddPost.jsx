import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMsg } from "../../features/notifications/noteSlice";
import {
  updateUserPost,
  addUserPost,
} from "../../features/posts/combinedPostSlice";
import { setSelectedQuery } from "../../features/query/querySlice";
import axios from "axios";
import buttonLoading from "../../assets/button-loading.gif";

function AddPost() {
  const user = useSelector((state) => state.user.user);
  const searchdePosts = useSelector((state) => state.combined.userposts);
  const selectedQuery = useSelector((state) => state.query.selectedQuery);
  const { postId } = useParams();
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [code, setCode] = useState("");
  const [editPost, setEditPost] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newErrors, setNewErrors] = useState({
    postTitle: "",
    keywords: "",
    description: "",
    code: "",
  });

  useEffect(() => {
    if (user.username === "") {
      dispatch(
        setMsg({
          msg: `Please Login to access`,
          time: 3,
          showMsg: true,
          type: 1,
        })
      );
      navigate("/login");
    }
    if (Object.keys(selectedQuery).length != 0) {
      setTitle(selectedQuery.query);
      const keySentence = selectedQuery.keywords.join(", ");
      setKeywords(keySentence);
    }
    if (postId) {
      const editPost = searchdePosts.find(
        (post) => post._id === postId.slice(1)
      );
      console.log(editPost);
      setEditPost(editPost);
      setCode(editPost.code);
      setDesc(editPost.description);
      setTitle(editPost.title);
      const keySentence = editPost.keywords.join(", ");
      setKeywords(keySentence);
    }
    return () => {
      dispatch(setSelectedQuery({}));
    };
  }, []);

  const validateForm = () => {
    let isValid = true;
    if (title === "") {
      setNewErrors((prevErrors) => ({
        ...prevErrors,
        postTitle: "Post title is required",
      }));
      isValid = false;
    }else{
      setNewErrors((prevErrors) => ({
        ...prevErrors,
        postTitle: "",
      }));
    }
    if (keywords === "") {
      setNewErrors((prevErrors) => ({
        ...prevErrors,
        keywords: "Keywords are required",
      }));
      isValid = false;
    }else{
      setNewErrors((prevErrors) => ({
        ...prevErrors,
        keywords: "",
      }));
    }
    if (desc === "") {
      setNewErrors((prevErrors) => ({
        ...prevErrors,
        description: "Description is required",
      }));
      isValid = false;
    }else{
      setNewErrors((prevErrors) => ({
        ...prevErrors,
        description: "",
      }));
    }
    if (code === "") {
      setNewErrors((prevErrors) => ({
        ...prevErrors,
        code: "Code is required",
      }));
      isValid = false;
    }else{
      setNewErrors((prevErrors) => ({
        ...prevErrors,
        code: "",
      }));
    }

    return isValid;
  };

  const handleSubmit = async () => {
    const keys = keywords.split(", ");
    if (validateForm()) {
      setLoading(true);
      try {
        setLoading(true);
        if (postId) {
          const content = {
            id: editPost._id,
            keywords: keys,
            title: title,
            description: desc,
            code: code,
          };
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/update/post`,
            content,
            {
              withCredentials: true,
            }
          );
          dispatch(updateUserPost({ id: editPost._id, post: res.data.post }));
        } else {
          const content = {
            keywords: keys,
            title: title,
            description: desc,
            code: code,
          };
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/post/add`,
            content,
            {
              withCredentials: true,
            }
          );
          dispatch(addUserPost(res.data.post));
          console.log(searchdePosts);
        }
        setLoading(false);
        setKeywords("");
        setTitle("");
        setDesc("");
        setCode("");
        dispatch(
          setMsg({
            msg: `Post created Succesfully`,
            time: 3,
            showMsg: true,
            type: 2,
          })
        );
      } catch (error) {
        console.log(error);
        setLoading(false);
        dispatch(
          setMsg({
            msg: `Post creation Failed`,
            time: 3,
            showMsg: true,
            type: 1,
          })
        );
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  mb-5 md:mt-0 md:mb-0 px-7 bg-gray-100">
      <div className="max-w-2xl w-full md:mx-auto bg-slate-300 shadow-md rounded-lg p-8 border-t-4 border-darkBlue">
        <h1 className="mb-4 text-3xl text-center font-extrabold leading-none tracking-tight text-darkBlue md:text-3xl lg:text-3xl">
          Create Your Post
        </h1>
        <div className="relative z-0 w-full mt-2 mb-5 group">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-darkBlue bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-coral peer"
            placeholder=" "
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-darkBlue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-coral peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Post Title
          </label>
          {newErrors.postTitle && (
            <p className="text-red-500 text-sm mt-1">{newErrors.postTitle}</p>
          )}
        </div>
        <div className="relative z-0 w-full group">
          <input
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-darkBlue bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-coral peer"
            placeholder=" "
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-darkBlue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-coral peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Keywords
          </label>
          <div className="text-sm text-gray-700 mt-1">
            eg: keywords1, keywords2, keywords3
          </div>
        </div>
        {newErrors.keywords && (
          <p className="text-red-500 text-sm mt-1">{newErrors.keywords}</p>
        )}
        <div className="relative z-0 w-full mb-3 mt-3 group">
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-darkBlue bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-coral peer"
            placeholder=" "
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-darkBlue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-coral peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Description
          </label>
        </div>
        {newErrors.description && (
          <p className="text-red-500 text-sm ">{newErrors.description}</p>
        )}
        <div className="relative z-0 w-full mt-2 group">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            id="floating_password"
            className="block py-6 px-0 w-full text-sm text-darkBlue bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-coral peer"
            placeholder=" "
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-darkBlue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-coral peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Code
          </label>
        </div>
        {newErrors.code && (
          <p className="text-red-500 text-sm mb-2 mt-1">{newErrors.code}</p>
        )}
        <div className="bg-darkBlue p-2 rounded-lg mb-1 mt-2">
          <div className="text-sm text-gray-400 pb-1">Preview</div>
          <pre className="max-h-40 overflow-auto">
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
              {code ? code : "//for example:\nlet a=10;\nalert(a);"}
            </SyntaxHighlighter>
          </pre>
        </div>
        <button
          onClick={handleSubmit}
          className="text-white bg-coral hover:bg-darkCoral font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex items-center justify-center h-10" // Added flex properties and fixed height
        >
          {loading ? (
            <img
              className="h-5 w-5 mx-3.5"
              src={buttonLoading}
              alt="Loading..."
            />
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
}

export default AddPost;
