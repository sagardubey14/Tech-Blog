import { Editor } from '@monaco-editor/react';
import personIcon from '../assets/icons8-person-48.png'
import not_liked from '../assets/not_liked.png'
import liked from '../assets/liked.png'
import not_marked from '../assets/not_marked.png'
import marked from '../assets/marked.png'
import cmnt from '../assets/cmnt.gif'
import { Link } from 'react-router-dom';

const SearchedPost = ({postId, title, code, username, likes}) => {
  return (
    <div className="md:h-1/3 h-1/3 w-full p-px md:px-3 border-2 md:py-3">
      <div className='md:grid md:grid-cols-3'>
      {/* <Editor
            className="mt-3"
            height="20vh"
            width="100%"
            defaultLanguage="javascript"
            defaultValue={code}
            theme='vs-dark'
      /> */}
      <pre className='bg-black p-4 rounded-lg overflow-auto mb-2'><code className='text-sm text-white'>{code}</code></pre>
      <div className=' md:col-span-2'>
      <div className="flex justify-center">
      <Link to={`/solution/:${postId}`} className="text-gray-700 font-medium md:text-2xl text-center mt-2">{title}</Link>
      </div>
      {
        username ? 
        <div className="flex items-center px-2 md:px-6 pt-2 pb-2 md:mt-2">
          <img src={personIcon} className="md:w-14 md:h-14 w-8 h-8 mr-3" alt="Channel Icon"/>
          <div>
            <span className="text-gray-700 md:text-xl font-medium">{username}</span>
            {/* <p className="text-gray-600 text-sm">Channel Name</p> */}
          </div>
        </div>:
        <></>
      }
      <div className="flex items-center pl-2 md:pl-8 pb-2 md:mt-3">
        <div className="flex items-center">
            <img src={not_liked} className="w-8 h-8 rounded-full mr-1" alt="Like Icon"/>
            <p className="mr-3">89</p>
        </div>
        <img src={not_marked} className="w-8 h-8 rounded-full ml-auto" alt="Not Marked Icon"/>
      </div>
      </div>
      </div>
    </div>
  );
};



export default SearchedPost;
