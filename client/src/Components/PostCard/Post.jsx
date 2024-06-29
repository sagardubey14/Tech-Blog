import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import personIcon from '../../assets/icons8-person-48.png'
import not_liked from '../../assets/not_liked.png'
import liked from '../../assets/liked.png'
import not_marked from '../../assets/not_marked.png'
import marked from '../../assets/marked.png'
import cmnt from '../../assets/cmnt.gif'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedPost } from '../../features/posts/combinedPostSlice';

const Post = ({OnePost, name}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSelectedPost=()=>{
    
    dispatch(setSelectedPost({ name:name, post:OnePost }))
    navigate(`/solution/:${OnePost._id}`)
  }

  return (
    <div className="md:w-1/3 w-full p-px md:px-3 border-2 md:py-3 flex flex-col bg-slate-100 text-white">
      <div onClick={handleSelectedPost} className="font-medium text-center text-coral cursor-pointer">{OnePost.title}</div>
      <div className="bg-darkBlue p-4 rounded-lg mb-2 h-full">
        <pre className="max-h-32 overflow-auto">
          <SyntaxHighlighter language="javascript" style={vs2015}>
            {OnePost.code}
          </SyntaxHighlighter>
        </pre>
      </div>
      <div className="px-6 pt-4 pb-2 flex-grow">
        {OnePost.keywords.map((keys, index) => (
          <span key={index} className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
            {keys}
          </span>
        ))}
      </div>
      <div className="flex items-center pl-4 mt-auto">
        <div className="flex items-center">
          <img src={not_liked} className="w-8 h-8 rounded-full mr-1" alt="Like Icon" />
          <p className="mr-3 text-coral">{OnePost.likes}</p>
        </div>
        <div className="flex items-center ml-4">
          <img src={cmnt} className="w-8 h-8 mr-1" alt="Comment Icon" />
          <p className="mr-3 text-coral">0</p>
        </div>
        <img src={not_marked} className="w-8 h-8 rounded-full ml-auto" alt="Not Marked Icon" />
      </div>

      {OnePost.usernameCreatedBy ? (
        <div className="flex items-center px-6 pt-2 pb-2">
          <img src={personIcon} className="w-8 h-8 rounded-full mr-3" alt="Channel Icon" />
          <div>
            <span className="font-medium text-coral">{OnePost.usernameCreatedBy}</span>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};



export default Post;
