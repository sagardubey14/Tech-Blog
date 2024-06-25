import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import personIcon from '../../assets/icons8-person-48.png'
import not_liked from '../../assets/not_liked.png'
import liked from '../../assets/liked.png'
import not_marked from '../../assets/not_marked.png'
import marked from '../../assets/marked.png'
import cmnt from '../../assets/cmnt.gif'

const Post = ({title, code, keywords, username, likes}) => {
  return (
    <div className="md:w-1/3 w-full p-px md:px-3 border-2 md:py-3 flex flex-col ">
      <span className="text-gray-700 font-medium text-center">{title}</span>
      <div className="bg-black p-4 rounded-lg mb-2 h-full">
      <pre className="max-h-32 overflow-auto">
        <SyntaxHighlighter language="javascript" style={vs2015}>
          {code}
        </SyntaxHighlighter>
      </pre>
      </div>
      <div className="px-6 pt-4 pb-2 flex-grow">
      {
      keywords.map((keys,index) =><span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{keys}</span>)
      }
      </div>
      <div className="flex items-center pl-4 mt-auto">
        <div className="flex items-center">
            <img src={not_liked} className="w-8 h-8 rounded-full mr-1" alt="Like Icon"/>
            <p className="mr-3">89</p>
        </div>
        <div className="flex items-center ml-4">
            <img src={cmnt} className="w-8 h-8 mr-1" alt="Comment Icon"/>
            <p className="mr-3">10</p>
        </div>
        <img src={not_marked} className="w-8 h-8 rounded-full ml-auto" alt="Not Marked Icon"/>
      </div>

      {
        username ? 
        <div className="flex items-center px-6 pt-2 pb-2">
          <img src={personIcon} className="w-8 h-8 rounded-full mr-3" alt="Channel Icon"/>
          <div>
            <span className="text-gray-700 font-medium">{username}</span>
            {/* <p className="text-gray-600 text-sm">Channel Name</p> */}
          </div>
        </div>:
        <></>
      }
    </div>
  );
};



export default Post;
