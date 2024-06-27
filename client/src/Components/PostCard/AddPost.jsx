import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {setMsg} from '../../features/notifications/noteSlice'
import axios from "axios";

function AddPost({ setHello }) {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  useEffect(() => {
    if (user.username === "") {
      dispatch(setMsg({
        msg:`Please Login to access`,
        time:5,
        showMsg:true,
      }))
      navigate("/login");
    }
  }, []);

  const handleSubmit = async () => {
    const keys = keywords.split(", ");
    const content = {
      keywords: keys,
      title: title,
      description: desc,
      code: code,
    };
    console.log(content);
    const res = await axios.post("http://localhost:3001/post/add", content, {
      withCredentials: true,
    });
    console.log(res);
    setHello("hidden");
    setKeywords("");
    setTitle("");
    setDesc("");
    setCode("");
  };

  const [keywords, setKeywords] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [code, setCode] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen">
    <form className="max-w-2xl w-full mx-auto bg-slate-300 shadow-md rounded-lg p-8">
    <h1 className="mb-4 text-3xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl">
        Create Your Post
      </h1>
      <div className="relative z-0 w-full mt-2 mb-5 group">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-900 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Post Title
        </label>
      </div>
      <div className="relative z-0 w-full group">
        <input
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-900 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Keywords
        </label>
        <div className="text-sm text-gray-700 mt-1">
          eg: keywords1, keywords2, keywords3
        </div>
      </div>
      <div className="relative z-0 w-full mb-5 mt-2 group">
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="block py-6 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-900 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Description
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          id="floating_password"
          className="block py-6 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-900 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Code
        </label>
      </div>
      <div className="bg-black p-2 rounded-lg mb-1">
        <div className="text-sm text-gray-400 pb-1">Preview</div>
        <pre className="max-h-40 overflow-auto">
          <SyntaxHighlighter language="javascript" style={vs2015}>
            {code?code:"//for example:\nlet a=10;\nalert(a);"}
          </SyntaxHighlighter>
        </pre>
      </div>
      <button
        onClick={handleSubmit}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Submit
      </button>
    </form>
    </div>
  );
}

export default AddPost;
