import personIcon from '../../assets/icons8-person-48.png'
import not_liked from '../../assets/not_liked.png'
import liked from '../../assets/liked.png'
import not_marked from '../../assets/not_marked.png'
import marked from '../../assets/marked.png'
import { Link } from 'react-router-dom';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPost } from '../../features/posts/combinedPostSlice';
import { useState } from 'react'

const SearchedPost = ({OnePost, name}) => {
  const user = useSelector((state) => state.user.user);
  const [isLiked, setIsLiked] = useState(
    user.likedPosts.includes(OnePost._id)
  );
  const [ismarked, setIsMarked] = useState(
    user.savedPosts.includes(OnePost._id)
  );

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSelectedPost=()=>{
    dispatch(setSelectedPost({ name:name, post:OnePost }))
    navigate(`/solution/:${OnePost._id}`)
  }
  return (
    <div className="md:h-1/3 h-1/3 w-full bg-gradient-to-r from-darkBlue to-coral my-1 p-px md:px-3 border-2 md:py-3">
      <div className='md:grid md:grid-cols-3'>
      <div className="bg-black p-4 rounded-lg mb-2">
      <pre className="max-h-20 md:max-h-40 overflow-auto md:overflow-auto">
        <SyntaxHighlighter language="javascript" style={vs2015}>
          {OnePost.code}
        </SyntaxHighlighter>
      </pre>
      </div>
      <div className=' md:col-span-2'>
      <div className="flex justify-center">
      <div onClick={handleSelectedPost} className="md:text-gray-700 text-white font-medium md:text-2xl text-center mt-2 cursor-pointer">{OnePost.title}</div>
      </div>
      {
        OnePost.usernameCreatedBy ? 
        <div className="flex items-center px-2 md:px-6 pt-2 pb-2 md:mt-2">
          <img src={personIcon} className="md:w-14 md:h-14 w-8 h-8 mr-3" alt="Channel Icon"/>
          <div>
            <span className=" text-slate-300 md:text-xl font-medium">{OnePost.usernameCreatedBy}</span>
            {/* <p className="text-gray-600 text-sm">Channel Name</p> */}
          </div>
        </div>:
        <></>
      }
      <div className="flex items-center pl-2 md:pl-8 pb-2 md:mt-3">
        <div className="flex items-center">
            <img src={isLiked ? liked : not_liked} className="w-8 h-8 rounded-full mr-1" alt="Like Icon"/>
            <p className="mr-3 text-black">{OnePost.likes}</p>
        </div>
        <img src={ismarked ? marked : not_marked} className="w-8 h-8 rounded-full ml-auto" alt="Not Marked Icon"/>
      </div>
      </div>
      </div>
    </div>
  );
};



export default SearchedPost;
